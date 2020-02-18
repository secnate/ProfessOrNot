from django.urls import path, include
from .views import QuizView, ResponseView

urlpatterns = [
    path('', QuizView.as_view()),
    path('/submit', ResponseView.as_view())
]