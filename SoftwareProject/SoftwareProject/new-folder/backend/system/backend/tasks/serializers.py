# tasks/serializers.py
from rest_framework import serializers
from .models import Task
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

class TaskSerializer(serializers.ModelSerializer):
    assigned_to_details = UserSerializer(source='assigned_to', read_only=True)
    assigned_by_details = UserSerializer(source='assigned_by', read_only=True)
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'priority', 'status', 
            'completed', 'due_date', 'created_at', 'updated_at', 
            'completed_at', 'assigned_to', 'assigned_by',
            'assigned_to_details', 'assigned_by_details', 'image_url'
        ]
        read_only_fields = ['assigned_by', 'created_at', 'updated_at', 'completed_at']
    
    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None
    
    def create(self, validated_data):
        # Set assigned_by to the current user when creating
        validated_data['assigned_by'] = self.context['request'].user
        return super().create(validated_data)