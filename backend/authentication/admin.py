from django.contrib import admin

# Register your models here.
from django.contrib import admin
from . import models


class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']


class ContentPrefrenceAdmin(admin.ModelAdmin):
    list_display = ['id','name']



from django.contrib import admin


class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user'] # Correctly define filter_horizontal


admin.site.register(models.User, UserAdmin)
admin.site.register(models.Profile, ProfileAdmin)
admin.site.register(models.ContentPrefrences, ContentPrefrenceAdmin)
