from django.urls import include, path
from rest_framework import routers
from projects import views

urlpatterns = [
    path('', views.BaseProjectView.as_view()),
    path('<int:pk>', views.DetailedProjectView.as_view()),
    path('<int:pk>/join', views.JoinProjectView.as_view()),
    path('<int:pk>/like', views.LikesView.as_view())
]
