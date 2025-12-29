import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from orders.models import Product

# Delete old products
Product.objects.all().delete()
print("Deleted old products")

# Real RYYZ store products with image names
products_data = [
    # Women's Products
    {'name': 'Pink Comfort Hoodie', 'category': 'hoodies', 'price': 420, 'stock': 35, 'image': 'women-hoodie.png', 'description': 'Soft and cozy hoodie in beautiful purple shade'},
    {'name': 'Classic White Shirt', 'category': 't-shirts', 'price': 280, 'stock': 50, 'image': 'women-white-shirt.png', 'description': 'Elegant white shirt perfect for any occasion'},
    {'name': 'Pink Essential Shirt', 'category': 't-shirts', 'price': 290, 'stock': 42, 'image': 'women-shirt-p.png', 'description': 'Beautiful purple shirt that adds color to your wardrobe'},
    {'name': 'Pink Casual Hoodie', 'category': 'hoodies', 'price': 260, 'stock': 38, 'image': 'women-pink-shirt1.png', 'description': 'Comfortable pink hoodie perfect for everyday wear'},
    {'name': 'Green Comfort Hoodie', 'category': 'hoodies', 'price': 450, 'stock': 25, 'image': 'women-GREEN-hoodie.png', 'description': 'Premium green hoodie with modern fit'},
    {'name': 'Trendy Black Hoodie', 'category': 'hoodies', 'price': 350, 'stock': 18, 'image': 'Black-hoodie2.png', 'description': 'Trendy black hoodie with unique style'},
    {'name': 'Stylish Denim Jacket', 'category': 'jackets', 'price': 550, 'stock': 12, 'image': 'women-jacket.png', 'description': 'Classic denim jacket with modern styling'},
    {'name': 'Beige Shirt', 'category': 't-shirts', 'price': 300, 'stock': 30, 'image': 'women-shirt-beige.png', 'description': 'Elegant beige shirt for casual wear'},
    {'name': 'Navy Shirt', 'category': 't-shirts', 'price': 295, 'stock': 28, 'image': 'women-shirt-navy.png', 'description': 'Classic navy shirt for smart casual look'},
    {'name': 'Black Essential Shirt', 'category': 't-shirts', 'price': 285, 'stock': 40, 'image': 'women-shirt-black.png', 'description': 'Essential black shirt for every wardrobe'},
    
    # Men's Products  
    {'name': 'Classic Black Hoodie', 'category': 'hoodies', 'price': 450, 'stock': 28, 'image': 'hoddie.png', 'description': 'Premium black hoodie with modern fit'},
    {'name': 'Premium Gray Hoodie', 'category': 'hoodies', 'price': 460, 'stock': 32, 'image': 'Black-hoodie2.png', 'description': 'Stylish gray hoodie with premium quality'},
    {'name': 'Urban Black Shirt', 'category': 't-shirts', 'price': 280, 'stock': 45, 'image': 'black-shirt.png', 'description': 'Essential black shirt for every wardrobe'},
    {'name': 'Stylish Red Jacket', 'category': 'jackets', 'price': 550, 'stock': 15, 'image': 'jacket-red.png', 'description': 'Classic red jacket with modern styling'},
    {'name': 'Orange Style Jacket', 'category': 'jackets', 'price': 580, 'stock': 20, 'image': 'jacket-O.png', 'description': 'Modern urban style jacket in vibrant orange'},
    {'name': 'Premium Winter Jacket', 'category': 'jackets', 'price': 650, 'stock': 18, 'image': 'jacket-W.png', 'description': 'Premium winter jacket for cold weather'},
    {'name': 'Navy Shirt', 'category': 't-shirts', 'price': 290, 'stock': 35, 'image': 'men-shirt-navey.png', 'description': 'Classic navy shirt for men'},
    {'name': 'Red Casual Shirt', 'category': 't-shirts', 'price': 295, 'stock': 30, 'image': 'men-shirt-red.png', 'description': 'Casual red shirt for everyday wear'},
    {'name': 'Real Madrid Shirt', 'category': 't-shirts', 'price': 420, 'stock': 22, 'image': 'men-shirt-realmadrid.png', 'description': 'Official Real Madrid style shirt'},
    {'name': 'Pink Hoodie', 'category': 'hoodies', 'price': 440, 'stock': 24, 'image': 'pinkHoodie.png', 'description': 'Stylish pink hoodie for bold fashion'},
]

print("\nAdding real RYYZ store products...")
for data in products_data:
    product = Product.objects.create(
        name=data['name'],
        category=data['category'],
        price=data['price'],
        stock=data['stock'],
        is_active=True,
        description=data['description']
    )
    # Store image filename in description for now (since we don't have actual file uploads)
    product.description = f"{data['description']} | Image: {data['image']}"
    product.save()
    print(f"✓ Created: {product.name} - {product.price} LE (Stock: {product.stock})")

print(f"\n✅ Total products added: {Product.objects.count()}")
print("\n📦 Sample products:")
for p in Product.objects.all()[:5]:
    print(f"  - {p.name} ({p.category}) - {p.price} LE - Stock: {p.stock}")
