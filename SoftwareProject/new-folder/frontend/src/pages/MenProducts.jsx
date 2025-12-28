import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Contexts/CartContext';
import PropTypes from 'prop-types';
import { FaSearch, FaShoppingCart, FaTimes, FaBox, FaPalette, FaTag, FaHeart, FaBolt } from 'react-icons/fa';
import Header from '../components/Header/Header';
import hoodieImg from '../assets/hoddie.png';
import hoodie3 from '../assets/Black-hoodie2.png';
import hoodie4 from '../assets/pinkHoodie.png';
import blackShirt from '../assets/black-shirt.png';
import tShirtImg from '../assets/men-tshirt.png';
import jacketO from '../assets/jacket-O.png';
import jacketRed from '../assets/jacket-red.png';
import jacketW from '../assets/jacket-W.png';
import capOrange from '../assets/cap-oringe.png';
import whiteSweater from '../assets/white-switer.png';
import menShirtNavy from '../assets/men-shirt-navey.png';
import menShirtRed from '../assets/men-shirt-red.png';
import menShirtRealMadrid from '../assets/men-shirt-realmadrid.png';
import trending1 from '../assets/hoddie.jpg.png';
import trending2 from '../assets/jacket-O.png';
import trending3 from '../assets/Black-hoodie2.png';
import trending4 from '../assets/men-tshirt.png';
import './Products.css';

