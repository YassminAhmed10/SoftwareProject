import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  PieChart, 
  FileText,
  DollarSign,
  Settings, 
  LogOut 
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ hide, darkMode, userRole }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Admin menu items
  const adminMenuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard', section: 'top' },
    { id: 'mystore', icon: ShoppingBag, label: 'My Store', path: '/admin/mystore', section: 'top' },
    { id: 'analytics', icon: PieChart, label: 'Analytics', path: '/admin/analytics', section: 'top' },
    { id: 'orders', icon: FileText, label: 'All Orders', path: '/admin/orders', section: 'top' },
    { id: 'finance', icon: DollarSign, label: 'Finance', path: '/admin/finance', section: 'top' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/admin/settings', section: 'bottom' },
    { id: 'logout', icon: LogOut, label: 'Logout', path: '/logout', section: 'bottom', isLogout: true }
  ];

  // Employee menu items
  const employeeMenuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/employee/dashboard', section: 'top' },
    { id: 'orders', icon: FileText, label: 'All Orders', path: '/employee/orders', section: 'top' },
    { id: 'requests', icon: ShoppingBag, label: 'New Requests', path: '/employee/requests', section: 'top' },
    { id: 'add-product', icon: PieChart, label: 'Add Product', path: '/employee/add-product', section: 'top' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/employee/settings', section: 'bottom' },
    { id: 'logout', icon: LogOut, label: 'Logout', path: '/logout', section: 'bottom', isLogout: true }
  ];

  // Select menu items based on user role
  const menuItems = userRole === 'admin' ? adminMenuItems : employeeMenuItems;

  const topMenuItems = menuItems.filter(item => item.section === 'top');
  const bottomMenuItems = menuItems.filter(item => item.section === 'bottom');

  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/') return true;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleNavigation = (item) => {
    if (item.isLogout) {
      if (window.confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('user');
        navigate('/logout');
      }
    } else {
      navigate(item.path);
    }
  };

  return (
    <section id="sidebar" className={hide ? 'hide' : ''}>
      <div className="brand">
        <img 
          src="/src/assets/logoo.png" 
          alt="AdminHub" 
          className="sidebar-logo"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/120x40?text=LOGO';
          }}
        />
      </div>
      
      <ul className="side-menu top">
        {topMenuItems.map(item => {
          const Icon = item.icon;
          return (
            <li key={item.id} className={isActive(item.path) ? 'active' : ''}>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(item);
                }}
              >
                <div className="menu-icon">
                  <Icon size={20} />
                </div>
                <span className="text">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
      
      <ul className="side-menu bottom">
        {bottomMenuItems.map(item => {
          const Icon = item.icon;
          return (
            <li key={item.id} className={isActive(item.path) ? 'active' : ''}>
              <a 
                href="#" 
                className={item.isLogout ? 'logout' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(item);
                }}
              >
                <div className="menu-icon">
                  <Icon size={20} />
                </div>
                <span className="text">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Sidebar;