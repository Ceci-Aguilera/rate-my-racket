from django.contrib import admin

from .models import *

# Register your models here.

admin.site.register(Brand)
admin.site.register(Racket)
admin.site.register(CategoryRating)
admin.site.register(RatingComment)
admin.site.register(OverallRacketRating)
admin.site.register(RatingCommentVote)
admin.site.register(TopRacketCategory)