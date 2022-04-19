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


class UserProfileSerializer(serializers.ModelSerializer):

    user = UserSimpleSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = '__all__'