from django.urls import path
from userprofile import views

urlpatterns = [
   path('', views.UserList.as_view()),
   path('<int:pk>', views.UserDetail.as_view())
]
