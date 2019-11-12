from rest_framework import serializers
from schools.models import School
from .models import Professor

class ProfessorSerializer(serializers.ModelSerializer):
    school_id = serializers.PrimaryKeyRelatedField(queryset=School.objects.all(), source='school', write_only=True)
    class Meta:
        model = Professor
        fields = ['id', 'name', 'school_id']
    def create(self, validated_data):
        professor = Professor.objects.create(**validated_data)
        return professor