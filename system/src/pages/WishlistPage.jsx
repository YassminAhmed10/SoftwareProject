// src/pages/WishlistPage.jsx - COMPLETELY UPDATED TO SYNC WITH PRODUCTPAGE
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Trash2, Package, Tag, AlertCircle, ChevronRight, Star, Truck, Shield, CreditCard } from 'lucide-react';
import './WishlistPage.css';

// Local Storage Hook - Same as ProductPage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        // Check for old wishlist data migration
        if (key === 'ecommerceWishlistItems') {
          const oldData = window.localStorage.getItem('wishlistItems');
          if (oldData) {
            try {
              const parsedOldData = JSON.parse(oldData);
              window.localStorage.setItem(key, JSON.stringify(parsedOldData));
              window.localStorage.removeItem('wishlistItems');
              return parsedOldData;
            } catch (e) {
              console.error('Error migrating old wishlist data:', e);
            }
          }
        }
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

// Format price in L.E - Same as ProductPage
const formatPrice = (price) => {
  return `${price.toLocaleString()} L.E`;
};

// Price configuration by category (in L.E) - Same as ProductPage
const CATEGORY_PRICES = {
  'T-Shirts': {
    basePrice: 400,
    discountPrice: 350,
    discountPercentage: 12
  },
  'Hoodies': {
    basePrice: 600,
    discountPrice: 550,
    discountPercentage: 8
  },
  'Jackets': {
    basePrice: 800,
    discountPrice: 700,
    discountPercentage: 12
  },
  'Sweaters': {
    basePrice: 550,
    discountPrice: 500,
    discountPercentage: 9
  }
};

