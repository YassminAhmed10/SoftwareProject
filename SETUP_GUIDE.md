# Full Stack Application Setup Guide

## 🎯 Overview
This is a full-stack clothing store management system with:
- **Frontend**: React + Vite (Port 5175)
- **Backend**: Django REST API with JWT Authentication (Port 8000)

## 🚀 Quick Start

### Backend (Django Authentication Server)
```powershell
cd c:\Users\LOQ\Downloads\Phase1\SoftwareBackend\system\backend
python manage.py runserver
```
**Running at:** http://127.0.0.1:8000/

### Frontend (React Application)
```powershell
cd c:\Users\LOQ\Downloads\Phase1\SoftwareProject\system
npm run dev
```
**Running at:** http://localhost:5175/

## 🔐 Login Credentials

### Admin Access
- **Email:** yassmin@admin.com
- **Password:** 123
- **Route:** Redirects to `/admin/dashboard`

### Employee Access
- **Email:** zeina@employee.com
- **Password:** 456
- **Route:** Redirects to `/employee/dashboard`

## 📋 Features

### Authentication System
- ✅ JWT-based authentication
- ✅ Role-based access control (Admin/Employee)
- ✅ Login and Signup pages
- ✅ Protected routes
- ✅ Automatic role detection based on email domain

### API Endpoints
- `POST /api/login/` - User login
- `POST /api/signup/` - User registration
- `GET /api/profile/` - Get user profile (requires authentication)
- `GET /api/ping/` - Health check

## 🔧 Technical Details

### Backend Stack
- Django 4.2
- Django REST Framework 3.14
- Django REST Framework SimpleJWT 5.5.1
- Django CORS Headers 4.9.0
- SQLite Database

### Frontend Stack
- React 18.2.0
- React Router DOM 6.15.0
- Vite 4.4.5
- Tailwind CSS 3.4.18
- Lucide React Icons

### Role Detection Logic
The system automatically determines user roles based on email domains:
- `@admin.com` → Admin role
- `@employee.com` → Employee role

## 📁 Project Structure

```
Phase1/
├── SoftwareProject/           # Frontend React Application
│   └── system/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── services/
│       │   │   └── api.js    # Backend API integration
│       │   └── App.jsx       # Main routing logic
│       └── package.json
│
└── SoftwareBackend/           # Backend Django API
    └── system/
        └── backend/
            ├── accounts/      # Authentication app
            ├── config/        # Django settings
            ├── db.sqlite3     # Database
            └── manage.py
```

## 🛠️ Development Commands

### Create Additional Test Users
```powershell
cd c:\Users\LOQ\Downloads\Phase1\SoftwareBackend\system\backend
python manage.py create_test_users
```

### Run Migrations
```powershell
python manage.py makemigrations
python manage.py migrate
```

### Access Django Admin
1. Create superuser: `python manage.py createsuperuser`
2. Visit: http://127.0.0.1:8000/admin/

## 🔄 Workflow

1. User opens application at http://localhost:5175/
2. Login/Signup page is displayed
3. User enters credentials (email + password)
4. Frontend sends request to Django backend
5. Backend validates credentials and returns JWT tokens
6. Frontend stores tokens and user data in localStorage
7. User is redirected based on their role:
   - Admin → `/admin/dashboard`
   - Employee → `/employee/dashboard`
8. All subsequent API requests include JWT token in Authorization header

## ✅ System Status

Both servers are currently running:
- ✅ Backend: http://127.0.0.1:8000/
- ✅ Frontend: http://localhost:5175/

You can now access the application and log in with the provided credentials!
