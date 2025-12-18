// src/components/Layout/Layout.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  ShoppingCart, 
  Heart,
  User,
  Package,
  Settings
} from 'lucide-react';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();

  // Navigation items - REMOVED Dashboard from SHOPPING section
  const navItems = [
    // SHOPPING section
    { 
      path: '/products', 
      icon: <ShoppingBag size={20} />, 
      label: 'Products',
      section: 'SHOPPING'
    },
    { 
      path: '/cart', 
      icon: <ShoppingCart size={20} />, 
      label: 'Cart',
      section: 'SHOPPING'
    },
    { 
      path: '/wishlist', 
      icon: <Heart size={20} />, 
      label: 'Wishlist',
      section: 'SHOPPING'
    },
    // ACCOUNT section
    { 
      path: '/customer-dashboard', 
      icon: <User size={20} />, 
      label: 'Customer Dashboard',
      section: 'ACCOUNT'
    },
    { 
      path: '/orders', 
      icon: <Package size={20} />, 
      label: 'My Orders',
      section: 'ACCOUNT'
    },
    { 
      path: '/settings', 
      icon: <Settings size={20} />, 
      label: 'Settings',
      section: 'ACCOUNT'
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Group items by section
  const groupedItems = navItems.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <div className="app-layout">
      {/* White Sidebar */}
      <aside className="sidebar">
        {/* User Profile Section */}
        <div className="user-profile">
          <div className="avatar">R</div>
          <div className="user-info">
            <h4>Ramy</h4>
            <span className="user-tier">Premium Member</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {Object.entries(groupedItems).map(([section, items]) => (
            <div key={section} className="nav-section">
              <h4 className="section-title">{section}</h4>
              <ul className="nav-list">
                {items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      <span className="nav-label">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="nav-section logout-section">
          <ul className="nav-list">
            <li>
              <button className="nav-link logout">
                <span className="nav-icon">→</span>
                <span className="nav-label">Logout</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Loyalty Points */}
        <div className="loyalty-card">
          <div className="loyalty-header">
            <div className="loyalty-icon">⭐</div>
            <div className="loyalty-info">
              <h4>Loyalty Points</h4>
              <p className="points">450 Points</p>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '45%' }}></div>
          </div>
          <p className="progress-text">550 points to next tier</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;