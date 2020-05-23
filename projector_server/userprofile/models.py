from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserProfile:
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=32, blank=True)
    last_name = models.CharField(max_length=32, blank=True)
    bio = models.TextField(max_length=500, blank=True)

    #@receiver(post_save, sender=User)
    #def create_user_profile(sender, instance, created, **kwargs):
    #    if created:
    #        Profile.objects.create(user=instance)

    #@receiver(post_save, sender=User)
    #def save_user_profile(sender, instance, **kwargs):
    #    instance.profile.save()
