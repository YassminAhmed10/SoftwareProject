import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Contexts/CartContext';
import PropTypes from 'prop-types';
import { FaSearch, FaShoppingCart, FaTimes, FaBox, FaPalette, FaTag, FaHeart, FaBolt } from 'react-icons/fa';
import Header from '../components/Header/Header';
import hoodieImg from '../assets/hoodie2.png';
import tShirtImg from '../assets/tShirt.jpeg';
import jacketImg from '../assets/jacket.png';
import pinkHoodieImg from '../assets/pinkHoodie.png';
import trending1 from '../assets/trending1.jpeg';
import trending2 from '../assets/trending2.jpeg';
import trending3 from '../assets/trending3.jpeg';
import trending4 from '../assets/trending4.jpeg';
import './Products.css';

const WomenProducts = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { addToCart: addToCartContext } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);

  const products = [
    {
      id: 1,
      name: 'Pink Comfort Hoodie',
      brand: 'RYYZ',
      price: 420,
      image: pinkHoodieImg,
      category: 'hoodies',
      stock: 35,
      sales: 128,
      status: 'active',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Pink', 'White', 'Lavender'],
      description: 'Soft and cozy hoodie in beautiful pink shade. Perfect for casual comfort and style.',
      sku: 'HOOD-PINK-W001',
      supplier: 'RYYZ Fashion'
    },
    {
      id: 2,
      name: 'RYYZ White T-Shirt',
      brand: 'RYYZ',
      price: 250,
      image: tShirtImg,
      category: 't-shirts',
      stock: 50,
      sales: 215,
      status: 'active',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['White', 'Black', 'Gray'],
      description: 'Classic white t-shirt with RYYZ branding. Essential wardrobe staple.',
      sku: 'TSHIRT-W001',
      supplier: 'RYYZ Fashion'
    },
    {
      id: 3,
      name: 'Elegant Summer Top',
      brand: 'RYYZ',
      price: 380,
      image: trending1,
      category: 't-shirts',
      stock: 8,
      sales: 92,
      status: 'low-stock',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Beige', 'White', 'Pink'],
      description: 'Elegant summer top perfect for warm days and casual outings.',
      sku: 'TOP-SUM-W001',
      supplier: 'RYYZ Fashion'
    },
    {
      id: 4,
      name: 'Casual Chic Blouse',
      brand: 'RYYZ',
      price: 420,
      image: trending2,
      category: 't-shirts',
      stock: 22,
      sales: 167,
      status: 'active',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['White', 'Cream', 'Light Blue'],
      description: 'Chic and comfortable blouse for everyday elegance.',
      sku: 'BLOUSE-W001',
      supplier: 'RYYZ Fashion'
    },
    {
      id: 5,
      name: 'Classic Black Hoodie',
      brand: 'RYYZ',
      price: 450,
      image: hoodieImg,
      category: 'hoodies',
      stock: 0,
      sales: 302,
      status: 'out-of-stock',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Gray', 'Navy'],
      description: 'Premium black hoodie with modern fit and superior comfort.',
      sku: 'HOOD-BLK-W001',
      supplier: 'RYYZ Fashion'
    },
    {
      id: 6,
      name: 'Trendy Casual Top',
      brand: 'RYYZ',
      price: 350,
      image: trending3,
      category: 't-shirts',
      stock: 18,
      sales: 145,
      status: 'active',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Multi'],
      description: 'Trendy casual top with unique style and comfortable fabric.',
      sku: 'TOP-CAS-W001',
      supplier: 'RYYZ Fashion'
    },
    {
      id: 7,
      name: 'Stylish Denim Jacket',
      brand: 'RYYZ',
      price: 550,
      image: jacketImg,
      category: 'jackets',
      stock: 12,
      sales: 78,
      status: 'active',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Blue Denim', 'Black Denim', 'White Denim'],
      description: 'Classic denim jacket with modern styling. Perfect for layering.',
      sku: 'JACKET-DEN-W001',
      supplier: 'RYYZ Fashion'
    },
    {
      id: 8,
      name: 'Cozy Winter Wear',
      brand: 'RYYZ',
      price: 480,
      image: trending4,
      category: 'hoodies',
      stock: 9,
      sales: 134,
      status: 'low-stock',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Cream', 'Beige', 'Brown'],
      description: 'Warm and cozy winter wear for cold weather comfort.',
      sku: 'WINTER-W001',
      supplier: 'RYYZ Fashion'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery);
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <h1>Women's Collection</h1>
            <p className="subtitle">Discover our latest women's fashion</p>
          </div>
        </div>

        {/* Filters & View Toggle */}
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
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select-new"
            >
              <option value="all">All Categories</option>
              <option value="t-shirts">T-Shirts & Tops</option>
              <option value="hoodies">Hoodies</option>
              <option value="jackets">Jackets</option>
            </select>
          </div>
        </div>

        {/* Products Display */}
        <div className="products-grid-new">
            {filteredProducts.map((product) => (
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
        {filteredProducts.length === 0 && (
          <div className="no-results-new">
            <FaBox size={64} />
            <h3>No Products Found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        )}

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

WomenProducts.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};

export default WomenProducts;
