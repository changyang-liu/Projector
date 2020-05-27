from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserProfile(models.Model):
    # Extended user profile
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    picture = models.URLField(blank=True)
    bio = models.TextField(max_length=500, blank=True)
    interests = models.TextField(max_length=500, blank=True)
    skills = models.TextField(max_length=500, blank=True)

    #owned_projects and member_of will be included in serializer but not here
