from django.db import models
from django.contrib.postgres.fields import JSONField

class QuizQuestion(models.Model):
    text = models.CharField(max_length=255, default="")
    options = JSONField()