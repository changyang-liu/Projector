from django.http import HttpResponse, JsonResponse, Http404

from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import generics

from projects.models import Project
from projects.serializers import ProjectSerializer
from projects.permissions import IsOwnerOrReadOnly

from django.contrib.auth.models import User

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

class JoinProjectView(generics.UpdateAPIView):
    """
    Update a particular project's member list (PATCH)
    """
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def update(self, request, *args, **kwargs):
        project = self.get_object()
        project.members.clear()
        for member in request.data['members']:
            user = User.objects.get(email__exact=member['email'])
            #TODO: Have to relate user to project?
            project.members.add(user)
        return super().update(request, *args, **kwargs)
