from rest_framework import serializers
from django.db.models import F
from .models import *

from accounts_app.serializers import UserProfilePublicSerializer


class RacketSerializer(serializers.ModelSerializer):

    class Meta:
        model = Racket
        fields = '__all__'



class RacketSimpleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Racket
        fields = ('title', 'id')



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


class BrandSimpleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Brand
        fields = ('title', 'id')


class CategoryRatingSerializer(serializers.ModelSerializer):

        class Meta:
            model = CategoryRating
            fields = "__all__"


class OverallRacketRatingSimpleSerializer(serializers.ModelSerializer):

        class Meta:
            model = OverallRacketRating
            fields = ('points', )


class CategoryRatingRacketsSerializer(serializers.ModelSerializer):

    top_rackets = serializers.SerializerMethodField(source='get_top_rackets')
    points =  serializers.SerializerMethodField(source='get_points')

    def get_top_rackets(self, obj):
        ratings = OverallRacketRating.objects.filter(category=obj).order_by("-points")[:3]
        rackets = []
        for rating in ratings:
            rackets.append(rating.racket)
        return RacketSerializer(rackets, context=self.context, many=True).data

    def get_points(self, obj):
        ratings = OverallRacketRating.objects.filter(category=obj).order_by("-points")[:3]
        return OverallRacketRatingSimpleSerializer(ratings, many=True).data

    class Meta:
        model = CategoryRating
        fields = ('id', 'title', 'top_rackets', 'points', )



class CategoryRatingRacketsDetailSerializer(serializers.ModelSerializer):

    all_rackets = serializers.SerializerMethodField(source='get_all_rackets')
    points =  serializers.SerializerMethodField(source='get_points')

    def get_all_rackets(self, obj):
        ratings = OverallRacketRating.objects.filter(category=obj).order_by("-points")
        rackets = []
        for rating in ratings:
            rackets.append(rating.racket)
        return RacketSerializer(rackets, context=self.context, many=True).data

    def get_points(self, obj):
        ratings = OverallRacketRating.objects.filter(category=obj).order_by("-points")
        return OverallRacketRatingSimpleSerializer(ratings, many=True).data

    class Meta:
        model = CategoryRating
        fields = ('id', 'title', 'all_rackets', 'points', )


class OverallRacketRatingSerializer(serializers.ModelSerializer):

        category = CategoryRatingSerializer(read_only=True)

        class Meta:
            model = OverallRacketRating
            exclude = ('racket', )


class RatingCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = RatingComment
        exclude = ('userprofile', 'racket',)


class RatesCommentsSimpleSerializer(serializers.ModelSerializer):

    userprofile = serializers.SerializerMethodField(source='get_userprofile')
    
    def get_userprofile(self, obj):
        userprofile = obj.userprofile.user
        return UserProfilePublicSerializer(userprofile).data
    
    class Meta:
        model = RatingComment
        fields = ('userprofile', 'comments', 'id', 'amounts_of_up_votes', 'amounts_of_down_votes')


class RacketDetailsSerializer(serializers.ModelSerializer):

    brand = BrandSimpleSerializer(read_only=True)

    ratings = serializers.SerializerMethodField(source='get_ratings')

    comments = serializers.SerializerMethodField(source='get_comments')

    def get_ratings(self, obj):
        ratings = OverallRacketRating.objects.filter(racket=obj)
        return OverallRacketRatingSerializer(ratings, many=True).data

    def get_comments(self, obj):
        comments = RatingComment.objects.filter(racket=obj)
        return RatesCommentsSimpleSerializer(comments, many=True).data

    class Meta:
        model = Racket
        fields = ('brand', 'image', 'title', 'secondary_image', 'head_size', 'length', 'weight_strung', 'weight_unstrung', 'composition', 'stiffness', 'average_cost', 'overall_rating',
            'amount_of_votes', 'points', 'ratings', 'comments',
        )



class LatestRatesCommentsSerializer(serializers.ModelSerializer):

    racket = RacketSimpleSerializer()
    userprofile = serializers.SerializerMethodField(source='get_userprofile')
    
    def get_userprofile(self, obj):
        userprofile = obj.userprofile.user
        return UserProfilePublicSerializer(userprofile).data
    
    class Meta:
        model = RatingComment
        fields = ('userprofile', 'racket', 'comments', 'id', 'amounts_of_up_votes', 'amounts_of_down_votes')
