// src/pages/CartPage.jsx - UPDATED WITH L.E CURRENCY
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, ArrowLeft, Trash2, Plus, Minus, Tag, Truck, Shield, CreditCard } from 'lucide-react';
import './CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('ecommerceCartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [couponCode, setCouponCode] = useState('');
  const [shippingMethod, setShippingMethod] = useState('free');

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('ecommerceCartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Format price in L.E
  const formatPrice = (price) => {
    return `${price.toLocaleString()} L.E`;
  };

  // Get the actual price (use basePrice instead of price)
  const getProductPrice = (item) => {
    return item.discountPrice || item.basePrice || item.price || 0;
  };

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => {
    const price = getProductPrice(item);
    return sum + (price * (item.quantity || 1));
  }, 0);

  const shippingCost = shippingMethod === 'express' ? 60 : shippingMethod === 'standard' ? 30 : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingCost + tax;

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.itemId === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.itemId !== itemId));
  };

  const clearCart = () => {
    if(window.confirm("Are you sure you want to clear your cart?")) {
      setCartItems([]);
    }
  };

  return (
    <div className="cart-page">
      <header className="cart-header">
        <div className="container">
          <h1><ShoppingCart size={32} /> Shopping Cart</h1>
          <p>Review your items and proceed to checkout</p>
        </div>
      </header>

      <div className="main-cart-content">
        <div className="simple-nav">
          <Link to="/products" className="nav-link">All Products</Link>
          <Link to="/cart" className="nav-link active">
            <ShoppingCart size={18} /> Cart ({cartItems.length})
          </Link>
          <Link to="/wishlist" className="nav-link">
            <Heart size={18} /> Wishlist
          </Link>
          <Link to="/customer-dashboard" className="nav-link">My Account</Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-content">
              <ShoppingCart size={64} className="empty-cart-icon" />
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added anything yet!</p>
              <Link to="/products" className="continue-shopping-btn">
                <ArrowLeft size={18} /> Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-column">
              <div className="cart-section-header">
                <h2>Items ({cartItems.length})</h2>
                <button className="clear-cart-btn" onClick={clearCart}>
                  <Trash2 size={16} /> Clear
                </button>
              </div>

              <div className="cart-items-list">
                {cartItems.map(item => {
                  const itemPrice = getProductPrice(item);
                  const itemTotal = itemPrice * (item.quantity || 1);
                  
                  return (
                    <div key={item.itemId} className="cart-item-card">
                      <div className="cart-item-image">
                        <img src={item.image} alt={item.name} />
                        {item.discountPrice && item.basePrice && (
                          <div className="cart-item-discount">
                            -{Math.round(((item.basePrice - item.discountPrice) / item.basePrice) * 100)}%
                          </div>
                        )}
                      </div>
                      <div className="cart-item-info">
                        <div className="item-header">
                          <h3>{item.name}</h3>
                          <button onClick={() => removeItem(item.itemId)} className="remove-item-btn">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="item-description">{item.description}</p>
                        <div className="item-attributes">
                          <span className="attribute">Size: {item.size || 'M'}</span>
                          <span className="attribute">Color: {item.color || 'Default'}</span>
                        </div>
                        <div className="stock-status in-stock">In Stock</div>
                        <div className="quantity-controls">
                          <button 
                            className="quantity-btn" 
                            onClick={() => updateQuantity(item.itemId, (item.quantity || 1) - 1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="quantity-display">{item.quantity || 1}</span>
                          <button 
                            className="quantity-btn" 
                            onClick={() => updateQuantity(item.itemId, (item.quantity || 1) + 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="cart-item-pricing">
                        <div className="price-info">
                          <span className="current-price">{formatPrice(itemTotal)}</span>
                          {item.discountPrice && item.basePrice && (
                            <span className="original-price">{formatPrice(item.basePrice * (item.quantity || 1))}</span>
                          )}
                        </div>
                        <div className="item-total">
                          {item.quantity || 1} × {formatPrice(itemPrice)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <aside className="order-summary-column">
              <div className="order-summary-card">
                <h2>Summary</h2>
                
                {/* Coupon Section */}
                <div className="coupon-section">
                  <div className="coupon-input-group">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="coupon-input"
                    />
                    <button className="apply-coupon-btn">
                      <Tag size={16} /> Apply
                    </button>
                  </div>
                  <p className="coupon-hint">Try: SAVE10 for 10% off</p>
                </div>

                {/* Shipping Section */}
                <div className="shipping-section">
                  <h3><Truck size={18} /> Shipping</h3>
                  <div className="shipping-options">
                    <label className={`shipping-option ${shippingMethod === 'free' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="shipping"
                        value="free"
                        checked={shippingMethod === 'free'}
                        onChange={(e) => setShippingMethod(e.target.value)}
                      />
                      <div>
                        <strong>Free Shipping</strong>
                        <span>5-7 business days</span>
                      </div>
                      <span className="shipping-price">{formatPrice(0)}</span>
                    </label>
                    <label className={`shipping-option ${shippingMethod === 'standard' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="shipping"
                        value="standard"
                        checked={shippingMethod === 'standard'}
                        onChange={(e) => setShippingMethod(e.target.value)}
                      />
                      <div>
                        <strong>Standard Shipping</strong>
                        <span>3-5 business days</span>
                      </div>
                      <span className="shipping-price">{formatPrice(30)}</span>
                    </label>
                    <label className={`shipping-option ${shippingMethod === 'express' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="shipping"
                        value="express"
                        checked={shippingMethod === 'express'}
                        onChange={(e) => setShippingMethod(e.target.value)}
                      />
                      <div>
                        <strong>Express Shipping</strong>
                        <span>1-2 business days</span>
                      </div>
                      <span className="shipping-price">{formatPrice(60)}</span>
                    </label>
                  </div>
                </div>

                {/* Summary Details */}
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>{formatPrice(shippingCost)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax (8%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <button className="checkout-btn">
                  <CreditCard size={20} /> Checkout
                </button>

                {/* Security Guarantee */}
                <div className="security-guarantee">
                  <div className="security-item">
                    <Shield size={20} color="#667eea" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="security-item">
                    <Truck size={20} color="#667eea" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="security-item">
                    <Tag size={20} color="#667eea" />
                    <span>30-Day Returns</span>
                  </div>
                </div>

                <div className="cart-suggestions">
                  <Link to="/products" className="continue-shopping-bottom">
                    <ArrowLeft size={16} /> Continue Shopping
                  </Link>
                  <Link to="/wishlist" className="view-wishlist-bottom">
                    <Heart size={16} /> View Wishlist
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;