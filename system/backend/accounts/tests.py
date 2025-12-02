from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()


class AuthViewTests(APITestCase):
    """Test views that use the serializers"""
    
    def test_register_view(self):
        """Test the registration endpoint"""
        url = reverse('register')  # Update with your actual URL name
        
        data = {
            'username': 'viewtestuser',
            'email': 'viewtest@example.com',
            'password': 'ViewTestPass123!',
            'first_name': 'View',
            'last_name': 'Test'
        }
        
        response = self.client.post(url, data, format='json')
        
        # Adjust based on your view's response
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Verify user was created
        self.assertTrue(User.objects.filter(username='viewtestuser').exists())
        
        # Verify password is not in response
        self.assertNotIn('password', response.data)
    
    def test_login_view(self):
        """Test the login endpoint"""
        # First create a user
        user = User.objects.create_user(
            username='logintest',
            email='logintest@example.com',
            password='LoginTestPass123!'
        )
        
        url = reverse('login')  # Update with your actual URL name
        
        # Test login with username
        data = {
            'username': 'logintest',
            'password': 'LoginTestPass123!'
        }
        
        response = self.client.post(url, data, format='json')
        
        # Adjust based on your view's expected response
        self.assertEqual(response.status_code, status.HTTP_200_OK)
