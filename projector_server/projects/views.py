from django.http import HttpResponse, JsonResponse, Http404

from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from rest_framework import generics

from projects.models import Project
from projects.serializers import ProjectSerializer


class BaseProjectView(generics.ListCreateAPIView):
    parser_classes = [FormParser, MultiPartParser]
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class DetailedProjectView(generics.RetrieveUpdateDestroyAPIView):
    parser_classes = [FormParser, MultiPartParser]
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
