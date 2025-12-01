import React from 'react';
import Header from '../Header'; // Adjust path as needed

import './Layout.css'; // Share same CSS or create separate

const CheckoutLayout = ({ children, darkMode, user, onLogout }) => {
  return (
    <div className={`layout checkout-layout ${darkMode ? 'dark' : ''}`}>
      {/* Header without sidebar toggle */}
      <Header user={user} onLogout={onLogout} isCheckout={true} />
      
      {/* Main content - NO SIDEBAR */}
      <main className="checkout-main">
        {children}
      </main>
      
      {/* Simple footer for checkout */}
      <footer className="checkout-footer">
        <div className="container">
          <p>&copy; 2024 RYYZ Store. All rights reserved.</p>
          <p className="secure-notice">🔒 Secure Checkout • 256-bit SSL Encryption</p>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutLayout;