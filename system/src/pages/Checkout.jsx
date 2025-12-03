import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import { ShoppingCart, Truck, Lock, Clock, ChevronRight, ChevronLeft, User, Package } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate(); // Add this hook
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });

  // Product data with images
  const cartItems = [
    {
      id: 1,
      name: 'Premium Denim Jeans',
      price: 79.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
      color: 'Blue',
      size: '32'
    },
    {
      id: 2,
      name: 'Summer Dress',
      price: 49.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1569312528166-a369be7f1231?w=400&h=400&fit=crop',
      color: 'Red',
      size: 'M'
    },
    {
      id: 3,
      name: 'Classic White T-Shirt',
      price: 29.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      color: 'White',
      size: 'L'
    }
  ];

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleOrder = () => {
    setLoading(true);
    console.log("Processing Cash on Delivery Order:", { ...formData, cartItems, total });
    
    // Simulate API call
    setTimeout(() => {
      setCurrentStep(3); // Skip to confirmation (step 3)
      setLoading(false);
    }, 2000);
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle continue shopping
  const handleContinueShopping = () => {
    navigate('/dashboard'); // Redirect to dashboard
  };

  return (
    <div className="checkout-page-full-width">
      {/* Progress Steps - Now only 3 steps */}
      <div className="checkout-progress">
        <div className="progress-steps-container">
          <div className="progress-steps">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div 
                  className={`step ${currentStep >= step ? 'active' : ''} ${step <= currentStep ? 'clickable' : ''}`}
                  onClick={() => goToStep(step)}
                >
                  <div className="step-number">{step}</div>
                  <span className="step-label">
                    {step === 1 && 'Shipping'}
                    {step === 2 && 'Review'}
                    {step === 3 && 'Complete'}
                  </span>
                </div>
                {step < 3 && <div className={`step-line ${currentStep > step ? 'completed' : ''}`}></div>}
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
            <strong>Cash on Delivery</strong>
            <span>Pay when you receive</span>
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
          {/* Main Checkout Content */}
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
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+1 (123) 456-7890"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Street Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="123 Main Street"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="New York"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="zipCode">Zip Code *</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        placeholder="10001"
                        required
                        value={formData.zipCode}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Cash on Delivery Notice */}
                  <div className="cash-notice">
                    <div className="cash-icon">💵</div>
                    <div className="cash-text">
                      <strong>Cash on Delivery Only</strong>
                      <p>Pay with cash when your order arrives. No upfront payment required.</p>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Review (now step 2) */}
            {currentStep === 2 && (
              <div className="step-container active">
                <div className="section-header">
                  <ShoppingCart size={32} className="header-icon" />
                  <h1>Review Your Order</h1>
                </div>

                <div className="review-section">
                  {/* Products with Images */}
                  <div className="review-card">
                    <h3>Order Items</h3>
                    <div className="review-items-with-images">
                      {cartItems.map(item => (
                        <div key={item.id} className="review-item-with-image">
                          <div className="item-image-container">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="product-image"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/80x80?text=Product';
                              }}
                            />
                          </div>
                          <div className="item-details">
                            <h4>{item.name}</h4>
                            <div className="item-variants">
                              <span className="variant">Color: {item.color}</span>
                              <span className="variant">Size: {item.size}</span>
                              <span className="variant">Qty: {item.quantity}</span>
                            </div>
                          </div>
                          <div className="item-price-total">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="review-divider"></div>

                    <div className="review-summary">
                      <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="summary-row">
                        <span>Shipping</span>
                        <span className="free-shipping">FREE</span>
                      </div>
                      <div className="summary-row">
                        <span>Tax (8%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="review-total">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="review-card">
                    <h3>Shipping Address</h3>
                    <p className="address-text">
                      {formData.fullName}<br/>
                      {formData.address}<br/>
                      {formData.city}, {formData.zipCode}<br/>
                      {formData.email}<br/>
                      {formData.phone}
                    </p>
                  </div>

                  {/* Payment Method - Always Cash */}
                  <div className="review-card">
                    <h3>Payment Method</h3>
                    <div className="payment-method-review">
                      <div className="cash-icon-small">💵</div>
                      <div>
                        <strong>Cash on Delivery</strong>
                        <p>Pay ${total.toFixed(2)} in cash when your order arrives</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation (now step 3) */}
            {currentStep === 3 && (
              <div className="step-container active">
                <div className="success-container">
                  <div className="success-icon">✓</div>
                  <h1>Order Placed Successfully!</h1>
                  <p className="success-message">Your cash on delivery order has been confirmed</p>
                  
                  {/* Show ordered products */}
                  <div className="order-confirmation-products">
                    <h4>Your Order:</h4>
                    <div className="confirmation-products">
                      {cartItems.map(item => (
                        <div key={item.id} className="confirmation-product">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="confirmation-product-image"
                          />
                          <div className="confirmation-product-info">
                            <span>{item.name} x{item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="order-confirmation">
                    <div className="confirmation-detail">
                      <span>Order Number</span>
                      <span className="detail-value">#COD-{Date.now().toString().slice(-6)}</span>
                    </div>
                    <div className="confirmation-detail">
                      <span>Total to Pay</span>
                      <span className="detail-value">${total.toFixed(2)}</span>
                    </div>
                    <div className="confirmation-detail">
                      <span>Payment Method</span>
                      <span className="detail-value">Cash on Delivery</span>
                    </div>
                    <div className="confirmation-detail">
                      <span>Estimated Delivery</span>
                      <span className="detail-value">2-3 Business Days</span>
                    </div>
                  </div>

                  <p className="confirmation-message">
                    A confirmation email has been sent to {formData.email || 'your email'}
                  </p>

                  {/* UPDATED BUTTON: Redirects to dashboard */}
                  <button className="continue-btn" onClick={handleContinueShopping}>
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 3 && (
              <div className="step-navigation">
                <button 
                  className="btn-secondary"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>

                {currentStep === 2 ? (
                  <button 
                    className="btn-primary"
                    onClick={handleOrder}
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
          </div>

          {/* Order Summary Sidebar (with product images) */}
          <div className="order-summary-sidebar">
            <div className="summary-card-sticky">
              <h3>Order Summary</h3>
              
              {/* Products in sidebar with images */}
              <div className="sidebar-products">
                {cartItems.map(item => (
                  <div key={item.id} className="sidebar-product-item">
                    <div className="sidebar-product-image">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/50x50?text=Product';
                        }}
                      />
                    </div>
                    <div className="sidebar-product-details">
                      <span className="product-name">{item.name} x{item.quantity}</span>
                      <span className="product-price">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free-shipping">FREE</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total</span>
                <span className="total-amount">${total.toFixed(2)}</span>
              </div>

              {/* Payment Method in Sidebar */}
              <div className="sidebar-payment-info">
                <div className="payment-method-display">
                  <span className="payment-icon">💵</span>
                  <div>
                    <strong>Cash on Delivery</strong>
                    <p>Pay when you receive</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;