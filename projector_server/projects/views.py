from django.http import HttpResponse, JsonResponse, Http404

from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import generics

from projects.models import Project
from projects.serializers import ProjectSerializer
from projects.permissions import IsOwnerOrReadOnly


class BaseProjectView(generics.ListCreateAPIView):
    """
    View all projects (GET) or create a new project (POST)
    """
    parser_classes = [FormParser, MultiPartParser]
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class DetailedProjectView(generics.RetrieveUpdateDestroyAPIView):
    """
    View a particular project (GET), edit a project (PUT) or delete a project (DELETE)
    """
    parser_classes = [FormParser, MultiPartParser]
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
