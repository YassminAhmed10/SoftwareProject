import React from 'react';
import { useLocation } from 'react-router-dom';
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

const Sidebar = ({ hide, darkMode, onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', section: 'top' },
    { id: 'store', icon: ShoppingBag, label: 'My Store', path: '/my-store', section: 'top' },
    { id: 'analytics', icon: PieChart, label: 'Analytics', path: '/analytics', section: 'top' },
    { id: 'orders', icon: FileText, label: 'All Orders', path: '/orders', section: 'top' },
    { id: 'finance', icon: DollarSign, label: 'Finance', path: '/finance', section: 'top' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings', section: 'bottom' },
    { id: 'logout', icon: LogOut, label: 'Logout', path: '/logout', section: 'bottom', isLogout: true }
  ];

  const topMenuItems = menuItems.filter(item => item.section === 'top');
  const bottomMenuItems = menuItems.filter(item => item.section === 'bottom');

  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/') return true;
    return location.pathname === path;
  };

  const handleNavigation = (item) => {
    if (item.isLogout) {
      if (window.confirm('Are you sure you want to logout?')) {
        onLogout(); // This calls the handleLogout from Layout
      }
    } else {
      // navigate(item.path);
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
                href={item.path}
                onClick={(e) => {
                  if (item.isLogout) {
                    e.preventDefault();
                    handleNavigation(item);
                  }
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
                href={item.isLogout ? '#' : item.path}
                className={item.isLogout ? 'logout' : ''}
                onClick={(e) => {
                  if (item.isLogout) {
                    e.preventDefault();
                    handleNavigation(item);
                  }
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