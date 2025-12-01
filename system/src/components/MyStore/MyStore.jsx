import React, { useState } from 'react';
import { 
  Search, 
  Grid,
  List,
  Package,
  X,
  Palette,
  PackageOpen,
  Tag
} from 'lucide-react';
import './MyStore.css';

const MyStore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // بيانات المنتجات - تم إضافة المنتج السادس
  const [products] = useState([
    {
      id: 1,
      name: 'Hoodie Pink',
      category: 'Women Item',
      price: 450,
      stock: 45,
      sales: 234,
      status: 'active',
      image: '/src/assets/pinkHoodie.png',
      colors: ['Pink', 'White', 'Black'],
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'Comfortable pink hoodie made from premium cotton',
      sku: 'HOOD-PINK-001',
      supplier: 'Fashion Textiles Co.'
    },
    {
      id: 2,
      name: 'Men\'s Shirt',
      category: 'Men Item',
      price: 600,
      stock: 10,
      sales: 20,
      status: 'active',
      image: '/src/assets/tshirt.png',
      colors: ['Blue', 'White', 'Gray'],
      sizes: ['M', 'L', 'XL', 'XXL'],
      description: 'Classic men\'s shirt perfect for formal occasions',
      sku: 'SHIRT-MEN-001',
      supplier: 'Premium Clothing Inc.'
    },
    {
      id: 3,
      name: 'Leather Jacket',
      category: 'Women Item',
      price: 299.99,
      stock: 8,
      sales: 156,
      status: 'low-stock',
      image: '/src/assets/jacket.png',
      colors: ['Black', 'Brown'],
      sizes: ['S', 'M', 'L'],
      description: 'Genuine leather jacket with premium finish',
      sku: 'JACKET-LEATHER-001',
      supplier: 'Leather Crafts Co.'
    },
    {
      id: 4,
      name: 'Hoodie Black',
      category: 'Men Item',
      price: 889,
      stock: 0,
      sales: 142,
      status: 'out-of-stock',
      image: '/src/assets/hoodie2.png',
      colors: ['Black', 'Gray'],
      sizes: ['M', 'L', 'XL'],
      description: 'Premium black hoodie with modern design',
      sku: 'HOOD-BLACK-001',
      supplier: 'Urban Wear Ltd.'
    },
    {
      id: 5,
      name: 'Sweatshirt White',
      category: 'Men Item',
      price: 889,
      stock: 25,
      sales: 98,
      status: 'active',
      image: '/src/assets/hoodie3.png',
      colors: ['White', 'Gray', 'Navy'],
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'Comfortable white sweatshirt for everyday wear',
      sku: 'SWEAT-WHITE-001',
      supplier: 'Comfort Wear Inc.'
    },
    {
      id: 6,
      name: 'Women Shirt',
      category: 'Women Item',
      price: 350,
      stock: 32,
      sales: 78,
      status: 'active',
      image: '/src/assets/hoodie4.png',
      colors: ['White', 'Black', 'Beige', 'Navy'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      description: 'Elegant women shirt perfect for both casual and formal occasions',
      sku: 'SHIRT-WOMEN-001',
      supplier: 'Elegant Fashion Co.'
    },
  ]);

  // إحصائيات - سيتم تحديثها تلقائياً
  const stats = [
    { label: 'Total Products', value: products.length, color: 'blue' },
    { label: 'Active', value: products.filter(p => p.status === 'active').length, color: 'green' },
    { label: 'Low Stock', value: products.filter(p => p.status === 'low-stock').length, color: 'orange' },
    { label: 'Out of Stock', value: products.filter(p => p.status === 'out-of-stock').length, color: 'red' },
  ];

  // فلترة المنتجات
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
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
      case 'active': return 'Active';
      case 'low-stock': return 'Low Stock';
      case 'out-of-stock': return 'Out of Stock';
      default: return status;
    }
  };

  const getStockClass = (stock, status) => {
    if (status === 'out-of-stock') return 'out-stock';
    if (stock < 10) return 'low-stock';
    return 'in-stock';
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

  // منع إغلاق المودال عند النقر داخل المحتوى
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="my-store-container">
      {/* Header */}
      <div className="head-title">
        <div className="left">
          <h1>My Store</h1>
          <ul className="breadcrumb">
            <li><a href="#"></a></li>
            <li></li>
            <li><a className="active" href="#"></a></li>
          </ul>
        </div>
      </div>

      {/* إحصائيات */}
      <div className="store-stats">
        {stats.map((stat, index) => (
          <div key={index} className={`store-stat-box stat-${stat.color}`}>
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters & View Toggle */}
      <div className="store-filters">
        <div className="filters-left">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="Women Item">Women Item</option>
            <option value="Men Item">Men Item</option>
            <option value="Accessories">Accessories</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>

        <div className="view-toggle">
          <button 
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid size={18} />
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Products Display */}
      {viewMode === 'grid' ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => handleProductClick(product)}
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <span className={`product-status-badge ${getStatusColor(product.status)}`}>
                  {getStatusLabel(product.status)}
                </span>
              </div>
              
              <div className="product-info">
                {/* السطر الأول: اسم المنتج */}
                <h3 className="product-name">{product.name}</h3>
                
                {/* السطر الثاني: السعر */}
                <div className="product-price">{product.price} LE</div>
                
                {/* السطر الثالث: الفئة */}
                <p className="product-category">{product.category}</p>
                
                {/* السطر الرابع: المخزون */}
                <div className={`product-stock ${getStockClass(product.stock, product.status)}`}>
                  {getStockText(product.stock, product.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="products-list">
          <table className="products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr 
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                >
                  <td className="product-cell">
                    <img src={product.image} alt={product.name} className="product-thumbnail" />
                    <span className="product-name">{product.name}</span>
                  </td>
                  <td className="price">{product.price} LE</td>
                  <td className="category">{product.category}</td>
                  <td className={`stock ${getStockClass(product.stock, product.status)}`}>
                    {getStockText(product.stock, product.status)}
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusColor(product.status)}`}>
                      {getStatusLabel(product.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="no-results">
          <Package size={64} />
          <h3>No Products Found</h3>
          <p>Try adjusting your filters or search terms</p>
        </div>
      )}

      {/* Product Details Modal */}
      <div 
        className={`product-modal ${selectedProduct ? 'active' : ''}`}
        onClick={closeModal}
      >
        {selectedProduct && (
          <div className="modal-content" onClick={handleModalContentClick}>
            <button className="modal-close" onClick={closeModal}>
              <X size={20} />
            </button>
            
            <div className="modal-header">
              <h2>{selectedProduct.name}</h2>
              <p className="modal-category">{selectedProduct.category}</p>
              <div className="modal-price">{selectedProduct.price} LE</div>
            </div>

            <div className="modal-image">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
            </div>

            <div className="modal-details">
              <div className="detail-section">
                <h3>
                  <PackageOpen size={16} />
                  Inventory Details
                </h3>
                <div className="detail-list">
                  <div className="detail-list-item">
                    <span className="detail-list-label">Stock Status</span>
                    <span className={`detail-list-value ${getStatusColor(selectedProduct.status)}`}>
                      {getStatusLabel(selectedProduct.status)}
                    </span>
                  </div>
                  <div className="detail-list-item">
                    <span className="detail-list-label">Available Stock</span>
                    <span className="detail-list-value">{selectedProduct.stock} units</span>
                  </div>
                  <div className="detail-list-item">
                    <span className="detail-list-label">Total Sales</span>
                    <span className="detail-list-value">{selectedProduct.sales}</span>
                  </div>
                  <div className="detail-list-item">
                    <span className="detail-list-label">SKU</span>
                    <span className="detail-list-value">{selectedProduct.sku}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>
                  <Palette size={16} />
                  Product Variants
                </h3>
                <div className="detail-list">
                  <div className="detail-list-item">
                    <span className="detail-list-label">Available Colors</span>
                    <span className="detail-list-value">
                      {selectedProduct.colors.join(', ')}
                    </span>
                  </div>
                  <div className="detail-list-item">
                    <span className="detail-list-label">Available Sizes</span>
                    <span className="detail-list-value">
                      {selectedProduct.sizes.join(', ')}
                    </span>
                  </div>
                  <div className="detail-list-item">
                    <span className="detail-list-label">Supplier</span>
                    <span className="detail-list-value">{selectedProduct.supplier}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>
                <Tag size={16} />
                Product Description
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                {selectedProduct.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyStore;