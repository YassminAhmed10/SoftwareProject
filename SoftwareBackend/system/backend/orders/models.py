# orders/models.py - UPDATED WITH DEFAULTS
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()
class Product(models.Model):
    """Product model for analytics and order tracking"""
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100, blank=True, default='')
    description = models.TextField(blank=True, default='')
    stock = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['name']
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
    
    def __str__(self):
        return self.name
    
    def get_image_url(self, request=None):
        """Get absolute URL for product image"""
        if self.image:
            try:
                if request:
                    return request.build_absolute_uri(self.image.url)
                else:
                    return self.image.url
            except:
                return None
        return None


class Order(models.Model):
    # Order status choices
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]
    
    # Payment method choices
    PAYMENT_METHOD_CHOICES = [
        ('card', 'Credit/Debit Card'),
        ('cod', 'Cash on Delivery'),
        ('bank_transfer', 'Bank Transfer'),
    ]
    
    # Order information
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    order_number = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(default=timezone.now)
    
    # Pricing
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    tax = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Payment and shipping
    payment_method = models.CharField(max_length=50, choices=PAYMENT_METHOD_CHOICES, default='cod')
    shipping_address = models.JSONField(default=dict)
    
    # Customer information with sensible defaults
    customer_email = models.EmailField(default='guest@example.com')
    customer_name = models.CharField(max_length=255, blank=True, default='')
    customer_phone = models.CharField(max_length=20, blank=True, default='')
    
    # Shipping details
    shipping_city = models.CharField(max_length=100, blank=True, default='')
    shipping_country = models.CharField(max_length=100, default='Egypt')
    
    # Order status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Timestamps
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'
    
    def __str__(self):
        return f"Order #{self.order_number} - {self.customer_email}"
    
    def save(self, *args, **kwargs):
        # Auto-calculate total if not set
        if not self.total:
            self.total = self.subtotal + self.shipping_cost + self.tax
        super().save(*args, **kwargs)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)  # Link to Product
    product_name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Product variations
    size = models.CharField(max_length=20, blank=True, default='')
    color = models.CharField(max_length=50, blank=True, default='')
    
    # Product image (fallback if product is deleted)
    image_url = models.URLField(blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Order Item'
        verbose_name_plural = 'Order Items'
    
    def __str__(self):
        return f"{self.product_name} x{self.quantity}"
    
    @property
    def total_price(self):
        return self.price * self.quantity
    
    def get_product_image(self, request=None):
        """Get product image URL - try product first, then fallback to stored URL"""
        # Try to get from linked product
        if self.product and self.product.image:
            return self.product.get_image_url(request)
        
        # Fallback to stored image_url
        if self.image_url:
            # If it's already an absolute URL, return it
            if self.image_url.startswith('http'):
                return self.image_url
            # If it's a relative URL, make it absolute
            elif request:
                return request.build_absolute_uri(self.image_url)
        
        return None
class Order(models.Model):
    # Order status choices
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]
    
    # Payment method choices
    PAYMENT_METHOD_CHOICES = [
        ('card', 'Credit/Debit Card'),
        ('cod', 'Cash on Delivery'),
        ('bank_transfer', 'Bank Transfer'),
    ]
    
    # Order information
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    order_number = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(default=timezone.now)
    
    # Pricing
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    tax = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Payment and shipping
    payment_method = models.CharField(max_length=50, choices=PAYMENT_METHOD_CHOICES, default='cod')
    shipping_address = models.JSONField(default=dict)
    
    # Customer information with sensible defaults
    customer_email = models.EmailField(default='guest@example.com')
    customer_name = models.CharField(max_length=255, blank=True, default='')
    customer_phone = models.CharField(max_length=20, blank=True, default='')
    
    # Shipping details
    shipping_city = models.CharField(max_length=100, blank=True, default='')
    shipping_country = models.CharField(max_length=100, default='Egypt')
    
    # Order status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Timestamps
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'
    
    def __str__(self):
        return f"Order #{self.order_number} - {self.customer_email}"
    
    def save(self, *args, **kwargs):
        # Auto-calculate total if not set
        if not self.total:
            self.total = self.subtotal + self.shipping_cost + self.tax
        super().save(*args, **kwargs)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product_name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Product variations
    size = models.CharField(max_length=20, blank=True, default='')
    color = models.CharField(max_length=50, blank=True, default='')
    
    # Product image
    image_url = models.URLField(blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Order Item'
        verbose_name_plural = 'Order Items'
    
    def __str__(self):
        return f"{self.product_name} x{self.quantity}"
    
    @property
    def total_price(self):
        return self.price * self.quantity