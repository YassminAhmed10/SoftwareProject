// src/pages/ProductPage.jsx - FULL UPDATED WITH WISHLIST SYNC
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Star, Search, Package, Truck, Shield } from 'lucide-react';
import './ProductPage.css';

// Import images
import jacketImage from '../assets/jacket.png';
import hoodie4Image from '../assets/hoodie4.png';
import hoodie2Image from '../assets/hoodie2.png';
import hoddieImage from '../assets/hoddie.png';
import tshirtImage from '../assets/tshirt.png';
import pinkHoodieImage from '../assets/pinkHoodie.png';

// Local Storage Hook
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        // For wishlist, check if we have old format data
        if (key === 'ecommerceWishlistItems') {
          // Try to migrate from old localStorage if exists
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

// Mock products data
const mockProducts = [
  {
    id: 1,
    name: 'Leather Jacket',
    description: 'Genuine leather jacket with asymmetrical zip and snap collar.',
    price: 189.99,
    discountPrice: 159.99,
    category: 'Jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black'],
    image: jacketImage,
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    isNew: true,
    discountPercentage: 16
  },
  {
    id: 2,
    name: 'Classic T-Shirt',
    description: '100% cotton comfortable t-shirt for everyday wear',
    price: 24.99,
    discountPrice: 19.99,
    category: 'T-Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Gray'],
    image: tshirtImage,
    rating: 4.2,
    reviewCount: 89,
    inStock: true,
    isNew: false,
    discountPercentage: 20
  },
  {
    id: 3,
    name: 'Ocean Striped Sweater',
    description: 'Navy and white striped cotton-blend sweater with raglan sleeves.',
    price: 79.99,
    discountPrice: null,
    category: 'Sweaters',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'White'],
    image: hoodie4Image,
    rating: 4.8,
    reviewCount: 56,
    inStock: true,
    isNew: true,
    discountPercentage: 0
  },
  {
    id: 4,
    name: 'Black Pullover Hoodie',
    description: 'Heavyweight cotton pullover hoodie with front pocket.',
    price: 59.99,
    discountPrice: 49.99,
    category: 'Hoodies',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    image: hoodie2Image,
    rating: 4.4,
    reviewCount: 42,
    inStock: true,
    isNew: false,
    discountPercentage: 17
  },
  {
    id: 5,
    name: 'Cloud White Hoodie',
    description: 'Thick, premium white hoodie with a smooth finish and drawstrings.',
    price: 69.99,
    discountPrice: 59.99,
    category: 'Hoodies',
    sizes: ['S', 'M', 'L'],
    colors: ['White', 'Beige'],
    image: hoddieImage,
    rating: 4.6,
    reviewCount: 75,
    inStock: true,
    isNew: true,
    discountPercentage: 14
  },
  {
    id: 6,
    name: 'Cobalt Blue T-Shirt',
    description: 'Vibrant blue athletic tee with moisture-wicking technology.',
    price: 39.99,
    discountPrice: 34.99,
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue'],
    image: tshirtImage,
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    isNew: false,
    discountPercentage: 12
  },
  {
    id: 7,
    name: 'Rose Zip Hoodie',
    description: 'Light pink full-zip hoodie, perfect for layering.',
    price: 64.99,
    discountPrice: null,
    category: 'Hoodies',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Pink'],
    image: pinkHoodieImage,
    rating: 4.1,
    reviewCount: 50,
    inStock: false,
    isNew: true,
    discountPercentage: 0
  },
];

