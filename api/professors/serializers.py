from rest_framework import serializers
from .models import Professor

class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor
        fields = ['id', 'name', 'school']
    def create(self, validated_data):
        professor = Professor.objects.create(**validated_data)
        return professor