"""
Unit Tests for User Authentication Models
Tests user creation, validation, and model methods
"""

from django.test import TestCase
from django.contrib.auth import get_user_model

User = get_user_model()


class UserModelTests(TestCase):
    """Test suite for User model"""

    def setUp(self):
        """Set up test data"""
        self.user_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'testpass123'
        }

    # ========== USER CREATION TESTS ==========
    def test_create_user_success(self):
        """Test creating a new user with valid data"""
        user = User.objects.create_user(**self.user_data)
        
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.email, 'test@example.com')
        self.assertTrue(user.check_password('testpass123'))
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_superuser_success(self):
        """Test creating a superuser"""
        admin = User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='adminpass123'
        )
        
        self.assertEqual(admin.username, 'admin')
        self.assertTrue(admin.is_active)
        self.assertTrue(admin.is_staff)
        self.assertTrue(admin.is_superuser)

    def test_user_string_representation(self):
        """Test user model string representation"""
        user = User.objects.create_user(**self.user_data)
        self.assertEqual(str(user), 'testuser')

    # ========== VALIDATION TESTS ==========
    def test_create_user_without_username_fails(self):
        """Test creating user without username raises error"""
        with self.assertRaises(TypeError):
            User.objects.create_user(
                email='test@example.com',
                password='testpass123'
            )

    def test_create_user_without_email(self):
        """Test creating user without email"""
        user = User.objects.create_user(
            username='testuser2',
            email='',
            password='testpass123'
        )
        self.assertEqual(user.email, '')

    def test_email_normalization(self):
        """Test email is normalized on user creation"""
        email = 'test@EXAMPLE.COM'
        user = User.objects.create_user(
            username='testuser',
            email=email,
            password='testpass123'
        )
        self.assertEqual(user.email, email.lower())

    # ========== PASSWORD TESTS ==========
    def test_password_is_hashed(self):
        """Test that password is hashed and not stored in plain text"""
        user = User.objects.create_user(**self.user_data)
        self.assertNotEqual(user.password, 'testpass123')
        self.assertTrue(user.password.startswith('pbkdf2_sha256'))

    def test_check_password_correct(self):
        """Test check_password returns True for correct password"""
        user = User.objects.create_user(**self.user_data)
        self.assertTrue(user.check_password('testpass123'))

    def test_check_password_incorrect(self):
        """Test check_password returns False for incorrect password"""
        user = User.objects.create_user(**self.user_data)
        self.assertFalse(user.check_password('wrongpassword'))

    def test_set_password_method(self):
        """Test set_password method updates password correctly"""
        user = User.objects.create_user(**self.user_data)
        user.set_password('newpassword123')
        user.save()
        
        self.assertTrue(user.check_password('newpassword123'))
        self.assertFalse(user.check_password('testpass123'))

    # ========== DUPLICATE USER TESTS ==========
    def test_duplicate_username_fails(self):
        """Test creating user with duplicate username fails"""
        User.objects.create_user(**self.user_data)
        
        from django.db import IntegrityError
        with self.assertRaises(IntegrityError):
            User.objects.create_user(**self.user_data)

    # ========== USER PERMISSIONS TESTS ==========
    def test_user_has_no_permissions_by_default(self):
        """Test newly created user has no special permissions"""
        user = User.objects.create_user(**self.user_data)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_superuser_has_all_permissions(self):
        """Test superuser has all permissions"""
        admin = User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='adminpass123'
        )
        self.assertTrue(admin.has_perm('any_permission'))
        self.assertTrue(admin.has_module_perms('any_app'))

    # ========== USER QUERY TESTS ==========
    def test_get_user_by_username(self):
        """Test retrieving user by username"""
        User.objects.create_user(**self.user_data)
        user = User.objects.get(username='testuser')
        self.assertEqual(user.email, 'test@example.com')

    def test_get_user_by_email(self):
        """Test retrieving user by email"""
        User.objects.create_user(**self.user_data)
        user = User.objects.get(email='test@example.com')
        self.assertEqual(user.username, 'testuser')

    def test_filter_active_users(self):
        """Test filtering only active users"""
        User.objects.create_user(**self.user_data)
        User.objects.create_user(
            username='inactive',
            email='inactive@example.com',
            password='pass123',
            is_active=False
        )
        
        active_users = User.objects.filter(is_active=True)
        self.assertEqual(active_users.count(), 1)
        self.assertEqual(active_users.first().username, 'testuser')

    # ========== USER UPDATE TESTS ==========
    def test_update_user_email(self):
        """Test updating user email"""
        user = User.objects.create_user(**self.user_data)
        user.email = 'newemail@example.com'
        user.save()
        
        updated_user = User.objects.get(username='testuser')
        self.assertEqual(updated_user.email, 'newemail@example.com')

    def test_deactivate_user(self):
        """Test deactivating a user"""
        user = User.objects.create_user(**self.user_data)
        self.assertTrue(user.is_active)
        
        user.is_active = False
        user.save()
        
        updated_user = User.objects.get(username='testuser')
        self.assertFalse(updated_user.is_active)

    # ========== USER DELETION TESTS ==========
    def test_delete_user(self):
        """Test deleting a user"""
        user = User.objects.create_user(**self.user_data)
        user_id = user.id
        user.delete()
        
        with self.assertRaises(User.DoesNotExist):
            User.objects.get(id=user_id)

    def test_user_count_after_creation(self):
        """Test user count increases after creation"""
        initial_count = User.objects.count()
        User.objects.create_user(**self.user_data)
        self.assertEqual(User.objects.count(), initial_count + 1)
