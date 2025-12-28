from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.models import User
from .serializers import (
    RegisterSerializer, 
    UserSerializer, 
    LoginSerializer, 
    EmployeeCreateSerializer
)
from .utils import send_login_notification_email, send_welcome_email, send_order_confirmation_email
import traceback

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Send welcome email
        try:
            print(f"📧 Attempting to send welcome email to {user.email}")
            result = send_welcome_email(user)
            print(f"✅ Welcome email result: {result}")
        except Exception as e:
            print(f"❌ Failed to send welcome email: {str(e)}")
            traceback.print_exc()
        
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'message': 'Account created successfully!',
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)


class CreateEmployeeView(generics.CreateAPIView):
    """Admin-only endpoint to create employee accounts"""
    permission_classes = (AllowAny)
    serializer_class = EmployeeCreateSerializer
    
    def create(self, request, *args, **kwargs):
        if not request.user.is_staff and not request.user.is_superuser:
            return Response(
                {'error': 'Only admins can create employee accounts'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        employee = serializer.save()
        
        return Response({
            'success': True,
            'message': 'Employee account created successfully',
            'employee': UserSerializer(employee).data
        }, status=status.HTTP_201_CREATED)


class ListEmployeesView(APIView):
    """Get list of all employees (staff users with @employee.com email)"""
    permission_classes = (AllowAny,)
    
    def get(self, request):
        try:
            # Get all staff users (including admins)
            staff_users = User.objects.filter(is_staff=True)
            
            # Filter by @employee.com email
            employees = staff_users.filter(email__endswith='@employee.com')
            
            serializer = UserSerializer(employees, many=True)
            
            return Response({
                'success': True,
                'employees': serializer.data,
                'count': employees.count()
            })
            
        except Exception as e:
            return Response({
                'success': False,
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginView(APIView):
    permission_classes = (AllowAny,)
    
    def post(self, request):
        print("\n" + "=" * 60)
        print("🔐 LOGIN ATTEMPT STARTED")
        print("=" * 60)
        
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        print(f"📝 Login data - Username: {username}, Email: {email}")

        if not username and not email:
            print("❌ No username or email provided")
            return Response({'error': 'Provide username or email'}, status=status.HTTP_400_BAD_REQUEST)

        # Find user by username or email, then verify password.
        try:
            if username:
                user = User.objects.get(username=username)
            else:
                user = User.objects.get(email=email)
        except User.DoesNotExist:
            print("❌ User not found!")
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        print(f"✅ User found: {user.username}")
        print(f"📧 User email: {user.email}")

        if not user.check_password(password):
            print("❌ Password check failed!")
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
        print("✅ Password verified successfully!")
        
        refresh = RefreshToken.for_user(user)
        
        # Send login notification email
        print(f"\n📧 Now attempting to send login notification email...")
        try:
            result = send_login_notification_email(user)
            if result:
                print("✅ Email sent successfully!")
            else:
                print("⚠️ Email function returned False")
        except Exception as e:
            print(f"❌ Exception while sending email: {str(e)}")
            traceback.print_exc()
        
        print("=" * 60)
        print("🔐 LOGIN ATTEMPT COMPLETED")
        print("=" * 60 + "\n")
        
        return Response({
            'message': 'Login successful!',
            'user': UserSerializer(user).data,
            'is_employee': user.email.endswith('@employee.com') or user.is_staff,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        })


class UserProfileView(APIView):
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({
            'success': True,
            'user': serializer.data,
            'is_employee': request.user.email.endswith('@employee.com') or request.user.is_staff
        })


class PingView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        return Response({'status': 'ok', 'api': 'accounts', 'message': 'pong'})


class SendOrderConfirmationView(APIView):
    permission_classes = (AllowAny,)
    
    def post(self, request):
        try:
            data = request.data
            customer_email = data.get('customer_email') or data.get('email')
            order_data = data.get('order_data') or data
            
            if not customer_email:
                return Response(
                    {'error': 'Customer email is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Send email
            success = send_order_confirmation_email(customer_email, order_data)
            
            if success:
                return Response(
                    {'message': 'Email sent successfully'},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'error': 'Failed to send email'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
                
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )