from django.urls import re_path as url,include
from .views import *
from knox import views as knox_views

app_name = 'accounts_app'

urlpatterns = [
    url(r'^logout/$', knox_views.LogoutView.as_view(), name='knox-logout-api'),
    url(r'^login/$', LoginView.as_view(), name='login-api'),
    url(r'^check-auth/$', CheckAuthenticatedView.as_view(), name='check-auth-api'),
    url(r'^register/$', RegisterView.as_view(), name='register-api'),
]