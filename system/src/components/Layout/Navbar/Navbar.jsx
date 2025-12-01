import React from 'react';
import { Menu, Bell, Sun, Moon } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ toggleSidebar, toggleDarkMode, darkMode }) => {
  const location = useLocation();

  // Determine the navbar title based on current route
  const getNavbarTitle = () => {
    if (location.pathname === '/checkout') {
      return 'Checkout';
    }
    return 'Categories';
  };

  return (
    <nav>
      <button className="menu-toggle" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>
      
      <a href="#" className="nav-link">{getNavbarTitle()}</a>
      
      <div className="nav-right">
        <button className="switch-mode-btn" onClick={toggleDarkMode}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <a href="#" className="notification">
          <Bell size={20} />
          <span className="num">8</span>
        </a>
        
        <a href="#" className="profile">
          <img 
            src="/src/assets/Admin.png" 
            alt="Admin"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/36x36?text=A';
            }}
          />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;