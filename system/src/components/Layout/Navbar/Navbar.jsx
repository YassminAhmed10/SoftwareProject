import React, { useState } from 'react';
import { Menu, Bell, Sun, Moon } from 'lucide-react';
import { FaBox, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ toggleSidebar, toggleDarkMode, darkMode }) => {
  const [notificationCount, setNotificationCount] = useState(8);
  const [showNotifications, setShowNotifications] = useState(false);

  // UPDATED — 8 PRODUCT & STOCK RELATED NOTIFICATIONS
  const notifications = [
    {
      id: 1,
      title: "New Product Added",
      message: "A new item has been added: Beige Winter Coat.",
      type: "product",
      time: "Just now",
      unread: true,
    },
    {
      id: 2,
      title: "Stock Updated",
      message: "Black Oversized Hoodie stock increased to 25 items.",
      type: "product",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 3,
      title: "Low Stock Warning",
      message: "White Classic T-Shirt is running low (3 items left).",
      type: "warning",
      time: "12 min ago",
      unread: true,
    },
    {
      id: 4,
      title: "Out of Stock",
      message: "Denim Blue Jacket is now out of stock.",
      type: "warning",
      time: "25 min ago",
      unread: true,
    },
    {
      id: 5,
      title: "Variant Added",
      message: "New size added for Black Cargo Pants: Size XXL.",
      type: "product",
      time: "30 min ago",
      unread: true,
    },
    {
      id: 6,
      title: "Product Updated",
      message: "Pink Summer Dress details have been updated.",
      type: "info",
      time: "1 hr ago",
      unread: true,
    },
    {
      id: 7,
      title: "Stock Issue Detected",
      message: "Mismatch found in Red Hoodie stock count.",
      type: "warning",
      time: "2 hrs ago",
      unread: true,
    },
    {
      id: 8,
      title: "Restock Completed",
      message: "Beige Sneakers have been restocked (40 items).",
      type: "product",
      time: "3 hrs ago",
      unread: true,
    },
  ];

  const handleNotificationClick = (e) => {
    e.preventDefault();
    setShowNotifications(!showNotifications);
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    console.log('Profile clicked');
  };

  const getIcon = (type) => {
    switch (type) {
      case "product":
        return <FaBox size={18} />;
      case "warning":
        return <FaExclamationTriangle size={18} />;
      case "info":
        return <FaInfoCircle size={18} />;
      default:
        return <FaInfoCircle size={18} />;
    }
  };

  return (
    <nav>
      <button className="menu-toggle" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>

      <a href="#" className="nav-link">Dashboard</a>

      <div className="nav-right">

        {/* Dark Mode Button */}
        <button className="switch-mode-btn" onClick={toggleDarkMode}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notification Button */}
        <div 
          className={`notification ${showNotifications ? "active" : ""}`} 
          onClick={handleNotificationClick}
        >
          <Bell size={20} />
          {notificationCount > 0 && (
            <span className="num">{notificationCount > 99 ? "99+" : notificationCount}</span>
          )}

          {/* NOTIFICATION DROPDOWN */}
          <div className="notification-dropdown">
            <div className="notification-header">
              <h3>Notifications</h3>
              <button 
                className="mark-all-read"
                onClick={(e) => {
                  e.stopPropagation();
                  setNotificationCount(0);
                }}
              >
                Mark all as read
              </button>
            </div>

            <div className="notification-list">
              {notifications.map((item) => (
                <div key={item.id} className={`notification-item ${item.unread ? "unread" : ""}`}>
                  <div className={`notification-icon ${item.type}`}>
                    {getIcon(item.type)}
                  </div>

                  <div className="notification-content">
                    <p className="notification-title">{item.title}</p>
                    <p className="notification-message">{item.message}</p>
                    <p className="notification-time">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="notification-footer">
              <a href="#" className="view-all-link">View all notifications</a>
            </div>
          </div>

        </div>

        {/* Profile */}
        <a href="#" className="profile" onClick={handleProfileClick}>
          <img src="/src/assets/Admin.png" alt="Admin Profile" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
