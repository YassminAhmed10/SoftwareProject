"""
Unit Tests for Authentication API Views
Tests login, registration, and token authentication endpoints
"""

from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()


class AuthenticationAPITests(TestCase):
    """Test suite for authentication API endpoints"""

    def setUp(self):
        """Set up test client and test data"""
        self.client = APIClient()
        self.user_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'testpass123'
        }
        self.user = User.objects.create_user(**self.user_data)

    # ========== REGISTRATION TESTS ==========
    def test_register_user_success(self):
        """Test successful user registration"""
        url = reverse('register')  # Update with your actual URL name
        data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'newpass123',
            'password2': 'newpass123'
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='newuser').exists())

    def test_register_user_duplicate_username(self):
        """Test registration with duplicate username fails"""
        url = reverse('register')
        data = {
            'username': 'testuser',  # Already exists
            'email': 'another@example.com',
            'password': 'newpass123',
            'password2': 'newpass123'
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_user_password_mismatch(self):
        """Test registration with mismatched passwords fails"""
        url = reverse('register')
        data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'password123',
            'password2': 'different123'
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_user_weak_password(self):
        """Test registration with weak password fails"""
        url = reverse('register')
        data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': '123',  # Too short
            'password2': '123'
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # ========== LOGIN TESTS ==========
    def test_login_success(self):
        """Test successful login with correct credentials"""
        url = reverse('login')  # Update with your actual URL name
        data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_login_incorrect_password(self):
        """Test login fails with incorrect password"""
        url = reverse('login')
        data = {
            'username': 'testuser',
            'password': 'wrongpassword'
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_nonexistent_user(self):
        """Test login fails with non-existent username"""
        url = reverse('login')
        data = {
            'username': 'nonexistent',
            'password': 'password123'
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_empty_credentials(self):
        """Test login fails with empty credentials"""
        url = reverse('login')
        data = {
            'username': '',
            'password': ''
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # ========== JWT TOKEN TESTS ==========
    def test_token_refresh_success(self):
        """Test JWT token refresh works correctly"""
        # First login to get tokens
        login_url = reverse('login')
        login_data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        login_response = self.client.post(login_url, login_data, format='json')
        refresh_token = login_response.data['refresh']
        
        # Try to refresh
        refresh_url = reverse('token_refresh')  # Update with actual URL
        refresh_data = {'refresh': refresh_token}
        
        response = self.client.post(refresh_url, refresh_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_token_refresh_invalid_token(self):
        """Test token refresh fails with invalid token"""
        url = reverse('token_refresh')
        data = {'refresh': 'invalid_token'}
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # ========== PROTECTED ENDPOINT TESTS ==========
    def test_access_protected_endpoint_without_auth(self):
        """Test accessing protected endpoint without authentication fails"""
        url = reverse('protected_endpoint')  # Update with actual URL
        
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_access_protected_endpoint_with_valid_token(self):
        """Test accessing protected endpoint with valid token succeeds"""
        # Login to get token
        login_url = reverse('login')
        login_data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        login_response = self.client.post(login_url, login_data, format='json')
        access_token = login_response.data['access']
        
        # Access protected endpoint
        url = reverse('protected_endpoint')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # ========== LOGOUT TESTS ==========
    def test_logout_success(self):
        """Test successful logout"""
        # Login first
        login_url = reverse('login')
        login_data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        login_response = self.client.post(login_url, login_data, format='json')
        access_token = login_response.data['access']
        
        # Logout
        logout_url = reverse('logout')  # Update with actual URL
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        
        response = self.client.post(logout_url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # ========== USER PROFILE TESTS ==========
    def test_get_user_profile_authenticated(self):
        """Test authenticated user can retrieve their profile"""
        # Login
        login_url = reverse('login')
        login_data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        login_response = self.client.post(login_url, login_data, format='json')
        access_token = login_response.data['access']
        
        # Get profile
        profile_url = reverse('user_profile')  # Update with actual URL
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        
        response = self.client.get(profile_url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], 'testuser')
        self.assertEqual(response.data['email'], 'test@example.com')

    def test_update_user_profile(self):
        """Test authenticated user can update their profile"""
        # Login
        login_url = reverse('login')
        login_data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        login_response = self.client.post(login_url, login_data, format='json')
        access_token = login_response.data['access']
        
        # Update profile
        profile_url = reverse('user_profile')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        update_data = {'email': 'updated@example.com'}
        
        response = self.client.patch(profile_url, update_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'updated@example.com')

    # ========== CORS & SECURITY TESTS ==========
    def test_cors_headers_present(self):
        """Test CORS headers are present in response"""
        url = reverse('login')
        
        response = self.client.options(url)
        
        self.assertIn('Access-Control-Allow-Origin', response.headers)

    def test_password_not_returned_in_response(self):
        """Test password is not included in API responses"""
        login_url = reverse('login')
        login_data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        
        response = self.client.post(login_url, login_data, format='json')
        
        self.assertNotIn('password', response.data)
