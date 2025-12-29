import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaArrowLeft, FaShoppingCart, FaHeart, FaStar } from 'react-icons/fa';
import { useCart } from '../Contexts/CartContext';
import Header from '../components/Header/Header';
import './ProductDetails.css';

const ProductDetails = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = location.state?.product;

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || 'Black');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="product-details-page">
        <Header user={user} onLogout={onLogout} />
        <div className="product-details-container">
          <div className="no-product">
            <h2>Product not found</h2>
            <button onClick={() => navigate(-1)} className="btn-back">
              <FaArrowLeft /> Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const handleAddToWishlist = () => {
    console.log('Added to wishlist:', product);
    alert('Added to wishlist!');
  };

  const availableSizes = product.sizes || ['S', 'M', 'L', 'XL'];
  const availableColors = product.colors || ['Black', 'White', 'Pink'];

  return (
    <div className="product-details-page">
      <Header user={user} onLogout={onLogout} />
      
      <div className="product-details-container">
        <div className="page-header">
          <button onClick={() => navigate(-1)} className="btn-back">
            <FaArrowLeft /> Back to Products
          </button>
        </div>

        <div className="product-content">
          {/* Left Side - Product Image */}
          <div className="product-image-section">
            <div className="main-image">
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="product-info-section">
            <div className="product-header">
              <div className="product-title-section">
                <h1>{product.name}</h1>
                <p className="product-brand">{product.brand || 'Premium Brand'}</p>
                <div className="product-rating">
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className="star filled" />
                    ))}
                  </div>
                  <span className="rating-text">(234 reviews)</span>
                </div>
              </div>
              <div className="product-price-section">
                <h2 className="price">${product.price.toFixed(2)}</h2>
              </div>
            </div>

            {/* Inventory Details */}
            <div className="inventory-section">
              <h3>
                <span className="section-icon">📦</span>
                Inventory Details
              </h3>
              <div className="inventory-grid">
                <div className="inventory-item">
                  <span className="label">Stock Status</span>
                  <span className="value status-active">Active</span>
                </div>
                <div className="inventory-item">
                  <span className="label">Available Stock</span>
                  <span className="value">45 units</span>
                </div>
                <div className="inventory-item">
                  <span className="label">Total Sales</span>
                  <span className="value">234</span>
                </div>
                <div className="inventory-item">
                  <span className="label">SKU</span>
                  <span className="value">PROD-{product.id}-001</span>
                </div>
              </div>
            </div>

            {/* Product Variants */}
            <div className="variants-section">
              <h3>
                <span className="section-icon">🎨</span>
                Product Variants
              </h3>
              
              <div className="variant-group">
                <label>Available Colors</label>
                <div className="color-options">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    >
                      {selectedColor === color && '✓'}
                    </button>
                  ))}
                </div>
                <span className="selected-variant">{selectedColor}</span>
              </div>

              <div className="variant-group">
                <label>Available Sizes</label>
                <div className="size-options">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <span className="selected-variant">{selectedSize}</span>
              </div>

              <div className="variant-group">
                <label>Quantity</label>
                <div className="quantity-selector">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                  <span className="quantity-display">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <div className="variant-group">
                <label>Supplier</label>
                <span className="supplier-name">Fashion Textiles Co.</span>
              </div>
            </div>

            {/* Product Description */}
            <div className="description-section">
              <h3>
                <span className="section-icon">📝</span>
                Product Description
              </h3>
              <p>
                {product.description || 
                  `High-quality ${product.name.toLowerCase()} made from premium materials. 
                  Perfect for everyday wear with exceptional comfort and style. This versatile piece 
                  combines modern design with classic appeal, making it an essential addition to your wardrobe.
                  Available in multiple colors and sizes to suit your preferences.`}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="btn-add-cart" onClick={handleAddToCart}>
                <FaShoppingCart /> Add to Cart
              </button>
              <button className="btn-add-wishlist" onClick={handleAddToWishlist}>
                <FaHeart /> Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductDetails.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};

export default ProductDetails;
