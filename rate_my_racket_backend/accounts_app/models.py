from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True) 
    is_email_verified = models.BooleanField(default=False)

    profile_icon = models.CharField(max_length=50, default="Racket")
    profile_icon_color = models.CharField(max_length=10, default="#38b6ff")
    profile_icon_color_mode = models.BooleanField(default=True)

    amounts_of_comments = models.IntegerField(default=0)
    amounts_of_up_votes = models.IntegerField(default=0)
    amounts_of_down_votes = models.IntegerField(default=0)

    amounts_of_received_up_votes = models.IntegerField(default=0)
    amounts_of_received_down_votes = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username