from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()


class RegisterViewTests(APITestCase):
    """Test cases for user registration (signup)"""
    
    def test_register_success(self):
        """Test successful user registration"""
        url = reverse('signup')
        
        data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'SecurePass123!',
            'first_name': 'New',
            'last_name': 'User'
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], 'Account created successfully!')
        self.assertIn('user', response.data)
        self.assertIn('tokens', response.data)
        self.assertIn('access', response.data['tokens'])
        self.assertIn('refresh', response.data['tokens'])
        self.assertTrue(User.objects.filter(username='newuser').exists())
    
    def test_register_missing_username(self):
        """Test registration without username"""
        url = reverse('signup')
        
        data = {
            'email': 'test@example.com',
            'password': 'TestPass123!',
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_register_missing_email(self):
        """Test registration without email"""
        url = reverse('signup')
        
        data = {
            'username': 'testuser',
            'password': 'TestPass123!',
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_register_missing_password(self):
        """Test registration without password"""
        url = reverse('signup')
        
        data = {
            'username': 'testuser',
            'email': 'test@example.com',
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_register_duplicate_username(self):
        """Test registration with existing username"""
        # Create a user first
        User.objects.create_user(
            username='existinguser',
            email='existing@example.com',
            password='ExistingPass123!'
        )
        
        url = reverse('signup')
        
        data = {
            'username': 'existinguser',  # Duplicate username
            'email': 'different@example.com',
            'password': 'NewPass123!',
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_register_duplicate_email(self):
        """Test registration with existing email"""
        # Create a user first
        User.objects.create_user(
            username='user1',
            email='duplicate@example.com',
            password='Pass123!'
        )
        
        url = reverse('signup')
        
        data = {
            'username': 'user2',
            'email': 'duplicate@example.com',  # Duplicate email
            'password': 'Pass123!',
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_register_invalid_email(self):
        """Test registration with invalid email format"""
        url = reverse('signup')
        
        data = {
            'username': 'testuser',
            'email': 'not-an-email',  # Invalid email
            'password': 'TestPass123!',
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class LoginViewTests(APITestCase):
    """Test cases for user login"""
    
    def setUp(self):
        """Create a test user for login tests"""
        self.user = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='TestPass123!'
        )
    
    def test_login_with_username_success(self):
        """Test successful login using username"""
        url = reverse('login')
        
        data = {
            'username': 'testuser',
            'password': 'TestPass123!'
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], 'Login successful!')
        self.assertIn('user', response.data)
        self.assertIn('tokens', response.data)
        self.assertIn('access', response.data['tokens'])
        self.assertIn('refresh', response.data['tokens'])
    
    def test_login_with_email_success(self):
        """Test successful login using email"""
        url = reverse('login')
        
        data = {
            'email': 'testuser@example.com',
            'password': 'TestPass123!'
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], 'Login successful!')
        self.assertIn('tokens', response.data)
    
    def test_login_wrong_password(self):
        """Test login with incorrect password"""
        url = reverse('login')
        
        data = {
            'username': 'testuser',
            'password': 'WrongPassword123!'
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Invalid credentials')
    
    def test_login_nonexistent_username(self):
        """Test login with username that doesn't exist"""
        url = reverse('login')
        
        data = {
            'username': 'nonexistentuser',
            'password': 'SomePass123!'
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Invalid credentials')
    
    def test_login_nonexistent_email(self):
        """Test login with email that doesn't exist"""
        url = reverse('login')
        
        data = {
            'email': 'nonexistent@example.com',
            'password': 'SomePass123!'
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('error', response.data)
    
    def test_login_missing_password(self):
        """Test login without password"""
        url = reverse('login')
        
        data = {
            'username': 'testuser',
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_login_no_username_or_email(self):
        """Test login without username or email"""
        url = reverse('login')
        
        data = {
            'password': 'TestPass123!'
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Provide username or email')
    
    def test_login_empty_credentials(self):
        """Test login with empty credentials"""
        url = reverse('login')
        
        data = {
            'username': '',
            'password': ''
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UserProfileViewTests(APITestCase):
    """Test cases for user profile endpoint"""
    
    def setUp(self):
        """Create a test user"""
        self.user = User.objects.create_user(
            username='profileuser',
            email='profile@example.com',
            password='ProfilePass123!'
        )
    
    def test_profile_authenticated(self):
        """Test profile access when authenticated"""
        url = reverse('profile')
        
        # Authenticate the user
        self.client.force_authenticate(user=self.user)
        
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('username', response.data)
        self.assertEqual(response.data['username'], 'profileuser')
    
    def test_profile_unauthenticated(self):
        """Test profile access when not authenticated"""
        url = reverse('profile')
        
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class PingViewTests(APITestCase):
    """Test cases for ping endpoint"""
    
    def test_ping_endpoint(self):
        """Test ping endpoint returns correct response"""
        url = reverse('ping')
        
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('status', response.data)
        self.assertEqual(response.data['status'], 'ok')
        self.assertIn('api', response.data)
        self.assertEqual(response.data['api'], 'accounts')
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], 'pong')