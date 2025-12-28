<<<<<<< HEAD
# Clothing Store Management System - Software Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Features](#features)
4. [Technology Stack](#technology-stack)
5. [Installation & Setup](#installation--setup)
6. [API Documentation](#api-documentation)
7. [Database Schema](#database-schema)
8. [Frontend Architecture](#frontend-architecture)
9. [Security & Authentication](#security--authentication)
10. [Deployment Guide](#deployment-guide)
11. [Testing](#testing)
12. [Troubleshooting](#troubleshooting)
13. [Contributing](#contributing)

---

## Project Overview

**Clothing Store Management System** is a full-stack e-commerce platform designed for managing an online clothing store. The system provides comprehensive features for product management, order processing, customer management, analytics, and employee task management.

### Project Structure
```
ClothingStoreManagementSystem/
├── SoftwareBackend/          # Backend Django application
│   └── system/
│       └── backend/
│           ├── accounts/     # User authentication & management
│           ├── orders/       # Order processing & management
│           ├── tasks/        # Employee task management
│           ├── track_visitor/# Visitor tracking & analytics
│           └── config/       # Django project settings
├── SoftwareProject/          # Frontend React application
│   └── system/
│       └── src/
│           ├── components/   # Reusable UI components
│           ├── pages/        # Page components
│           ├── services/     # API services
│           └── Contexts/     # React contexts
```

### Key Stakeholders
- **Customers**: Browse products, place orders, track orders
- **Employees**: Manage orders, handle tasks, view analytics
- **Administrators**: Full system access, user management, analytics

---

## System Architecture

### High-Level Architecture
```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│   React SPA     │◄────►│  Django REST API │◄────►│   SQLite DB     │
│  (Frontend)     │ HTTP │   (Backend)      │      │                 │
└─────────────────┘      └──────────────────┘      └─────────────────┘
        │                         │
        │                         │
        ▼                         ▼
  ┌──────────┐           ┌───────────────┐
  │  Vite    │           │  Email Server │
  │  Build   │           │  (SMTP)       │
  └──────────┘           └───────────────┘
```

### Backend Architecture (Django)
- **Framework**: Django 4.x with Django REST Framework
- **Database**: SQLite (development), PostgreSQL recommended (production)
- **Authentication**: JWT-based authentication with custom user model
- **Email**: SMTP-based email notifications

### Frontend Architecture (React)
- **Framework**: React 18.x with Vite
- **Styling**: Tailwind CSS
- **State Management**: Context API
- **Routing**: React Router v6
- **HTTP Client**: Axios

---

## Features

### 1. User Management
- ✅ User registration with email verification
- ✅ JWT-based authentication
- ✅ Role-based access control (Customer, Employee, Admin)
- ✅ Profile management
- ✅ Password reset functionality

### 2. Product Management
- ✅ Product catalog with categories (Men/Women)
- ✅ Product details (images, sizes, colors, pricing)
- ✅ Product search and filtering
- ✅ Inventory management

### 3. Shopping & Orders
- ✅ Shopping cart functionality
- ✅ Checkout process with address management
- ✅ Multiple payment methods (Cash on Delivery, Card)
- ✅ Order tracking
- ✅ Order confirmation emails
- ✅ Order history

### 4. Admin Dashboard
- ✅ Order management (view, update status, filter)
- ✅ Sales analytics and reports
- ✅ Revenue tracking
- ✅ Visitor analytics
- ✅ Employee performance metrics
- ✅ Financial analytics (revenue, expenses, profit)

### 5. Employee Features
- ✅ Task management system
- ✅ Order processing
- ✅ Customer support tools

### 6. Analytics & Reporting
- ✅ Real-time sales data
- ✅ Revenue trends (daily, weekly, monthly, yearly)
- ✅ Category-wise sales distribution
- ✅ Top-selling products
- ✅ Visitor tracking
- ✅ Conversion rate metrics
- ✅ Financial reports with expense breakdown

---

## Technology Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.8+ | Backend language |
| Django | 4.x | Web framework |
| Django REST Framework | 3.x | REST API framework |
| SQLite | 3.x | Database (dev) |
| JWT | - | Authentication |
| SMTP | - | Email notifications |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI framework |
| Vite | 4.x | Build tool |
| Tailwind CSS | 3.x | Styling |
| React Router | 6.x | Routing |
| Axios | 1.x | HTTP client |
| Recharts | 2.x | Data visualization |

### Development Tools
- ESLint - Code linting
- Prettier - Code formatting
- Git - Version control

---

## Installation & Setup

### Prerequisites
- Python 3.8 or higher
- Node.js 16.x or higher
- npm or yarn
- Git

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/YassminAhmed10/SoftwareBackend.git
cd SoftwareBackend/SoftwareBackend/system/backend
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment variables**
Create `.env` file in backend directory:
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
EMAIL_USE_TLS=True
DEFAULT_FROM_EMAIL=your-email@gmail.com

# Database (optional for production)
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

5. **Run migrations**
```bash
python manage.py migrate
```

6. **Create superuser**
```bash
python manage.py createsuperuser
```

7. **Load sample data (optional)**
```bash
python manage.py loaddata sample_data.json
```

8. **Start development server**
```bash
python manage.py runserver
```

Backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd SoftwareProject/system
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create `.env` file in frontend directory:
```env
VITE_API_URL=http://localhost:8000/api
VITE_MEDIA_URL=http://localhost:8000
```

4. **Start development server**
```bash
npm run dev
```

Frontend will be available at `http://localhost:5173`

---

## API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication Endpoints

#### Register User
```http
POST /accounts/register/
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "password2": "SecurePass123",
  "first_name": "John",
  "last_name": "Doe"
}

Response: 201 Created
{
  "success": true,
  "message": "Registration successful",
  "user": { ... },
  "tokens": {
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
=======
# 👔 Clothing Store Management System

A comprehensive full-stack web application for managing clothing store operations with role-based access control, built with modern technologies.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The Clothing Store Management System is a full-featured web application designed to streamline store operations, inventory management, order processing, and analytics. It features a modern, responsive UI with separate dashboards for administrators and employees.

### Key Highlights

- **Role-Based Access Control**: Separate Admin and Employee interfaces
- **Order Management**: Complete order lifecycle from creation to completion
- **Product Management**: Add, update, and track inventory
- **Analytics Dashboard**: Real-time insights and performance metrics
- **Financial Tracking**: Revenue analysis and expense management
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## ✨ Features

### Admin Features
- 📊 **Dashboard**: Overview of orders, revenue, visitors, and sales
- 🏪 **My Store**: Product catalog and inventory management
- 📈 **Analytics**: Sales charts, trends, and performance metrics
- 📦 **Order Management**: View and manage all orders
- 💰 **Finance**: Revenue breakdown, expenses, and employee performance
- ⚙️ **Settings**: System configuration and preferences

### Employee Features
- 📋 **Task Dashboard**: View assigned tasks and pending orders
- 🛒 **Order Processing**: Handle customer orders efficiently
- 📥 **New Requests**: Process incoming order requests
- ➕ **Add Products**: Create new product entries
- 👤 **Profile Settings**: Manage personal settings

### Common Features
- 🔐 **Secure Authentication**: JWT-based login system
- 🔍 **Search & Filter**: Quick access to orders and products
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Mobile-friendly interface
- 🔔 **Real-time Updates**: Live activity feeds and notifications

## 🛠️ Technology Stack

### Frontend
- **React.js 18.2** - UI library
- **React Router 6.15** - Navigation and routing
- **Vite 4.4** - Build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Recharts 3.5** - Data visualization

### Backend
- **Django 4.2** - Python web framework
- **Django REST Framework 3.14** - API development
- **SimpleJWT 5.5** - JWT authentication
- **Django CORS Headers 4.3** - CORS handling
- **SQLite** - Database (development)

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
Phase1/
├── SoftwareBackend/
│   └── system/
│       └── backend/
│           ├── accounts/           # User authentication & management
│           │   ├── models.py      # User model
│           │   ├── views.py       # API endpoints
│           │   ├── serializers.py # Data serialization
│           │   └── urls.py        # URL routing
│           ├── config/            # Django configuration
│           │   ├── settings.py    # Project settings
│           │   ├── urls.py        # Main URL config
│           │   └── wsgi.py        # WSGI config
│           ├── manage.py          # Django management script
│           ├── requirements.txt   # Python dependencies
│           └── db.sqlite3         # SQLite database
│
├── SoftwareProject/
│   └── system/
│       ├── src/
│       │   ├── components/        # Reusable components
│       │   │   ├── Layout/       # Admin & Employee layouts
│       │   │   ├── StatCard/     # Statistics cards
│       │   │   ├── TaskCard/     # Task components
│       │   │   └── OrderCard/    # Order components
│       │   ├── pages/
│       │   │   ├── Admin/        # Admin pages
│       │   │   │   ├── Dashboard.jsx
│       │   │   │   ├── MyStore.jsx
│       │   │   │   ├── Analytics.jsx
│       │   │   │   ├── Finance.jsx
│       │   │   │   └── AdminAllOrders.jsx
│       │   │   ├── Employee/     # Employee pages
│       │   │   │   ├── EmployeeDashboard.jsx
│       │   │   │   ├── EmployeeAllOrders.jsx
│       │   │   │   ├── AddProduct.jsx
│       │   │   │   └── NewRequests.jsx
│       │   │   ├── LoginPage.jsx
│       │   │   └── SignUpPage.jsx
│       │   ├── Contexts/         # React contexts
│       │   │   └── DarkModeContext.jsx
│       │   ├── App.jsx           # Main app component
│       │   └── main.jsx          # Entry point
│       ├── public/               # Static assets
│       ├── package.json          # Dependencies
│       ├── vite.config.js        # Vite configuration
│       └── tailwind.config.js    # Tailwind configuration
│
├── AUTHENTICATION_GUIDE.md       # Auth documentation
├── SETUP_GUIDE.md               # Setup instructions
└── README.md                    # This file
```

## 🚀 Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**
- **pip** (Python package manager)

### Step 1: Clone the Repository

```bash
git clone https://github.com/YassminAhmed10/SoftwareProject.git
cd Phase1
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd SoftwareBackend/system/backend

# Create virtual environment (optional but recommended)
python -m venv venv
.\venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start backend server
python manage.py runserver
```

Backend will run at: `http://127.0.0.1:8000/`

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory (open new terminal)
cd SoftwareProject/system

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run at: `http://localhost:5173/`

## ⚙️ Configuration

### Backend Configuration

Edit `SoftwareBackend/system/backend/config/settings.py`:

```python
# CORS Settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# JWT Settings
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
}
```

### Frontend Configuration

Edit `SoftwareProject/system/vite.config.js`:

```javascript
export default defineConfig({
  server: {
    port: 5173,
  },
  // Add proxy if needed
})
```

## 💻 Usage

### Starting the Application

1. **Start Backend** (Terminal 1):
   ```bash
   cd SoftwareBackend/system/backend
   python manage.py runserver
   ```

2. **Start Frontend** (Terminal 2):
   ```bash
   cd SoftwareProject/system
   npm run dev
   ```

3. Open browser and navigate to `http://localhost:5173/`

### User Roles & Access

#### Admin Account
- Email must end with `@admin.com`
- Full access to all features
- Routes: `/admin/*`

#### Employee Account
- Email must end with `@employee.com`
- Limited access to employee features
- Routes: `/employee/*`

### Example Accounts

```
Admin:
Email: admin@admin.com
Password: [your-password]

Employee:
Email: employee@employee.com
Password: [your-password]
```

## 📡 API Documentation

### Authentication Endpoints

```
POST /api/accounts/register/  - Register new user
POST /api/accounts/login/     - Login user
GET  /api/accounts/profile/   - Get user profile (protected)
GET  /api/accounts/ping/      - Health check
```

### Request Examples

**Register**
```json
POST /api/accounts/register/
{
  "username": "john_doe",
  "email": "john@admin.com",
  "password": "securePassword123"
}
```

**Login**
```json
POST /api/accounts/login/
{
  "email": "john@admin.com",
  "password": "securePassword123"
}
```

**Response**
```json
{
  "message": "Login successful!",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@admin.com"
  },
  "tokens": {
    "refresh": "...",
    "access": "..."
>>>>>>> Phase1
  }
}
```

<<<<<<< HEAD
#### Login
```http
POST /accounts/login/
Content-Type: application/json

{
  "username": "john_doe",
  "password": "SecurePass123"
}

Response: 200 OK
{
  "success": true,
  "tokens": {
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  },
  "user": { ... }
}
```

#### Get User Profile
```http
GET /accounts/profile/
Authorization: Bearer {access_token}

Response: 200 OK
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "is_staff": false,
  "is_superuser": false
}
```

### Order Endpoints

#### Create Order
```http
POST /orders/create/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "items": [
    {
      "name": "Men's T-Shirt",
      "price": 299.99,
      "quantity": 2,
      "size": "L",
      "color": "Blue",
      "image": "http://..."
    }
  ],
  "subtotal": 599.98,
  "shipping_cost": 50.00,
  "tax": 64.99,
  "total": 714.97,
  "payment_method": "Cash on Delivery",
  "shipping_address": {
    "name": "John Doe",
    "phone": "+201234567890",
    "address": "123 Main St",
    "city": "Cairo",
    "country": "Egypt"
  },
  "customer_email": "john@example.com"
}

Response: 201 Created
{
  "success": true,
  "order_number": "RYZ2412206482951",
  "order_id": 42,
  "order": { ... },
  "email_sent": true,
  "message": "Order created successfully"
}
```

#### Get User Orders
```http
GET /orders/my-orders/
Authorization: Bearer {access_token}

Response: 200 OK
{
  "success": true,
  "orders": [ ... ],
  "count": 5
}
```

#### Get Order Details
```http
GET /orders/{order_id}/
Authorization: Bearer {access_token}

Response: 200 OK
{
  "success": true,
  "order": {
    "id": 42,
    "order_number": "RYZ2412206482951",
    "status": "pending",
    "total": 714.97,
    "created_at": "2024-12-20T10:30:00Z",
    "items": [ ... ]
  }
}
```

#### Get All Orders (Admin/Employee)
```http
GET /orders/all/
Authorization: Bearer {access_token}

Response: 200 OK
{
  "success": true,
  "orders": [ ... ],
  "count": 150
}
```

#### Update Order Status (Admin/Employee)
```http
PATCH /orders/{order_id}/status/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "status": "processing"
}

Response: 200 OK
{
  "success": true,
  "message": "Order status updated to processing",
  "order": { ... }
}
```

### Dashboard Endpoints

#### Dashboard Orders
```http
GET /orders/dashboard-orders/?search=&status=all&category=all
Authorization: Bearer {access_token}

Response: 200 OK
{
  "success": true,
  "orders": [ ... ],
  "count": 50,
  "statistics": {
    "new_orders_today": 5,
    "total_orders": 150,
    "total_sales": 45000.00,
    "pending_orders": 12,
    "visitors_count": 590
  }
}
```

#### Analytics Data
```http
GET /orders/analytics/?range=month
Authorization: Bearer {access_token}

Query Parameters:
- range: week | month | year

Response: 200 OK
{
  "success": true,
  "time_range": "month",
  "quick_stats": {
    "total_revenue": { ... },
    "total_orders": { ... },
    "total_visitors": { ... },
    "conversion_rate": { ... }
  },
  "sales_data": [ ... ],
  "category_data": [ ... ],
  "visitor_data": [ ... ],
  "top_products": [ ... ]
}
```

#### Finance Analytics
```http
GET /orders/finance-analytics/?range=month&year=2024&month=12&day=20
Authorization: Bearer {access_token}

Query Parameters:
- range: week | month | year
- year: 2024
- month: 1-12
- day: 1-31

Response: 200 OK
{
  "success": true,
  "period": "month",
  "date": { ... },
  "sales_data": [ ... ],
  "products_distribution": [ ... ],
  "employees": [ ... ],
  "expenses_breakdown": [ ... ],
  "summary": {
    "total_revenue": 45000.00,
    "total_expenses": 27000.00,
    "total_profit": 18000.00,
    "total_orders": 150,
    "avg_order_value": 300.00,
    "profit_margin": 40.00
  }
}
```

### Order Status Values
- `pending` - Order placed, awaiting processing
- `processing` - Order being prepared
- `shipped` - Order shipped to customer
- `delivered` - Order successfully delivered
- `cancelled` - Order cancelled

---

## Database Schema

### User Model (Custom)
```python
class CustomUser(AbstractUser):
    email = EmailField(unique=True)
    first_name = CharField(max_length=150)
    last_name = CharField(max_length=150)
    is_staff = BooleanField(default=False)
    is_superuser = BooleanField(default=False)
    date_joined = DateTimeField(auto_now_add=True)
```

### Order Model
```python
class Order(models.Model):
    user = ForeignKey(User, on_delete=CASCADE)
    order_number = CharField(max_length=50, unique=True)
    
    # Customer Information
    customer_name = CharField(max_length=255)
    customer_email = EmailField()
    customer_phone = CharField(max_length=20)
    
    # Pricing
    subtotal = DecimalField(max_digits=10, decimal_places=2)
    shipping_cost = DecimalField(max_digits=10, decimal_places=2)
    tax = DecimalField(max_digits=10, decimal_places=2)
    total = DecimalField(max_digits=10, decimal_places=2)
    
    # Shipping
    shipping_address = JSONField()
    shipping_city = CharField(max_length=100)
    shipping_country = CharField(max_length=100)
    
    # Order Details
    status = CharField(max_length=20)  # pending, processing, shipped, delivered, cancelled
    payment_method = CharField(max_length=50)
    
    # Timestamps
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
```

### OrderItem Model
```python
class OrderItem(models.Model):
    order = ForeignKey(Order, on_delete=CASCADE, related_name='items')
    product_name = CharField(max_length=255)
    quantity = IntegerField()
    price = DecimalField(max_digits=10, decimal_places=2)
    size = CharField(max_length=10)
    color = CharField(max_length=50)
    image_url = URLField()
```

### Product Model
```python
class Product(models.Model):
    name = CharField(max_length=255)
    description = TextField()
    price = DecimalField(max_digits=10, decimal_places=2)
    category = CharField(max_length=50)  # men, women
    image = ImageField()
    stock = IntegerField()
    sizes = JSONField()  # ["S", "M", "L", "XL"]
    colors = JSONField()  # ["Red", "Blue", "Black"]
    is_active = BooleanField(default=True)
    created_at = DateTimeField(auto_now_add=True)
```

### Visitor Model
```python
class Visitor(models.Model):
    visitor_id = CharField(max_length=255, unique=True)
    ip_address = GenericIPAddressField()
    user_agent = TextField()
    first_visit = DateTimeField(auto_now_add=True)
    last_visit = DateTimeField(auto_now=True)
    visit_count = IntegerField(default=1)
```

---

## Frontend Architecture

### Component Structure

```
src/
├── components/
│   ├── Header/              # Navigation header
│   │   └── Header.jsx
│   ├── Layout/              # Page layouts
│   │   └── DashboardLayout.jsx
│   ├── Analytics/           # Analytics components
│   │   ├── SalesChart.jsx
│   │   └── StatsCard.jsx
│   ├── OrderCard/           # Order display
│   ├── ProductModal/        # Product details modal
│   ├── StatCard/            # Statistics card
│   └── ProtectedRoute.jsx  # Route protection
│
├── pages/
│   ├── Home.jsx             # Homepage
│   ├── LoginPage.jsx        # Login/Register
│   ├── Products.jsx         # Product listing
│   ├── ProductDetails.jsx   # Product details
│   ├── Checkout.jsx         # Checkout process
│   ├── MyOrders.jsx         # User orders
│   ├── MyAccount.jsx        # User profile
│   └── Admin/
│       ├── Dashboard.jsx    # Admin dashboard
│       ├── AllOrders.jsx    # All orders management
│       └── Analytics.jsx    # Analytics page
│
├── Contexts/
│   ├── CartContext.jsx      # Shopping cart state
│   └── DarkModeContext.jsx  # Theme state
│
└── services/
    └── api.js               # API client
```

### Key React Contexts

#### CartContext
Manages shopping cart state across the application:
```javascript
const CartContext = createContext({
  cart: [],
  addToCart: (item) => {},
  removeFromCart: (itemId) => {},
  updateQuantity: (itemId, quantity) => {},
  clearCart: () => {},
  getCartTotal: () => 0
});
```

#### DarkModeContext
Manages theme preferences:
```javascript
const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {}
});
```

### Routing Structure
```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/products" element={<Products />} />
  <Route path="/products/:id" element={<ProductDetails />} />
  
  {/* Protected Routes */}
  <Route element={<ProtectedRoute />}>
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/my-orders" element={<MyOrders />} />
    <Route path="/my-account" element={<MyAccount />} />
  </Route>
  
  {/* Admin Routes */}
  <Route element={<ProtectedRoute requireAdmin />}>
    <Route path="/admin/dashboard" element={<Dashboard />} />
    <Route path="/admin/orders" element={<AllOrders />} />
    <Route path="/admin/analytics" element={<Analytics />} />
  </Route>
</Routes>
```

---

## Security & Authentication

### JWT Authentication Flow

1. **User Login**
   - User submits credentials
   - Backend validates and returns access + refresh tokens
   - Tokens stored in localStorage

2. **API Requests**
   - Access token sent in Authorization header
   - Backend validates token on protected endpoints

3. **Token Refresh**
   - When access token expires, use refresh token
   - Get new access token without re-login

### Security Best Practices Implemented

✅ **Password Security**
- Passwords hashed using Django's PBKDF2 algorithm
- Minimum password strength requirements
- Password confirmation on registration

✅ **CSRF Protection**
- Django CSRF middleware enabled
- CSRF tokens on forms

✅ **CORS Configuration**
- Restricted origins in production
- Credentials allowed for authenticated requests

✅ **SQL Injection Prevention**
- Django ORM parameterized queries
- No raw SQL without sanitization

✅ **XSS Prevention**
- React auto-escapes output
- Sanitization of user inputs

✅ **Rate Limiting**
- API rate limiting on authentication endpoints
- Prevents brute force attacks

### Role-Based Access Control

**Customer Role**
- Browse products
- Place orders
- View own orders
- Manage profile

**Employee Role**
- All customer permissions
- View all orders
- Update order status
- Access task management

**Admin Role**
- All employee permissions
- User management
- Full analytics access
- System configuration

---

## Deployment Guide

### Production Checklist

- [ ] Update `DEBUG = False` in settings.py
- [ ] Configure production database (PostgreSQL)
- [ ] Set secure `SECRET_KEY`
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Set up static file serving
- [ ] Configure email settings
- [ ] Enable HTTPS
- [ ] Set up backup strategy
- [ ] Configure logging
- [ ] Set up monitoring

### Backend Deployment (Django)

#### Using Gunicorn + Nginx

1. **Install Gunicorn**
```bash
pip install gunicorn
```

2. **Create Gunicorn config**
```python
# gunicorn_config.py
bind = "127.0.0.1:8000"
workers = 4
timeout = 120
```

3. **Run Gunicorn**
```bash
gunicorn config.wsgi:application -c gunicorn_config.py
```

4. **Nginx Configuration**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location /static/ {
        alias /path/to/static/;
    }

    location /media/ {
        alias /path/to/media/;
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Frontend Deployment

#### Build for Production
=======
## 🔐 Authentication

The system uses JWT (JSON Web Tokens) for authentication:

1. User registers/logs in
2. Backend returns access and refresh tokens
3. Frontend stores tokens (localStorage)
4. Tokens are included in API requests
5. Role-based routing based on email domain

For detailed authentication flow, see [AUTHENTICATION_GUIDE.md](AUTHENTICATION_GUIDE.md)

## 📸 Screenshots

### Admin Dashboard
![Admin Dashboard](docs/screenshots/admin-dashboard.png)

### Employee Dashboard
![Employee Dashboard](docs/screenshots/employee-dashboard.png)

### Order Management
![Orders](docs/screenshots/orders.png)

### Analytics
![Analytics](docs/screenshots/analytics.png)

## 🏗️ Building for Production

### Frontend Build

>>>>>>> Phase1
```bash
cd SoftwareProject/system
npm run build
```

<<<<<<< HEAD
#### Deploy to Netlify/Vercel
```bash
# Netlify
netlify deploy --prod

# Vercel
vercel --prod
```

#### Configure Environment
Update `.env.production`:
```env
VITE_API_URL=https://api.yourdomain.com/api
VITE_MEDIA_URL=https://api.yourdomain.com
```

### Database Migration to PostgreSQL

1. **Install psycopg2**
```bash
pip install psycopg2-binary
```

2. **Update settings.py**
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'clothing_store_db',
        'USER': 'db_user',
        'PASSWORD': 'secure_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

3. **Migrate data**
```bash
python manage.py migrate
python manage.py dumpdata > backup.json  # From SQLite
python manage.py loaddata backup.json     # To PostgreSQL
```

---

## Testing

### Backend Testing

#### Run Tests
```bash
cd backend
python manage.py test
```

#### Test Coverage
```bash
pip install coverage
coverage run --source='.' manage.py test
coverage report
coverage html  # Generate HTML report
```

#### Example Test Cases
```python
# orders/tests.py
from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

class OrderTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
    
    def test_create_order(self):
        self.client.force_authenticate(user=self.user)
        data = {
            'items': [...],
            'total': 500.00,
            ...
        }
        response = self.client.post('/api/orders/create/', data)
        self.assertEqual(response.status_code, 201)
```

### Frontend Testing

#### Run Tests
```bash
cd frontend
npm test
```

#### Component Testing (Jest + React Testing Library)
```javascript
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders header navigation', () => {
  render(<Header />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
```

---

## Troubleshooting

### Common Issues

#### Backend Issues

**Issue: CORS errors**
```
Solution: Update CORS_ALLOWED_ORIGINS in settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
]
```

**Issue: Database locked error (SQLite)**
```
Solution: Close all DB connections or switch to PostgreSQL
```

**Issue: Email not sending**
```
Solution: Verify SMTP settings and app password
- Enable 2FA on Gmail
- Generate app-specific password
- Update EMAIL_HOST_PASSWORD
```

#### Frontend Issues

**Issue: API requests failing**
```
Solution: Check VITE_API_URL in .env file
Ensure backend is running on correct port
```

**Issue: Build errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Issue: Authentication not persisting**
```
Solution: Check localStorage token storage
Verify JWT token expiration settings
```

### Debugging Tips

**Backend Debugging**
```python
# Enable debug logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'DEBUG',
    },
}
```

**Frontend Debugging**
```javascript
// Enable detailed logging
console.log('API Response:', response);
console.error('Error occurred:', error);
```

---

## Performance Optimization

### Backend Optimization

1. **Database Query Optimization**
```python
# Use select_related for foreign keys
orders = Order.objects.select_related('user').all()

# Use prefetch_related for reverse relations
orders = Order.objects.prefetch_related('items').all()

# Add database indexes
class Meta:
    indexes = [
        models.Index(fields=['order_number']),
        models.Index(fields=['created_at']),
    ]
```

2. **Caching**
```python
# Install Redis
pip install django-redis

# Configure caching
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
    }
}

# Use caching in views
from django.views.decorators.cache import cache_page

@cache_page(60 * 15)  # Cache for 15 minutes
def analytics_view(request):
    ...
```

### Frontend Optimization

1. **Code Splitting**
```javascript
// Lazy load components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Analytics = lazy(() => import('./pages/Analytics'));
```

2. **Image Optimization**
```javascript
// Use WebP format
// Implement lazy loading
<img loading="lazy" src="..." alt="..." />
```

3. **Bundle Size Reduction**
```bash
# Analyze bundle
npm run build -- --analyze

# Remove unused dependencies
npm prune
```

---

## Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

3. **Make changes and commit**
```bash
git add .
git commit -m "Add: your feature description"
```

4. **Push to your fork**
```bash
git push origin feature/your-feature-name
```

5. **Create Pull Request**

### Commit Message Guidelines
```
Type: Short description

Types:
- Add: New feature
- Fix: Bug fix
- Update: Modify existing feature
- Remove: Delete code/feature
- Refactor: Code restructuring
- Docs: Documentation changes
```

### Code Style Guidelines

**Python (Backend)**
- Follow PEP 8
- Use meaningful variable names
- Add docstrings to functions
- Maximum line length: 100 characters

**JavaScript (Frontend)**
- Follow ESLint configuration
- Use functional components
- Use meaningful component names
- Add PropTypes or TypeScript

---

## License

This project is licensed under the MIT License. See LICENSE file for details.

---

## Support & Contact

- **GitHub**: [YassminAhmed10/SoftwareProject](https://github.com/YassminAhmed10/SoftwareProject.git)
- **Issues**: Report bugs or request features via GitHub Issues
- **Documentation**: See README.md files in each directory

---

## Changelog

### Version 1.0.0 (Current)
- ✅ Complete user authentication system
- ✅ Product catalog and shopping cart
- ✅ Order management system
- ✅ Email notifications
- ✅ Admin dashboard with analytics
- ✅ Finance analytics
- ✅ Visitor tracking
- ✅ Employee task management

### Future Roadmap
- 🔄 Payment gateway integration (Fawary, PayPal)
- 🔄 Multi-language support
- 🔄 Mobile app (React Native)
- 🔄 Advanced reporting tools
- 🔄 AI-powered product recommendations
- 🔄 Customer reviews and ratings
- 🔄 Inventory management system
- 🔄 Promotional campaigns and discounts

---

**Last Updated**: December 20, 2024  
**Version**: 1.0.0  
**Maintainers**: Development Team
=======
Build output will be in `dist/` folder.

### Backend Production

```bash
# Update settings.py for production
DEBUG = False
ALLOWED_HOSTS = ['your-domain.com']

# Collect static files
python manage.py collectstatic

# Use production server (e.g., Gunicorn)
pip install gunicorn
gunicorn config.wsgi:application
```

## 🧪 Testing

```bash
# Frontend
npm run lint

# Backend
python manage.py test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Yassmin Ahmed** - [YassminAhmed10](https://github.com/YassminAhmed10)

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Django REST Framework for robust API development
- Tailwind CSS for the utility-first CSS framework
- Lucide React for beautiful icons

## 📞 Support

For support, email support@example.com or open an issue in the repository.

---

Made with ❤️ by the SoftwareProject Team
>>>>>>> Phase1
