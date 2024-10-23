from django.db import models
from authentication.models import User
# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Post(models.Model):
    title = models.CharField(max_length=250)
    slug = models.CharField(max_length=250)
    author = models.ForeignKey(User, on_delete=models.CASCADE )
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    file = models.FileField(blank=True, null=True ,upload_to='post_media/')
    content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.title
    



class PostView(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey('Post', on_delete=models.CASCADE)
    view_count = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ('user', 'post')

    def __str__(self):
        return f'{self.user.email} viewed {self.post.title}'
