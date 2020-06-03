from django.http import HttpResponse, JsonResponse, Http404
from django.core.exceptions import PermissionDenied

from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import generics
from rest_framework.response import Response

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
    Update a particular project's join request list or member list (PATCH)
    """
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def update(self, request, *args, **kwargs):
        project = self.get_object()
        user = request.data.get('user')
        updateType = request.data.get('type')
        userObject = User.objects.get(id__exact=user['id'])

        if updateType == "Join Request":
            # Only add user to join request list if not already in it
            # Users cannot join for each other
            if request.user not in project.join_requests.all():
                project.join_requests.add(request.user)
        elif updateType == "Cancel Request":
            # Only project owner or requester can cancel request
            if request.user != project.owner and request.user != userObject:
                raise PermissionDenied
            # Only remove user from join request list if already in it
            if userObject in project.join_requests.all():
                project.join_requests.remove(userObject)
        elif updateType == "Accept":
            # Only owner can accept
            if request.user != project.owner:
                raise PermissionDenied
            project.join_requests.remove(userObject)
            project.members.add(userObject)
        else:
            content = {"error": "Invalid update type"}
            return Response(content, status=400)

        return super().update(request, *args, **kwargs)

class LikesView(generics.UpdateAPIView):
    """
    View for liking a project
    """
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def update(self, request, *args, **kwargs):
        project = self.get_object()
        if request.user not in project.liked_by.all():
            project.liked_by.add(request.user)
            project.likes = project.likes + 1
            project.save()
        else:
            content = {"error": "Already liked this project"}
            return Response(content, status=400)
        return super().update(request, *args, **kwargs)
