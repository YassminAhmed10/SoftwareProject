// src/components/Products/ProductList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart } from 'lucide-react';

const ProductList = ({ products }) => {
  // Temporary function - you'll replace this with actual cart logic
  const handleAddToCart = (product) => {
    alert(`${product.name} added to cart!`);
    // In real app: context.addToCart(product)
  };

  return (
    <div className="products-grid">
      {products.map(product => {
        const discountPercentage = product.discountPrice 
          ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
          : 0;

        return (
          <div key={product.id} className="product-card">
            {/* Product Image */}
            <div className="product-image-container">
              <Link to={`/product/${product.id}`}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="product-image"
                />
              </Link>
              
              {/* Badges */}
              <div className="product-badges">
                {product.discountPrice && (
                  <span className="discount-badge">-{discountPercentage}%</span>
                )}
                {product.isNew && (
                  <span className="new-badge">NEW</span>
                )}
              </div>

              {/* Quick Actions */}
              <div className="quick-actions">
                <button className="wishlist-btn">
                  <Heart size={18} />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info">
              {/* Category */}
              <span className="product-category">{product.category}</span>
              
              {/* Product Name */}
              <Link to={`/product/${product.id}`} className="product-name-link">
                <h3 className="product-name">{product.name}</h3>
              </Link>
              
              {/* Description */}
              <p className="product-description">{product.description}</p>
              
              {/* Rating */}
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"}
                      stroke={i < Math.floor(product.rating) ? "#fbbf24" : "#d1d5db"}
                    />
                  ))}
                </div>
                <span className="rating-text">
                  {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>
              
              {/* Price */}
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
              
              {/* Add to Cart Button */}
              <button 
                onClick={() => handleAddToCart(product)}
                className="add-to-cart-btn"
                style={{
                  width: '100%',
                  marginTop: '15px',
                  padding: '12px',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#764ba2';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#667eea';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
              
              {/* View Cart Link */}
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <Link 
                  to="/cart"
                  style={{
                    color: '#667eea',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  View Cart →
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;