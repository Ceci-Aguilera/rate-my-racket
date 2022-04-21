from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User

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

from accounts_app.models import UserProfile


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


class CreateCommentView(APIView):

    def post(self, request, racket_id, userprofile_id):

        data = request.data

        racket = Racket.objects.get(id=racket_id)
        user = User.objects.get(id=userprofile_id)
        userprofile = user.userprofile

        try:
            rating_comment = RatingComment.objects.get(userprofile=userprofile, racket=racket)
            return Response({"Result": "User already have comment on this racket"}, status=status.HTTP_400_BAD_REQUEST)

        except:
            rating_comment = RatingCommentSerializer(data=data)

            if rating_comment.is_valid() == False:
                return Response({"Result": "Error while creating comment"}, status=status.HTTP_400_BAD_REQUEST)

            rating_comment = rating_comment.save()
            rating_comment.userprofile = userprofile
            rating_comment.racket = racket
            rating_comment.save()

            racket_new_rating = ((racket.overall_rating * racket.amount_of_votes) + (rating_comment.overall_rating)) / (racket.amount_of_votes + 1)

            print(racket_new_rating)

            racket.overall_rating = racket_new_rating
            racket.amount_of_votes = racket.amount_of_votes + 1
            racket.points = racket_new_rating * racket_new_rating * (racket.amount_of_votes + 1)
            racket.save()

            return Response({"Result": "Success"}, status=status.HTTP_200_OK)