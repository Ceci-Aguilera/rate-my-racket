from django.urls import re_path as url,include
from .views import *
from knox import views as knox_views

app_name = 'comments_rackets_app'

urlpatterns = [
    url(r'^brands/$', BrandListView.as_view(), name='brand-list-api'),
    url(r'^top-principal-rated/$', TopPrincipalRatedView.as_view(), name='top-principal-rated-api'),
    url(r'^brand-rackets/(?P<brand_id>\d+)/$', BrandRetriveView.as_view(), name='brand-rackets-api'),
    url(r'^racket/(?P<racket_id>\d+)/$', RacketRetriveView.as_view(), name='racket-api'),
    url(r'^create-comment/(?P<racket_id>\d+)/(?P<userprofile_id>\d+)/$', CreateCommentView.as_view(), name='create-comment-api'),
    url(r'^latest-comments/$', LatestCommentsView.as_view(), name='latest-comments-api'),
]