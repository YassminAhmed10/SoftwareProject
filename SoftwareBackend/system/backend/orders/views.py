from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Order, Customer
from django.utils import timezone
from datetime import timedelta

@api_view(['GET'])
def get_dashboard_stats(request):
    total_orders = Order.objects.count()
    total_customers = Customer.objects.count()
    
    # Count new customers in the last 7 days
    last_week = timezone.now() - timedelta(days=7)
    new_customers = Customer.objects.filter(created_at__gte=last_week).count()

    data = {
        "total_orders": total_orders,
        "total_customers": total_customers,
        "new_customers_last_week": new_customers,
    }
    return Response(data)
