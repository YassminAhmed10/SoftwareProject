// CustomerSidebar.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  FileText, 
  User, 
  Settings, 
  LogOut, 
  Home 
} from 'lucide-react';
import './CustomerSidebar.css'; // You will need to create this CSS file

const customerMenuItems = [
  { icon: Home, label: 'My Dashboard', path: '/customer-dashboard' },
  { icon: FileText, label: 'My Orders', path: '/my-orders' },
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: Settings, label: 'Account Settings', path: '/account-settings' },
];

const CustomerSidebar = ({ darkMode }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <section id="customer-sidebar" className={darkMode ? 'dark' : ''}>
      <div className="customer-brand">
        {/* Replace with your customer-facing logo */}
        <span className="logo-text">🛒 ShopName</span> 
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
              <Icon size={20} className="menu-icon" />
              <span className="text">{item.label}</span>
            </NavLink>
          );
        })}
        
        {/* Logout Link */}
        <button className="customer-nav-item logout-btn">
          <LogOut size={20} className="menu-icon" />
          <span className="text">Logout</span>
        </button>
      </nav>
    </section>
  );
};

export default CustomerSidebar;