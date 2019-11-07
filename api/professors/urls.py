from django.urls import path, include
from .views import ProfessorList, ProfessorDetail

urlpatterns = [
    #path('auth', include('knox.urls')),
    path('', ProfessorList.as_view()),
    path('/<int:pk>', ProfessorDetail.as_view()),
]