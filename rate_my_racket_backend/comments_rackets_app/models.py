from django.db import models

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
    head_size = models.FloatField(default=0.0)
    length = models.FloatField(default=0.0)
    weight_strung = models.FloatField(default=0.0)
    weight_unstrung = models.FloatField(default=0.0)
    composition = models.CharField(max_length=256, default="Graphite")
    stiffness = models.FloatField(default=0.0)
    average_cost = models.FloatField(default=0.0)

    overall_rating = models.FloatField(default=0.0)
    amount_of_votes = models.IntegerField(default=0)

    def __str__(self):
        return self.brand.title + " " + self.title