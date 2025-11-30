import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';
import './Layout.css';

const Layout = ({ children }) => {
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

    // التحقق من الوضع المظلم في التخزين المحلي مع قيمة افتراضية
    const savedDarkMode = localStorage.getItem('darkMode');
    const initialDarkMode = savedDarkMode ? JSON.parse(savedDarkMode) : false;
    setDarkMode(initialDarkMode);
    
    // تطبيق الوضع الداكن فوراً
    applyDarkMode(initialDarkMode);
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // دالة منفصلة لتطبيق الوضع الداكن
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
    
    // حفظ في localStorage
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    
    // تطبيق التغييرات
    applyDarkMode(newDarkMode);
  };

  return (
    <div className={`layout-wrapper ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <Sidebar hide={sidebarHide} darkMode={darkMode} />
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

export default Layout;