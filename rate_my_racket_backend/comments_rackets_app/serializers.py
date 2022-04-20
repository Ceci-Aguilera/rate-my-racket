from rest_framework import serializers
from django.db.models import F
from .models import *



class RacketSerializer(serializers.ModelSerializer):

    class Meta:
        model = Racket
        fields = '__all__'



class BrandSerializer(serializers.ModelSerializer):

    top_rackets = serializers.SerializerMethodField(source='get_top_rackets')

    def get_top_rackets(self, obj):
        rackets = obj.racket_set.all().order_by("-points")[:3]
        print(rackets[0])
        return RacketSerializer(rackets, context=self.context, many=True).data

    class Meta:
        model = Brand
        fields = '__all__'


class BrandAllRacketsSerializer(serializers.ModelSerializer):

    all_rackets = serializers.SerializerMethodField(source='get_all_rackets')

    def get_all_rackets(self, obj):
        rackets = obj.racket_set.all().order_by("-points")
        return RacketSerializer(rackets, context=self.context, many=True).data

    class Meta:
        model = Brand
        fields = '__all__'



class RatingCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = RatingComment
        exclude = ('userprofile', 'racket',)
