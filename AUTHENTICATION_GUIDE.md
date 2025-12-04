# Authentication & Role-Based Access Guide

## 🔐 User Authentication System

The system uses **email-based authentication** with role detection based on email domain.

### Login Credentials

#### Admin Access
- **Email:** `yassmin@admin.com`
- **Password:** `123`
- **Detection:** Any email ending with `@admin.com` is automatically detected as **Admin**

#### Employee Access
- **Email:** `zeina@employee.com`
- **Password:** `456`
- **Detection:** Any email ending with `@employee.com` is automatically detected as **Employee**

---

## 👨‍💼 Admin Dashboard & Pages

### Admin Routes (Protected)
All admin routes require `@admin.com` email authentication.

| Page | Route | Description |
|------|-------|-------------|
| **Dashboard** | `/admin/dashboard` | Main admin dashboard with statistics and orders overview |
| **My Store** | `/admin/mystore` | Store management and product overview |
| **Analytics** | `/admin/analytics` | Business analytics with charts and graphs |
| **All Orders** | `/admin/orders` | Complete orders list and management |
| **Order Details** | `/admin/order/:orderId` | Detailed view of specific orders |
| **Finance** | `/admin/finance` | Financial reports and revenue tracking |
| **Settings** | `/admin/settings` | Admin-specific settings and preferences |

### Admin Sidebar Menu
```
├── Dashboard
├── My Store
├── Analytics
├── All Orders
├── Finance
├── Settings
└── Logout
```

---

## 👨‍💻 Employee Dashboard & Pages

### Employee Routes (Protected)
All employee routes require `@employee.com` email authentication.

| Page | Route | Description |
|------|-------|-------------|
| **Dashboard** | `/employee/dashboard` | Employee dashboard with tasks and orders |
| **All Orders** | `/employee/orders` | Orders assigned to employee |
| **Order Details** | `/employee/order/:orderId` | Detailed view of specific orders |
| **New Requests** | `/employee/requests` | New order requests to process |
| **Add Product** | `/employee/add-product` | Add new products to inventory |
| **Settings** | `/employee/settings` | Employee-specific settings |

### Employee Sidebar Menu
```
├── Dashboard
├── All Orders
├── New Requests
├── Add Product
├── Settings
└── Logout
```

---

## 🔄 Authentication Flow

### 1. Login Process
```
User enters credentials (email + password)
        ↓
Frontend sends to Django backend API
        ↓
Backend validates credentials
        ↓
Returns JWT tokens + user data
        ↓
Frontend detects role from email domain
        ↓
Stores user data + tokens in localStorage
        ↓
Redirects based on role:
  - @admin.com → /admin/dashboard
  - @employee.com → /employee/dashboard
```

### 2. Route Protection
```
User tries to access a route
        ↓
ProtectedRoute component checks:
  1. Is user logged in?
  2. Does user have required role?
        ↓
If NO → Redirect to login
If YES → Show page with role-specific layout
```

### 3. Sidebar Display
```
Layout component receives userRole prop
        ↓
Sidebar component checks userRole
        ↓
Displays appropriate menu items:
  - Admin role → Admin menu
  - Employee role → Employee menu
```

---

## 🛡️ Security Features

### Backend (Django)
- ✅ JWT token-based authentication
- ✅ Password hashing with Django's built-in system
- ✅ CORS enabled for frontend communication
- ✅ REST API endpoints for login/signup/profile

### Frontend (React)
- ✅ Protected routes with role checking
- ✅ Automatic role detection from email
- ✅ Token storage in localStorage
- ✅ Automatic redirect for unauthorized access
- ✅ Role-specific UI components (sidebar, navbar)

---

## 📋 Complete Route Structure

### Public Routes
- `/` → Login page (or redirect to dashboard if logged in)
- `/login` → Login page
- `/register` → Signup page

### Admin Routes (Require @admin.com)
- `/admin/dashboard` → Admin Dashboard
- `/admin/mystore` → My Store
- `/admin/analytics` → Analytics
- `/admin/orders` → All Orders
- `/admin/order/:orderId` → Order Details
- `/admin/finance` → Finance
- `/admin/settings` → Settings

### Employee Routes (Require @employee.com)
- `/employee/dashboard` → Employee Dashboard
- `/employee/orders` → All Orders
- `/employee/order/:orderId` → Order Details
- `/employee/requests` → New Requests
- `/employee/add-product` → Add Product
- `/employee/settings` → Settings

### Utility Routes
- `/logout` → Clears session and returns to login

---

## 🚀 Testing the System

### Test Admin Access
1. Go to http://localhost:5175/
2. Enter:
   - Email: `yassmin@admin.com`
   - Password: `123`
3. Should redirect to `/admin/dashboard`
4. Check sidebar shows admin menu items
5. Try navigating to admin pages

### Test Employee Access
1. Logout (if logged in)
2. Go to http://localhost:5175/
3. Enter:
   - Email: `zeina@employee.com`
   - Password: `456`
4. Should redirect to `/employee/dashboard`
5. Check sidebar shows employee menu items
6. Try navigating to employee pages

### Test Role Protection
1. While logged in as employee, try to access: http://localhost:5175/admin/dashboard
2. Should be redirected away (protected)
3. Similarly, admin cannot access employee-only routes

---

## 🔧 Backend API Endpoints

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/login/` | POST | User login | No |
| `/api/signup/` | POST | User registration | No |
| `/api/profile/` | GET | Get user profile | Yes (JWT) |
| `/api/ping/` | GET | Health check | No |

---

## 📝 Adding New Users

### Via Django Command
```bash
cd c:\Users\LOQ\Downloads\Phase1\SoftwareBackend\system\backend
python manage.py create_test_users
```

### Via Django Admin
```bash
python manage.py createsuperuser
# Then access http://127.0.0.1:8000/admin/
```

### Programmatically
```python
from django.contrib.auth import get_user_model
User = get_user_model()

# Create admin
admin = User.objects.create_user(
    username='newadmin',
    email='newadmin@admin.com',
    password='password123',
    is_staff=True
)

# Create employee
employee = User.objects.create_user(
    username='newemployee',
    email='newemployee@employee.com',
    password='password123'
)
```

---

## ✅ System Status Checklist

- ✅ Backend running at http://127.0.0.1:8000/
- ✅ Frontend running at http://localhost:5175/
- ✅ Admin routes protected and working
- ✅ Employee routes protected and working
- ✅ Role-based sidebar menu working
- ✅ JWT authentication working
- ✅ Auto role detection from email working
- ✅ Test users created (admin + employee)

---

## 🎯 Key Points

1. **Email domain determines role:**
   - `@admin.com` = Admin access
   - `@employee.com` = Employee access

2. **Complete separation:**
   - Admin and Employee have different dashboards
   - Admin and Employee have different page sets
   - Admin and Employee have different sidebar menus

3. **Secure authentication:**
   - JWT tokens for API requests
   - Protected routes with role checking
   - Automatic redirects for unauthorized access

4. **Easy to extend:**
   - Add new roles by updating email detection
   - Add new pages by creating routes
   - Add new menu items by updating sidebar config
