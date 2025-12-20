import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Truck, Lock, Clock, ChevronRight, ChevronLeft, CreditCard } from 'lucide-react';
import { getCartFromStorage, formatPrice } from './CartPage'; // Importing your existing utilities
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState([]); // State for real cart items
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });

  // Load real data from localStorage on component mount
  useEffect(() => {
    const savedItems = getCartFromStorage();
    setCartItems(savedItems);
  }, []);

  // Calculate totals based on real cart data
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.discountPrice || item.price;
    return sum + (price * (item.quantity || 1));
  }, 0);
  
  const shipping = 0; // Free shipping as per your logic
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleOrder = () => {
    setLoading(true);
    
    // Simulate API call to process the order
    setTimeout(() => {
      // In a real app, you would clear the cart here
      // localStorage.removeItem('ecommerceCartItems'); 
      setCurrentStep(3); 
      setLoading(false);
    }, 2000);
  };

  const handleNextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const goToStep = (step) => {
    if (step <= currentStep) setCurrentStep(step);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Redirect back to your Customer Dashboard
  const handleContinueShopping = () => {
    navigate('/customer-dashboard');
  };

  return (
    <div className="checkout-page-full-width">
      {/* Progress Steps */}
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
                    <input type="text" id="fullName" name="fullName" placeholder="John Doe" required value={formData.fullName} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input type="email" id="email" name="email" placeholder="john@example.com" required value={formData.email} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input type="tel" id="phone" name="phone" placeholder="+20 1XX XXX XXXX" required value={formData.phone} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Street Address *</label>
                    <input type="text" id="address" name="address" placeholder="123 Street Name" required value={formData.address} onChange={handleInputChange} />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City *</label>
                      <input type="text" id="city" name="city" placeholder="Cairo" required value={formData.city} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="zipCode">Zip Code *</label>
                      <input type="text" id="zipCode" name="zipCode" placeholder="12345" required value={formData.zipCode} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="cash-notice">
                    <div className="cash-icon">💵</div>
                    <div className="cash-text">
                      <strong>Cash on Delivery Only</strong>
                      <p>Pay with cash when your order arrives.</p>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Review */}
            {currentStep === 2 && (
              <div className="step-container active">
                <div className="section-header">
                  <ShoppingCart size={32} className="header-icon" />
                  <h1>Review Your Order</h1>
                </div>

                <div className="review-section">
                  <div className="review-card">
                    <h3>Order Items</h3>
                    <div className="review-items-with-images">
                      {cartItems.map((item, idx) => (
                        <div key={item.itemId || idx} className="review-item-with-image">
                          <div className="item-image-container">
                            <img src={item.image} alt={item.name} className="product-image" />
                          </div>
                          <div className="item-details">
                            <h4>{item.name}</h4>
                            <div className="item-variants">
                              <span className="variant">Size: {item.size}</span>
                              <span className="variant">Qty: {item.quantity}</span>
                            </div>
                          </div>
                          <div className="item-price-total">
                            {formatPrice((item.discountPrice || item.price) * item.quantity)}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="review-divider"></div>
                    <div className="review-summary">
                      <div className="summary-row">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <div className="summary-row">
                        <span>Shipping</span>
                        <span className="free-shipping">FREE</span>
                      </div>
                      <div className="summary-row">
                        <span>Tax (8%)</span>
                        <span>{formatPrice(tax)}</span>
                      </div>
                    </div>
                    <div className="review-total">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="step-container active">
                <div className="success-container">
                  <div className="success-icon">✓</div>
                  <h1>Order Placed Successfully!</h1>
                  <p className="success-message">Your cash on delivery order has been confirmed</p>
                  
                  <div className="order-confirmation">
                    <div className="confirmation-detail">
                      <span>Order Number</span>
                      <span className="detail-value">#COD-{Date.now().toString().slice(-6)}</span>
                    </div>
                    <div className="confirmation-detail">
                      <span>Total to Pay</span>
                      <span className="detail-value">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <button className="continue-btn" onClick={handleContinueShopping}>
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 3 && (
              <div className="step-navigation">
                <button className="btn-secondary" onClick={handlePrevStep} disabled={currentStep === 1}>
                  <ChevronLeft size={20} /> Previous
                </button>
                {currentStep === 2 ? (
                  <button className="btn-primary" onClick={handleOrder} disabled={loading || cartItems.length === 0}>
                    {loading ? 'Processing...' : 'Place Order'}
                  </button>
                ) : (
                  <button className="btn-primary" onClick={handleNextStep}>
                    Next <ChevronRight size={20} />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="order-summary-sidebar">
            <div className="summary-card-sticky">
              <h3>Order Summary</h3>
              <div className="sidebar-products">
                {cartItems.map((item, idx) => (
                  <div key={item.itemId || idx} className="sidebar-product-item">
                    <div className="sidebar-product-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="sidebar-product-details">
                      <span className="product-name">{item.name} x{item.quantity}</span>
                      <span className="product-price">{formatPrice((item.discountPrice || item.price) * item.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="summary-divider"></div>
              <div className="summary-total">
                <span>Total</span>
                <span className="total-amount">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;