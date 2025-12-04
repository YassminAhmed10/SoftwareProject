import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../service/apiservice';
import './Layout.css';

const Layout = ({ children, onLogout }) => {
  const [sidebarHide, setSidebarHide] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const applyDarkMode = (isDark) => {
    if (isDark) {
      document.body.classList.add('dark');
      document.body.classList.add('dark-mode');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.remove('dark-mode');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarHide(true);
      } else {
        setSidebarHide(false);
      }
    };

    const savedDarkMode = localStorage.getItem('darkMode');
    const initialDarkMode = savedDarkMode ? JSON.parse(savedDarkMode) : false;
    setDarkMode(initialDarkMode);
    applyDarkMode(initialDarkMode);
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarHide(!sidebarHide);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    applyDarkMode(newDarkMode);
  };

  const handleLogout = () => {
  if (window.confirm('Are you sure you want to logout?')) {
    // Call your API logout function
    logoutUser()
      .then(() => {
        navigate('/login');
      })
      .catch(error => {
        console.error('Logout error:', error);
        // Still navigate to login
        navigate('/login');
      });
  }
};

  return (
    <div className={`layout-wrapper ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <Sidebar 
        hide={sidebarHide}
        darkMode={darkMode} 
        onLogout={handleLogout} 
      />
      <section id="content" className={sidebarHide ? 'sidebar-hidden' : ''}>
        <Navbar 
          toggleSidebar={toggleSidebar}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
          onLogout={handleLogout}
        />
        <main className="main-content">
          {children}
        </main>
      </section>
    </div>
  );
};

export default Layout;