import React, { useState } from 'react';
import './CheckoutForm.css'; // Optional CSS file for styling

const CheckoutForm = ({ onSubmit }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData({
        ...formData,
        [name]: formatted
      });
    } 
    // Format expiry date with slash
    else if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '');
      if (formatted.length >= 2) {
        setFormData({
          ...formData,
          [name]: `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}`
        });
      } else {
        setFormData({
          ...formData,
          [name]: value
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Secure Checkout</h1>
        <p className="secure-notice">
          <span className="lock-icon">🔒</span> Your information is securely encrypted
        </p>
      </div>

      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="checkout-form">
          
          {/* Shipping Details Section */}
          <section className="form-section">
            <h2>Shipping Details</h2>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                required
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Street Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="123 Main Street"
                required
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="New York"
                  required
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">Zip Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  placeholder="10001"
                  required
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          {/* Payment Information Section */}
          <section className="form-section payment-section">
            <h2>Payment Information</h2>
            
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <div className="card-input-container">
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  maxLength="19"
                  required
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="card-input"
                />
                <div className="card-icons">
                  <span className="card-icon">💳</span>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                  value={formData.expiryDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <div className="cvv-container">
                  <input
                    type="password"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    maxLength="3"
                    required
                    value={formData.cvv}
                    onChange={handleChange}
                  />
                  <span className="cvv-info" title="3-digit code on back of card">?</span>
                </div>
              </div>
            </div>
          </section>

          {/* Order Summary (Optional) */}
          <section className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-item">
              <span>Subtotal</span>
              <span>$0.00</span>
            </div>
            <div className="summary-item">
              <span>Shipping</span>
              <span>Calculated at next step</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span className="total-amount">$0.00</span>
            </div>
          </section>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>

          <p className="terms-notice">
            By placing your order, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;