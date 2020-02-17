from django.shortcuts import render
from rest_framework.generics import ListAPIView
from .serializers import QuizSerializer
from .models import QuizQuestion
# Create your views here.
class QuizView(ListAPIView):
    serializer_class = QuizSerializer
    def get_queryset(self):
        queryset = QuizQuestion.objects.all()
        return queryset