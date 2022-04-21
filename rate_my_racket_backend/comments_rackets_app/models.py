from django.db import models

from accounts_app.models import UserProfile

# Create your models here.


class Brand(models.Model):
    title = models.CharField(max_length=256, default="Brand Name")
    image = models.ImageField(upload_to='brands/', blank=True, null=True)

    def __str__(self):
        return self.title

class Racket(models.Model):

    brand = models.ForeignKey(Brand, null=True, on_delete=models.CASCADE)

    title = models.CharField(max_length=256, default="Brand Name")
    image = models.ImageField(upload_to='rackets/', blank=True, null=True)
    secondary_image = models.ImageField(upload_to='rackets_secondary/', blank=True, null=True)
    head_size = models.FloatField(default=0.0)
    length = models.FloatField(default=0.0)
    weight_strung = models.FloatField(default=0.0)
    weight_unstrung = models.FloatField(default=0.0)
    composition = models.CharField(max_length=256, default="Graphite")
    stiffness = models.FloatField(default=0.0)
    average_cost = models.FloatField(default=0.0)

    overall_rating = models.FloatField(default=0.0)
    amount_of_votes = models.IntegerField(default=0)

    points = models.IntegerField(default=0)

    def __str__(self):
        return self.brand.title + " " + self.title



class CategoryRating(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title



class RatingComment(models.Model):

    userprofile = models.ForeignKey(UserProfile, null=True, on_delete=models.CASCADE)
    racket = models.ForeignKey(Racket, null=True, on_delete=models.CASCADE)
    comments = models.TextField(blank=True)
    spin_rating = models.FloatField(default=6)
    maneuverable_rating = models.FloatField(default=6)
    flexibility_rating = models.FloatField(default=6)
    comfort_rating = models.FloatField(default=6)
    control_rating = models.FloatField(default=6)
    power_rating = models.FloatField(default=6)
    serving_rating = models.FloatField(default=6)
    stable_rating = models.FloatField(default=6)
    racket_sweet_spot_rating = models.FloatField(default=6)
    volley_rating = models.FloatField(default=6)
    overall_rating = models.FloatField(default=0)
    audience = models.CharField(max_length=50, default="Beginner")

    def __str__(self):
        return self.userprofile.user.username + " " + self.racket.title


class OverallRacketRating(models.Model):
    racket = models.ForeignKey(Racket, null=True, on_delete=models.CASCADE)
    category = models.ForeignKey(CategoryRating, null=True, on_delete=models.CASCADE)
    rating = models.FloatField(default=0)
    points = models.FloatField(default=0)

    def __str__(self):
        return self.racket.title + " - " + self.category.title