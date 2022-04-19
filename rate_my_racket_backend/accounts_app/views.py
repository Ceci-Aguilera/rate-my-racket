from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

import json

from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import *
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny

from knox.models import AuthToken

from .models import *
from .serializers import *

# Create your views here.


class RegisterView(APIView):

    permission_classes = (AllowAny,)

    def post(self, request):

        data = request.data

        user_serializer = UserRegisterSerializer(data=data)
        
        if user_serializer.is_valid() == False:
            return Response({'Result': "Error creating user, username taken"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = user_serializer.save()

        user_profile = UserProfile(user=user)
        user_profile.save()

        return Response({'Result': "Success"}, status=status.HTTP_200_OK)



class LoginView(APIView):

    permission_classes = (AllowAny,)

    def post(self, request):

        data = request.data

        user_serializer = LoginSerializer(data=data)
        
        if user_serializer.is_valid() == False:
            return Response({'Result': "No user with that credentials"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = user_serializer.validated_data
        
        result = AuthToken.objects.create(user)[1]
        return Response({'Result': result}, status=status.HTTP_200_OK)
        

class CheckAuthenticatedView(RetrieveAPIView):

    permission_classes = (AllowAny,)

    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user.userprofile


class UserProfileUpdate(UpdateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    serializer_class = UserProfileSerializer
    lookup_url_kwarg = 'user_id'

    def get_object(self):
        user_id = self.kwargs['user_id']
        return UserProfile.objects.get(user_id=user_id)