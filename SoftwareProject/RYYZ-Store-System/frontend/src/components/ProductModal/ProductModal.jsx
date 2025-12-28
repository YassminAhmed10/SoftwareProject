import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaTimes, FaShoppingCart, FaHeart, FaTshirt } from 'react-icons/fa';
import { useCart } from '../../Contexts/CartContext';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || 'Black');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onClose();
    navigate('/checkout');
  };

  const handleAddToWishlist = () => {
    alert('Added to wishlist!');
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('product-modal-backdrop')) {
      onClose();
    }
  };

  const subtotal = product.price * quantity;
  const shippingCost = 10.85;
  const total = subtotal + shippingCost;

  const modalContent = (
    <div className="product-modal-backdrop" onClick={handleBackdropClick}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="modal-header">
          <div className="product-info">
            <div className="product-title">
              <h1>{product.name}</h1>
              <p className="product-brand">{product.brand || 'Premium Brand'}</p>
            </div>
          </div>
          <div className="product-price-badge">
            <h3>{product.price.toFixed(2)} LE</h3>
            <p>Per Unit</p>
          </div>
        </div>

        <div className="modal-content">
          <div className="product-info-wide">
            <div className="product-image-main">
              <div className="product-image-container">
                <img 
                  src={product.image} 
                  alt={product.name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="image-placeholder">
                  <FaTshirt size={40} />
                </div>
              </div>
            </div>
            <div className="product-meta-info">
              <div className="meta-item">
                <span className="meta-label">SKU</span>
                <span className="meta-value">PROD-{product.id}-001</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Category</span>
                <span className="meta-value">{product.category || 'Clothing'}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Stock Status</span>
                <span className="meta-value stock-active">In Stock</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Available Stock</span>
                <span className="meta-value">45 units</span>
              </div>
            </div>
          </div>

          <div className="content-grid">
            <div className="left-column">
              <div className="section">
                <h2 className="section-title">Product Options</h2>
                <div className="options-container">
                  <div className="option-group">
                    <h4>Select Color</h4>
                    <div className="color-options">
                      {product.colors && product.colors.length > 0 ? (
                        product.colors.map((color) => (
                          <button
                            key={color}
                            className={`color-option ${selectedColor === color ? 'active' : ''}`}
                            style={{ backgroundColor: color.toLowerCase() }}
                            onClick={() => setSelectedColor(color)}
                            title={color}
                          >
                            {selectedColor === color && '✓'}
                          </button>
                        ))
                      ) : (
                        <>
                          <button className="color-option active" style={{ backgroundColor: '#000' }}>✓</button>
                          <button className="color-option" style={{ backgroundColor: '#fff', border: '2px solid #ccc' }}></button>
                          <button className="color-option" style={{ backgroundColor: '#e91e63' }}></button>
                        </>
                      )}
                    </div>
                    <p className="selected-value">Selected: {selectedColor}</p>
                  </div>

                  <div className="option-group">
                    <h4>Select Size</h4>
                    <div className="size-options">
                      {product.sizes && product.sizes.length > 0 ? (
                        product.sizes.map((size) => (
                          <button
                            key={size}
                            className={`size-option ${selectedSize === size ? 'active' : ''}`}
                            onClick={() => setSelectedSize(size)}
                          >
                            {size}
                          </button>
                        ))
                      ) : (
                        <>
                          <button className="size-option active">S</button>
                          <button className="size-option">M</button>
                          <button className="size-option">L</button>
                          <button className="size-option">XL</button>
                        </>
                      )}
                    </div>
                    <p className="selected-value">Selected: {selectedSize}</p>
                  </div>

                  <div className="option-group">
                    <h4>Quantity</h4>
                    <div className="quantity-selector">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                      <span>{quantity.toString().padStart(2, '0')}</span>
                      <button onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="right-column">
              <div className="section">
                <h2 className="section-title">Order Summary</h2>
                <div className="order-summary">
                  <div className="summary-row">
                    <span>Price per item</span>
                    <span>{product.price.toFixed(2)} LE</span>
                  </div>
                  <div className="summary-row">
                    <span>Quantity</span>
                    <span>×{quantity}</span>
                  </div>
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>{subtotal.toFixed(2)} LE</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping Cost</span>
                    <span>{shippingCost.toFixed(2)} LE</span>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-row total-row">
                    <span>Total</span>
                    <span>{total.toFixed(2)} LE</span>
                  </div>
                </div>
                
                <div className="action-buttons">
                  <button className="btn-add-to-cart" onClick={handleAddToCart}>
                    <FaShoppingCart />
                    <span>Add to Cart</span>
                  </button>
                  <button className="btn-add-to-wishlist" onClick={handleAddToWishlist}>
                    <FaHeart />
                    <span>Add to Wishlist</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

ProductModal.propTypes = {
  product: PropTypes.object,
  onClose: PropTypes.func
};

export default ProductModal;
