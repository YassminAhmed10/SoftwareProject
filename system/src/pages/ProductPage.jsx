// src/pages/ProductPage.jsx - FULL UPDATED WITH CART FUNCTIONALITY
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Star, Search, Package, Truck, Shield } from 'lucide-react';
import './ProductPage.css';

// Mock data directly in the file
const mockProducts = [
  {
    id: 1,
    name: 'Premium Denim Jacket',
    description: 'High-quality denim jacket with premium finish and comfortable fit',
    price: 89.99,
    discountPrice: 79.99,
    category: 'Jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Black'],
    image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=400&h=500&fit=crop',
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    isNew: true,
    discountPercentage: 15
  },
  {
    id: 2,
    name: 'Classic White T-Shirt',
    description: '100% cotton comfortable t-shirt for everyday wear',
    price: 24.99,
    discountPrice: 19.99,
    category: 'T-Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Gray'],
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
    rating: 4.2,
    reviewCount: 89,
    inStock: true,
    isNew: false,
    discountPercentage: 20
  },
  {
    id: 3,
    name: 'Leather Boots',
    description: 'Premium leather boots for all seasons with durable construction',
    price: 129.99,
    discountPrice: null,
    category: 'Shoes',
    sizes: ['40', '41', '42', '43', '44'],
    colors: ['Black', 'Brown'],
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=500&fit=crop',
    rating: 4.8,
    reviewCount: 56,
    inStock: true,
    isNew: true,
    discountPercentage: 0
  },
  {
    id: 4,
    name: 'Wool Scarf',
    description: 'Warm wool scarf perfect for winter season',
    price: 34.99,
    discountPrice: 29.99,
    category: 'Accessories',
    sizes: ['One Size'],
    colors: ['Gray', 'Navy', 'Burgundy'],
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop',
    rating: 4.4,
    reviewCount: 42,
    inStock: true,
    isNew: false,
    discountPercentage: 15
  },
  {
    id: 5,
    name: 'Summer Dress',
    description: 'Light and breezy summer dress with floral pattern',
    price: 59.99,
    discountPrice: 49.99,
    category: 'Dresses',
    sizes: ['S', 'M', 'L'],
    colors: ['Blue', 'Pink', 'Yellow'],
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=500&fit=crop',
    rating: 4.6,
    reviewCount: 75,
    inStock: true,
    isNew: true,
    discountPercentage: 17
  },
  {
    id: 6,
    name: 'Running Shoes',
    description: 'Comfortable running shoes with cushion technology',
    price: 89.99,
    discountPrice: 74.99,
    category: 'Shoes',
    sizes: ['40', '41', '42', '43'],
    colors: ['Black', 'Blue', 'Red'],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop',
    rating: 4.7,
    reviewCount: 203,
    inStock: false,
    isNew: false,
    discountPercentage: 17
  }
];

const categories = ['All', 'Jackets', 'T-Shirts', 'Shoes', 'Accessories', 'Dresses'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colors = ['Black', 'White', 'Blue', 'Gray', 'Brown', 'Navy', 'Burgundy', 'Red'];

const ProductPage = () => {
  const navigate = useNavigate();
  const [allProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

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

  // Add to Cart Function
  const addToCart = (product) => {
    if (!product.inStock) {
      showNotification('This item is currently out of stock', 'error');
      return;
    }
    
    // Check if product is already in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      // Add new item
      setCartItems([...cartItems, {
        ...product,
        quantity: 1,
        selectedSize: product.sizes[0],
        selectedColor: product.colors[0]
      }]);
    }
    
    // Save to localStorage
    localStorage.setItem('cartItems', JSON.stringify([...cartItems, {
      ...product,
      quantity: 1,
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0]
    }]));
    
    showNotification(`${product.name} added to cart!`, 'success');
  };

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotificationMessage(message);
    setShowCartNotification(true);
    setTimeout(() => {
      setShowCartNotification(false);
    }, 3000);
  };

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

  return (
    <div className="products-page">
      {/* Notification */}
      {showCartNotification && (
        <div className={`cart-notification ${notificationMessage.includes('error') ? 'error' : 'success'}`}>
          {notificationMessage}
          <button onClick={() => setShowCartNotification(false)}>×</button>
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
            <Heart size={18} /> Wishlist
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
                  <h2>Products</h2>
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
                  <Link to="/cart" className="go-to-cart-btn">
                    <ShoppingCart size={18} />
                    View Cart ({cartItems.length})
                  </Link>
                  
                  <div className="sort-dropdown">
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
                </div>
              </div>
              
              {/* Loading State */}
              {loading ? (
                <div className="loading-state">
                  <div className="loading-spinner"></div>
                  <p>Loading products...</p>
                </div>
              ) : (
                /* Products Grid */
                <div className="products-grid">
                  {filteredProducts.map(product => {
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
                          
                          {/* Quick Actions */}
                          <div className="quick-actions">
                            <button 
                              className="wishlist-btn" 
                              title="Add to wishlist"
                              onClick={() => showNotification(`${product.name} added to wishlist!`)}
                            >
                              <Heart size={18} />
                            </button>
                            <Link 
                              to={`/product/${product.id}`}
                              className="view-btn"
                              title="View details"
                            >
                              <Eye size={18} />
                            </Link>
                          </div>
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