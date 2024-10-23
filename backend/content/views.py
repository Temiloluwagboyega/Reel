from django.shortcuts import render
from rest_framework import generics
from . import serializers
from . import models
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny,IsAuthenticated

from  rest_framework.parsers import MultiPartParser, FormParser
# Create your views here.


class CategoryListView(generics.ListAPIView):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

from rest_framework.response import Response




from rest_framework import status

# class PostView(generics.CreateAPIView):
#     queryset = models.Post.objects.all()
#     serializer_class= serializers.PostSerializer
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]

#     def post(self, request):

#         serializer = serializers.PostSerializer(data=request.data, context={'request': request})
            
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Post
from .serializers import PostSerializer

class PostCreateView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]  # Ensure only logged-in users can post

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)  # Assign the logged-in user as author




class PostLiistView(generics.ListAPIView):
    queryset = models.Post.objects.all().order_by('-id')
    serializer_class = serializers.PostSerializer
    permission_classes = [AllowAny]





from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Q
from .models import Post, PostView, Category
from .serializers import PostSerializer

class PersonalizedPostView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # 1. Fetch posts based on user preferences
        preferences = user.profile  # Assuming `Profile` contains user preferences
        categories = [
            preferences.preference1,
            preferences.preference2,
            preferences.preference3,

        ]

        # Get posts matching the user's preferences
        preferred_posts = Post.objects.filter(category__name__in=categories)

        # 2. Track and recommend posts based on frequently viewed categories
        frequent_categories = (
            PostView.objects.filter(user=user)
            .values('post__category')
            .annotate(view_count=Count('post__category'))
            .order_by('-view_count')
        )

        # Get posts from frequently viewed categories
        frequent_category_ids = [item['post__category'] for item in frequent_categories]
        frequent_posts = Post.objects.filter(category__id__in=frequent_category_ids)

        # Combine preferred and frequent posts
        posts = preferred_posts | frequent_posts
        posts = posts.distinct()

        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


from django.db.models import Q

class PostSearchView(APIView):
    permisssion_classes = [AllowAny]

    def get(self, request):
        query =request.query_params.get('q', '')
        if query: 
            posts = Post.objects.filter(
                Q(title__icontains = query) |
                Q(content__icontains = query) | 
                Q(category__name__icontains = query)
                )
        else: 
            posts = Post.objects.none

        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)