from rest_framework import serializers
from .models import *
from django.contrib import auth
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator

from django.contrib.auth.models import User


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email',)
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user



class LoginSerializer(serializers.Serializer):

    username = serializers.CharField(max_length=255)
    password = serializers.CharField(min_length=8)

    def validate(self, data):
        user = auth.authenticate(**data)
        if user and user.is_active:
            return user
        elif user:
            raise serializers.ValidationError("User not active")
        else:
            raise serializers.ValidationError("No user")
        raise serializers.ValidationError("Incorrect credentials")


class UserSimpleSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    email = serializers.CharField(max_length=255)
    id = serializers.IntegerField()


class UserProfileSerializer(serializers.ModelSerializer):

    user = UserSimpleSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = '__all__'


class UserCRUDSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email',)


class UserProfilePublicSerializer(serializers.ModelSerializer):

    profile_icon = serializers.SerializerMethodField(source='get_profile_icon')
    profile_icon_color = serializers.SerializerMethodField(source='get_profile_icon_color')
    profile_icon_color_mode = serializers.SerializerMethodField(source='get_profile_icon_color_mode')

    def get_profile_icon(self, obj):
        return obj.userprofile.profile_icon
    
    def get_profile_icon_color(self, obj):
        return obj.userprofile.profile_icon_color

    def get_profile_icon_color_mode(self, obj):
        return obj.userprofile.profile_icon_color_mode
        

    class Meta:
        model = User
        fields = ('username', 'id', "profile_icon", "profile_icon_color", "profile_icon_color_mode")