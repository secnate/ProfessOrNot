from rest_framework import serializers
from .models import QuizQuestion

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion
        fields = ['id', 'type', 'text', 'options']