from django.urls import path
from .views import HelloView, ReturnSampleData

urlpatterns = [
    path('hello', HelloView.as_view( )),
    path('testqs', ReturnSampleData.as_view())
]
