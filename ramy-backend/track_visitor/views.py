from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from .models import Visitor, VisitorLog
import json
import logging

logger = logging.getLogger(__name__)


def get_client_ip(request):
    """Extract client IP address from request"""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        return x_forwarded_for.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR', '127.0.0.1')


@api_view(['POST'])
@permission_classes([AllowAny])
def track_visitor(request):
    """Track visitor activity"""
    try:
        # Get visitor information
        ip = get_client_ip(request)
        user_agent = request.META.get('HTTP_USER_AGENT', '')[:255]
        referer = request.META.get('HTTP_REFERER', '')
        
        # Parse request data safely
        try:
            data = request.data if request.data else {}
        except Exception as e:
            logger.warning(f"Could not parse request data: {e}")
            data = {}
        
        page_visited = data.get('page', 'unknown')
        
        # Get or create visitor
        visitor, created = Visitor.objects.get_or_create(
            ip=ip,
            defaults={
                'user_agent': user_agent,
                'visit_count': 0,
                'last_visit': timezone.now()
            }
        )
        
        # Update visitor info
        visitor.last_visit = timezone.now()
        visitor.user_agent = user_agent
        visitor.visit_count = (visitor.visit_count or 0) + 1
        visitor.save()
        
        # Create visitor log
        VisitorLog.objects.create(
            visitor=visitor,
            page_visited=page_visited,
            referer=referer,
            user_agent=user_agent
        )
        
        logger.info(f"✅ Visitor tracked: {ip} (Visit #{visitor.visit_count})")
        
        return Response({
            'success': True,
            'visitor_id': visitor.id,
            'created': created,
            'visit_count': visitor.visit_count
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        logger.error(f"❌ Error tracking visitor: {str(e)}")
        import traceback
        traceback.print_exc()
        
        # Return success anyway to not block the frontend
        return Response({
            'success': False,
            'error': str(e),
            'message': 'Error tracking visitor but continuing normally'
        }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def test_visitor_tracking(request):
    """Test endpoint for visitor tracking"""
    try:
        today = timezone.now().date()
        
        return Response({
            'success': True,
            'total_visitors': Visitor.objects.count(),
            'visitors_today': Visitor.objects.filter(last_visit__date=today).count(),
            'total_logs': VisitorLog.objects.count(),
            'recent_logs': list(VisitorLog.objects.order_by('-timestamp')[:5].values(
                'visitor__ip', 'page_visited', 'timestamp'
            ))
        })
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_visitor_stats(request):
    """Get visitor statistics for dashboard"""
    try:
        today = timezone.now().date()
        
        stats = {
            'total_visitors': Visitor.objects.count(),
            'unique_visitors_today': Visitor.objects.filter(last_visit__date=today).count(),
            'total_page_views': VisitorLog.objects.count(),
            'page_views_today': VisitorLog.objects.filter(timestamp__date=today).count(),
        }
        
        return Response({
            'success': True,
            'stats': stats
        })
    except Exception as e:
        logger.error(f"Error getting visitor stats: {e}")
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)