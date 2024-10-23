from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,include
from . import views


urlpatterns = [
    path('category/', views.CategoryListView.as_view(), name='category'),
    path('post/', views.PostCreateView.as_view(), name='post'),
    path('post/list/', views.PostLiistView.as_view(), name='post-list'),
    path('post/view/', views.PersonalizedPostView.as_view(), name='personalized-post'),
    path('post/search/', views.PostSearchView.as_view(), name='post-search'),
]
