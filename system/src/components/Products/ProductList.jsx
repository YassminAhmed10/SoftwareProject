// src/components/Products/ProductList.jsx
import React from 'react';

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="no-results">
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          {product.badge && (
            <span className="product-badge">{product.badge}</span>
          )}
          
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-image"
          />
          
          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            
            <div className="product-price">
              <span className="current-price">
                ${product.discountPrice || product.price}
              </span>
              {product.discountPrice && (
                <span className="original-price">${product.price}</span>
              )}
            </div>
            
            <div className="product-rating">
              <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
              <span className="rating-count">({product.reviewCount})</span>
            </div>
            
            {product.tags && product.tags.length > 0 && (
              <div className="product-tags">
                {product.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;