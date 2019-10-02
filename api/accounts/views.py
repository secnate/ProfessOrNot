from django.contrib.auth.models import update_last_login
from django.utils import timezone
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from api.settings import REST_KNOX as REST_KNOX_SETTINGS
from .serializers import UserSerializer, RegisterSerialzer, LoginSerializer

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerialzer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
          "user": UserSerializer(user,context=self.get_serializer_context()).data,
          "token": AuthToken.objects.create(user)[1]
        })
# Login API
class LoginAPI(generics.GenericAPIView):
    def get_token_limit_per_user(self):
        return REST_KNOX_SETTINGS.get('TOKEN_LIMIT_PER_USER')

    serializer_class = LoginSerializer
    def post(self, request, *args, **kwargs):
        token_limit_per_user = self.get_token_limit_per_user()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        user_no_of_tokens = user.auth_token_set.filter(expiry__gt=timezone.now()).count()
        # If token_limit_per_user is reached, delete the oldest token
        if token_limit_per_user is not None:
            if user_no_of_tokens >= token_limit_per_user:
                user.auth_token_set.all().order_by('expiry')[0].delete()
        # Update User Last Login
        update_last_login(None, user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


# Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [ permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user