from rest_framework import serializers
from .models import Course
from schools.models import School
from schools.serializers import SchoolSerializer
from rest_framework.validators import UniqueTogetherValidator


class CourseSerializer(serializers.ModelSerializer):
    school = SchoolSerializer(write_only=True, required=False)
    school_id = serializers.PrimaryKeyRelatedField(queryset=School.objects.all(), source='school', write_only=True)

    class Meta:
        model = Course
        fields = ['id', 'name', 'avg_rating', 'school', 'school_id']
        validators = [
            UniqueTogetherValidator(
                queryset=Course.objects.all(),
                fields=['name', 'school']
            )
        ]

    def create(self, validated_data):
        course = Course.objects.create(**validated_data)
        return course
