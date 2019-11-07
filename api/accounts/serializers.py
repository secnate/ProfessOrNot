from django.utils import timezone
from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    school_name = serializers.CharField(source='school.name', read_only=True)
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'school_name')

# Register Serializer
class RegisterSerialzer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','email','password', 'name')
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['email'],
                    validated_data['password'], validated_data['name'], last_login=timezone.now())
        return user
# Login Serializer
class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()
    def validate(self,data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")