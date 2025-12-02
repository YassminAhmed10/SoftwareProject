import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Check } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      selectedColor,
      selectedSize,
      quantity: 1
    };
    
    if (onAddToCart) {
      onAddToCart(cartItem);
    } else {
      // Fallback: Add to localStorage or show notification
      const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
      currentCart.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(currentCart));
      
      // Show added feedback
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);
      
      // Dispatch cart update event for other components
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    // Add to wishlist logic here
  };

  // Calculate discount percentage
  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <Link to={`/product/${product.id}`} className="image-link">
          <img 
            src={product.image} 
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
        </Link>
        
        {/* Badges */}
        <div className="product-badges">
          {product.discountPrice && (
            <span className="discount-badge">
              -{discountPercentage}%
            </span>
          )}
          {product.isNew && (
            <span className="new-badge">NEW</span>
          )}
          {!product.inStock && (
            <span className="out-of-stock-badge">OUT OF STOCK</span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button 
            onClick={handleWishlistToggle}
            className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={18} />
          </button>
          
          <Link 
            to={`/product/${product.id}`}
            className="quick-view-btn"
            aria-label="Quick view"
          >
            <Eye size={18} />
          </Link>
        </div>
      </div>
      
      <div className="product-info">
        {/* Category */}
        <span className="product-category">{product.category}</span>
        
        {/* Product Name with Link */}
        <Link to={`/product/${product.id}`} className="product-name-link">
          <h3 className="product-name">{product.name}</h3>
        </Link>
        
        {/* Product Description */}
        <p className="product-description">{product.description}</p>
        
        {/* Color Selection */}
        <div className="color-selection">
          <span className="color-label">Color:</span>
          <div className="color-options">
            {product.colors.slice(0, 4).map((color, index) => (
              <button
                key={index}
                className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color.toLowerCase() }}
                onClick={() => setSelectedColor(color)}
                title={color}
                aria-label={`Select color: ${color}`}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="more-colors">+{product.colors.length - 4}</span>
            )}
          </div>
        </div>

        {/* Size Selection */}
        <div className="size-selection">
          <span className="size-label">Size:</span>
          <div className="size-options">
            {product.sizes.slice(0, 5).map((size, index) => (
              <button
                key={index}
                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => setSelectedSize(size)}
                aria-label={`Select size: ${size}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        
        {/* Price Section */}
        <div className="product-price">
          {product.discountPrice ? (
            <>
              <span className="current-price">${product.discountPrice.toFixed(2)}</span>
              <span className="original-price">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="current-price">${product.price.toFixed(2)}</span>
          )}
        </div>
        
        {/* Rating */}
        <div className="product-rating">
          <span className="stars">
            {"⭐".repeat(Math.floor(product.rating))}
            {product.rating % 1 !== 0 && "⭐"}
          </span>
          <span className="rating-text">
            {product.rating.toFixed(1)} ({product.reviewCount} reviews)
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="product-actions">
          <button 
            onClick={handleAddToCart}
            className={`add-to-cart-btn ${isAddedToCart ? 'added' : ''}`}
            disabled={!product.inStock}
          >
            {isAddedToCart ? (
              <>
                <Check size={18} />
                Added
              </>
            ) : (
              <>
                <ShoppingCart size={18} />
                Add to Cart
              </>
            )}
          </button>
          
          <Link 
            to={`/product/${product.id}`}
            className="view-details-btn"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;