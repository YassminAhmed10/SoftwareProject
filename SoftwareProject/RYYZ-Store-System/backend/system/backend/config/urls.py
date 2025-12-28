# config/urls.py - FIXED
from django.contrib import admin
from django.urls import path, include
from accounts.views import SendOrderConfirmationView  # Correct import
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('accounts.urls')),
    path('api/orders/', include('orders.urls')),
     path('api/visitor/', include('track_visitor.urls')),
    path('api/tasks/', include('tasks.urls')),  # Added task app URLs
    path('api/orders/send-confirmation/', SendOrderConfirmationView.as_view(), name='send-order-confirmation'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)