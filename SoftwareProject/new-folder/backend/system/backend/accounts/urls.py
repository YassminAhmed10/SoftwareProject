from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('profile/', views.UserProfileView.as_view(), name='profile'),
    path('ping/', views.PingView.as_view(), name='ping'),
    
    # Employee management endpoints
    path('employees/create/', views.CreateEmployeeView.as_view(), name='create-employee'),
    path('employees/list/', views.ListEmployeesView.as_view(), name='list-employees'),
    
    # Email endpoints
    path('send-order-confirmation/', views.SendOrderConfirmationView.as_view(), name='send-order-confirmation'),
]