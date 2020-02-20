from django.urls import path, include
from .views import ReviewList, ReviewDetail, MyReviews

urlpatterns = [
    path('', ReviewList.as_view()),
    path('/<int:pk>', ReviewDetail.as_view()),
    path('/my', MyReviews.as_view())
]