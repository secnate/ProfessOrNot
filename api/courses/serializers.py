from rest_framework import serializers
from .models import Course
from schools.models import School

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name']
    def create(self, validated_data):
        course = Course.objects.create(**validated_data)
        return course