const WishlistPage = () => {
  // Get wishlist items from localStorage - same key as ProductPage
  const [wishlistItems, setWishlistItems] = useLocalStorage('ecommerceWishlistItems', []);
  const [cartItems, setCartItems] = useLocalStorage('ecommerceCartItems', []);
  
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [notification, setNotification] = useState(null);
  const [movedItems, setMovedItems] = useState([]);

  // Get unique categories from wishlist items
  const categories = ['all', ...new Set(wishlistItems.map(item => item.category))];

  // Filter and sort wishlist items
  const filteredItems = wishlistItems
    .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.discountPrice || a.basePrice || a.price || 0) - 
                 (b.discountPrice || b.basePrice || b.price || 0);
        case 'price-high':
          return (b.discountPrice || b.basePrice || b.price || 0) - 
                 (a.discountPrice || a.basePrice || a.price || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        default: // recent
          return new Date(b.addedDate || 0) - new Date(a.addedDate || 0);
      }
    });

  // Remove item from wishlist
  const removeFromWishlist = (id) => {
    const itemToRemove = wishlistItems.find(item => item.id === id);
    if (itemToRemove) {
      setWishlistItems(prev => prev.filter(item => item.id !== id));
      showNotification(`${itemToRemove.name} removed from wishlist`, 'success');
    }
  };

  // Add single item to cart
  const addToCart = (item) => {
    if (!item.inStock) {
      showNotification('This item is currently out of stock', 'error');
      return;
    }

    const defaultSize = item.sizes?.[0] || 'M';
    const defaultColor = item.colors?.[0] || 'Default';
    const itemId = `${item.id}-${defaultSize}-${defaultColor}`;

    setCartItems(prevCart => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.itemId === itemId);

      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        showNotification(`${item.name} quantity updated in cart!`, 'success');
        return updatedCart;
      } else {
        showNotification(`${item.name} added to cart!`, 'success');
        return [...prevCart, {
          ...item,
          itemId,
          quantity: 1,
          size: defaultSize,
          color: defaultColor
        }];
      }
    });
  };

  // Move all to cart
  const moveAllToCart = () => {
    const inStockItems = wishlistItems.filter(item => item.inStock);
    
    if (inStockItems.length === 0) {
      showNotification('No in-stock items to move to cart', 'error');
      return;
    }

    // Track moved items to prevent duplicates
    const newMovedItems = [...movedItems];
    const updatedCart = [...cartItems];
    
    inStockItems.forEach(item => {
      const defaultSize = item.sizes?.[0] || 'M';
      const defaultColor = item.colors?.[0] || 'Default';
      const itemId = `${item.id}-${defaultSize}-${defaultColor}`;
      
      const existingItemIndex = updatedCart.findIndex(cartItem => cartItem.itemId === itemId);
      
      if (existingItemIndex >= 0) {
        updatedCart[existingItemIndex].quantity += 1;
      } else {
        updatedCart.push({
          ...item,
          itemId,
          quantity: 1,
          size: defaultSize,
          color: defaultColor
        });
      }
      
      newMovedItems.push(item.id);
    });

    setCartItems(updatedCart);
    setMovedItems(newMovedItems);
    showNotification(`${inStockItems.length} items moved to cart!`, 'success');
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
    sum + (item.discountPrice || item.basePrice || item.price || 0), 0);

  // Check if item is in cart
  const isInCart = (item) => {
    const defaultSize = item.sizes?.[0] || 'M';
    const defaultColor = item.colors?.[0] || 'Default';
    const itemId = `${item.id}-${defaultSize}-${defaultColor}`;
    return cartItems.some(cartItem => cartItem.itemId === itemId);
  };

  // Handle empty wishlist
  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <header className="wishlist-header">
          <div className="container">
            <h1><Heart size={32} /> My Wishlist</h1>
            <p>Save your favorite items for later</p>
          </div>
        </header>

        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}

        <div className="container">
          <div className="empty-wishlist">
            <div className="empty-content">
              <Heart size={64} className="empty-icon" />
              <h2>Your wishlist is empty</h2>
              <p>Save items you love by clicking the heart icon on any product</p>
              <Link to="/products" className="browse-products-btn">
                Browse Products
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="features-section">
            <div className="feature">
              <Truck size={24} />
              <h4>Free Shipping</h4>
              <p>On orders over 500 L.E</p>
            </div>
            <div className="feature">
              <Package size={24} />
              <h4>Easy Returns</h4>
              <p>30-day return policy</p>
            </div>
            <div className="feature">
              <Shield size={24} />
              <h4>Secure Payment</h4>
              <p>100% secure & encrypted</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              <span className="stat-value">{formatPrice(totalValue)}</span>
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
                    {category === 'all' ? 'All Categories' : category}
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

        {/* Wishlist Grid */}
        <div className="wishlist-grid">
          {filteredItems.map(item => {
            const discountPercentage = item.discountPrice && item.basePrice
              ? Math.round(((item.basePrice - item.discountPrice) / item.basePrice) * 100)
              : 0;
            
            const inCart = isInCart(item);

            return (
              <div key={item.id} className="wishlist-item-card">
                {/* Product Image */}
                <div className="wishlist-item-image">
                  <Link to={`/product/${item.id}`}>
                    <img src={item.image} alt={item.name} onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/400x300/cccccc/ffffff?text=No+Image";
                    }} />
                  </Link>
                  
                  {/* Badges */}
                  <div className="item-badges">
                    {item.discountPrice && item.basePrice && discountPercentage > 0 && (
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
                  {item.rating && (
                    <div className="item-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            fill={i < Math.floor(item.rating || 0) ? "#fbbf24" : "none"}
                            stroke={i < Math.floor(item.rating || 0) ? "#fbbf24" : "#d1d5db"}
                          />
                        ))}
                      </div>
                      <span className="rating-text">
                        {(item.rating || 0).toFixed(1)} ({item.reviewCount || 0} reviews)
                      </span>
                    </div>
                  )}
                  
                  {/* Price */}
                  <div className="item-price">
                    {item.discountPrice ? (
                      <>
                        <span className="current-price">{formatPrice(item.discountPrice)}</span>
                        <span className="original-price">{formatPrice(item.basePrice || item.price)}</span>
                      </>
                    ) : (
                      <span className="current-price">{formatPrice(item.basePrice || item.price || 0)}</span>
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
                      {inCart ? 'Add More' : 'Add to Cart'}
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

        {/* Wishlist Tips */}
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
              <p>Share your wishlist with friends and family for gift ideas</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="navigation-links">
          <Link to="/cart" className="nav-link-btn cart-link">
            <ShoppingCart size={20} />
            Go to Cart ({cartItems.length})
          </Link>
          <Link to="/products" className="nav-link-btn products-link">
            Continue Shopping
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;