const categories = ['All', 'Jackets', 'T-Shirts', 'Hoodies', 'Sweaters'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colors = ['Black', 'White', 'Blue', 'Gray', 'Brown', 'Navy', 'Pink'];

const ProductPage = () => {
  const [allProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const [loading, setLoading] = useState(false);
  
  const [cartItems, setCartItems] = useLocalStorage('ecommerceCartItems', []);
  const [wishlistItems, setWishlistItems] = useLocalStorage('ecommerceWishlistItems', []);
  
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');

  // Show Notification
  const displayNotification = useCallback((message, type = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  }, []);

  // Add to Cart Function
  const addToCart = (product) => {
    if (!product.inStock) {
      displayNotification('This item is currently out of stock', 'error');
      return;
    }

    const defaultSize = product.sizes[0] || 'One Size';
    const defaultColor = product.colors[0] || 'Default';
    const itemId = `${product.id}-${defaultSize}-${defaultColor}`;

    setCartItems(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.itemId === itemId);

      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        displayNotification(`${product.name} quantity updated in cart!`, 'success');
        return updatedCart;
      } else {
        displayNotification(`${product.name} added to cart!`, 'success');
        return [...prevCart, {
          ...product,
          itemId,
          quantity: 1,
          size: defaultSize,
          color: defaultColor
        }];
      }
    });
  };

  // Toggle Wishlist Function - UPDATED FOR PROPER SYNC
  const toggleWishlist = (product) => {
    setWishlistItems(prevWishlist => {
      const exists = prevWishlist.some(item => item.id === product.id);
      
      let updatedWishlist;
      
      if (exists) {
        // Remove from wishlist
        updatedWishlist = prevWishlist.filter(item => item.id !== product.id);
        displayNotification(`${product.name} removed from wishlist.`, 'success');
      } else {
        // Add to wishlist
        const wishlistItem = {
          ...product,
          addedDate: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
          inWishlist: true
        };
        updatedWishlist = [...prevWishlist, wishlistItem];
        displayNotification(`${product.name} added to wishlist!`, 'success');
      }
      
      // Force immediate localStorage update for cross-page sync
      localStorage.setItem('ecommerceWishlistItems', JSON.stringify(updatedWishlist));
      
      return updatedWishlist;
    });
  };

  // Apply filters and sorting
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      let filtered = [...allProducts];

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );
      }

      // Category filter
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }

      // Size filter
      if (selectedSizes.length > 0) {
        filtered = filtered.filter(product =>
          selectedSizes.some(size => product.sizes.includes(size))
        );
      }

      // Color filter
      if (selectedColors.length > 0) {
        filtered = filtered.filter(product =>
          selectedColors.some(color => product.colors.includes(color))
        );
      }

      // Price filter
      const [minPrice, maxPrice] = priceRange;
      filtered = filtered.filter(product => {
        const price = product.discountPrice || product.price;
        return price >= minPrice && price <= maxPrice;
      });

      // Sorting
      switch (sortOption) {
        case 'price-low':
          filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
          break;
        case 'price-high':
          filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'popular':
          filtered.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
        case 'newest':
          filtered.sort((a, b) => b.id - a.id);
          break;
        default:
          filtered.sort((a, b) => {
            const aScore = (a.discountPrice ? 2 : 0) + (a.isNew ? 1 : 0);
            const bScore = (b.discountPrice ? 2 : 0) + (b.isNew ? 1 : 0);
            return bScore - aScore;
          });
      }

      setFilteredProducts(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [allProducts, searchQuery, selectedCategory, selectedSizes, selectedColors, priceRange, sortOption]);

  // Filter handlers
  const handleSizeClick = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleColorClick = (color) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]);
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 200]);
    setSearchQuery('');
  };

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    (priceRange[0] > 0 || priceRange[1] < 200 ? 1 : 0);
    
  // Check if item is in wishlist for heart icon status
  const isWishlisted = (productId) => wishlistItems.some(item => item.id === productId);

  return (
    <div className="products-page">
      {/* Notification */}
      {showNotification && (
        <div className={`cart-notification ${notificationType}`}>
          {notificationMessage}
          <button onClick={() => setShowNotification(false)}>×</button>
        </div>
      )}

      {/* Page Header */}
      <header className="products-header">
        <div className="container">
          <h1>Premium Clothing Store</h1>
          <p>Discover our latest collection of premium clothing & accessories</p>
        </div>
      </header>

      {/* Navigation Bar */}
      <div className="container">
        <div className="simple-nav">
          <Link to="/products" className="nav-link active">All Products</Link>
          <Link to="/cart" className="nav-link cart-link">
            <ShoppingCart size={18} />
            Cart ({cartItems.length})
          </Link>
          <Link to="/wishlist" className="nav-link">
            <Heart size={18} /> Wishlist ({wishlistItems.length})
          </Link>
          <Link to="/customer-dashboard" className="nav-link">My Account</Link>
        </div>
      </div>

      {/* Search Section */}
      <section className="search-section">
        <div className="container">
          <div className="search-bar-wrapper">
            <div className="search-bar">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search for products by name, category, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="products-container">
        <div className="container">
          <div className="products-layout">
            {/* Filters Sidebar */}
            <aside className="filters-column">
              <div className="filter-sidebar">
                <div className="filter-header">
                  <h3>Filters</h3>
                  {activeFilterCount > 0 && (
                    <button onClick={clearAllFilters} className="filter-clear">
                      Clear All
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="filter-section">
                  <h4 className="filter-title">Category</h4>
                  <div className="category-list">
                    {categories.map((category) => (
                      <div key={category} className="category-item">
                        <button
                          className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                          onClick={() => setSelectedCategory(category)}
                        >
                          <span>{category}</span>
                          <span className="category-count">
                            {category === 'All'
                              ? allProducts.length
                              : allProducts.filter(p => p.category === category).length}
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div className="filter-section">
                  <h4 className="filter-title">Size</h4>
                  <div className="size-filter-grid">
                    {sizes.map(size => (
                      <button
                        key={size}
                        className={`size-filter-button ${selectedSizes.includes(size) ? 'selected' : ''}`}
                        onClick={() => handleSizeClick(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div className="filter-section">
                  <h4 className="filter-title">Color</h4>
                  <div className="color-filter-grid">
                    {colors.map(color => (
                      <button
                        key={color}
                        className={`color-filter-button ${selectedColors.includes(color) ? 'selected' : ''}`}
                        onClick={() => handleColorClick(color)}
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="filter-section">
                  <h4 className="filter-title">Price Range</h4>
                  <div className="price-filter">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      step="10"
                      value={priceRange[1]}
                      onChange={handlePriceChange}
                      className="price-slider"
                    />
                    <div className="price-range-display">
                      <span>$0</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Column */}
            <main className="products-column">
              {/* Products Header with Controls */}
              <div className="products-controls">
                <div className="results-info">
                  <h2 className="featured-heading">Featured Products</h2>
                  <div className="results-count">
                    <span>{filteredProducts.length} products found</span>
                    {activeFilterCount > 0 && (
                      <span className="active-filters">
                        {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
                      </span>
                    )}
                  </div>
                </div>

                <div className="controls-right">
                  <div className="sort-dropdown">
                    <span className="sort-label">Sort by:</span>
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="sort-select"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="popular">Most Popular</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>
                  
                  {/* View Wishlist Button */}
                  <Link to="/wishlist" className="go-to-cart-btn view-wishlist-btn-header">
                    <Heart size={18} />
                    View Wishlist ({wishlistItems.length})
                  </Link>

                  <Link to="/cart" className="go-to-cart-btn">
                    <ShoppingCart size={18} />
                    View Cart ({cartItems.length})
                  </Link>
                </div>
              </div>

              {/* Loading State */}
              {loading ? (
                <div className="loading-state">
                  <div className="loading-spinner"></div>
                  <p>Loading products...</p>
                </div>
              ) : (
                /* Products Grid with Wishlist Icons */
                <div className="products-grid">
                  {filteredProducts.map(product => {
                    const discountPercentage = product.discountPrice
                      ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
                      : 0;

                    const wishlisted = isWishlisted(product.id);

                    return (
                      <div key={product.id} className="product-card">
                        {/* Product Image */}
                        <div className="product-image-container">
                          <Link to={`/product/${product.id}`}>
                            <img
                              src={product.image}
                              alt={product.name}
                              className="product-image"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/400x300/cccccc/ffffff?text=No+Image";
                              }}
                            />
                          </Link>

                          {/* Badges */}
                          <div className="product-badges">
                            {product.discountPrice && discountPercentage > 0 && (
                              <span className="product-badge discount-badge">
                                -{discountPercentage}% OFF
                              </span>
                            )}
                            {product.isNew && (
                              <span className="product-badge new-badge">NEW</span>
                            )}
                            {!product.inStock && (
                              <span className="product-badge stock-badge">OUT OF STOCK</span>
                            )}
                          </div>

                          {/* Wishlist Heart Button - ALWAYS VISIBLE */}
                          <div className="quick-actions">
                            <button
                              className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
                              title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                              onClick={() => toggleWishlist(product)}
                              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                            >
                              <Heart 
                                size={18} 
                                fill={wishlisted ? "#ef4444" : "none"} 
                                color={wishlisted ? "#ef4444" : "#4a5568"}
                              />
                            </button>
                            <Link
                              to={`/product/${product.id}`}
                              className="view-btn"
                              title="View details"
                              aria-label="View product details"
                            >
                              <Eye size={18} />
                            </Link>
                          </div>

                          {/* Wishlist Indicator Badge */}
                          {wishlisted && (
                            <div className="wishlist-indicator-badge">
                              <Heart size={12} fill="#ef4444" color="#ef4444" />
                              <span>Saved</span>
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="product-info">
                          <span className="product-category">{product.category}</span>

                          <Link to={`/product/${product.id}`} className="product-name-link">
                            <h3 className="product-name">{product.name}</h3>
                          </Link>

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

                          {/* Stock Status */}
                          <div className="product-stock">
                            <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                              {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                            </span>
                          </div>

                          {/* Add to Cart Button */}
                          <button
                            onClick={() => addToCart(product)}
                            className={`add-to-cart-button ${!product.inStock ? 'disabled' : ''}`}
                            disabled={!product.inStock}
                          >
                            <ShoppingCart size={16} />
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </button>

                          {/* View Details Link */}
                          <div className="view-details-link">
                            <Link to={`/product/${product.id}`}>View Details →</Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* No Results State */}
              {!loading && filteredProducts.length === 0 && (
                <div className="no-results-suggestions">
                  <h3>No products found</h3>
                  <p>Try these suggestions:</p>
                  <ul>
                    <li onClick={clearAllFilters} style={{ cursor: 'pointer' }}>Clear all filters</li>
                    <li>Check your spelling in the search</li>
                    <li>Browse all categories</li>
                  </ul>
                  <div className="cart-suggestion">
                    <Link to="/cart" className="check-cart-btn">
                      <ShoppingCart size={18} />
                      Check Your Cart
                    </Link>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container">
        <div className="features-section">
          <div className="feature">
            <Truck size={24} />
            <h4>Free Shipping</h4>
            <p>On orders over $50</p>
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
};

export default ProductPage;