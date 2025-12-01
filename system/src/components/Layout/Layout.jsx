import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';

const Layout = ({ children, hideSidebar = false }) => {
  const [sidebarHide, setSidebarHide] = useState(hideSidebar);
  const [darkMode, setDarkMode] = useState(false);
  const [searchShow, setSearchShow] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarHide(true);
      } else {
        setSidebarHide(hideSidebar);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [hideSidebar]);

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
      {!hideSidebar && (
        <Sidebar 
          hide={sidebarHide}
          darkMode={darkMode}
        />
      )}
      <section id="content" className={sidebarHide && !hideSidebar ? 'sidebar-hidden' : ''}>
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