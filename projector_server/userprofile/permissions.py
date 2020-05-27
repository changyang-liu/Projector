from rest_framework import permissions


class IsUser(permissions.BasePermission):
    """
    Custom permission to only allow self to edit profile.
    """

    def has_object_permission(self, request, view, obj):
        return obj == request.user

