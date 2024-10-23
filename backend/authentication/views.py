from django.shortcuts import render
from authentication.models import User
from authentication.serializers import RegisterSerializer, MyTokenObtainPairSerializer
from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Profile, ContentPrefrences
from .serializers import ProfileSetupSerializer, ContentPrefrenceSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully!"},
                status=status.HTTP_201_CREATED
            )

        # Return field-specific errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileSetupView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access
    serializer_class = ProfileSetupSerializer

    def post(self, request):
        user = request.user
        profile, created = Profile.objects.get_or_create(user=user)

        serializer = self.serializer_class(instance=profile, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Profile setup complete!"},
                status=status.HTTP_200_OK
            )

        # Return field-specific errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ContentPrefrenceView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = ContentPrefrences.objects.all()
    serializer_class = ContentPrefrenceSerializer
