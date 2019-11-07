from django.urls import path, include
from .views import CourseList, CourseDetail

urlpatterns = [
    #path('auth', include('knox.urls')),
    path('', CourseList.as_view()),
    path('/<int:pk>', CourseDetail.as_view()),
]