from rest_framework import serializers
from django.contrib.auth import get_user_model
import re

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True, min_length=8, label="Confirm Password")
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')
        extra_kwargs = {
            'username': {'required': True},
            'email': {'required': True}
        }
    
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        
        if len(value) < 3:
            raise serializers.ValidationError("Username must be at least 3 characters long.")
        
        if not value.replace('_', '').isalnum():
            raise serializers.ValidationError("Username can only contain letters, numbers, and underscores.")
        
        return value
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already registered.")
        
        # Check if trying to register as employee
        if value.endswith('@employee.com'):
            # Check if user is staff/admin trying to create employee
            request = self.context.get('request')
            if request and not (request.user.is_staff or request.user.is_superuser):
                raise serializers.ValidationError("Employee registration requires admin approval.")
        
        return value
    
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password2": "Passwords do not match."})
        return data
    
    def create(self, validated_data):
        validated_data.pop('password2')
        
        email = validated_data['email']
        is_employee = email.endswith('@employee.com')
        
        # Create user
        user = User.objects.create_user(
            username=validated_data['username'],
            email=email,
            password=validated_data['password']
        )
        
        # Set as staff if employee email
        if is_employee:
            user.is_staff = True
            user.save()
            print(f"✅ Employee account created: {user.username} ({user.email})")
        else:
            print(f"✅ Regular user account created: {user.username} ({user.email})")
        
        return user


class EmployeeCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, required=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name')
        extra_kwargs = {
            'username': {'required': True},
            'email': {'required': True},
            'password': {'required': True}
        }
    
    def validate_email(self, value):
        if not value.endswith('@employee.com'):
            raise serializers.ValidationError("Employee email must end with @employee.com")
        
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already registered.")
        return value
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=password,
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        
        # Set as staff/employee
        user.is_staff = True
        user.save()
        
        return user


class UserSerializer(serializers.ModelSerializer):
    is_employee = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'full_name', 
                  'is_staff', 'is_employee', 'date_joined')
        read_only_fields = ('id', 'date_joined')
    
    def get_is_employee(self, obj):
        return obj.email.endswith('@employee.com') or obj.is_staff
    
    def get_full_name(self, obj):
        if obj.first_name and obj.last_name:
            return f"{obj.first_name} {obj.last_name}"
        return obj.username


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=False, allow_blank=True)
    email = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        username = data.get('username')
        email = data.get('email')
        
        if not username and not email:
            raise serializers.ValidationError("Must provide either username or email.")
        
        return data