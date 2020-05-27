from django.contrib.auth.models import User
from rest_framework import serializers

from userprofile.models import UserProfile
from projects.models import Project


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ("picture", "bio", "interests", "skills")


class SimpleUserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)
    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name", "profile")


class UserSerializer(serializers.ModelSerializer):
    from projects.serializers import SimpleProjectSerializer  # To prevent circular import
    owned_projects = SimpleProjectSerializer(many=True, read_only=True)
    profile = UserProfileSerializer(read_only=True)
    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name", "owned_projects", "profile")
