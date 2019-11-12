from django.urls import path, include
from .views import SearchView

urlpatterns = [
    #path('auth', include('knox.urls')),
    path('/<query>', SearchView.as_view()),
]