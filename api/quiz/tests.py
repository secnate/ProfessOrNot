import json

from django.urls import reverse

from accounts.models import User
from rest_framework.test import APITestCase
from knox.models import AuthToken

# Load Quiz
class LoadQuiz(APITestCase):
  fixtures = ['dummy_schools', 'dummy_users', 'dummy_quizquestions']
  url = reverse("quiz:get")

  def setUp(self):
    auth_token = AuthToken.objects.create(User.objects.get(pk=1))[1]
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth_token)

  def test_quiz_load(self):
    response = self.client.get(self.url)
    body = json.loads(response.content)
    self.assertEqual(200, response.status_code)
    for review in body:
      self.assertTrue("id" in review)
      self.assertTrue("type" in review)
      self.assertTrue("text" in review)
      self.assertTrue("options" in review)
      if review['type'] == 'mc':
        self.assertTrue(len(review['options']) != 0)
      if review['type'] == 'sc':
        self.assertTrue(len(review['options']) == 0)

# Create a quiz
class SubmitQuiz(APITestCase):
    fixtures = ['dummy_schools', 'dummy_users', 'dummy_quizquestions']
    url = reverse("quiz:submit")
    def setUp(self):
        auth_token = AuthToken.objects.create(User.objects.get(pk=1))[1]
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + auth_token)

    def test_quiz_submit(self):
      test_responses = {"responses":[{"questionId":1,"responseId":3},{"questionId":2,"responseId":2},{"questionId":3,"responseId":1}]}
      response = self.client.post(self.url, test_responses, format='json')
      self.assertEqual(201, response.status_code)


