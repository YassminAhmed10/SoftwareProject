import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Edit2, Trash2, Eye, 
  Package, DollarSign, TrendingUp, AlertCircle,
  Grid, List
} from 'lucide-react';
import './MyStore.css';

const MyStore = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Sample products data
  const products = [
    {
      id: 'PRD001',
      name: 'Premium Hoodie',
      category: 'Men Item',
      price: '€45.00',
      stock: 25,
      status: 'in-stock',
      image: '/src/assets/hoddie.png',
      sales: 156
    },
    {
      id: 'PRD002',
      name: 'Women\'s Dress',
      category: 'Women Item',
      price: '€65.00',
      stock: 12,
      status: 'low-stock',
      image: '/src/assets/Admin.png',
      sales: 89
    },
    {
      id: 'PRD003',
      name: 'Casual T-Shirt',
      category: 'Men Item',
      price: '€25.00',
      stock: 0,
      status: 'out-of-stock',
      image: '/src/assets/Admin.png',
      sales: 234
    },
    {
      id: 'PRD004',
      name: 'Summer Blouse',
      category: 'Women Item',
      price: '€35.00',
      stock: 45,
      status: 'in-stock',
      image: '/src/assets/Admin.png',
      sales: 167
    },
    {
      id: 'PRD005',
      name: 'Winter Jacket',
      category: 'Men Item',
      price: '€95.00',
      stock: 8,
      status: 'low-stock',
      image: '/src/assets/Admin.png',
      sales: 45
    },
    {
      id: 'PRD006',
      name: 'Elegant Skirt',
      category: 'Women Item',
      price: '€42.00',
      stock: 30,
      status: 'in-stock',
      image: '/src/assets/Admin.png',
      sales: 112
    }
  ];

  // Stats
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (parseFloat(p.price.replace('€', '')) * p.stock), 0);
  const lowStockItems = products.filter(p => p.status === 'low-stock' || p.status === 'out-of-stock').length;
  const totalSales = products.reduce((sum, p) => sum + p.sales, 0);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === 'all' || 
      product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (productId) => {
    alert(`Editing product: ${productId}`);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      alert(`Deleted product: ${productId}`);
    }
  };

  const handleView = (productId) => {
    alert(`Viewing details for: ${productId}`);
  };

  const handleAddProduct = () => {
    alert('Redirecting to Add Product page...');
  };

  return (
    <main className={`mystore-page ${darkMode ? 'dark-mode' : ''}`}>
      {/* Header */}
      <div className="store-header">
        <div className="header-left">
          <h1>My Store</h1>
          <p className="subtitle">Manage your products and inventory</p>
        </div>
        <button className="add-product-btn" onClick={handleAddProduct}>
          <Plus size={20} />
          Add New Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="store-stats">
        <div className="stat-card">
          <div className="stat-icon products">
            <Package size={24} />
          </div>
          <div className="stat-info">
            <h3>{totalProducts}</h3>
            <p>Total Products</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon value">
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <h3>€{totalValue.toFixed(2)}</h3>
            <p>Inventory Value</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon sales">
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <h3>{totalSales}</h3>
            <p>Total Sales</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon alert">
            <AlertCircle size={24} />
          </div>
          <div className="stat-info">
            <h3>{lowStockItems}</h3>
            <p>Low Stock Items</p>
          </div>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="store-controls">
        <div className="controls-left">
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
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Women Item">Women Item</option>
            <option value="Men Item">Men Item</option>
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

      {/* Products Grid/List */}
      {filteredProducts.length > 0 ? (
        <div className={`products-container ${viewMode}`}>
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <img 
                  src={product.image} 
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x200?text=Product';
                  }}
                />
                <span className={`stock-badge ${product.status}`}>
                  {product.status === 'in-stock' && 'In Stock'}
                  {product.status === 'low-stock' && 'Low Stock'}
                  {product.status === 'out-of-stock' && 'Out of Stock'}
                </span>
              </div>

              <div className="product-info">
                <div className="product-header">
                  <h3 className="product-name">{product.name}</h3>
                  <span className="product-id">{product.id}</span>
                </div>

                <div className="product-details">
                  <div className="detail-row">
                    <span className="label">Category:</span>
                    <span className={`category-tag ${product.category === 'Women Item' ? 'women' : 'men'}`}>
                      {product.category}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Price:</span>
                    <span className="price">{product.price}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Stock:</span>
                    <span className="stock">{product.stock} units</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Sales:</span>
                    <span className="sales">{product.sales} sold</span>
                  </div>
                </div>

                <div className="product-actions">
                  <button 
                    className="action-btn view"
                    onClick={() => handleView(product.id)}
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    className="action-btn edit"
                    onClick={() => handleEdit(product.id)}
                    title="Edit Product"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDelete(product.id)}
                    title="Delete Product"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-products">
          <Package size={64} />
          <h3>No products found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </main>
  );
};

export default MyStore;