# 🤖 AI-Powered Chatbot Setup Guide

## Overview
This guide will help you set up the OpenAI-powered chatbot for your RYYZ store. The chatbot can:
- Answer customer support questions intelligently
- Recommend products based on customer needs
- Show product images and details
- Handle queries like "perfect item for going to drink coffee outside"
- Provide information about shipping, returns, sizing, and more

## Prerequisites
- Python 3.8+
- Django project running
- OpenAI API account
- Redis server (for WebSocket channels)

---

## 🚀 Quick Start (5 Steps)

### Step 1: Get Your OpenAI API Key

1. Go to [https://platform.openai.com/signup](https://platform.openai.com/signup)
2. Create an account or log in
3. Navigate to API Keys: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. **Copy and save your API key** (you won't see it again!)

**💰 Cost Consideration:**
- We're using `gpt-4o-mini` model (most cost-effective)
- Approximate cost: $0.15 per 1M input tokens, $0.60 per 1M output tokens
- Average chatbot conversation: ~$0.001-0.005 per conversation
- For 1000 conversations/month: ~$1-5/month

### Step 2: Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

This installs:
- `openai==1.58.1` - OpenAI Python SDK
- `python-dotenv==1.0.0` - Environment variable management
- Plus existing Django and Channels dependencies

### Step 3: Configure Environment Variables

1. **Create `.env` file** in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

2. **Edit `.env` file** and add your OpenAI API key:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx  # Paste your actual key here
OPENAI_MODEL=gpt-4o-mini  # Most cost-effective option
```

### Step 4: Start Redis (for WebSocket)

**Windows:**
```powershell
# Download Redis from: https://github.com/microsoftarchive/redis/releases
# Or use WSL/Docker
docker run -d -p 6379:6379 redis:latest
```

**Mac/Linux:**
```bash
# Install Redis
brew install redis  # Mac
sudo apt-get install redis-server  # Ubuntu/Debian

# Start Redis
redis-server
```

### Step 5: Run the Application

```bash
# Terminal 1: Start Django backend
cd backend
python manage.py runserver

# Terminal 2: Start Channels (WebSocket) server
cd backend
daphne -p 8001 config.asgi:application

# Terminal 3: Start React frontend
cd frontend
npm run dev
```

---

## 📚 How It Works

### Architecture

```
Customer asks question
        ↓
Frontend (React) → WebSocket → Backend Consumer
        ↓
OpenAI GPT processes query
        ↓
Knowledge Base provides context
        ↓
Product Recommender finds matching products
        ↓
Response with text + product images sent back
```

### Knowledge Base System

The chatbot has built-in knowledge about:
- ✅ Store policies (shipping, returns, payment)
- ✅ Product information (hoodies, jackets)
- ✅ Sizing guides
- ✅ Care instructions
- ✅ FAQs
- ✅ Occasion-based recommendations

**Location:** `backend/chatbot/knowledge_base.py`

You can customize this file to add:
- More store policies
- Seasonal information
- Promotions and discounts
- New product categories

### Product Recommendation System

The AI extracts customer intent and matches it with products:

**Example Query:** "I need something perfect for drinking coffee outside"

**AI Processing:**
1. Extracts: `occasion=coffee`, `category=hoodie/jacket`, `style=casual`
2. Searches database for matching products
3. Returns top 6 matches with images
4. Explains why each product fits the request

**Location:** `backend/chatbot/product_recommender.py`

---

## 🎨 Customization Guide

### 1. Update Store Knowledge

Edit `backend/chatbot/knowledge_base.py`:

```python
self.knowledge = {
    "store_info": {
        "name": "Your Store Name",
        "description": "Your description",
        # ... customize
    },
    "shipping": {
        "policy": "Your shipping policy",
        # ... customize
    },
    # Add new sections
    "promotions": {
        "current": "20% off winter collection",
        "code": "WINTER20"
    }
}
```

### 2. Adjust AI Personality

Edit `backend/chatbot/consumers.py`, modify the system prompt:

```python
def build_system_prompt(self, knowledge_context):
    return f"""You are a [friendly/professional/casual] assistant for [Store Name].

YOUR PERSONALITY:
- [Describe desired tone: helpful, enthusiastic, professional, etc.]
- [Use emojis: yes/no]
- [Response length: brief/detailed]

...
"""
```

### 3. Change AI Model (Cost vs Performance)

In `.env` file:

```env
# Options (from cheapest to most powerful):
OPENAI_MODEL=gpt-4o-mini       # $0.15/$0.60 per 1M tokens (recommended)
OPENAI_MODEL=gpt-4o            # $2.50/$10.00 per 1M tokens (better quality)
OPENAI_MODEL=gpt-4-turbo       # $10.00/$30.00 per 1M tokens (best quality)
```

### 4. Add New Product Categories

Edit `backend/chatbot/product_recommender.py`:

```python
# Add new category filtering
if 'accessories' in category.lower():
    queryset = queryset.filter(
        Q(category__icontains='accessories') |
        Q(category__icontains='bags')
    )
```

---

## 💡 Advanced Features

### 1. Conversation Memory

The chatbot remembers the last 10 messages in a conversation:

```python
# In consumers.py
messages = [
    {'role': 'system', 'content': system_prompt},
    *self.conversation_history[-10:]  # Last 10 messages
]
```

To increase memory, change `-10` to `-20` or more (increases API costs).

### 2. Product Scoring & Ranking

Implement smart product ranking in `product_recommender.py`:

```python
def score_product_match(self, product, criteria):
    """
    Score how well a product matches criteria
    Higher score = better match
    """
    score = 0
    # Add your scoring logic
    return score
```

### 3. Image Optimization

For faster loading, resize product images:

```python
# In your Product model
from PIL import Image

def save(self, *args, **kwargs):
    super().save(*args, **kwargs)
    if self.image:
        img = Image.open(self.image.path)
        if img.height > 800 or img.width > 800:
            output_size = (800, 800)
            img.thumbnail(output_size)
            img.save(self.image.path)
```

---

## 🔧 Optimization Tips

### Economic Optimization

1. **Use gpt-4o-mini** (cheapest, still very good)
2. **Limit conversation history** to last 5-10 messages
3. **Cache common responses** for FAQs
4. **Set max_tokens** to control response length

```python
completion = await self.client.chat.completions.create(
    model='gpt-4o-mini',  # Cheapest option
    messages=messages,
    temperature=0.7,
    max_tokens=300  # Shorter responses = lower cost
)
```

### Technical Optimization

1. **Database Indexing**
```python
# In models.py
class Product(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    category = models.CharField(max_length=100, db_index=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, db_index=True)
```

2. **Caching Frequent Queries**
```python
from django.core.cache import cache

# Cache product data for 1 hour
products = cache.get('featured_products')
if not products:
    products = Product.objects.filter(featured=True)
    cache.set('featured_products', products, 3600)
```

3. **Async Database Queries**
Already implemented using `@database_sync_to_async`

---

## 🌐 Web Integration

### Your chatbot is ALREADY on your webpage!

It's integrated in the React frontend at:
- `frontend/src/components/Chatbot/Chatbot.jsx`
- Appears on all customer pages (not admin/employee)
- Fixed position: bottom-right corner

### To embed on other websites:

1. **Build standalone widget:**
```bash
cd frontend
npm run build
```

2. **Host the built files** on your server

3. **Embed in any website:**
```html
<script src="https://yoursite.com/chatbot-widget.js"></script>
<div id="ryyz-chatbot"></div>
```

---

## 🧪 Testing the Chatbot

### Test Scenarios

1. **Product Recommendation:**
   - "Show me hoodies"
   - "I need something perfect for drinking coffee outside"
   - "What's good for cold weather?"

2. **Customer Support:**
   - "What's your return policy?"
   - "How long does shipping take?"
   - "Do you accept COD?"

3. **Specific Queries:**
   - "Show me black jackets under 500 LE"
   - "I need a gift for my friend"
   - "What sizes do you have?"

### Monitor API Usage

Check your OpenAI usage at:
[https://platform.openai.com/usage](https://platform.openai.com/usage)

Set up billing alerts to avoid surprises!

---

## 🆘 Troubleshooting

### Chatbot not connecting?

1. Check Redis is running: `redis-cli ping` (should return PONG)
2. Verify WebSocket server on port 8001: `daphne -p 8001 config.asgi:application`
3. Check browser console for WebSocket errors

### OpenAI API errors?

1. Verify API key in `.env` file
2. Check you have billing set up: [https://platform.openai.com/account/billing](https://platform.openai.com/account/billing)
3. Ensure you're not hitting rate limits

### Products not showing?

1. Verify products exist in database
2. Check products have stock > 0
3. Ensure product images are uploaded properly

---

## 📈 Next Steps

1. **Add Vector Search** (Advanced):
   - Use OpenAI embeddings for semantic product search
   - Store embeddings in vector database (Pinecone, Weaviate)
   - Better product matching

2. **Analytics**:
   - Track popular queries
   - Monitor chatbot effectiveness
   - A/B test different prompts

3. **Multilingual Support**:
   - Add Arabic language support
   - Detect user language automatically

4. **Voice Input**:
   - Integrate speech-to-text
   - Voice product search

---

## 💰 Cost Estimates

### Monthly Cost Scenarios

**Small Store (100 conversations/month):**
- Model: gpt-4o-mini
- Avg tokens per conversation: 2000
- Cost: ~$0.50/month

**Medium Store (1,000 conversations/month):**
- Model: gpt-4o-mini
- Cost: ~$3-5/month

**Large Store (10,000 conversations/month):**
- Model: gpt-4o-mini
- Cost: ~$30-50/month

**Pro tip:** Start with gpt-4o-mini, monitor quality, upgrade only if needed.

---

## 🎓 Learning Resources

### OpenAI Docs:
- [Chat Completions API](https://platform.openai.com/docs/guides/chat)
- [Prompt Engineering](https://platform.openai.com/docs/guides/prompt-engineering)
- [Best Practices](https://platform.openai.com/docs/guides/production-best-practices)

### Django Channels:
- [Official Docs](https://channels.readthedocs.io/)
- [WebSocket Tutorial](https://channels.readthedocs.io/en/stable/tutorial/)

---

## ✅ Checklist

Before going live:

- [ ] OpenAI API key added to `.env`
- [ ] Billing set up in OpenAI account
- [ ] Usage alerts configured
- [ ] Knowledge base customized for your store
- [ ] Product database populated with images
- [ ] Redis server running
- [ ] WebSocket server tested
- [ ] Frontend chatbot widget tested
- [ ] Mobile responsiveness checked
- [ ] Error handling tested

---

## 📞 Support

For issues or questions:
1. Check [backend/chatbot/](backend/chatbot/) files for implementation
2. Review error logs in console
3. Test with simple queries first
4. Ensure all services are running (Django, Channels, Redis, Frontend)

**Happy chatbot building! 🚀**
