// src/pages/CartPage.jsx - UPDATED WITH NO EMPTY SPACE
import React, { useState } from 'react';
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

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.discountPrice || item.price;
    return sum + (price * (item.quantity || 1));
  }, 0);

  const shippingCost = shippingMethod === 'express' ? 15.99 : shippingMethod === 'standard' ? 7.99 : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingCost + tax;

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }
    
    setCartItems(cartItems.map(item => 
      item.itemId === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.itemId !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('ecommerceCartItems');
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      alert('Coupon applied! You saved 10%!');
      setCouponCode('');
    } else {
      alert('Invalid coupon code. Try "SAVE10"');
    }
  };

  // Save cart to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('ecommerceCartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="cart-page">
      {/* Header */}
      <header className="cart-header">
        <div className="container">
          <h1><ShoppingCart size={32} /> Shopping Cart</h1>
          <p>Review your items and proceed to checkout</p>
        </div>
      </header>

      {/* Navigation */}
      <div className="container">
        <div className="simple-nav">
          <Link to="/products" className="nav-link">All Products</Link>
          <Link to="/cart" className="nav-link active">
            <ShoppingCart size={18} /> Cart ({cartItems.length})
          </Link>
          <Link to="/wishlist" className="nav-link">
            <Heart size={18} /> Wishlist
          </Link>
          <Link to="/account" className="nav-link">My Account</Link>
        </div>
      </div>

      <div className="container">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-content">
              <div className="empty-cart-icon">
                <ShoppingCart size={64} />
              </div>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added any items yet</p>
              <div className="empty-cart-actions">
                <Link to="/products" className="continue-shopping-btn">
                  <ArrowLeft size={18} /> Continue Shopping
                </Link>
                <Link to="/wishlist" className="view-wishlist-btn">
                  <Heart size={18} /> View Wishlist
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Cart Items Column - No empty space */}
            <div className="cart-items-column">
              <div className="cart-section-header">
                <h2>Your Cart ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</h2>
                <div className="cart-header-actions">
                  <button className="clear-cart-btn" onClick={clearCart}>
                    <Trash2 size={16} /> Clear Cart
                  </button>
                  <Link to="/products" className="continue-shopping-link">
                    <ArrowLeft size={16} /> Continue Shopping
                  </Link>
                </div>
              </div>

              <div className="cart-items-list">
                {cartItems.map(item => {
                  const itemPrice = item.discountPrice || item.price;
                  const itemTotal = itemPrice * (item.quantity || 1);
                  
                  return (
                    <div key={item.itemId} className="cart-item-card">
                      <div className="cart-item-image">
                        <img src={item.image} alt={item.name} />
                        {item.discountPrice && (
                          <span className="cart-item-discount">
                            -{Math.round(((item.price - item.discountPrice) / item.price) * 100)}%
                          </span>
                        )}
                      </div>
                      
                      <div className="cart-item-info">
                        <div className="item-header">
                          <h3>{item.name}</h3>
                          <button 
                            className="remove-item-btn"
                            onClick={() => removeItem(item.itemId)}
                            title="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="item-description">{item.description}</p>
                        
                        <div className="item-attributes">
                          <span className="attribute">
                            Size: <strong>{item.selectedSize || item.sizes?.[0] || 'M'}</strong>
                          </span>
                          <span className="attribute">
                            Color: <strong>{item.selectedColor || item.colors?.[0] || 'Default'}</strong>
                          </span>
                          <span className={`stock-status ${item.inStock ? 'in-stock' : 'out-of-stock'}`}>
                            {item.inStock ? '✓ In Stock' : 'Out of Stock'}
                          </span>
                        </div>

                        <div className="quantity-controls">
                          <button 
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.itemId, (item.quantity || 1) - 1)}
                            disabled={(item.quantity || 1) <= 1}
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
                          <span className="current-price">${itemPrice.toFixed(2)}</span>
                          {item.discountPrice && (
                            <span className="original-price">${item.price.toFixed(2)}</span>
                          )}
                        </div>
                        <p className="item-total">
                          Total: <strong>${itemTotal.toFixed(2)}</strong>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary Column - Compact and right next to items */}
            <div className="order-summary-column">
              <div className="order-summary-card">
                <h2>Order Summary</h2>
                
                {/* Coupon Section */}
                <div className="coupon-section">
                  <div className="coupon-input-group">
                    <Tag size={18} />
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="coupon-input"
                    />
                    <button className="apply-coupon-btn" onClick={applyCoupon}>
                      Apply
                    </button>
                  </div>
                  <p className="coupon-hint">Try code: <strong>SAVE10</strong></p>
                </div>

                {/* Shipping Section */}
                <div className="shipping-section">
                  <h3><Truck size={20} /> Shipping</h3>
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
                        <strong>Standard</strong>
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
                        <strong>Express</strong>
                        <span>1-2 business days</span>
                      </div>
                      <span className="shipping-price">$15.99</span>
                    </label>
                  </div>
                </div>

                {/* Summary Details - Compact */}
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
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="summary-row total">
                    <span><strong>Total</strong></span>
                    <span><strong>${total.toFixed(2)}</strong></span>
                  </div>
                </div>

                <button className="checkout-btn">
                  <CreditCard size={20} /> Proceed to Checkout
                </button>

                <div className="security-guarantee">
                  <div className="security-item">
                    <Shield size={16} />
                    <span>Secure Payment</span>
                  </div>
                  <div className="security-item">
                    <Truck size={16} />
                    <span>Free Returns</span>
                  </div>
                  <div className="security-item">
                    <Tag size={16} />
                    <span>Price Match</span>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;