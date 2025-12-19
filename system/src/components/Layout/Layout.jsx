// src/components/Layout/Layout.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { 
      path: '/products', 
      icon: '🛍️', 
      label: 'Products',
      section: 'SHOPPING'
    },
    { 
      path: '/cart', 
      icon: '🛒', 
      label: 'Cart',
      section: 'SHOPPING'
    },
    { 
      path: '/wishlist', 
      icon: '❤️', 
      label: 'Wishlist',
      section: 'SHOPPING'
    },
    { 
      path: '/settings', 
      icon: '⚙️', 
      label: 'Settings',
      section: 'ACCOUNT'
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const groupedItems = navItems.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="user-profile">
          <div className="avatar">R</div>
          <div className="user-info">
            <h4>Ramy</h4>
            <span className="user-tier">Premium Member</span>
          </div>
        </div>

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

        <div className="loyalty-card mini-loyalty">
          <div className="loyalty-header">
            <div className="loyalty-icon">⭐</div>
            <div className="loyalty-info">
              <h4>Loyalty Points</h4>
              <p className="points">450</p>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '45%' }}></div>
          </div>
          <p className="progress-text">550 to next tier</p>
        </div>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;