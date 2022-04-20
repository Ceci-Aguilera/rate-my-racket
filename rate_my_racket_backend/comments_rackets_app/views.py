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


from .models import *

# Create your views here.

class BrandListView(ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    serializer_class = BrandSerializer
    model = Brand
    queryset = Brand.objects.all()



class RacketListView(ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    serializer_class = RacketSerializer
    model = Racket
    queryset = Racket.objects.all()


class TopPrincipalRatedView(ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    serializer_class = RacketSerializer
    model = Racket
    queryset = Racket.objects.all().order_by("-points")[:3]


class BrandRetriveView(RetrieveAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    serializer_class = BrandAllRacketsSerializer
    model = Brand
    lookup_url_kwarg = 'brand_id'
    queryset = Brand.objects.all()



class RacketRetriveView(RetrieveAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    serializer_class = RacketSerializer
    model = Racket
    lookup_url_kwarg = 'racket_id'
    queryset = Racket.objects.all()

