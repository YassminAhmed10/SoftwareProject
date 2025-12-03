// src/components/Layout/CustomerLayout.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sun, Moon, LogOut, LayoutDashboard, Package, User } from 'lucide-react';
import './CustomerLayout.css';

const customerMenuItems = [
  { label: 'My Dashboard', path: '/customer-dashboard', icon: LayoutDashboard },
  { label: 'My Orders', path: '/my-orders', icon: Package },
  { label: 'Profile', path: '/profile', icon: User },
];

const CustomerLayout = ({ children, darkMode, setDarkMode }) => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path || (path === '/customer-dashboard' && location.pathname === '/');

  return (
    <div className={`customer-layout ${darkMode ? 'dark' : ''}`}>
      
      {/* SIDEBAR */}
      <section id="customer-sidebar">
        <div className="customer-brand">
          🛍 My Shop
        </div>
        <nav className="customer-nav">
          {customerMenuItems.map(item => {
             const Icon = item.icon; 
             return (
                <NavLink 
                  key={item.label}
                  to={item.path}
                  className={`customer-nav-item ${isActive(item.path) ? 'active' : ''}`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
             );
          })}
          <button className="customer-nav-item logout-btn">
             <LogOut size={20} />
             <span>Logout</span>
          </button>
        </nav>
      </section>
      
      {/* MAIN CONTENT AREA */}
      <div className="main-content-area">
        {/* PAGE CONTENT */}
        <main className="customer-page-main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default CustomerLayout;