from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework import generics
from userprofile.serializers import UserSerializer, SimpleUserSerializer


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = SimpleUserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
