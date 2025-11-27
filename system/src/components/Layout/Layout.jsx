import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';

const Layout = ({ children }) => {
  const [sidebarHide, setSidebarHide] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchShow, setSearchShow] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarHide(true);
      } else {
        setSidebarHide(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarHide(!sidebarHide);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  const toggleSearch = () => {
    if (window.innerWidth < 576) {
      setSearchShow(!searchShow);
    }
  };

  return (
    <>
      <Sidebar 
        hide={sidebarHide}
        darkMode={darkMode}
      />
      <section id="content" className={sidebarHide ? 'sidebar-hidden' : ''}>
        <Navbar 
          toggleSidebar={toggleSidebar}
          toggleDarkMode={toggleDarkMode}
          toggleSearch={toggleSearch}
          searchShow={searchShow}
          darkMode={darkMode}
        />
        {React.cloneElement(children, { darkMode })}
      </section>
    </>
  );
};

export default Layout;