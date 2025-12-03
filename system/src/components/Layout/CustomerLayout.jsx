// src/components/CustomerLayout.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sun, Moon, LogOut } from 'lucide-react';
import './CustomerLayout.css'; // Imports the essential layout CSS

// Minimal sidebar menu items
const customerMenuItems = [
  { label: 'My Dashboard', path: '/customer-dashboard' },
  { label: 'My Orders', path: '/my-orders' },
  { label: 'Profile', path: '/profile' },
];

const CustomerLayout = ({ children, darkMode, setDarkMode }) => {
  const location = useLocation();
  // Determines if the NavLink should be active
  const isActive = (path) => location.pathname === path;

  return (
    <div className={`customer-layout ${darkMode ? 'dark' : ''}`}>
      
      {/* 1. SIDEBAR */}
      <section id="customer-sidebar">
        <div className="customer-brand">🛒 My Shop</div>
        <nav className="customer-nav">
          {customerMenuItems.map(item => (
            <NavLink 
              key={item.label}
              to={item.path}
              className={`customer-nav-item ${isActive(item.path) ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
          <button className="customer-nav-item logout-btn">
             <LogOut size={20} /> Logout
          </button>
        </nav>
      </section>
      
      {/* 2. MAIN CONTENT AREA (CRITICAL FOR DISPLAY) */}
      <div className="main-content-area">
        {/* Header */}
        <header className="customer-header-inline">
          <div className="header-title">
            <h2>Welcome Back, Customer!</h2>
          </div>
          
          <div className="header-actions">
            <button 
              className="dark-mode-toggle" 
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>
        
        <main className="customer-page-main">
          {children} {/* Renders the MyOrders component */}
        </main>
      </div>
    </div>
  );
};

export default CustomerLayout;