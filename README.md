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
  }
}
```

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

```bash
cd SoftwareProject/system
npm run build
```

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
