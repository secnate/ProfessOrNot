from rest_framework import serializers
from api import custom_fields
from schools.serializers import SchoolSerializer
from .models import Professor
from rest_framework.validators import UniqueTogetherValidator

class ProfessorSerializer(serializers.ModelSerializer):
    school = SchoolSerializer(read_only=True, default=custom_fields.GetSchool())
    class Meta:
        model = Professor
        fields = ['id', 'name', 'avg_rating', 'school']
        validators = [
            UniqueTogetherValidator(
                queryset=Professor.objects.all(),
                fields=['name', 'school']
            )
        ]
    def create(self, validated_data):
        professor = Professor.objects.create(**validated_data)
        return professor