const MenProducts = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { addToCart: addToCartContext } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState('featured');

  const products = [
    {
      id: 1,
      name: 'Classic Black Hoodie',
      brand: 'RYYZ',
      price: 450,
      image: hoodieImg,
      category: 'hoodies',
      stock: 28,
      sales: 342,
      status: 'active',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black'],
      description: 'Premium black hoodie with modern fit and superior comfort. Perfect for casual wear.',
      sku: 'HOOD-BLK-M001',
      supplier: 'RYYZ Fashion'
    },
    {
      id: 2,
      name: 'Premium Gray Hoodie',
      brand: 'RYYZ',
      price: 460,
      image: hoodie3,
      category: 'hoodies',
      stock: 32,
      sales: 289,
      status: 'active',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Gray'],
      description: 'Stylish gray hoodie with premium quality fabric and modern design.',
      sku: 'HOOD-GRAY-M001',
      supplier: 'RYYZ Fashion'
    },
    {
      id: 3,
      name: 'Urban Black Shirt',
      brand: 'RYYZ',
      price: 280,
      image: blackShirt,
      category: 't-shirts',
      stock: 45,
      sales: 412,
      status: 'active',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black'],
      description: 'Essential black shirt for every wardrobe. Versatile and stylish.',
      sku: 'SHIRT-BLK-M001',
      supplier: 'RYYZ Fashion'
    },
    {
      id: 4,
      name: 'Stylish Denim Jacket',
      brand: 'RYYZ',
      price: 550,
      image: jacketRed,
      category: 'jackets',
      stock: 15,
      sales: 156,
      status: 'active',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['Red'],
      description: 'Classic denim jacket with modern styling. Perfect for layering in any season.',
      sku: 'JACKET-DEN-M001',
      supplier: 'RYYZ Fashion'
    },
    {
      id: 5,
      name: 'Orange Style Jacket',
      brand: 'RYYZ',
      price: 580,
      image: jacketO,
      category: 'jackets',
      stock: 0,
      sales: 234,
      status: 'out-of-stock',
      sizes: ['M', 'L', 'XL'],
      colors: ['Orange'],
      description: 'Modern urban style jacket in vibrant orange.',
      sku: 'TOP-URB-M001',
      supplier: 'RYYZ Fashion'
    },
    {
      id: 6,
      name: 'Casual Chic Shirt',
      brand: 'RYYZ',
      price: 420,
      image: trending2,
      category: 't-shirts',
      stock: 32,
      sales: 198,
      status: 'active',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['White'],
      description: 'Elegant casual shirt perfect for smart casual occasions.',
      sku: 'SHIRT-CAS-M001',
      supplier: 'RYYZ Fashion'
    },
    {
      id: 7,
      name: 'Modern Casual Wear',
      brand: 'RYYZ',
      price: 350,
      image: trending3,
      category: 't-shirts',
      stock: 8,
      sales: 176,
      status: 'low-stock',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black'],
      description: 'Trendy casual wear with contemporary design.',
      sku: 'WEAR-MOD-M001',
      supplier: 'RYYZ Fashion'
    },
    {
      id: 8,
      name: 'Premium Winter Jacket',
      brand: 'RYYZ',
      price: 650,
      image: jacketW,
      category: 'jackets',
      stock: 18,
      sales: 124,
      status: 'active',
      sizes: ['M', 'L', 'XL'],
      colors: ['Beige'],
      description: 'Premium winter jacket for cold weather protection and style.',
      sku: 'JACKET-WIN-M001',
      supplier: 'RYYZ Fashion'
    }
  ];

  // Check if navigated from chatbot with product to open
  useEffect(() => {
    const productData = sessionStorage.getItem('openProductModal');
    if (productData) {
      try {
        const { name, category, price } = JSON.parse(productData);
        console.log('Looking for product:', { name, category, price });
        
        // Try to find exact match by name
        let product = products.find(p => p.name.toLowerCase() === name.toLowerCase());
        console.log('Exact match:', product);
        
        // If not found, try partial match or similar price in category
        if (!product) {
          product = products.find(p => 
            p.category.toLowerCase() === category.toLowerCase() && 
            Math.abs(p.price - price) < 50
          );
          console.log('Category/price match:', product);
        }
        
        if (product) {
          console.log('Opening modal for:', product.name);
          setSelectedProduct(product);
        } else {
          console.log('No matching product found');
        }
      } catch (e) {
        console.error('Error opening product modal:', e);
      }
      sessionStorage.removeItem('openProductModal');
    }
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    // Size filter
    const matchesSize = selectedSizes.length === 0 || 
      selectedSizes.some(size => product.sizes.includes(size));
    
    // Color filter
    const matchesColor = selectedColors.length === 0 || 
      selectedColors.some(color => product.colors.includes(color));
    
    // Price filter
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesSize && matchesColor && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortOption) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'sales':
        return b.sales - a.sales;
      case 'stock':
        return b.stock - a.stock;
      default: // featured
        return b.sales - a.sales;
    }
  });

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
    setSelectedCategory('all');
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 1000]);
    setSearchQuery('');
    setSortOption('featured');
  };

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0);

  // Get all unique sizes and colors
  const allSizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const allColors = [...new Set(products.flatMap(p => p.colors))].sort();

  const getColorHex = (colorName) => {
    const colorMap = {
      'White': '#ffffff',
      'Black': '#000000',
      'Gray': '#6b7280',
      'Red': '#ef4444',
      'Orange': '#f97316',
      'Beige': '#d1d5db'
    };
    return colorMap[colorName] || colorName.toLowerCase();
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'status-active';
      case 'low-stock': return 'status-low-stock';
      case 'out-of-stock': return 'status-out-stock';
      default: return '';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'active': return 'In Stock';
      case 'low-stock': return 'Low Stock';
      case 'out-of-stock': return 'Out of Stock';
      default: return status;
    }
  };

  const getStockText = (stock, status) => {
    if (status === 'out-of-stock') return 'Out of Stock';
    if (stock < 10) return `Low Stock (${stock} units)`;
    return `${stock} units in stock`;
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = (e) => {
    if (e) e.stopPropagation();
    setSelectedProduct(null);
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  const addToCart = (product, e) => {
    if (e) {
      e.stopPropagation();
    }
    if (product.status === 'out-of-stock') {
      alert('This product is out of stock');
      return;
    }
    addToCartContext({
      ...product,
      quantity: 1,
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0]
    });
    alert('Added to cart!');
  };

  const toggleWishlist = (product, e) => {
    if (e) {
      e.stopPropagation();
    }
    if (wishlistItems.includes(product.id)) {
      setWishlistItems(wishlistItems.filter(id => id !== product.id));
      alert('Removed from wishlist!');
    } else {
      setWishlistItems([...wishlistItems, product.id]);
      alert('Added to wishlist!');
    }
  };

  const buyNow = (product, e) => {
    if (e) {
      e.stopPropagation();
    }
    if (product.status === 'out-of-stock') {
      alert('This product is out of stock');
      return;
    }
    addToCartContext({
      ...product,
      quantity: 1,
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0]
    });
    navigate('/cart');
  };

  return (
    <div className="products-page">
      <Header user={user} onLogout={onLogout} />

      <div className="products-container-new">
        {/* Header */}
        <div className="products-header-new">
          <div className="left">
            <h1>Men's Collection</h1>
            <p className="subtitle">Discover our latest men's fashion</p>
          </div>
        </div>

        {/* Main Layout with Filters */}
        <div className="products-layout-with-filters">
          {/* Filters Sidebar */}
          <aside className="filters-column">
            <div className="filter-sidebar">
              <div className="filter-header">
                <h3>Filters</h3>
                {activeFilterCount > 0 && (
                  <button onClick={clearAllFilters} className="filter-clear">
                    Clear All ({activeFilterCount})
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="filter-section">
                <h4 className="filter-title">Category</h4>
                <div className="category-list">
                  <button
                    className={`category-button ${selectedCategory === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('all')}
                  >
                    <span>All Categories</span>
                    <span className="category-count">{products.length}</span>
                  </button>
                  <button
                    className={`category-button ${selectedCategory === 't-shirts' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('t-shirts')}
                  >
                    <span>T-Shirts</span>
                    <span className="category-count">
                      {products.filter(p => p.category === 't-shirts').length}
                    </span>
                  </button>
                  <button
                    className={`category-button ${selectedCategory === 'hoodies' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('hoodies')}
                  >
                    <span>Hoodies</span>
                    <span className="category-count">
                      {products.filter(p => p.category === 'hoodies').length}
                    </span>
                  </button>
                  <button
                    className={`category-button ${selectedCategory === 'jackets' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('jackets')}
                  >
                    <span>Jackets</span>
                    <span className="category-count">
                      {products.filter(p => p.category === 'jackets').length}
                    </span>
                  </button>
                </div>
              </div>

              {/* Size Filter */}
              <div className="filter-section">
                <h4 className="filter-title">Size</h4>
                <div className="size-filter-grid">
                  {allSizes.map(size => (
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
                  {allColors.map(color => (
                    <button
                      key={color}
                      className={`color-filter-button ${selectedColors.includes(color) ? 'selected' : ''}`}
                      onClick={() => handleColorClick(color)}
                      style={{ backgroundColor: getColorHex(color) }}
                      title={color}
                      aria-label={`Filter by ${color} color`}
                    />
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="filter-section">
                <h4 className="filter-title">Price Range (LE)</h4>
                <div className="price-filter">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    className="price-slider"
                  />
                  <div className="price-range-display">
                    <span>0 LE</span>
                    <span>{priceRange[1]} LE</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="products-column">
            {/* Filters & Controls */}
            <div className="products-filters-new">
              <div className="filters-left">
                <div className="search-box-new">
                  <FaSearch />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                  />
                </div>

                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="filter-select-new"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="sales">Most Popular</option>
                  <option value="stock">In Stock</option>
                </select>
              </div>
              
              <div className="results-count-new">
                {sortedProducts.length} products found
                {activeFilterCount > 0 && (
                  <span className="active-filters-badge">
                    {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
                  </span>
                )}
              </div>
            </div>

            {/* Products Display */}
            <div className="products-grid-new">
              {sortedProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="product-card-new"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="product-image-new">
                    <img src={product.image} alt={product.name} />
                    <span className={`product-status-badge ${getStatusColor(product.status)}`}>
                      {getStatusLabel(product.status)}
                    </span>
                    
                    {/* Wishlist Icon */}
                    <button 
                      className={`wishlist-icon-btn ${wishlistItems.includes(product.id) ? 'active' : ''}`}
                      onClick={(e) => toggleWishlist(product, e)}
                      title="Add to wishlist"
                    >
                      <FaHeart />
                    </button>

                    {/* Action Buttons Overlay */}
                    <div className="product-actions-overlay">
                      <button 
                        className={`action-btn-overlay buy-now ${product.status === 'out-of-stock' ? 'disabled' : ''}`}
                        onClick={(e) => buyNow(product, e)}
                        disabled={product.status === 'out-of-stock'}
                      >
                        <FaBolt /> Buy Now
                      </button>
                      <button 
                        className={`action-btn-overlay add-cart ${product.status === 'out-of-stock' ? 'disabled' : ''}`}
                        onClick={(e) => addToCart(product, e)}
                        disabled={product.status === 'out-of-stock'}
                      >
                        <FaShoppingCart /> Add to Cart
                      </button>
                    </div>
                  </div>
                  
                  <div className="product-info-new">
                    <h3 className="product-name-new">{product.name}</h3>
                    <div className="product-price-new">{product.price} LE</div>
                    <p className="product-category-new">{product.category}</p>
                    <div className="product-stock-new">
                      {getStockText(product.stock, product.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {sortedProducts.length === 0 && (
              <div className="no-results-new">
                <FaBox size={64} />
                <h3>No Products Found</h3>
                <p>Try adjusting your filters or search terms</p>
                <button onClick={clearAllFilters} className="clear-filters-btn">
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>

        {/* Product Details Modal */}
        <div 
          className={`product-modal-new ${selectedProduct ? 'active' : ''}`}
          onClick={closeModal}
        >
          {selectedProduct && (
            <div className="modal-content-new" onClick={handleModalContentClick}>
              <button className="modal-close-new" onClick={closeModal}>
                <FaTimes size={20} />
              </button>
              
              <div className="modal-header-new">
                <h2>{selectedProduct.name}</h2>
                <p className="modal-category-new">{selectedProduct.category}</p>
                <div className="modal-price-new">{selectedProduct.price} LE</div>
              </div>

              <div className="modal-image-new">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>

              <div className="modal-details-new">
                <div className="detail-section-new">
                  <h3>
                    <FaBox />
                    Inventory Details
                  </h3>
                  <div className="detail-list-new">
                    <div className="detail-list-item-new">
                      <span className="detail-list-label-new">Stock Status</span>
                      <span className={`detail-list-value-new ${getStatusColor(selectedProduct.status)}`}>
                        {getStatusLabel(selectedProduct.status)}
                      </span>
                    </div>
                    <div className="detail-list-item-new">
                      <span className="detail-list-label-new">Available Stock</span>
                      <span className="detail-list-value-new">{selectedProduct.stock} units</span>
                    </div>
                    <div className="detail-list-item-new">
                      <span className="detail-list-label-new">Total Sales</span>
                      <span className="detail-list-value-new">{selectedProduct.sales}</span>
                    </div>
                    <div className="detail-list-item-new">
                      <span className="detail-list-label-new">SKU</span>
                      <span className="detail-list-value-new">{selectedProduct.sku}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section-new">
                  <h3>
                    <FaPalette />
                    Product Variants
                  </h3>
                  <div className="detail-list-new">
                    <div className="detail-list-item-new">
                      <span className="detail-list-label-new">Available Colors</span>
                      <span className="detail-list-value-new">
                        {selectedProduct.colors.join(', ')}
                      </span>
                    </div>
                    <div className="detail-list-item-new">
                      <span className="detail-list-label-new">Available Sizes</span>
                      <span className="detail-list-value-new">
                        {selectedProduct.sizes.join(', ')}
                      </span>
                    </div>
                    <div className="detail-list-item-new">
                      <span className="detail-list-label-new">Supplier</span>
                      <span className="detail-list-value-new">{selectedProduct.supplier}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section-new">
                  <h3>
                    <FaTag />
                    Product Description
                  </h3>
                  <p className="product-description-new">
                    {selectedProduct.description}
                  </p>
                </div>

                <button 
                  className={`modal-add-cart-btn ${selectedProduct.status === 'out-of-stock' ? 'disabled' : ''}`}
                  onClick={(e) => addToCart(selectedProduct, e)}
                  disabled={selectedProduct.status === 'out-of-stock'}
                >
                  <FaShoppingCart /> 
                  {selectedProduct.status === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

MenProducts.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};

export default MenProducts;