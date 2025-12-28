# orders/serializers.py
from rest_framework import serializers
from .models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product_name', 'quantity', 'price', 'size', 'color', 'image_url']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'created_at', 'subtotal', 'shipping_cost', 
            'tax', 'total', 'payment_method', 'shipping_address', 'status',
            'customer_email', 'customer_name', 'customer_phone',
            'shipping_city', 'shipping_country', 'items', 'user_email'
        ]
        read_only_fields = ['order_number', 'created_at']