from rest_framework import serializers
from .models import QuizQuestion, QuizResponses

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion
        fields = ['id', 'type', 'text', 'options']

class ResponseSerializer(serializers.Serializer):
    responses = serializers.JSONField()
    def update(self, user, validated_data):
        new_responses = validated_data.get('responses')
        if not hasattr(user, 'QuizResponses'):
            instance = QuizResponses(user=user, responses=new_responses)
            instance.save()
            return instance
        instance = user.QuizResponses
        instance.responses = new_responses
        instance.save()
        return instance