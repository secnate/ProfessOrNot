import json

from .models import User
from django.urls import reverse

from rest_framework.test import APITestCase
from knox.models import AuthToken

# Test Registeration
class UserRegistrationTestCase(APITestCase):
    fixtures = ['dummy_schools']
    url = reverse("auth:register")

    def test_user_registration(self):
        user_data = {
            "name": "Test Example 1",
            "email": "test1@example.com",
            "school_id": 1,
            "password": "test1"
        }
        response = self.client.post(self.url, user_data)
        self.assertEqual(201, response.status_code)
        self.assertTrue("token" in json.loads(response.content))

# Test Login
class UserLoginTestCase(APITestCase):
    fixtures = ['dummy_schools','dummy_users']
    url = reverse("auth:login")

    def test_user_registration(self):
        login_data = {
            "email": "test@professornot.com",
            "password": "test"
        }
        response = self.client.post(self.url, login_data)
        self.assertEqual(200, response.status_code)
        self.assertTrue("token" in json.loads(response.content))

# Update User
class UserUpdateTestCase(APITestCase):
    fixtures = ['dummy_schools', 'dummy_users']
    url = reverse("auth:profile")

    def setUp(self):
        auth_token = AuthToken.objects.create(User.objects.get(pk=1))[1]
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth_token)

    def test_user_update(self):
        update_data = {
            "school_id": 2,
            "email": "newtest@professornot.com",
            "password": "newpass"
        }
        response = self.client.post(self.url, update_data)
        body = json.loads(response.content)
        self.assertEqual(200, response.status_code)
        self.assertEqual(2, body['school']['id'])
        self.assertEqual("newtest@professornot.com", body['email'])