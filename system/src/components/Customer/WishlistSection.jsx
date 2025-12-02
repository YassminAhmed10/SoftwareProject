// src/components/Customer/WishlistSection.jsx
import React, { useState } from 'react';
import { Heart, ShoppingCart, Trash2, Eye } from 'lucide-react';
import './WishlistSection.css';

const WishlistSection = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Classic White T-Shirt',
      price: 29.99,
      discountPrice: 19.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      inStock: true,
      rating: 4.5,
      category: 'T-Shirts'
    },
    {
      id: 2,
      name: 'Slim Fit Jeans',
      price: 79.99,
      discountPrice: null,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
      inStock: true,
      rating: 4.8,
      category: 'Jeans'
    },
    {
      id: 3,
      name: 'Leather Jacket',
      price: 199.99,
      discountPrice: null,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
      inStock: false,
      rating: 4.9,
      category: 'Jackets'
    },
    {
      id: 4,
      name: 'Casual Button-Up Shirt',
      price: 49.99,
      discountPrice: 34.99,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
      inStock: true,
      rating: 4.3,
      category: 'Shirts'
    }
  ]);

  const handleRemoveFromWishlist = (id) => {
    if (window.confirm('Remove this item from your wishlist?')) {
      setWishlistItems(wishlistItems.filter(item => item.id !== id));
    }
  };

  const handleAddToCart = (item) => {
    if (!item.inStock) {
      alert('This item is currently out of stock');
      return;
    }
    alert(`Added ${item.name} to cart!`);
    // Here you would typically dispatch to cart state
  };

  return (
    <div className="wishlist-section">
      <div className="section-header">
        <div>
          <h2>My Wishlist</h2>
          <p>{wishlistItems.length} items saved</p>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <Heart size={60} />
          <h3>Your wishlist is empty</h3>
          <p>Save items you love to buy them later</p>
          <button className="browse-button">Browse Products</button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map(item => (
            <div key={item.id} className="wishlist-card">
              {!item.inStock && (
                <div className="out-of-stock-badge">Out of Stock</div>
              )}
              {item.discountPrice && (
                <div className="sale-badge">Sale</div>
              )}

              <div className="wishlist-image">
                <img src={item.image} alt={item.name} />
                <button 
                  className="remove-button"
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  title="Remove from wishlist"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="wishlist-content">
                <span className="product-category">{item.category}</span>
                <h3 className="product-name">{item.name}</h3>

                <div className="product-rating">
                  <div className="stars">
                    {'★'.repeat(Math.floor(item.rating))}
                    {'☆'.repeat(5 - Math.floor(item.rating))}
                  </div>
                  <span className="rating-value">{item.rating}</span>
                </div>

                <div className="product-price">
                  {item.discountPrice ? (
                    <>
                      <span className="current-price">${item.discountPrice}</span>
                      <span className="original-price">${item.price}</span>
                      <span className="discount-percent">
                        {Math.round(((item.price - item.discountPrice) / item.price) * 100)}% OFF
                      </span>
                    </>
                  ) : (
                    <span className="current-price">${item.price}</span>
                  )}
                </div>

                <div className="wishlist-actions">
                  <button 
                    className={`add-to-cart-button ${!item.inStock ? 'disabled' : ''}`}
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.inStock}
                  >
                    <ShoppingCart size={18} />
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  <button className="view-button">
                    <Eye size={18} />
                  </button>
                </div>

                {!item.inStock && (
                  <button className="notify-button">
                    Notify When Available
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistSection;