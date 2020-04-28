import json

from django.urls import reverse

from accounts.models import User
from rest_framework.test import APITestCase
from knox.models import AuthToken


class CreateReviewTestCase(APITestCase):
    fixtures = ['dummy_schools', 'dummy_users', 'dummy_quizresponses', 'dummy_professors', 'dummy_courses']
    url = reverse("reviews:list-create")
    def setUp(self):
        auth_token = AuthToken.objects.create(User.objects.get(pk=1))[1]
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth_token)

    def test_review_create(self):
        new_review = {
                "professor_id": 1,
                "course_id": 1,
                "rating": 5,
                "comment": "Test Comment"
        }
        response = self.client.post(self.url, new_review, format='json')
        body = json.loads(response.content)
        self.assertEqual(201, response.status_code)
        self.assertEqual(True, body['my_review'])
        self.assertEqual(1, body['professor']['id'])
        self.assertEqual(1, body['course']['id'])

class GetReviews(APITestCase):
    url = reverse("reviews:list-create")
    fixtures = ['dummy_schools', 'dummy_users', 'dummy_quizresponses', 'dummy_professors', 'dummy_courses', 'dummy_reviews']

    def setUp(self):
        auth_token = AuthToken.objects.create(User.objects.get(pk=1))[1]
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth_token)

    def test_reviews_get(self):
        response = self.client.get(self.url, format='json')
        body = json.loads(response.content)
        self.assertEqual(200, response.status_code)
        for review in body:
            self.assertTrue("id" in review)
            self.assertTrue("my_review" in review)
            self.assertTrue("created" in review)
            self.assertTrue("professor" in review)
            self.assertTrue("course" in review)
            self.assertTrue("rating" in review)
            self.assertTrue("comment" in review)
            self.assertTrue("similarity_score" in review)
            if review['my_review'] == True:
                self.assertTrue(review['similarity_score'] == 100.0)