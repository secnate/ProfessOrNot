from django.urls import path, include
from .views import ProfessorList, ProfessorDetail

app_name = "professors"

urlpatterns = [
    #path('auth', include('knox.urls')),
    path('', ProfessorList.as_view(), name="list-create"),
    path('/<int:pk>', ProfessorDetail.as_view(), name="get"),
]