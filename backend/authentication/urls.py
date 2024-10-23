from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('api/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/user/register/', views.RegisterView.as_view(), name='register'),
    path('profile/setup/', views.ProfileSetupView.as_view(), name='profile_setup'),
    path('content-prefrence/', views.ContentPrefrenceView.as_view(), name='content-prefrence'),
    # path('selected-prefrence/', views.SelectedPrefrenceView.as_view(), name='selevted-prefrence')
]