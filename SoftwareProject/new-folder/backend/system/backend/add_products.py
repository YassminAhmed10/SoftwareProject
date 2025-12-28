import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from orders.models import Product

# Create sample products
products_data = [
    {'name': 'Classic Black Hoodie', 'category': 'hoodies', 'price': 450, 'stock': 20},
    {'name': 'Navy Blue Hoodie', 'category': 'hoodies', 'price': 420, 'stock': 15},
    {'name': 'Pink Hoodie', 'category': 'hoodies', 'price': 480, 'stock': 10},
    {'name': 'White Hoodie', 'category': 'hoodies', 'price': 400, 'stock': 25},
    {'name': 'Gray Hoodie', 'category': 'hoodies', 'price': 430, 'stock': 18},
    {'name': 'Black Jacket', 'category': 'jackets', 'price': 550, 'stock': 12},
    {'name': 'Red Jacket', 'category': 'jackets', 'price': 520, 'stock': 14},
    {'name': 'Navy Jacket', 'category': 'jackets', 'price': 580, 'stock': 8},
    {'name': 'Orange Jacket', 'category': 'jackets', 'price': 500, 'stock': 10},
    {'name': 'Beige Jacket', 'category': 'jackets', 'price': 490, 'stock': 16},
]

print("Adding products to database...")
for data in products_data:
    product, created = Product.objects.get_or_create(
        name=data['name'],
        defaults={
            'category': data['category'],
            'price': data['price'],
            'stock': data['stock'],
            'is_active': True,
            'description': f"High quality {data['name'].lower()}"
        }
    )
    if created:
        print(f"✓ Created: {product.name}")
    else:
        print(f"- Already exists: {product.name}")

print(f"\nTotal products in database: {Product.objects.count()}")
print("\nSample products:")
for p in Product.objects.all()[:5]:
    print(f"  - {p.name} ({p.category}) - {p.price} LE - Stock: {p.stock}")
