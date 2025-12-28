import json
import re
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.apps import apps
from django.db import models

try:
    from groq import Groq
    GROQ_AVAILABLE = True
except ImportError:
    GROQ_AVAILABLE = False
    print("⚠️ Groq not available - using rule-based system")

from .openai_config import SYSTEM_PROMPT

if GROQ_AVAILABLE:
    from .openai_config import GROQ_API_KEY, GROQ_MODEL


class ChatbotConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Initialize Groq AI client
        self.ai_client = None
        if GROQ_AVAILABLE and GROQ_API_KEY:
            try:
                self.ai_client = Groq(api_key=GROQ_API_KEY)
                print(f"✅ Groq AI Client initialized with model: {GROQ_MODEL}")
            except Exception as e:
                print(f"❌ Failed to initialize Groq client: {e}")
        else:
            print(f"⚠️ Using rule-based chatbot (Groq not available)")
        
    async def connect(self):
        await self.accept()
        # Don't send automatic welcome message - wait for user input

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        user_message = data.get('message', '').lower().strip()

        # Process message and get response
        response = await self.process_message(user_message)
        
        await self.send(text_data=json.dumps(response))

    async def process_message(self, message):
        # Empty message check
        if not message or len(message.strip()) == 0:
            return {
                'type': 'text',
                'message': 'Please type a message to get started! 😊'
            }

        # Use Groq AI if available, otherwise use rule-based system
        if self.ai_client:
            print(f"🤖 Using Groq AI for message: {message[:50]}...")
            return await self.process_with_groq(message)
        else:
            print(f"📋 Using rule-based system for message: {message[:50]}...")
            return await self.process_with_rules(message)
    
    async def process_with_groq(self, message):
        """Process message using Groq API with real inventory data"""
        try:
            # Get store statistics for context
            store_stats = await self.get_store_stats()
            
            # Enhanced context with real inventory data
            enhanced_prompt = f"""{SYSTEM_PROMPT}

📊 CURRENT STORE INVENTORY (Real-time data):
{store_stats}

Use this data to answer customer questions accurately!
"""
            
            # Call Groq API
            import asyncio
            response = await asyncio.to_thread(
                self.ai_client.chat.completions.create,
                messages=[
                    {"role": "system", "content": enhanced_prompt},
                    {"role": "user", "content": message}
                ],
                model=GROQ_MODEL,
                temperature=0.7,
                max_tokens=1024
            )
            
            ai_response = response.choices[0].message.content
            
            # Try to extract product filters from AI response or user message
            filters = self.extract_filters_from_ai_response(ai_response, message)
            
            if filters:
                # AI suggested product search
                products = await self.search_products(filters)
                
                if products:
                    # Calculate total stock for these products
                    total_stock = sum(p['stock'] for p in products)
                    return {
                        'type': 'products',
                        'message': f'{ai_response}\n\n✅ Found {len(products)} product(s) with {total_stock} total items in stock!',
                        'products': products
                    }
                else:
                    return {
                        'type': 'text',
                        'message': f'{ai_response}\n\nSorry, no products match those exact criteria. Try asking for different colors or categories!'
                    }
            else:
                # Just a conversation response
                return {
                    'type': 'text',
                    'message': ai_response
                }
                
        except Exception as e:
            print(f"Groq API Error: {e}")
            # Fallback to rule-based system
            return await self.process_with_rules(message)
    
    def extract_filters_from_ai_response(self, ai_response, user_message):
        """Extract product filters from AI response or user message"""
        filters = {}
        combined_text = (ai_response + " " + user_message).lower()
        
        # Category detection
        if 'hoodie' in combined_text:
            filters['category'] = 'hoodies'
        elif 'jacket' in combined_text:
            filters['category'] = 'jackets'
        elif 'shirt' in combined_text or 't-shirt' in combined_text:
            filters['category'] = 't-shirts'
        
        # Color detection
        colors = ['black', 'white', 'red', 'blue', 'green', 'pink', 'gray', 'grey', 'orange', 'navy', 'beige', 'purple']
        for color in colors:
            if color in combined_text:
                filters['color'] = color
                break
        
        # Price detection
        if any(word in combined_text for word in ['cheap', 'budget', 'affordable', 'inexpensive']):
            filters['max_price'] = 400
        elif any(word in combined_text for word in ['premium', 'expensive', 'luxury', 'high-end']):
            filters['min_price'] = 500
        elif 'mid' in combined_text or 'medium' in combined_text:
            filters['min_price'] = 400
            filters['max_price'] = 500
        
        return filters if filters else None
    
    async def process_with_rules(self, message):
        """Fallback rule-based processing when OpenAI is not available"""
        # Empty message check
        if not message or len(message.strip()) == 0:
            return {
                'type': 'text',
                'message': 'Please type a message to get started! 😊'
            }

        # Greeting intents
        greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening']
        if any(greeting in message for greeting in greetings):
            return {
                'type': 'text',
                'message': 'Hi there! 😊 Looking for hoodies, jackets, or shirts? I can help you find the perfect one!'
            }

        # Help intent
        if 'help' in message:
            return {
                'type': 'text',
                'message': 'I can help you find products! Try:\n• "Show me hoodies"\n• "I need a black jacket"\n• "Find cheap hoodies"\n• "Show me premium products"'
            }

        # Check if user is actually asking for products
        product_keywords = ['show', 'find', 'need', 'want', 'looking for', 'search', 'get me', 'i need', 'give me']
        is_product_request = any(keyword in message for keyword in product_keywords)
        
        if not is_product_request:
            return {
                'type': 'text',
                'message': 'I can help you find products from our RYYZ store! Try asking me to "show hoodies" or "find jackets".'
            }

        # Product search - only if user explicitly asks
        filters = self.extract_filters(message)
        
        # Only search if there are filters or generic request
        if filters or is_product_request:
            products = await self.search_products(filters)

            if products:
                return {
                    'type': 'products',
                    'message': f'I found {len(products)} product(s) for you! 🎉',
                    'products': products
                }
            else:
                return {
                    'type': 'text',
                    'message': 'Sorry, I couldn\'t find any products matching your criteria. Try different filters or ask me to "show hoodies" or "show jackets"!'
                }
        
        return {
            'type': 'text',
            'message': 'How can I help you today? Ask me to show you hoodies, jackets, or shirts! 😊'
        }

    @database_sync_to_async
    def get_store_stats(self):
        """Get real-time store statistics for AI context"""
        try:
            Product = apps.get_model('orders', 'Product')
            
            total_products = Product.objects.filter(is_active=True).count()
            total_stock = Product.objects.filter(is_active=True).aggregate(
                total=models.Sum('stock')
            )['total'] or 0
            
            # Category breakdown
            categories = Product.objects.filter(is_active=True).values('category').annotate(
                count=models.Count('id'),
                stock=models.Sum('stock')
            )
            
            stats = f"""Total Products: {total_products}
Total Items in Stock: {total_stock}

Category Breakdown:
"""
            
            for cat in categories:
                if cat['category']:
                    stats += f"- {cat['category'].title()}: {cat['count']} products, {cat['stock']} items\n"
            
            # Price ranges
            budget = Product.objects.filter(is_active=True, price__lt=400).count()
            mid = Product.objects.filter(is_active=True, price__gte=400, price__lt=500).count()
            premium = Product.objects.filter(is_active=True, price__gte=500).count()
            
            stats += f"\nPrice Ranges:\n- Budget (<400 LE): {budget} products\n- Mid-range (400-500 LE): {mid} products\n- Premium (500+ LE): {premium} products"
            
            return stats
            
        except Exception as e:
            print(f"Error getting store stats: {e}")
            return "Store inventory data temporarily unavailable."

    def extract_filters(self, message):
        filters = {}

        # Category detection
        if 'hoodie' in message or 'hoodies' in message:
            filters['category'] = 'hoodies'
        elif 'jacket' in message or 'jackets' in message:
            filters['category'] = 'jackets'

        # Color detection
        colors = ['black', 'white', 'red', 'blue', 'green', 'pink', 'gray', 'orange', 'navy', 'beige']
        for color in colors:
            if color in message:
                filters['color'] = color
                break

        # Price range detection
        if any(word in message for word in ['cheap', 'budget', 'affordable', 'low price']):
            filters['max_price'] = 400
        elif any(word in message for word in ['premium', 'expensive', 'high quality', 'luxury']):
            filters['min_price'] = 500
        elif 'mid' in message or 'medium' in message:
            filters['min_price'] = 400
            filters['max_price'] = 500

        # Stock filter
        if 'in stock' in message or 'available' in message:
            filters['in_stock'] = True

        return filters

    @database_sync_to_async
    def search_products(self, filters):
        try:
            Product = apps.get_model('orders', 'Product')
            queryset = Product.objects.filter(is_active=True)

            # Apply filters
            if 'category' in filters:
                queryset = queryset.filter(category__icontains=filters['category'])
            
            if 'color' in filters:
                queryset = queryset.filter(name__icontains=filters['color'])
            
            if 'max_price' in filters:
                queryset = queryset.filter(price__lte=filters['max_price'])
            
            if 'min_price' in filters:
                queryset = queryset.filter(price__gte=filters['min_price'])
            
            if filters.get('in_stock'):
                queryset = queryset.filter(stock__gt=0)

            # Limit results
            products = queryset[:10]

            # Format product data with image URLs and stock info
            product_list = []
            for product in products:
                # Extract image filename from description
                image_name = None
                if '| Image:' in product.description:
                    image_name = product.description.split('| Image: ')[1].strip()
                
                # Build frontend asset URL
                image_url = f'/src/assets/{image_name}' if image_name else None
                
                # Stock status
                stock_status = 'In Stock'
                if product.stock == 0:
                    stock_status = 'Out of Stock'
                elif product.stock < 5:
                    stock_status = f'Low Stock ({product.stock} left)'
                else:
                    stock_status = f'In Stock ({product.stock} available)'
                
                product_list.append({
                    'id': product.id,
                    'name': product.name,
                    'price': float(product.price),
                    'category': product.category,
                    'stock': product.stock,
                    'stock_status': stock_status,
                    'image': image_url,
                    'description': product.description.split('| Image:')[0].strip() if '| Image:' in product.description else product.description,
                })

            return product_list

        except Exception as e:
            print(f"Error searching products: {e}")
            return []
