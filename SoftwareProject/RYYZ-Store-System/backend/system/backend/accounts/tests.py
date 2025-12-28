from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

User = get_user_model()


class AccountsAuthTests(APITestCase):
	def setUp(self):
		self.signup_url = reverse('signup')
		self.login_url = reverse('login')
		self.profile_url = reverse('profile')

	def test_signup_creates_user_and_returns_tokens(self):
		payload = {
			'username': 'testuser',
			'email': 'testuser@example.com',
			'password': 'strongpass123',
			'first_name': 'Test',
			'last_name': 'User'
		}

		resp = self.client.post(self.signup_url, payload, format='json')
		self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
		self.assertIn('tokens', resp.data)
		self.assertIn('access', resp.data['tokens'])
		self.assertIn('refresh', resp.data['tokens'])
		self.assertIn('user', resp.data)
		self.assertEqual(resp.data['user']['email'], payload['email'])

		# user actually created in DB
		self.assertTrue(User.objects.filter(email=payload['email']).exists())

	def test_login_with_email_and_username(self):
		# create user directly
		user = User.objects.create_user(username='alice', email='alice@example.com', password='alicepass')

		# login with email
		resp_email = self.client.post(self.login_url, {'email': user.email, 'password': 'alicepass'}, format='json')
		self.assertEqual(resp_email.status_code, status.HTTP_200_OK)
		self.assertIn('tokens', resp_email.data)

		# login with username
		resp_un = self.client.post(self.login_url, {'username': user.username, 'password': 'alicepass'}, format='json')
		self.assertEqual(resp_un.status_code, status.HTTP_200_OK)
		self.assertIn('tokens', resp_un.data)

	def test_login_invalid_credentials(self):
		# no such user
		resp = self.client.post(self.login_url, {'email': 'noone@example.com', 'password': 'bad'}, format='json')
		self.assertIn(resp.status_code, (status.HTTP_400_BAD_REQUEST, status.HTTP_401_UNAUTHORIZED))

	def test_profile_requires_auth_and_returns_user(self):
		user = User.objects.create_user(username='bob', email='bob@example.com', password='bobpass')

		# unauthenticated should be denied
		resp = self.client.get(self.profile_url)
		self.assertIn(resp.status_code, (status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN))

		# obtain token via login
		login_resp = self.client.post(self.login_url, {'username': user.username, 'password': 'bobpass'}, format='json')
		self.assertEqual(login_resp.status_code, status.HTTP_200_OK)
		access = login_resp.data['tokens']['access']

		# set auth header and request profile
		self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
		prof = self.client.get(self.profile_url)
		self.assertEqual(prof.status_code, status.HTTP_200_OK)
		self.assertEqual(prof.data['email'], user.email)

