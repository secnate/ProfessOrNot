from django.urls import path, include
from .views import QuizView, ResponseView
app_name = "quiz"
urlpatterns = [
    path('', QuizView.as_view(), name="get"),
    path('/submit', ResponseView.as_view(), name="submit")
]