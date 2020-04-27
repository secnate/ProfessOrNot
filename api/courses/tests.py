import json

from .models import Course
from accounts.models import User
from django.urls import reverse

from rest_framework.test import APITestCase
from knox.models import AuthToken

# Create a course
class CreateCourseTestCase(APITestCase):
    fixtures = ['dummy_schools', 'dummy_users']
    url = reverse("courses:list-create")
    def setUp(self):
        auth_token = AuthToken.objects.create(User.objects.get(pk=1))[1]
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth_token)

    def test_course_create(self):
        new_course = {
            "name": "TEST101"
        }
        response = self.client.post(self.url, new_course, format='json')
        response.render()
        body = json.loads(response.content)
        self.assertEqual(201, response.status_code)
        self.assertEqual(1, body['school']['id'])
        self.assertEqual("TEST101", body['name'])

class GetCourseTestCase(APITestCase):
    fixtures = ['dummy_schools', 'dummy_users', 'dummy_courses']

    def setUp(self):
        auth_token = AuthToken.objects.create(User.objects.get(pk=1))[1]
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth_token)

    def test_course_create(self):
        response = self.client.get('/courses/1')
        self.assertEqual(200, response.status_code)