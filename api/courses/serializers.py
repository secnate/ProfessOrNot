from rest_framework import serializers
from .models import Course
from api import custom_fields
from schools.serializers import SchoolSerializer
from rest_framework.validators import UniqueTogetherValidator


class CourseSerializer(serializers.ModelSerializer):
    school = SchoolSerializer(default=custom_fields.GetSchool())
    class Meta:
        model = Course
        fields = ['id', 'name', 'avg_rating', 'school']
        validators = [
            UniqueTogetherValidator(
                queryset=Course.objects.all(),
                fields=['name', 'school']
            )
        ]

    def create(self, validated_data):
        course = Course.objects.create(**validated_data)
        return course
