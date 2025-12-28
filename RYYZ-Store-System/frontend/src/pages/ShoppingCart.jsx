import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../Contexts/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft, FaTruck, FaLock, FaTag, FaShoppingCart, FaCheck } from 'react-icons/fa';
import Header from '../components/Header/Header';
import './ShoppingCart.css';

const ShoppingCart = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [notification, setNotification] = useState('');

  const subtotal = getCartTotal();
  const shipping = subtotal > 200 ? 0 : 50.00; // Free shipping over 200 LE
  const discount = promoApplied ? subtotal * 0.1 : 0; // 10% discount
  const total = subtotal + shipping - discount;

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(item.id, item.selectedSize, item.selectedColor, newQuantity);
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id, item.selectedSize, item.selectedColor);
    showNotification('Item removed from cart');
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setPromoApplied(true);
      showNotification('Promo code applied! 10% discount');
    } else {
      showNotification('Invalid promo code');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showNotification('Your cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  const handleSearch = (query) => {
    console.log('Searching:', query);
  };

  if (cartItems.length === 0) {
  return (
    <div className="shopping-cart-page">
      <Header user={user} onLogout={onLogout} onSearch={handleSearch} />
      
      {notification && <div className="notification-toast">{notification}</div>}

      <div className="empty-cart-container">
        <FaShoppingCart className="empty-cart-icon" />
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet</p>
        <Link to="/" className="continue-shopping-btn">
          <FaArrowLeft /> Continue Shopping
        </Link>
      </div>
    </div>
  );
  }

  return (
    <div className="shopping-cart-page">
      <Header user={user} onLogout={onLogout} onSearch={handleSearch} />
      {notification && <div className="notification-toast">{notification}</div>}

      {/* Hero Section */}
      <div className="cart-hero">
        <FaShoppingCart className="cart-hero-icon" />
        <h1>Shopping Cart</h1>
        <p>{cartItems.length} items in your cart</p>
      </div>

      <div className="cart-container-new">
        {/* Left Side - Cart Items */}
        <div className="cart-section">
          <h2 className="section-title">Order Details</h2>

          <div className="cart-items-list-new">
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="cart-item-card">
                <div className="item-image-new">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="item-info-new">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">{item.price} LE</p>
                  <p className="item-status">
                    {item.stock > 0 ? (
                      <span className="in-stock"><FaCheck /> In Stock</span>
                    ) : (
                      <span className="out-stock">Out in stock</span>
                    )}
                  </p>
                  
                  <div className="item-options">
                    <span className="option-badge">Size: {item.selectedSize}</span>
                    <span className="option-badge">Color: {item.selectedColor}</span>
                  </div>

                  <div className="item-actions">
                    <div className="quantity-controls-new">
                      <button onClick={() => handleQuantityChange(item, item.quantity - 1)}><FaMinus /></button>
                      <input type="number" value={item.quantity} readOnly />
                      <button onClick={() => handleQuantityChange(item, item.quantity + 1)}><FaPlus /></button>
                    </div>

                    <button className="action-btn" onClick={() => handleRemoveItem(item)}>
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>

                <div className="item-price-right">
                  <p className="price-label">Total</p>
                  <p className="price-amount">{(item.price * item.quantity).toFixed(2)} LE</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Summary */}
        <div className="summary-section">
          <div className="summary-card">
            <h3 className="summary-title">Order Summary</h3>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span className="summary-value">{subtotal.toFixed(2)} LE</span>
              </div>
              <div className="summary-row">
                <span>Shipping <FaTruck /></span>
                <span className="summary-value">{shipping > 0 ? `${shipping.toFixed(2)} LE` : 'FREE'}</span>
              </div>
              {discount > 0 && (
                <div className="summary-row discount-row">
                  <span>Discount <FaTag /></span>
                  <span className="summary-value discount-amount">-{discount.toFixed(2)} LE</span>
                </div>
              )}
            </div>

            <div className="divider"></div>

            <div className="total-section">
              <span className="total-label">Total Amount</span>
              <p className="total-amount">{total.toFixed(2)} LE</p>
            </div>

            <button className="checkout-btn-new" onClick={handleCheckout}>
              <FaLock /> Proceed to Checkout
            </button>
            
            <Link to="/" className="continue-link">
              Continue shopping
            </Link>
          </div>

          <div className="promo-section">
            <h3>Have a promo code?</h3>
            <div className="promo-input-group">
              <input 
                type="text" 
                placeholder="Enter code (e.g., SAVE10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={handleApplyPromo}>Apply</button>
            </div>
            {promoApplied && <p className="promo-applied"><FaCheck /> 10% off discount applied</p>}
          </div>

          <div className="info-box">
            <p><FaTruck /> Free shipping on orders over 200 LE</p>
          </div>
        </div>
      </div>
    </div>
  );
};

ShoppingCart.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func
};

export default ShoppingCart;
