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

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.discountPrice || item.price;
    return sum + (price * (item.quantity || 1));
  }, 0);

  const shippingCost = shippingMethod === 'express' ? 15.99 : shippingMethod === 'standard' ? 7.99 : 0;
  const tax = subtotal * 0.08; 
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
                {cartItems.map(item => (
                  <div key={item.itemId} className="cart-item-card">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-info">
                      <div className="item-header">
                        <h3>{item.name}</h3>
                        <button onClick={() => removeItem(item.itemId)} className="remove-item-btn">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="item-attributes">
                        <span className="attribute">Size: {item.size || 'M'}</span>
                        <span className="attribute">Color: {item.color || 'Default'}</span>
                      </div>
                      <div className="quantity-controls">
                        <button className="quantity-btn" onClick={() => updateQuantity(item.itemId, (item.quantity || 1) - 1)}><Minus size={14} /></button>
                        <span className="quantity-display">{item.quantity || 1}</span>
                        <button className="quantity-btn" onClick={() => updateQuantity(item.itemId, (item.quantity || 1) + 1)}><Plus size={14} /></button>
                      </div>
                    </div>
                    <div className="cart-item-pricing">
                      <span className="current-price">{formatPrice(((item.discountPrice || item.price) * (item.quantity || 1)))}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="order-summary-column">
              <div className="order-summary-card">
                <h2>Summary</h2>
                <div className="summary-details">
                  <div className="summary-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                  <div className="summary-row"><span>Shipping</span><span>{formatPrice(shippingCost)}</span></div>
                  <div className="summary-row"><span>Tax</span><span>{formatPrice(tax)}</span></div>
                  <div className="summary-row total"><span>Total</span><span>{formatPrice(total)}</span></div>
                </div>
                <button className="checkout-btn"><CreditCard size={20} /> Checkout</button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;