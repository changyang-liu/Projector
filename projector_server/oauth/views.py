from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User

from rest_framework.utils import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

import requests
from requests.exceptions import HTTPError

from userprofile.models import UserProfile

GOOGLE_VALIDATE_URL = "https://www.googleapis.com/oauth2/v2/userinfo"

class GoogleAuthView(APIView):
    def post(self, request):
        payload = {"access_token": request.data.get("token")}  # validate token
        try:
            res = requests.get(GOOGLE_VALIDATE_URL, params=payload)
        except HTTPError as e:
            content = {"error": "Invalid Google token" + str(e)}
            return Response(content, status=400)
        if not res.ok:
            content = {"error": "Invalid Google token"}
            return Response(content, status=401)

        data = json.loads(res.text)

        # create user if doesn't exist
        try:
            user = User.objects.get(email=data["email"])
        except User.DoesNotExist:
            user = User(
                username=data["email"],
                password=make_password(BaseUserManager().make_random_password()),
                email=data["email"],
                first_name=data["given_name"],
                last_name=data["family_name"],
            )
            user.save()
            profile = UserProfile(
                picture=data['picture'],
                user=user
            )
            profile.save()

        refresh_token = RefreshToken.for_user(user)  # generate token without username & password
        response = {
            "id": user.id,
            "email": user.email,
            "access_token": str(refresh_token.access_token),
            "refresh_token": str(refresh_token)
        }
        return Response(response)
