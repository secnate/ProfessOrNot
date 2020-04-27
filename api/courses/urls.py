from django.urls import path, include
from .views import CourseList, CourseDetail

app_name="courses"

urlpatterns = [
    #path('auth', include('knox.urls')),
    path('', CourseList.as_view(), name="list-create"),
    path('/<int:pk>', CourseDetail.as_view(), name="get"),
]