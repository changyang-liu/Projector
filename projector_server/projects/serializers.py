from projects.models import Project
from rest_framework import serializers
from django.contrib.auth.models import User


class SimpleProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'name', 'category',  'status', 'created_at', 'last_modified')


class ProjectSerializer(serializers.ModelSerializer):
    from userprofile.serializers import SimpleUserSerializer  # To prevent circular import
    owner = SimpleUserSerializer(read_only=True)
    members = SimpleUserSerializer(many=True, read_only=True)
    join_requests = SimpleUserSerializer(many=True, read_only=True)
    class Meta:
        model = Project
        fields = "__all__"
