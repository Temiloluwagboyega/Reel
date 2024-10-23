from rest_framework import serializers
from authentication.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)  # Confirm password

    class Meta:
        model = User
        fields = ['username', 'password', 'password2', 'email']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return attrs
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('A user with this email already exist')
        return value
    

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
        @classmethod
        def get_token(cls, user):
            token = super().get_token(user)
            
            # These are claims, you can add custom claims
            token['username'] = user.username
            token['email'] = user.email
            # ...
            return token



# serializers.py
from rest_framework import serializers
from . import models

class ProfileSetupSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = ['preference1','preference2','preference3', 'preference4', 'preference5', 'preference6']  # Only include preferences field

    def create(self, validated_data):
        name = models.Profile.objects.create(
            preference1 = validated_data['preference1'],
            preference2 = validated_data['preference2'],
            preference3 = validated_data['preference3'],
            preference4 = validated_data['preference4'],
            preference5 = validated_data['preference5'],
            preference6 = validated_data['preference6'],
        )
        name.save()
        return name




class ContentPrefrenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ContentPrefrences
        fields = ['name']
# class SelectedPrefrenceSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.SelectedPrefrence
#         fields = ['name']


 