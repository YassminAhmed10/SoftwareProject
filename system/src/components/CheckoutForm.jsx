import React, { useState } from 'react';

const CheckoutForm = ({ onSubmit }) => {
  // State to hold form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the data back to the parent page (Checkout.jsx)
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form" style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      
      <h3>Shipping Details</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" name="fullName" placeholder="Full Name" required 
          value={formData.fullName} onChange={handleChange}
          style={{ flex: 1, padding: '10px' }}
        />
        <input 
          type="email" name="email" placeholder="Email Address" required 
          value={formData.email} onChange={handleChange}
          style={{ flex: 1, padding: '10px' }}
        />
      </div>

      <input 
        type="text" name="address" placeholder="Street Address" required 
        value={formData.address} onChange={handleChange}
        style={{ width: '100%', padding: '10px' }}
      />

      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" name="city" placeholder="City" required 
          value={formData.city} onChange={handleChange}
          style={{ flex: 1, padding: '10px' }}
        />
        <input 
          type="text" name="zipCode" placeholder="Zip Code" required 
          value={formData.zipCode} onChange={handleChange}
          style={{ width: '100px', padding: '10px' }}
        />
      </div>

      <h3>Payment Information</h3>
      <input 
        type="text" name="cardNumber" placeholder="Card Number (0000 0000 0000 0000)" required 
        maxLength="19"
        value={formData.cardNumber} onChange={handleChange}
        style={{ width: '100%', padding: '10px' }}
      />
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" name="expiryDate" placeholder="MM/YY" required 
          maxLength="5"
          value={formData.expiryDate} onChange={handleChange}
          style={{ flex: 1, padding: '10px' }}
        />
        <input 
          type="text" name="cvv" placeholder="CVV" required 
          maxLength="3"
          value={formData.cvv} onChange={handleChange}
          style={{ width: '80px', padding: '10px' }}
        />
      </div>

      <button type="submit" style={{ marginTop: '10px', padding: '15px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
        Place Order
      </button>
    </form>
  );
};

export default CheckoutForm;