from django.contrib import admin

# Register your models here.
from . import models


class Categoryadmin(admin.ModelAdmin):
    list_display = ['name']


class PostAdmin(admin.ModelAdmin):
    prepopulated_fields={'slug': ('title',),}
    list_display = ['title', 'author', 'created_at']



admin.site.register(models.Category, Categoryadmin),
admin.site.register(models.Post, PostAdmin)