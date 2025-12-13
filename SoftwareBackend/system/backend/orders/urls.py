from django.urls import path
from .views import get_dashboard_stats

urlpatterns = [
    path('dashboard-stats/', get_dashboard_stats, name='dashboard-stats'),
]
