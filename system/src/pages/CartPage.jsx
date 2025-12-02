// src/pages/CartPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, Tag, ArrowRight, Package, Shield, Truck, CreditCard } from 'lucide-react';
import './CartPage.css';

const CartPage = () => {
  // Mock cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Premium Denim Jacket',
      description: 'High-quality denim jacket with premium finish',
      price: 89.99,
      discountPrice: 79.99,
      size: 'M',
      color: 'Blue',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=400&h=400&fit=crop',
      inStock: true
    },
    {
      id: 2,
      name: 'Classic White T-Shirt',
      description: '100% cotton comfortable t-shirt',
      price: 24.99,
      discountPrice: 19.99,
      size: 'L',
      color: 'White',
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w-400&h=400&fit=crop',
      inStock: true
    },
    {
      id: 3,
      name: 'Leather Boots',
      description: 'Premium leather boots for all seasons',
      price: 129.99,
      discountPrice: null,
      size: '42',
      color: 'Black',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',
      inStock: true
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [shippingMethod, setShippingMethod] = useState('standard');

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.discountPrice || item.price;
    return sum + (price * item.quantity);
  }, 0);

  const shippingCost = shippingMethod === 'express' ? 15.99 : shippingMethod === 'standard' ? 7.99 : 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shippingCost + tax;

  // Cart functions
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'save10') {
      alert('Coupon applied! You got 10% off.');
    } else if (couponCode) {
      alert('Invalid coupon code');
    }
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
    // In real app, navigate to checkout page
  };

  return (
    <div className="cart-page">
      {/* Page Header */}
      <header className="cart-header">
        <div className="container">
          <h1><ShoppingCart size={32} /> Shopping Cart</h1>
          <p>Review your items and proceed to checkout</p>
        </div>
      </header>

      <div className="container">
        <div className="cart-layout">
          {/* Left Column - Cart Items */}
          <div className="cart-items-column">
            {/* Cart Header */}
            <div className="cart-section-header">
              <h2>Your Cart ({cartItems.length} items)</h2>
              <Link to="/products" className="continue-shopping">
                <ArrowRight size={16} />
                Continue Shopping
              </Link>
            </div>

            {/* Empty Cart State */}
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <ShoppingCart size={64} className="empty-cart-icon" />
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <Link to="/products" className="shop-now-btn">
                  Browse Products
                </Link>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="cart-items-list">
                  {cartItems.map(item => (
                    <div key={item.id} className="cart-item-card">
                      {/* Product Image */}
                      <div className="cart-item-image">
                        <img src={item.image} alt={item.name} />
                        {!item.inStock && (
                          <span className="out-of-stock-badge">Out of Stock</span>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="cart-item-info">
                        <div className="item-header">
                          <h3>{item.name}</h3>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="remove-item-btn"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        
                        <p className="item-description">{item.description}</p>
                        
                        <div className="item-attributes">
                          <span className="attribute">
                            <strong>Size:</strong> {item.size}
                          </span>
                          <span className="attribute">
                            <strong>Color:</strong> {item.color}
                          </span>
                          <span className={`stock-status ${item.inStock ? 'in-stock' : 'out-of-stock'}`}>
                            {item.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="quantity-controls">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="quantity-btn"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="quantity-btn"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Price and Total */}
                      <div className="cart-item-pricing">
                        <div className="price-info">
                          {item.discountPrice ? (
                            <>
                              <span className="current-price">${item.discountPrice.toFixed(2)}</span>
                              <span className="original-price">${item.price.toFixed(2)}</span>
                              <span className="discount-badge">
                                Save ${(item.price - item.discountPrice).toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="current-price">${item.price.toFixed(2)}</span>
                          )}
                        </div>
                        <div className="item-total">
                          <span>Total:</span>
                          <strong>
                            ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                          </strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Actions */}
                <div className="cart-actions">
                  <button 
                    onClick={() => setCartItems([])}
                    className="clear-cart-btn"
                  >
                    <Trash2 size={16} />
                    Clear Cart
                  </button>
                  <Link to="/wishlist" className="view-wishlist">
                    View Wishlist
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="order-summary-column">
            <div className="order-summary-card">
              <h2>Order Summary</h2>
              
              {/* Coupon Section */}
              <div className="coupon-section">
                <h3><Tag size={18} /> Apply Coupon</h3>
                <div className="coupon-input-group">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="coupon-input"
                  />
                  <button onClick={applyCoupon} className="apply-coupon-btn">
                    Apply
                  </button>
                </div>
                <p className="coupon-hint">Try code: SAVE10 for 10% off</p>
              </div>

              {/* Shipping Options */}
              <div className="shipping-section">
                <h3><Truck size={18} /> Shipping Method</h3>
                <div className="shipping-options">
                  <label className="shipping-option">
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
                    <span className="shipping-price">$0.00</span>
                  </label>
                  
                  <label className="shipping-option">
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
                    <span className="shipping-price">$7.99</span>
                  </label>
                  
                  <label className="shipping-option">
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
                    <span className="shipping-price">$15.99</span>
                  </label>
                </div>
              </div>

              {/* Order Summary */}
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <strong>Total</strong>
                  <strong>${total.toFixed(2)}</strong>
                </div>
              </div>

              {/* Checkout Button */}
              <button 
                onClick={handleCheckout}
                className="checkout-btn"
                disabled={cartItems.length === 0}
              >
                <CreditCard size={20} />
                Proceed to Checkout
              </button>

              {/* Security & Guarantee */}
              <div className="security-guarantee">
                <div className="security-item">
                  <Shield size={20} />
                  <span>Secure Payment</span>
                </div>
                <div className="security-item">
                  <Package size={20} />
                  <span>Free Returns</span>
                </div>
              </div>

              {/* Continue Shopping */}
              <Link to="/products" className="continue-shopping-bottom">
                <ArrowRight size={16} />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;