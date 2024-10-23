
# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


class ContentPrefrences(models.Model):
    name = models.CharField(max_length=250)


    def __str__(self):
        return self.name

# models.py

# models.py
# models.py

class SelectedPrefrence(models.Model):
    name = models.CharField(max_length=250)


    def __str__(self):
        return self.name



class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    preference1 = models.CharField(max_length=50, blank=True, null=True)  # Store preferences as a list
    preference2 = models.CharField(max_length=50, blank=True, null=True)  # Store preferences as a list
    preference3 = models.CharField(max_length=50, blank=True, null=True)  # Store preferences as a list
    preference4 = models.CharField(max_length=50, blank=True, null=True)  # Store preferences as a list
    preference5 = models.CharField(max_length=50, blank=True, null=True)  # Store preferences as a list
    preference6 = models.CharField(max_length=50, blank=True, null=True)  # Store preferences as a list

    def __str__(self):
        return self.user.username
