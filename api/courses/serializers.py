from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'school']
    def create(self, validated_data):
        course = Course.objects.create(**validated_data)
        return course