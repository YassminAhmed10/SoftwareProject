# orders/urls.py
from django.urls import path
from . import views
from .views import (
    CreateOrderView,
    GetUserOrdersView,
    GetOrderDetailsView,
    SendOrderConfirmationView,
    GetAllOrdersView,
    UpdateOrderStatusView,
    OrderStatisticsView,
    DashboardOrdersView,
    AnalyticsDataView,  # ⭐ Add this import
    test_order_api,
    test_create_order,
    AllOrdersView  # ⭐ Add this import
)
from .views import FinanceAnalyticsView

urlpatterns = [
    # Order creation and management
    path('create/', CreateOrderView.as_view(), name='create-order'),
    path('my-orders/', GetUserOrdersView.as_view(), name='user-orders'),
    path('<int:order_id>/', GetOrderDetailsView.as_view(), name='order-details'),
    
    # Email confirmation
    path('send-confirmation/', SendOrderConfirmationView.as_view(), name='send-confirmation'),
    path('all/', views.all_orders, name='all_orders'),
    
    # Admin/Employee views
    path('all/', GetAllOrdersView.as_view(), name='all-orders'),
    path('<int:order_id>/status/', UpdateOrderStatusView.as_view(), name='update-status'),
    
    # Dashboard and Statistics
    path('statistics/', OrderStatisticsView.as_view(), name='order-statistics'),
    path('dashboard/', DashboardOrdersView.as_view(), name='dashboard-orders'),
    
    # Analytics endpoint
    path('analytics/', AnalyticsDataView.as_view(), name='analytics-data'),
    
    # All Orders page - ADD THIS LINE
    path('all-orders/', AllOrdersView.as_view(), name='all-orders-list'),
    
    # Test endpoints
    path('test/', test_order_api, name='test-order-api'),
    path('test-create/', test_create_order, name='test-create-order'),
    path('analytics/', FinanceAnalyticsView.as_view(), name='finance-analytics'),
]