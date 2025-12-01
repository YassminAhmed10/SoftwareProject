import React, { useState } from 'react';
import CheckoutForm from '../components/CheckoutForm'; 
import { ShoppingCart, Truck, Lock, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
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

  const handlePayment = (paymentData) => {
    setFormData(paymentData);
    setLoading(true);
    console.log("Processing Order for:", paymentData);
    setTimeout(() => {
      setCurrentStep(4);
      setLoading(false);
    }, 2000);
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="checkout-page-full-width">
      {/* Progress Steps */}
      <div className="checkout-progress">
        <div className="progress-steps-container">
          <div className="progress-steps">
            {[1, 2, 3, 4].map((step) => (
              <React.Fragment key={step}>
                <div 
                  className={`step ${currentStep >= step ? 'active' : ''} ${step <= currentStep ? 'clickable' : ''}`}
                  onClick={() => goToStep(step)}
                >
                  <div className="step-number">{step}</div>
                  <span className="step-label">
                    {step === 1 && 'Shipping'}
                    {step === 2 && 'Payment'}
                    {step === 3 && 'Review'}
                    {step === 4 && 'Complete'}
                  </span>
                </div>
                {step < 4 && <div className={`step-line ${currentStep > step ? 'completed' : ''}`}></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="trust-badges">
        <div className="badge-item">
          <Lock size={24} className="badge-icon" />
          <div className="badge-text">
            <strong>100% Secure</strong>
            <span>SSL Encrypted</span>
          </div>
        </div>
        <div className="badge-item">
          <Truck size={24} className="badge-icon" />
          <div className="badge-text">
            <strong>Fast Shipping</strong>
            <span>2-3 Business Days</span>
          </div>
        </div>
        <div className="badge-item">
          <Clock size={24} className="badge-icon" />
          <div className="badge-text">
            <strong>24/7 Support</strong>
            <span>Always Here to Help</span>
          </div>
        </div>
      </div>

      <main className="checkout-main">
        <div className="checkout-container">
          {/* Single Column Layout */}
          <div className="checkout-single-column">
            {/* Step 1: Shipping */}
            {currentStep === 1 && (
              <div className="step-container active">
                <div className="section-header">
                  <Truck size={32} className="header-icon" />
                  <h1>Shipping Details</h1>
                </div>

                <form className="step-form">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Street Address</label>
                    <input
                      type="text"
                      id="address"
                      placeholder="123 Main Street"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        placeholder="New York"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="zipCode">Zip Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        placeholder="10001"
                        required
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="step-container active">
                <div className="section-header">
                  <ShoppingCart size={32} className="header-icon" />
                  <h1>Payment Information</h1>
                </div>

                <form className="step-form">
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <div className="card-input-container">
                      <input
                        type="text"
                        id="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        maxLength="19"
                        required
                        onInput={(e) => {
                          let value = e.target.value.replace(/\s/g, '');
                          let formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                          e.target.value = formatted;
                        }}
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
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <div className="cvv-container">
                        <input
                          type="password"
                          id="cvv"
                          placeholder="123"
                          maxLength="3"
                          required
                        />
                        <span className="cvv-info" title="3-digit code on back of card">?</span>
                      </div>
                    </div>
                  </div>

                  <div className="payment-methods">
                    <h4>Payment Methods Accepted</h4>
                    <div className="method-icons">
                      <span className="method-icon" title="Visa">💳</span>
                      <span className="method-icon" title="Mastercard">💳</span>
                      <span className="method-icon" title="Mezza">🎮</span>
                      <span className="method-icon" title="Telda">🏰</span>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="step-container active">
                <div className="section-header">
                  <ShoppingCart size={32} className="header-icon" />
                  <h1>Review Your Order</h1>
                </div>

                <div className="review-section">
                  <div className="review-card">
                    <h3>Order Items</h3>
                    <div className="review-items">
                      <div className="review-item">
                        <span>Premium Denim Jeans x2</span>
                        <span>$159.98</span>
                      </div>
                      <div className="review-item">
                        <span>Summer Dress x1</span>
                        <span>$49.99</span>
                      </div>
                      <div className="review-item">
                        <span>Classic White T-Shirt x1</span>
                        <span>$29.99</span>
                      </div>
                    </div>

                    <div className="review-divider"></div>

                    <div className="review-summary">
                      <div className="summary-row">
                        <span>Subtotal</span>
                        <span>$239.96</span>
                      </div>
                      <div className="summary-row">
                        <span>Shipping</span>
                        <span className="free-shipping">FREE</span>
                      </div>
                      <div className="summary-row">
                        <span>Tax (Est.)</span>
                        <span>$19.20</span>
                      </div>
                    </div>

                    <div className="review-total">
                      <span>Total</span>
                      <span>$259.16</span>
                    </div>
                  </div>

                  <div className="review-card">
                    <h3>Shipping Address</h3>
                    <p className="address-text">
                      John Doe<br/>
                      123 Main Street<br/>
                      New York, 10001<br/>
                      john@example.com
                    </p>
                  </div>

                  <div className="guarantee">
                    <span className="guarantee-icon">✓</span>
                    <p>30-day money-back guarantee</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="step-container active">
                <div className="success-container">
                  <div className="success-icon">✓</div>
                  <h1>Order Placed Successfully!</h1>
                  <p className="success-message">Thank you for your purchase</p>
                  
                  <div className="order-confirmation">
                    <div className="confirmation-detail">
                      <span>Order Number</span>
                      <span className="detail-value">#ORD-2024-001234</span>
                    </div>
                    <div className="confirmation-detail">
                      <span>Total Amount</span>
                      <span className="detail-value">$259.16</span>
                    </div>
                    <div className="confirmation-detail">
                      <span>Estimated Delivery</span>
                      <span className="detail-value">3-5 Business Days</span>
                    </div>
                  </div>

                  <p className="confirmation-message">
                    A confirmation email has been sent to your inbox
                  </p>

                  <button className="continue-btn" onClick={() => window.location.href = '/'}>
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 4 && (
              <div className="step-navigation">
                <button 
                  className="btn-secondary"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>

                {currentStep === 3 ? (
                  <button 
                    className="btn-primary"
                    onClick={handlePayment}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                  </button>
                ) : (
                  <button 
                    className="btn-primary"
                    onClick={handleNextStep}
                  >
                    Next
                    <ChevronRight size={20} />
                  </button>
                )}
              </div>
            )}

            {currentStep === 4 && (
              <div className="step-navigation">
                <button 
                  className="btn-primary"
                  onClick={() => window.location.href = '/'}
                >
                  Back to Home
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="order-summary-sidebar">
            <div className="summary-card-sticky">
              <h3>Order Summary</h3>
              
              <div className="summary-items">
                <div className="summary-item">
                  <span className="item-name">Premium Denim Jeans x2</span>
                  <span className="item-price">$159.98</span>
                </div>
                <div className="summary-item">
                  <span className="item-name">Summer Dress</span>
                  <span className="item-price">$49.99</span>
                </div>
                <div className="summary-item">
                  <span className="item-name">Classic White T-Shirt</span>
                  <span className="item-price">$29.99</span>
                </div>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>$239.96</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free-shipping">FREE</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>$19.20</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total</span>
                <span className="total-amount">$259.16</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;