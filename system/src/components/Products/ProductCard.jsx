import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        {product.discountPrice && (
          <span className="discount-badge">
            SALE
          </span>
        )}
        {product.isNew && (
          <span className="new-badge">NEW</span>
        )}
        <button className="wishlist-icon">
          ♡
        </button>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
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
        
        <div className="product-rating">
          <span className="stars">
            {"⭐".repeat(Math.floor(product.rating))}
            {product.rating % 1 !== 0 && "⭐"}
          </span>
          <span className="rating-text">
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>
        
        <div className="product-colors">
          {product.colors.slice(0, 3).map((color, index) => (
            <span 
              key={index}
              className="color-dot"
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            />
          ))}
          {product.colors.length > 3 && (
            <span className="more-colors">+{product.colors.length - 3}</span>
          )}
        </div>
        
        <div className="product-actions">
          <button className="add-to-cart-btn">
            Add to Cart
          </button>
          <button className="view-details-btn">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;