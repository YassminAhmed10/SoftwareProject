import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSearch } from 'react-icons/fa'; 
// Ensure logo.png is in your src/assets folder
import logo from '../assets/ryyz.jpg'; 

// --- STYLE CONSTANTS ---
const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 5%',
  height: '80px',
  backgroundColor: 'white',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  position: 'sticky',
  top: 0,
  zIndex: 1000
};

const linkStyle = {
  textDecoration: 'none',
  color: '#555',
  fontWeight: '500',
  padding: '10px 0'
};

const actionButtonStyle = {
  padding: '8px 20px',
  border: '1px solid black',
  backgroundColor: 'transparent',
  borderRadius: '5px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

// --- COMPONENT ---
const Header = ({ user, onLogout }) => { 
  return (
    <nav style={navStyle}>
      {/* 1. LEFT SECTION: Logo Integration */}
      <div style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-start' }}>
        <Link 
          to="/" 
          style={{ textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {/* IMAGE LOGO INTEGRATION */}
          <img 
              src={logo} 
              alt="RYYZ Brand Logo" 
              style={{ height: '35px', width: '35px' }} 
          />
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>RYYZ Brand</span>
        </Link>
      </div>

      {/* 2. MIDDLE SECTION: Centered Navigation Links */}
      <div 
        style={{ 
          display: 'flex', 
          gap: '30px', 
          justifyContent: 'center', // Centers the links group
          flexGrow: 1,               // Allows the group to take available space
          padding: '0 20px' 
        }}
      >
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/shop" style={linkStyle}>Shop</Link>
        <Link to="/dashboard" style={{ ...linkStyle, color: '#007bff' }}>Admin Panel</Link>
      </div>

      {/* 3. RIGHT SECTION: Search and Conditional Auth Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, justifyContent: 'flex-end' }}>
        
        {/* Search Bar */}
        <div className="search-bar" style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '5px', padding: '5px' }}>
          <input type="text" placeholder="Search" style={{ border: 'none', outline: 'none', padding: '0 5px', width: '120px' }} />
          <FaSearch style={{ color: '#555' }} />
        </div>
        
        {/* Auth Buttons */}
        {user ? (
          <Link to="/dashboard/profile">
            <button style={{ ...actionButtonStyle, background: '#f5f5f5' }}>
              <FaUser /> My Account
            </button>
          </Link>
        ) : (
          <Link to="/login">
            <button style={actionButtonStyle}>
              <FaUser /> Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;