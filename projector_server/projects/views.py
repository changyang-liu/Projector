from django.http import HttpResponse, JsonResponse, Http404

from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from rest_framework.views import APIView

from projects.models import Project
from projects.serializers import ProjectSerializer

# Create your views here.

class BaseProjectView(APIView):
    parser_classes = [FormParser, MultiPartParser]

    def get(self, request, *args, **kwargs):
        """
        List all projects
        """
        project_list = Project.objects.all()
        serializer = ProjectSerializer(project_list, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request, *args, **kwargs):
        """
        Create a new project
        """
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


class DetailedProjectView(APIView):
    parser_classes = [FormParser, MultiPartParser]

    def get_object(self, pk, *args, **kwargs):
        try:
            return Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        """
        Get one particular project
        """
        project = self.get_object(pk)
        serializer = ProjectSerializer(project)
        return JsonResponse(serializer.data, safe=False)

    def put(self, request, pk, *args, **kwargs):
        """
        Edit a project
        """
        project = self.get_object(pk)
        serializer = ProjectSerializer(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def delete(self, request, pk, *args, **kwargs):
        """
        Delete a project
        """
        project = self.get_object(pk)
        project.delete()
        return HttpResponse(status=204)
