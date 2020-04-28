from django.urls import path, include
from .views import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views

app_name="auth"

urlpatterns = [
    #path('auth', include('knox.urls')),
    path('register', RegisterAPI.as_view(), name="register"),
    path('login', LoginAPI.as_view(), name="login"),
    path('logout', knox_views.LogoutView.as_view(), name="logout"),
    path('user', UserAPI.as_view(), name="profile"),
]