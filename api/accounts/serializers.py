from django.utils import timezone
from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from schools.serializers import SchoolSerializer
from schools.models import School
from rest_framework.validators import UniqueValidator

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    school = SchoolSerializer()
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'school')
class UserUpdateSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False, validators=[UniqueValidator(queryset=User.objects.all(), message="E-Mail already associated with another account!")])
    name = serializers.CharField(required=False)
    password = serializers.CharField(required=False)
    school_id = serializers.PrimaryKeyRelatedField(queryset=School.objects.all(), source='school', write_only=True, required=False)

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.name = validated_data.get('name', instance.name)
        instance.school_id = validated_data.get('school', instance.school).id
        if 'password' in validated_data.keys():
            instance.set_password(validated_data['password'])
        instance.save()
        return instance

# Register Serializer
class RegisterSerialzer(serializers.ModelSerializer):
    email = serializers.EmailField(required=False, validators=[
        UniqueValidator(queryset=User.objects.all(), message="E-Mail already associated with another account!")])
    school_id = serializers.PrimaryKeyRelatedField(queryset=School.objects.all(), source='school', default=School.objects.get(pk=1))
    class Meta:
        model = User
        fields = ('id','email','password', 'name', 'school_id', 'school')
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['email'],
                    validated_data['password'], validated_data['name'], school=validated_data['school'], last_login=timezone.now())
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