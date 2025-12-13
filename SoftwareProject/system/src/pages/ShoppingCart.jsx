import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../Contexts/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft, FaTruck, FaLock, FaTag, FaShoppingCart } from 'react-icons/fa';
import Header from '../components/Header/Header';
import './ShoppingCart.css';

const ShoppingCart = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 200 ? 0 : 50.00; // Free shipping over 200 LE
  const discount = promoApplied ? subtotal * 0.1 : 0; // 10% discount
  const total = subtotal + shipping - discount;

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(item.id, item.selectedSize, item.selectedColor, newQuantity);
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id, item.selectedSize, item.selectedColor);
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setPromoApplied(true);
      alert('Promo code applied! 10% discount');
    } else {
      alert('Invalid promo code');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
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
      <Header user={user} onLogout={onLogout} />

      {/* Breadcrumb */}
      <div className="breadcrumb-cart">
        <Link to="/home">Home</Link>
        <span className="separator">/</span>
        <span className="active">Shopping Cart</span>
      </div>

      <div className="cart-container-new">
        {/* Left Side - Cart Items */}
        <div className="cart-section">
          <h2 className="section-title">Cart</h2>

          <div className="cart-items-list-new">
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="cart-item-new">
                <div className="item-image-new">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="item-info-new">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">{item.price} LE</p>
                  <p className="item-status">
                    {item.stock > 0 ? (
                      <span className="in-stock">In Stock</span>
                    ) : (
                      <span className="out-stock">Out in stock</span>
                    )}
                  </p>
                  
                  <div className="item-options">
                    <select className="size-select" value={item.selectedSize} disabled>
                      <option>{item.selectedSize}</option>
                    </select>
                    <select className="color-select" value={item.selectedColor} disabled>
                      <option>{item.selectedColor}</option>
                    </select>
                  </div>

                  <div className="item-actions">
                    <div className="quantity-controls-new">
                      <button onClick={() => handleQuantityChange(item, item.quantity - 1)}>−</button>
                      <input type="number" value={item.quantity} readOnly />
                      <button onClick={() => handleQuantityChange(item, item.quantity + 1)}>+</button>
                    </div>

                    <button className="action-btn" onClick={() => handleRemoveItem(item)}>
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>

                <div className="item-price-right">
                  {(item.price * item.quantity).toFixed(2)} LE
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Summary */}
        <div className="summary-section">
          <div className="delivery-options">
            <h3>Delivery</h3>
            <div className="delivery-tabs">
              <button className="delivery-tab active">Free</button>
              <button className="delivery-tab">Express</button>
            </div>
            <p className="delivery-date">Delivery date: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
          </div>

          <div className="promo-section">
            <h3>Promocode</h3>
            <div className="promo-input-group">
              <input 
                type="text" 
                placeholder="Enter code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={handleApplyPromo}>Apply</button>
            </div>
            {promoApplied && <p className="promo-applied">20% off discount</p>}
          </div>

          <div className="summary-details">
            <h3>Subtotal</h3>
            <div className="summary-row">
              <span>Discount</span>
              <span>{discount.toFixed(2)} LE</span>
            </div>
            <div className="summary-row">
              <span>Delivery <FaTruck /></span>
              <span>{shipping.toFixed(2)} LE</span>
            </div>
            <div className="summary-row">
              <span>Tax <FaLock /></span>
              <span>0.00 LE</span>
            </div>
          </div>

          <div className="total-section">
            <h3>Total</h3>
            <p className="total-amount">{total.toFixed(2)} LE</p>
          </div>

          <button className="checkout-btn-new" onClick={handleCheckout}>
            Proceed to checkout
          </button>
          
          <Link to="/home" className="continue-link">
            Continue shopping
          </Link>
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
