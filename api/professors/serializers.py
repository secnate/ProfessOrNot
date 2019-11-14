from rest_framework import serializers
from schools.models import School
from .models import Professor

class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor
        fields = ['id', 'name']
    def create(self, validated_data):
        professor = Professor.objects.create(**validated_data)
        return professor