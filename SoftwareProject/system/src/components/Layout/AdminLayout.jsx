import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';
import './Layout.css';

const AdminLayout = ({ children }) => {
  const [sidebarHide, setSidebarHide] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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

  const toggleSidebar = () => {
    setSidebarHide(!sidebarHide);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    applyDarkMode(newDarkMode);
  };

  return (
    <div className={`layout-wrapper ${darkMode ? 'dark-theme' : 'light-theme'} admin-layout`}>
      <Sidebar hide={sidebarHide} darkMode={darkMode} userRole="admin" />
      <section id="content" className={sidebarHide ? 'sidebar-hidden' : ''}>
        <Navbar 
          toggleSidebar={toggleSidebar}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
        />
        <main className="main-content">
          {children}
        </main>
      </section>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default AdminLayout;
