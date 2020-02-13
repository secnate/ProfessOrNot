from rest_framework import serializers
from schools.models import School
from schools.serializers import SchoolSerializer
from .models import Professor
from rest_framework.validators import UniqueTogetherValidator

class ProfessorSerializer(serializers.ModelSerializer):
    school = SchoolSerializer(write_only=True, required=False)
    school_id = serializers.PrimaryKeyRelatedField(queryset=School.objects.all(), source='school', write_only=True)
    class Meta:
        model = Professor
        fields = ['id', 'name', 'avg_rating', 'school', 'school_id']
        validators = [
            UniqueTogetherValidator(
                queryset=Professor.objects.all(),
                fields=['name', 'school']
            )
        ]
    def create(self, validated_data):
        professor = Professor.objects.create(**validated_data)
        return professor