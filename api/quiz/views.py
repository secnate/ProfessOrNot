from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from .serializers import QuizSerializer, ResponseSerializer
from .models import QuizQuestion, QuizResponses
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class QuizView(ListAPIView):
    serializer_class = QuizSerializer
    def get_queryset(self):
        queryset = QuizQuestion.objects.all()
        return queryset

class ResponseView(APIView):
    def post(self, request):
        user = request.user
        serializer = ResponseSerializer(user, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)