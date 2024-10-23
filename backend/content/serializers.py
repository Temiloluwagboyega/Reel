from rest_framework import serializers
from . import models


class CategorySerializer(serializers.ModelSerializer):
   class Meta:
        model = models.Category
        fields = ['id','name']


class PostSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    class Meta:
        model = models.Post
        fields = ['title','content', 'file', 'category','author_name' ]
        # read_only_fields = ['author', 'created_at', 'updated_at']


        def create(self, validated_data):
           validated_data['author']=self.context['request'].user
           return super().create(validated_data)