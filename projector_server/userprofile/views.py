from django.contrib.auth.models import User
from django.http import Http404

from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import FormParser, MultiPartParser

from userprofile.serializers import UserProfileSerializer, UserSerializer, SimpleUserSerializer
from userprofile.permissions import IsUser


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = SimpleUserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserProfileUpdate(APIView):
    """
    Update user profile
    """
    parser_classes = [FormParser, MultiPartParser]
    permission_classes = [IsUser]

    def get_user(self, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

        if self.check_object_permissions(self.request, user):
            return user

    def put(self, request, pk, format=None):
        user = self.get_user(pk)

        serializer = UserProfileSerializer(user.profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
