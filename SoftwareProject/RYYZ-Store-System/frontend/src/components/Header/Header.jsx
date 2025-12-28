import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaHeart } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useCart } from '../../Contexts/CartContext';
import './Header.css';
import ryyzLogo from '../../assets/RYYZstore.jpg';

const Header = ({ user, onLogout }) => {
  const { cartItems = [] } = useCart();
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="top-navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={ryyzLogo} alt="RYYZ Store" className="header-logo-img" />
          </Link>
        </div>

        <div className="category-nav">
          <Link to="/men" className="category-link">Men</Link>
          <Link to="/women" className="category-link">Women</Link>
        </div>

        <div className="nav-actions">
          {/* Wishlist Icon */}
          <Link to="/wishlist" className="icon-link" title="Wishlist">
            <FaHeart className="nav-icon" />
          </Link>

          {/* Shopping Cart Icon */}
          <Link to="/cart" className="icon-link cart-icon-wrapper" title="Shopping Cart">
            <FaShoppingCart className="nav-icon" />
            {cartItemsCount > 0 && (
              <span className="cart-badge">{cartItemsCount}</span>
            )}
          </Link>

          <div className="user-section">
            {user ? (
              <>
                <Link to="/my-account" className="nav-link">
                  <FaUser className="nav-icon" />
                  <span className="nav-text">My Account</span>
                </Link>
                <button onClick={onLogout} className="nav-link logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  <FaUser className="nav-icon" />
                  <span className="nav-text">Login</span>
                </Link>
                <Link to="/register" className="nav-link register-btn">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func,
};

export default Header;
