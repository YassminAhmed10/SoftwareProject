# tasks/views.py
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import Task
from .serializers import TaskSerializer

User = get_user_model()

# tasks/views.py - Update pending_tasks function
@api_view(['GET'])
@permission_classes([AllowAny])
def pending_tasks(request):
    """Get pending tasks for the current user"""
    # For testing: if no user is authenticated, try to get by email from query params
    email = request.GET.get('email')
    
    if request.user.is_authenticated:
        # Use authenticated user
        user = request.user
    elif email:
        # Try to find user by email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # Return empty tasks if user not found
            return Response({
                'success': True,
                'tasks': []
            })
    else:
        # If no user and no email, return empty
        return Response({
            'success': True,
            'tasks': []
        })
    
    # FIX: Filter for pending tasks only (status='pending')
    # AND ensure completed=False as an extra safeguard
    tasks = Task.objects.filter(
        assigned_to=user,
        status='pending',  # This should exclude completed
        completed=False    # Extra filter for safety
    ).order_by('-priority', '-created_at')
    
    serializer = TaskSerializer(tasks, many=True)
    return Response({
        'success': True,
        'tasks': serializer.data,
        'employee': {
            'id': user.id,
            'name': user.get_full_name() or user.username,
            'email': user.email
        }
    })
# tasks/views.py - Update complete_task function
@api_view(['POST'])
@permission_classes([AllowAny])
def complete_task(request, task_id):
    """Mark a task as completed"""
    # For testing: allow completion by email
    email = request.data.get('email')
    
    try:
        if request.user.is_authenticated:
            # Use authenticated user
            user = request.user
        elif email:
            # Find user by email
            user = User.objects.get(email=email)
        else:
            return Response({
                'success': False,
                'error': 'User email is required'
            }, status=400)
        
        # Get task for this user
        task = get_object_or_404(Task, id=task_id, assigned_to=user)
        
        if task.completed:
            return Response({
                'success': False,
                'error': 'Task already completed'
            }, status=400)
        
        # FIX: Use the model's mark_complete method OR set all fields properly
        from django.utils import timezone
        
        # Update all necessary fields
        task.status = 'completed'
        task.completed = True
        task.completed_at = timezone.now()  # THIS WAS MISSING!
        task.save()
        
        return Response({
            'success': True,
            'message': f'Task "{task.title}" completed successfully',
            'task': TaskSerializer(task).data
        })
        
    except User.DoesNotExist:
        return Response({
            'success': False,
            'error': 'User not found'
        }, status=404)
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=500)
@api_view(['GET'])
@permission_classes([AllowAny])
def task_list(request):
    """Get all tasks for the current user"""
    # For testing: get by email
    email = request.GET.get('email')
    
    if request.user.is_authenticated:
        user = request.user
    elif email:
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({
                'success': True,
                'tasks': []
            })
    else:
        return Response({
            'success': True,
            'tasks': []
        })
    
    tasks = Task.objects.filter(assigned_to=user)
    serializer = TaskSerializer(tasks, many=True)
    return Response({
        'success': True,
        'tasks': serializer.data
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def task_detail(request, task_id):
    """Get specific task details"""
    email = request.GET.get('email')
    
    if request.user.is_authenticated:
        user = request.user
    elif email:
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({
                'success': False,
                'error': 'User not found'
            }, status=404)
    else:
        return Response({
            'success': False,
            'error': 'Authentication required'
        }, status=401)
    
    task = get_object_or_404(Task, id=task_id, assigned_to=user)
    serializer = TaskSerializer(task)
    return Response({
        'success': True,
        'task': serializer.data
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def create_task(request):
    """Create a new task"""
    try:
        # Get employee by email
        employee_email = request.data.get('assigned_to_email')
        
        if not employee_email:
            return Response({
                'success': False,
                'error': 'Employee email is required'
            }, status=400)
        
        # Find user by email
        try:
            assigned_to = User.objects.get(email=employee_email)
        except User.DoesNotExist:
            return Response({
                'success': False,
                'error': f'Employee with email {employee_email} not found'
            }, status=404)
        
        # Get task data
        title = request.data.get('title')
        description = request.data.get('description')
        priority = request.data.get('priority', 'medium')
        
        if not title:
            return Response({
                'success': False,
                'error': 'Task title is required'
            }, status=400)
        
        # Create task
        task = Task.objects.create(
            title=title,
            description=description,
            priority=priority,
            assigned_to=assigned_to,
            assigned_by=request.user if request.user.is_authenticated else None,
            status='pending'
        )
        
        serializer = TaskSerializer(task)
        return Response({
            'success': True,
            'message': f'Task "{task.title}" created successfully',
            'task': serializer.data
        })
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=500)

@api_view(['GET'])
@permission_classes([AllowAny])
def all_tasks(request):
    """Get all tasks (admin view)"""
    tasks = Task.objects.all().order_by('-created_at')
    serializer = TaskSerializer(tasks, many=True)
    return Response({
        'success': True,
        'tasks': serializer.data,
        'count': tasks.count()
    })

@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_task(request, task_id):
    """Delete a task"""
    try:
        task = Task.objects.get(id=task_id)
        
        # Check if user has permission (admin or task owner)
        email = request.data.get('email')
        if request.user.is_authenticated:
            # Admin can delete any task
            if request.user.is_staff:
                task.delete()
                return Response({
                    'success': True,
                    'message': f'Task "{task.title}" deleted successfully'
                })
        elif email:
            # Check if user is task owner
            try:
                user = User.objects.get(email=email)
                if task.assigned_to == user:
                    task.delete()
                    return Response({
                        'success': True,
                        'message': f'Task "{task.title}" deleted successfully'
                    })
                else:
                    return Response({
                        'success': False,
                        'error': 'You can only delete your own tasks'
                    }, status=403)
            except User.DoesNotExist:
                return Response({
                    'success': False,
                    'error': 'User not found'
                }, status=404)
        
        return Response({
            'success': False,
            'error': 'Permission denied'
        }, status=403)
        
    except Task.DoesNotExist:
        return Response({
            'success': False,
            'error': 'Task not found'
        }, status=404)
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=500)

# tasks/views.py - Update update_task function (relevant part)
@api_view(['PUT'])
@permission_classes([AllowAny])
def update_task(request, task_id):
    """Update a task"""
    try:
        task = Task.objects.get(id=task_id)
        
        # Check permission
        email = request.data.get('email')
        if request.user.is_authenticated:
            # Admin can update any task
            if request.user.is_staff:
                # Update fields
                title = request.data.get('title')
                description = request.data.get('description')
                priority = request.data.get('priority')
                status = request.data.get('status')
                
                if title:
                    task.title = title
                if description:
                    task.description = description
                if priority:
                    task.priority = priority
                if status:
                    task.status = status
                    if status == 'completed':
                        task.completed = True
                        from django.utils import timezone
                        task.completed_at = timezone.now()  # ADD THIS
                
                task.save()
                return Response({
                    'success': True,
                    'message': f'Task "{task.title}" updated successfully',
                    'task': TaskSerializer(task).data
                })
        elif email:
            # Check if user is task owner
            try:
                user = User.objects.get(email=email)
                if task.assigned_to == user:
                    # Employees can only update status
                    status = request.data.get('status')
                    if status:
                        task.status = status
                        if status == 'completed':
                            task.completed = True
                            from django.utils import timezone
                            task.completed_at = timezone.now()  # ADD THIS
                        task.save()
                        return Response({
                            'success': True,
                            'message': f'Task status updated to {status}',
                            'task': TaskSerializer(task).data
                        })
                    else:
                        return Response({
                            'success': False,
                            'error': 'Only status can be updated by employees'
                        }, status=400)
                else:
                    return Response({
                        'success': False,
                        'error': 'You can only update your own tasks'
                    }, status=403)
            except User.DoesNotExist:
                return Response({
                    'success': False,
                    'error': 'User not found'
                }, status=404)
        
        return Response({
            'success': False,
            'error': 'Permission denied'
        }, status=403)
        
    except Task.DoesNotExist:
        return Response({
            'success': False,
            'error': 'Task not found'
        }, status=404)
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=500)

@api_view(['GET'])
@permission_classes([AllowAny])
def tasks_by_priority(request, priority):
    """Get tasks by priority level"""
    email = request.GET.get('email')
    
    if request.user.is_authenticated:
        user = request.user
    elif email:
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({
                'success': True,
                'tasks': []
            })
    else:
        return Response({
            'success': True,
            'tasks': []
        })
    
    tasks = Task.objects.filter(
        assigned_to=user,
        priority=priority,
        status='pending'
    ).order_by('-created_at')
    
    serializer = TaskSerializer(tasks, many=True)
    return Response({
        'success': True,
        'priority': priority,
        'tasks': serializer.data,
        'count': tasks.count()
    })