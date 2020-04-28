from django.urls import path, include
from .views import ReviewList, ReviewDetail, MyReviews
app_name="reviews"
urlpatterns = [
    path('', ReviewList.as_view(), name="list-create"),
    path('/<int:pk>', ReviewDetail.as_view(), name="get"),
    path('/my', MyReviews.as_view(), name="my")
]