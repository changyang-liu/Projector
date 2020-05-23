from django.contrib.auth.models import User
from rest_framework import serializers

from userprofile.models import UserProfile
from projects.models import Project


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['first_name', 'last_name', 'bio']


class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class UserSerializer(serializers.ModelSerializer):
    from projects.serializers import SimpleProjectSerializer  # To prevent circular import
    owned_projects = SimpleProjectSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'owned_projects')
