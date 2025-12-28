# track_visitor/urls.py
from django.urls import path
from .views import track_visitor, test_visitor_tracking, get_visitor_stats

urlpatterns = [
    path('track/', track_visitor, name='track_visitor'),
    path('test/', test_visitor_tracking, name='test_visitor_tracking'),
    path('stats/', get_visitor_stats, name='get_visitor_stats'),
]