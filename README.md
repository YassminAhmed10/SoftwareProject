<div align="center">

# 🛍️ RYYZ Store Management System

### *Revolutionizing Retail Management, One Click at a Time*

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Django](https://img.shields.io/badge/Django-REST-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

### *A comprehensive, full-stack clothing store management platform designed to streamline operations, boost productivity, and enhance business intelligence.*

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Team](#-meet-the-team) • [Documentation](#-documentation)

</div>

---

## 📖 Overview

**RYYZ Store** is a modern, enterprise-grade clothing store management system that combines powerful backend functionality with an intuitive, responsive frontend interface. Built from the ground up to handle everything from inventory management to real-time analytics, RYYZ Store empowers retailers to make data-driven decisions and optimize their operations.

### 🎯 Why RYYZ Store?

- **🚀 Lightning Fast**: Built with Vite and React for optimal performance
- **📊 Data-Driven**: Real-time analytics and insightful dashboards
- **🔒 Secure**: JWT authentication with Django REST Framework
- **🎨 Beautiful UI**: Modern, responsive design with TailwindCSS
- **📱 Mobile-First**: Fully responsive across all devices
- **🔄 Real-Time Updates**: Instant synchronization across the platform

---

## ✨ Features

### 🏪 Core Functionality
- **Inventory Management**: Track products, stock levels, and categories with ease
- **Order Processing**: Streamlined order management from placement to fulfillment
- **Customer Accounts**: Secure user authentication and profile management
- **Dashboard Analytics**: Real-time insights into sales, revenue, and performance

### 📊 Analytics & Reporting
- **Revenue Charts**: Visualize sales trends and financial performance
- **Order Analytics**: Track order volumes and fulfillment rates
- **Category Insights**: Analyze product category performance
- **Statistical Cards**: Quick overview of key business metrics

### 💼 Business Management
- **Finance Tracking**: Comprehensive financial management tools
- **Multi-Store Support**: Manage multiple store locations (My Store feature)
- **Settings & Configuration**: Customizable system preferences
- **Dark Mode**: Eye-friendly interface for extended usage

### 🔐 Security & Authentication
- **JWT Token Authentication**: Secure API access
- **User Role Management**: Granular permission control
- **CORS Configuration**: Secure cross-origin resource sharing
- **Session Management**: Reliable user session handling

---

## 🛠️ Tech Stack

### Frontend
```
⚛️  React 18.3.1          - UI Framework
⚡  Vite 4.4.5            - Build Tool & Dev Server
🎨  TailwindCSS 3.3.0     - Styling Framework
🧭  React Router 6.30.2   - Navigation
📈  Recharts 3.5.1        - Data Visualization
🎯  Lucide React          - Icon Library
✅  ESLint                - Code Quality
```

### Backend
```
🐍  Django                - Web Framework
🔌  Django REST Framework - API Development
🔐  SimpleJWT             - JWT Authentication
🌐  CORS Headers          - Cross-Origin Support
💾  SQLite                - Database (Development)
```

### Development Tools
```
📦  npm/yarn              - Package Management
🔧  PostCSS               - CSS Processing
🚀  Autoprefixer          - CSS Compatibility
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn
- pip

### Frontend Setup

```bash
# Navigate to frontend directory
cd SoftwareProject/system

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
# Navigate to backend directory
cd SoftwareProject/system/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

---

## 📁 Project Structure

```
RYYZ-Store-Project/
│
├── SoftwareProject/
│   └── system/
│       ├── backend/                # Django Backend
│       │   ├── accounts/          # User authentication app
│       │   ├── config/            # Project configuration
│       │   ├── db.sqlite3         # Development database
│       │   └── manage.py          # Django management script
│       │
│       ├── src/                   # React Frontend
│       │   ├── components/        # Reusable components
│       │   │   ├── Analytics/    # Charts and stats
│       │   │   ├── Layout/       # Layout components
│       │   │   └── MyStore/      # Store management
│       │   ├── Contexts/          # React Context providers
│       │   ├── pages/             # Application pages
│       │   ├── service/           # API services
│       │   └── utils/             # Utility functions
│       │
│       ├── public/                # Static assets
│       ├── package.json           # Frontend dependencies
│       └── vite.config.js         # Vite configuration
│
├── INTEGRATION_GUIDE.md          # Integration documentation
└── README.md                      # This file
```

---

## 🎮 Usage

### Login & Authentication
1. Navigate to the login page
2. Enter your credentials or sign up for a new account
3. Access the dashboard upon successful authentication

### Dashboard
- View real-time statistics and analytics
- Monitor key performance indicators
- Access quick actions and recent activities

### Managing Orders
- View all orders in the Orders page
- Filter and search for specific orders
- View detailed order information
- Update order status

### Analytics
- Access comprehensive analytics from the Analytics page
- View revenue trends with interactive charts
- Analyze category performance
- Track order volumes over time

### Settings
- Customize system preferences
- Toggle dark mode
- Manage account settings

---

## 👥 Meet the Team

<div align="center">

### **The RYYZ Dream Team**

| Name | ID | Role |
|------|-----|------|
| **Ramy Mohamed Kamal** | 231000792 | 🎯 Team Lead & Backend Developer |
| **Yassmin Ahmed Hassan** | 231001654 | 💻 Frontend Developer |
| **Youssef Khaled Gaber** | 231000968 | 🎨 UI/UX & Frontend Developer |
| **Zeina Mohamed Bahget** | 231001039 | 🔧 Full-Stack Developer |

*Four passionate developers united by a vision to transform retail management* ✨

</div>

---

## 📚 Documentation

- [Integration Guide](INTEGRATION_GUIDE.md) - Complete integration documentation
- [Testing Documentation](TESTING.md) - Comprehensive testing strategy and guidelines
- [Test Report](TEST_REPORT.md) - Testing results and coverage reports
- [Chatbot Setup](SoftwareProject/new-folder/CHATBOT_QUICKSTART.md) - AI chatbot implementation guide
- [Architecture Diagrams](SoftwareProject/new-folder/ARCHITECTURE_DIAGRAMS.md) - System architecture overview

---

## 🧪 Testing

RYYZ Store implements comprehensive testing across all layers:

### Testing Coverage
- **Unit Tests**: Component and function-level testing
- **Integration Tests**: Module interaction testing
- **System Tests**: End-to-end workflow validation
- **CI/CD Pipeline**: Automated testing with GitHub Actions

### Quick Test Commands

**Frontend:**
```bash
cd SoftwareProject/system
npm test                  # Run all tests
npm test -- --coverage    # Run with coverage
```

**Backend:**
```bash
cd SoftwareProject/system/backend
python manage.py test     # Run all tests
coverage run --source='.' manage.py test  # Run with coverage
```

### Automated Testing
Every push and pull request triggers our CI/CD pipeline:
- ✅ Automated frontend and backend tests
- ✅ Code quality checks and linting
- ✅ Cross-platform testing (Windows, Linux, macOS)
- ✅ Coverage reporting

See [TESTING.md](TESTING.md) for complete testing documentation.

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🌟 Acknowledgments

- Thanks to all team members for their dedication and hard work
- Special thanks to our instructors and mentors
- Built with ❤️ using modern web technologies

---

## 📞 Contact & Support

For questions, suggestions, or support:

- 📧 Open an issue in this repository
- 💬 Contact any team member
- 📖 Check our documentation

---

<div align="center">

### ⭐ If you find this project useful, please give it a star!

**Made with 💻 and ☕ by the RYYZ Team**

*© 2025 RYYZ Store Management System. All rights reserved.*

</div>
