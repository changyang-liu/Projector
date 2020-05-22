from django.urls import include, path
from oauth import views

urlpatterns = [
    path('', views.GoogleAuthView.as_view()),
]

