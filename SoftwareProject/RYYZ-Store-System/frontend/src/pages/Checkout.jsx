import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaLock, FaTruck, FaCreditCard, FaCheck, FaArrowLeft, FaShoppingBag, FaMoneyBillWave } from 'react-icons/fa';
import { useCart } from '../Contexts/CartContext';
import Header from '../components/Header/Header';
import './Checkout.css';

const Checkout = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  
  // ADD THESE TWO STATE VARIABLES:
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'cod'

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Egypt'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });

  const [shippingMethod, setShippingMethod] = useState('standard');

  const subtotal = getCartTotal();
  const shippingCost = shippingMethod === 'express' ? 100 : subtotal > 200 ? 0 : 50;
  const tax = subtotal * 0.14; // 14% tax
  const total = subtotal + shippingCost + tax;

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateShipping = () => {
    const { firstName, lastName, email, phone, address, city, zipCode } = shippingInfo;
    return firstName && lastName && email && phone && address && city && zipCode;
  };

  const validatePayment = () => {
    if (paymentMethod === 'cod') {
      return true; // No validation needed for COD
    }
    // Validate card payment
    return paymentInfo.cardNumber && paymentInfo.cardName && paymentInfo.expiryDate && paymentInfo.cvv;
  };

  const handleNextStep = () => {
    setError(''); // Clear any previous errors
    if (currentStep === 1 && !validateShipping()) {
      setError('Please fill in all shipping information');
      return;
    }
    if (currentStep === 2 && !validatePayment()) {
      setError('Please fill in all payment information');
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setError(''); // Clear any previous errors
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
  try {
    setIsLoading(true);
    setError('');
    
    // Check if user is logged in
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('You need to be logged in to place an order');
      alert('Please login first');
      navigate('/login');
      return;
    }
    
    // Check if user object exists
    if (!user) {
      setError('User session expired. Please login again.');
      alert('Session expired. Please login again.');
      navigate('/login');
      return;
    }
    
    // Prepare order data
    const orderData = {
      subtotal: subtotal,
      shipping_cost: shippingCost,
      tax: tax,
      total: total,
      payment_method: paymentMethod === 'cod' ? 'cod' : 'card',
      shipping_address: {
        name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        address: shippingInfo.address,
        city: shippingInfo.city,
        zipCode: shippingInfo.zipCode,
        country: shippingInfo.country || 'Egypt',
        phone: shippingInfo.phone
      },
      items: cartItems.map(item => ({
        name: item.name,
        image: item.image,
        size: item.selectedSize,
        color: item.selectedColor,
        quantity: item.quantity,
        price: item.price
      })),
      customer_email: shippingInfo.email || user?.email
    };
    
    console.log('Creating order with data:', orderData);
    console.log('Using token:', token.substring(0, 20) + '...'); // Log first 20 chars
    
    // Use the new create endpoint
    const response = await fetch('http://127.0.0.1:8000/api/orders/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });
    
    console.log('Response status:', response.status);
    
    if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      setError('Session expired. Please login again.');
      alert('Session expired. Please login again.');
      navigate('/login');
      return;
    }
    
    const result = await response.json();
    
    if (response.ok && result.success) {
      console.log('✅ Order created successfully!');
      console.log('Order Number:', result.order_number);
      console.log('Order ID:', result.order_id);
      
      // Clear cart
      clearCart();
      
      // Navigate to confirmation page
      navigate('/order-confirmation', { 
        state: { 
          orderNumber: result.order_number,
          orderId: result.order_id,
          emailSent: result.email_sent
        } 
      });
    } else {
      throw new Error(result.detail || result.error || 'Failed to create order');
    }
    
  } catch (error) {
    console.error('❌ Error placing order:', error);
    setError(error.message || 'Failed to place order. Please try again.');
    alert(error.message || 'Failed to place order. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

  const handleSearch = (query) => {
    console.log('Searching:', query);
  };

  if (cartItems.length === 0 && currentStep === 1) {
    return (
      <div className="checkout-page">
        <Header user={user} onLogout={onLogout} onSearch={handleSearch} />
        <div className="empty-checkout">
          <FaShoppingBag className="empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Add some products before checking out</p>
          <Link to="/" className="btn-shop-now">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Header user={user} onLogout={onLogout} onSearch={handleSearch} />

      {/* Breadcrumb */}
      <div className="breadcrumb-checkout">
        <Link to="/">Home</Link>
        <span className="separator">/</span>
        <Link to="/cart">Cart</Link>
        <span className="separator">/</span>
        <span className="active">Checkout</span>
      </div>

      {/* Progress Steps */}
      <div className="checkout-steps">
        <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
          <div className="step-number">{currentStep > 1 ? <FaCheck /> : '1'}</div>
          <span>Shipping</span>
        </div>
        <div className="step-line"></div>
        <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
          <div className="step-number">{currentStep > 2 ? <FaCheck /> : '2'}</div>
          <span>Payment</span>
        </div>
        <div className="step-line"></div>
        <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <span>Review</span>
        </div>
      </div>

      <div className="checkout-container">
        {/* Main Content */}
        <div className="checkout-main">
          {/* Show error message */}
          {error && (
            <div className="error-message" style={{ 
              color: '#ef4444', 
              backgroundColor: '#fee2e2', 
              padding: '12px', 
              borderRadius: '8px', 
              marginBottom: '16px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          {/* Step 1: Shipping Information */}
          {currentStep === 1 && (
            <div className="checkout-section">
              <h2><FaTruck /> Shipping Information</h2>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={handleShippingChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={handleShippingChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleShippingChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleShippingChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Address *</label>
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                  placeholder="Street address"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleShippingChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleShippingChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="form-group">
                  <label>Zip Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleShippingChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Country</label>
                <select 
                  name="country" 
                  value={shippingInfo.country} 
                  onChange={handleShippingChange}
                  disabled={isLoading}
                >
                  <option value="Egypt">Egypt</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="UAE">UAE</option>
                </select>
              </div>

              <div className="shipping-method-section">
                <h3>Shipping Method</h3>
                <div className="shipping-options">
                  <label className={`shipping-option ${shippingMethod === 'standard' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      disabled={isLoading}
                    />
                    <div className="option-content">
                      <span className="option-name">Standard Delivery (3-5 days)</span>
                      <span className="option-price">{subtotal > 200 ? 'FREE' : '50 LE'}</span>
                    </div>
                  </label>
                  <label className={`shipping-option ${shippingMethod === 'express' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      disabled={isLoading}
                    />
                    <div className="option-content">
                      <span className="option-name">Express Delivery (1-2 days)</span>
                      <span className="option-price">100 LE</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment Information */}
          {currentStep === 2 && (
            <div className="checkout-section">
              <h2>💳 Payment Method</h2>

              <div className="payment-methods">
                <button 
                  className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                  disabled={isLoading}
                >
                  <FaCreditCard /> Credit/Debit Card
                </button>
                <button 
                  className={`payment-method ${paymentMethod === 'cod' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('cod')}
                  disabled={isLoading}
                >
                  <FaMoneyBillWave /> Cash on Delivery
                </button>
              </div>

              {paymentMethod === 'card' ? (
                <div className="card-payment-form">
                  <div className="form-group">
                    <label>Card Number *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={handlePaymentChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="form-group">
                    <label>Cardholder Name *</label>
                    <input
                      type="text"
                      name="cardName"
                      value={paymentInfo.cardName}
                      onChange={handlePaymentChange}
                      placeholder="Name on card"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Expiry Date *</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={handlePaymentChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentInfo.cvv}
                        onChange={handlePaymentChange}
                        placeholder="123"
                        maxLength="4"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="form-group-checkbox">
                    <label>
                      <input
                        type="checkbox"
                        name="saveCard"
                        checked={paymentInfo.saveCard}
                        onChange={handlePaymentChange}
                        disabled={isLoading}
                      />
                      <span>Save card for future purchases</span>
                    </label>
                  </div>

                  <div className="security-note">
                    <FaLock />
                    <span>Your payment information is encrypted and secure</span>
                  </div>
                </div>
              ) : (
                <div className="cod-payment-info">
                  <div className="cod-info-box">
                    <FaMoneyBillWave className="cod-icon" />
                    <h3>Cash on Delivery</h3>
                    <p>Pay with cash when your order is delivered to your doorstep.</p>
                    <ul className="cod-features">
                      <li>✓ No advance payment required</li>
                      <li>✓ Pay only when you receive your order</li>
                      <li>✓ Inspect products before payment</li>
                      <li>✓ Safe and convenient</li>
                    </ul>
                  </div>
                  <div className="cod-note">
                    <FaLock />
                    <span>Please keep exact change ready for smooth delivery</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review Order */}
          {currentStep === 3 && (
            <div className="checkout-section">
              <h2><FaCheck /> Review Your Order</h2>

              <div className="review-section">
                <h3>Shipping Address</h3>
                <div className="review-info">
                  <p><strong>{shippingInfo.firstName} {shippingInfo.lastName}</strong></p>
                  <p>{shippingInfo.address}</p>
                  <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                  <p>{shippingInfo.country}</p>
                  <p>Phone: {shippingInfo.phone}</p>
                  <p>Email: {shippingInfo.email}</p>
                </div>
                <button 
                  className="btn-edit-review" 
                  onClick={() => setCurrentStep(1)}
                  disabled={isLoading}
                >
                  Edit
                </button>
              </div>

              <div className="review-section">
                <h3>Payment Method</h3>
                <div className="review-info">
                  {paymentMethod === 'card' ? (
                    <p><FaCreditCard /> Credit Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
                  ) : (
                    <p><FaMoneyBillWave /> Cash on Delivery</p>
                  )}
                </div>
                <button 
                  className="btn-edit-review" 
                  onClick={() => setCurrentStep(2)}
                  disabled={isLoading}
                >
                  Edit
                </button>
              </div>

              <div className="review-section">
                <h3>Order Items</h3>
                <div className="review-items">
                  {cartItems.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="review-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-details-review">
                        <h4>{item.name}</h4>
                        <p>Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                        <p>Qty: {item.quantity}</p>
                      </div>
                      <span className="item-price-review">{(item.price * item.quantity).toFixed(2)} LE</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="checkout-navigation">
            {currentStep > 1 && (
              <button 
                className="btn-back" 
                onClick={handlePreviousStep}
                disabled={isLoading}
              >
                <FaArrowLeft /> Back
              </button>
            )}
            {currentStep < 3 ? (
              <button 
                className="btn-next" 
                onClick={handleNextStep}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Continue'}
              </button>
            ) : (
              <button 
                className="btn-place-order" 
                onClick={handlePlaceOrder}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span> Processing...
                  </>
                ) : (
                  <>
                    <FaLock /> Place Order
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="checkout-sidebar">
          <div className="order-summary-checkout">
            <h3>Order Summary</h3>

            <div className="summary-items-mini">
              {cartItems.slice(0, 3).map((item, index) => (
                <div key={`${item.id}-${index}`} className="summary-item-mini">
                  <img src={item.image} alt={item.name} />
                  <span className="item-qty-mini">×{item.quantity}</span>
                </div>
              ))}
              {cartItems.length > 3 && (
                <div className="more-items-mini">+{cartItems.length - 3}</div>
              )}
            </div>

            <div className="summary-details-checkout">
              <div className="summary-row-checkout">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} LE</span>
              </div>
              <div className="summary-row-checkout">
                <span>Shipping</span>
                <span className={shippingCost === 0 ? 'free-text' : ''}>
                  {shippingCost === 0 ? 'FREE' : `${shippingCost.toFixed(2)} LE`}
                </span>
              </div>
              <div className="summary-row-checkout">
                <span>Tax (14%)</span>
                <span>{tax.toFixed(2)} LE</span>
              </div>
              <div className="summary-divider-checkout"></div>
              <div className="summary-row-checkout total-row-checkout">
                <span>Total</span>
                <span>{total.toFixed(2)} LE</span>
              </div>
            </div>

            <div className="secure-checkout-badge">
              <FaLock />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Checkout.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};

export default Checkout;