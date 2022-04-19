from django.urls import re_path as url,include
from .views import *
from knox import views as knox_views

app_name = 'comments_rackets_app'

urlpatterns = [
    url(r'^brands/$', BrandListView.as_view(), name='brand-list-api'),
]