from rest_framework import serializers
from accounts.serializers import UserSerializer
from courses.serializers import CourseSerializer
from professors.serializers import ProfessorSerializer
from accounts.models import User
from courses.models import Course
from professors.models import Professor
from .models import Review
from django.core.validators import MinValueValidator, MaxValueValidator
from rest_framework.validators import UniqueTogetherValidator


class ReviewSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    # Reviewer is retrieved by current user default method from context
    # https://www.django-rest-framework.org/api-guide/validators/#advanced-field-defaults
    reviewer = serializers.HiddenField(default=serializers.CurrentUserDefault())
    my_review = serializers.SerializerMethodField(read_only=True)
    created = serializers.DateTimeField(read_only=True)
    professor = ProfessorSerializer(read_only=True)
    professor_id = serializers.PrimaryKeyRelatedField(queryset=Professor.objects.all(), source='professor',
                                                      write_only=True, required=True)
    course = CourseSerializer(read_only=True)
    course_id = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), source='course', write_only=True,
                                                   required=True)
    rating = serializers.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], required=True)
    comment = serializers.CharField(max_length=255, required=False, allow_blank=True)
    def create(self, validated_data):
        review = Review.objects.create(**validated_data)
        return review
    # Getting the user through the context dict
    def get_my_review(self, obj):
        if obj.reviewer == self.context['request'].user:
            return True
        return False
    class Meta:
        validators = [
            UniqueTogetherValidator(
                queryset=Review.objects.all(),
                fields=['course', 'professor', 'reviewer'],
            )
        ]

"""
class ReviewSlimSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    created = serializers.DateTimeField(read_only=True)
    rating = serializers.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], required=True)
    comment = serializers.CharField(max_length=255, required=False)
"""