import React, { useState } from 'react';
import CheckoutForm from '../components/CheckoutForm'; 

const Checkout = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = (paymentData) => {
    setLoading(true);
    console.log("Processing Order for:", paymentData);
    setTimeout(() => {
        alert("Order Placed Successfully!");
        setLoading(false);
    }, 2000);
  };

  return (
    <div className="checkout-page">
      {/* The Header is now in App.jsx (Layout), so we just need the main content */}
      
      <main style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Secure Checkout</h1>
        
        {loading ? (
           <div style={{ textAlign: 'center', fontSize: '18px' }}>Processing Payment...</div>
        ) : (
           <CheckoutForm onSubmit={handlePayment} />
        )}
      </main>
    </div>
  );
};

export default Checkout;