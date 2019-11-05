from django.urls import path, include
from .views import SchoolView
from knox import views as knox_views

urlpatterns = [
    #path('auth', include('knox.urls')),
    path('', SchoolView.as_view()),
]