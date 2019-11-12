from rest_framework import serializers
from .models import Course
from schools.models import School

class CourseSerializer(serializers.ModelSerializer):
    school_id = serializers.PrimaryKeyRelatedField(queryset=School.objects.all(), source='school', write_only=True)
    class Meta:
        model = Course
        fields = ['id', 'name', 'school_id']
    def create(self, validated_data):
        course = Course.objects.create(**validated_data)
        return course