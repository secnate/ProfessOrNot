from django.db import models
from django.contrib.postgres.fields import JSONField
from accounts.models import User

class QuizQuestion(models.Model):
    text = models.CharField(max_length=255)
    type = models.CharField(max_length=2)
    options = JSONField(blank=True)
    class Meta:
        ordering = ['id']

class QuizResponses(models.Model):
    user = models.OneToOneField(User, related_name='QuizResponses', on_delete=models.CASCADE, default=1, primary_key=True)
    responses = JSONField(blank=True)