// src/pages/WishlistPage.jsx - FINAL STABILIZED VERSION

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Trash2, Package, Tag, AlertCircle, ChevronRight, Star } from 'lucide-react';
import './WishlistPage.css';

// --- Local Storage Hooks ---
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        return initialValue;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue];
};

const WishlistPage = () => {
  // Load wishlist items from localStorage, defaulting to empty array
  const [wishlistItems, setWishlistItems] = useLocalStorage('ecommerceWishlistItems', []);
  const [cartItems, setCartItems] = useLocalStorage('ecommerceCartItems', []); 
  
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [notification, setNotification] = useState(null);

  // Get unique categories from currently loaded items
  const categories = ['all', ...new Set(wishlistItems.map(item => item.category))];

  // Filter and sort wishlist items
  const filteredItems = wishlistItems
    .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.discountPrice || a.price) - (b.discountPrice || b.price);
        case 'price-high':
          return (b.discountPrice || b.price) - (a.discountPrice || a.price);
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default: // recent
          return new Date(b.addedDate) - new Date(a.addedDate);
      }
    });

  // Remove item from wishlist
  const removeFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    showNotification('Item removed from wishlist');
  };

  // Move all to cart
  const moveAllToCart = () => {
    const inStockItems = wishlistItems.filter(item => item.inStock);
    
    // Add logic to move items to cart
    setCartItems(prevCart => {
      let movedCount = 0;
      let newCart = [...prevCart];

      inStockItems.forEach(item => {
        const defaultSize = item.sizes[0] || 'One Size';
        const defaultColor = item.colors[0] || 'Default';
        const itemId = `${item.id}-${defaultSize}-${defaultColor}`;

        const existingIndex = newCart.findIndex(cartItem => cartItem.itemId === itemId);

        if (existingIndex >= 0) {
          newCart[existingIndex].quantity += 1;
        } else {
          newCart.push({
            ...item,
            itemId,
            quantity: 1,
            size: defaultSize,
            color: defaultColor
          });
        }
        movedCount++;
      });
      
      // Remove successfully moved items from wishlist
      const itemsToRemoveIds = inStockItems.map(item => item.id);
      setWishlistItems(prevWishlist => prevWishlist.filter(item => !itemsToRemoveIds.includes(item.id)));
      
      showNotification(`${movedCount} items moved to cart!`);
      return newCart;
    });
  };

  // Add single item to cart
  const addToCart = (item) => {
    if (!item.inStock) {
      showNotification('This item is out of stock', 'error');
      return;
    }

    const defaultSize = item.sizes[0] || 'One Size';
    const defaultColor = item.colors[0] || 'Default';
    const itemId = `${item.id}-${defaultSize}-${defaultColor}`;

    setCartItems(prevCart => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.itemId === itemId);
      let newCart = [...prevCart];

      if (existingItemIndex >= 0) {
        newCart[existingItemIndex].quantity += 1;
      } else {
        newCart.push({
          ...item,
          itemId,
          quantity: 1,
          size: defaultSize,
          color: defaultColor
        });
      }
      
      // Optionally remove from wishlist after adding to cart
      removeFromWishlist(item.id); 
      showNotification('Item added to cart and removed from wishlist!');
      return newCart;
    });
  };

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Calculate stats
  const totalItems = wishlistItems.length;
  const inStockItems = wishlistItems.filter(item => item.inStock).length;
  const totalValue = wishlistItems.reduce((sum, item) => 
    sum + (item.discountPrice || item.price), 0);

  return (
    <div className="wishlist-page">
      {/* Page Header */}
      <header className="wishlist-header">
        <div className="container">
          <h1><Heart size={32} /> My Wishlist</h1>
          <p>Save your favorite items for later</p>
        </div>
      </header>

      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="container">
        {/* Stats Summary */}
        <div className="wishlist-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <Heart size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{totalItems}</span>
              <span className="stat-label">Total Items</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <Package size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{inStockItems}</span>
              <span className="stat-label">In Stock</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <Tag size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">${totalValue.toFixed(2)}</span>
              <span className="stat-label">Total Value</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="wishlist-controls">
          <div className="controls-left">
            <div className="category-filter">
              <span>Filter by:</span>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="sort-filter">
              <span>Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="recent">Recently Added</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
          
          <div className="controls-right">
            <button 
              onClick={moveAllToCart}
              className="move-all-btn"
              disabled={inStockItems === 0}
            >
              <ShoppingCart size={18} />
              Move All to Cart ({inStockItems})
            </button>
            
            <Link to="/products" className="continue-shopping-btn">
              Continue Shopping
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        {/* Empty Wishlist State */}
        {filteredItems.length === 0 ? (
          <div className="empty-wishlist">
            <div className="empty-content">
              <Heart size={64} className="empty-icon" />
              <h2>Your wishlist is empty</h2>
              <p>Save items you love by clicking the heart icon on the product page!</p>
              <Link to="/products" className="browse-products-btn">
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="wishlist-grid">
            {filteredItems.map(item => {
              const discountPercentage = item.discountPrice 
                ? Math.round(((item.price - item.discountPrice) / item.price) * 100)
                : 0;

              return (
                <div key={item.id} className="wishlist-item-card">
                  {/* Product Image */}
                  <div className="wishlist-item-image">
                    <Link to={`/product/${item.id}`}>
                      <img src={item.image} alt={item.name} />
                    </Link>
                    
                    {/* Badges */}
                    <div className="item-badges">
                      {item.discountPrice && (
                        <span className="discount-badge">-{discountPercentage}%</span>
                      )}
                      {item.isNew && (
                        <span className="new-badge">NEW</span>
                      )}
                      {!item.inStock && (
                        <span className="out-of-stock-badge">OUT OF STOCK</span>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="item-actions">
                      <button 
                        onClick={() => removeFromWishlist(item.id)}
                        className="remove-btn"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 size={18} />
                      </button>
                      
                      <Link 
                        to={`/product/${item.id}`}
                        className="view-btn"
                        aria-label="View details"
                      >
                        <Eye size={18} />
                      </Link>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="wishlist-item-info">
                    {/* Category */}
                    <span className="item-category">{item.category}</span>
                    
                    {/* Product Name */}
                    <Link to={`/product/${item.id}`} className="item-name-link">
                      <h3 className="item-name">{item.name}</h3>
                    </Link>
                    
                    {/* Description */}
                    <p className="item-description">{item.description}</p>
                    
                    {/* Rating */}
                    <div className="item-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            fill={i < Math.floor(item.rating) ? "#fbbf24" : "none"}
                            stroke={i < Math.floor(item.rating) ? "#fbbf24" : "#d1d5db"}
                          />
                        ))}
                      </div>
                      <span className="rating-text">
                        {item.rating.toFixed(1)} ({item.reviewCount})
                      </span>
                    </div>
                    
                    {/* Price */}
                    <div className="item-price">
                      {item.discountPrice ? (
                        <>
                          <span className="current-price">${item.discountPrice.toFixed(2)}</span>
                          <span className="original-price">${item.price.toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="current-price">${item.price.toFixed(2)}</span>
                      )}
                    </div>
                    
                    {/* Stock Status */}
                    <div className="item-stock">
                      <span className={`stock-status ${item.inStock ? 'in-stock' : 'out-of-stock'}`}>
                        {item.inStock ? '✓ In Stock' : 'Out of Stock'}
                      </span>
                      {!item.inStock && (
                        <button className="notify-btn">
                          <AlertCircle size={14} />
                          Notify Me
                        </button>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="item-actions-bottom">
                      <button 
                        onClick={() => addToCart(item)}
                        className={`add-to-cart-btn ${!item.inStock ? 'disabled' : ''}`}
                        disabled={!item.inStock}
                      >
                        <ShoppingCart size={18} />
                        Add to Cart
                      </button>
                      
                      <Link 
                        to={`/product/${item.id}`}
                        className="view-details-btn"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Wishlist Tips (Kept as is) */}
        <div className="wishlist-tips">
          <h3>Wishlist Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <Heart size={20} />
              <h4>Save for Later</h4>
              <p>Add items you're interested in but not ready to buy yet</p>
            </div>
            
            <div className="tip-card">
              <Package size={20} />
              <h4>Track Prices</h4>
              <p>We'll notify you if prices drop on items in your wishlist</p>
            </div>
            
            <div className="tip-card">
              <AlertCircle size={20} />
              <h4>Stock Alerts</h4>
              <p>Get notified when out-of-stock items are back in stock</p>
            </div>
            
            <div className="tip-card">
              <Tag size={20} />
              <h4>Share List</h4>
              <p>Share your wishlist with friends and family</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;