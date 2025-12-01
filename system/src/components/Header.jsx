import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

const Header = ({ user, onLogout, isCheckout = false, onToggleSidebar }) => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Left: Logo */}
        <div className="header-logo">
          <Link to="/">
            <h1>RYYZ STORE</h1>
          </Link>
        </div>

        {/* Middle: Navigation (hidden on checkout) */}
        {!isCheckout && (
          <nav className="header-nav">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
        )}

        {/* Right: Actions */}
        <div className="header-actions">
          {/* Sidebar Toggle (hidden on checkout) */}
          {!isCheckout && onToggleSidebar && (
            <button className="sidebar-toggle" onClick={onToggleSidebar}>
              <FaBars />
            </button>
          )}

          {/* Cart (hidden on checkout) */}
          {!isCheckout && (
            <Link to="/cart" className="cart-icon">
              <FaShoppingCart />
              <span className="cart-count">0</span>
            </Link>
          )}

          {/* User Auth */}
          {user ? (
            <div className="user-menu">
              <span>Hi, {user.name}</span>
              <button onClick={onLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="login-btn">
              <FaUser /> Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;