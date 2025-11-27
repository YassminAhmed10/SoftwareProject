import React from 'react';
import { Menu, Bell, Sun, Moon } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ toggleSidebar, toggleDarkMode, darkMode }) => {
  return (
    <nav>
      <button className="menu-toggle" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>
      
      <a href="#" className="nav-link">Categories</a>
      
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