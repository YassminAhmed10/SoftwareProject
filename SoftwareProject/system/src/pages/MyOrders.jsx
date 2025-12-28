import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaSearch, FaBox, FaTruck, FaCheckCircle, FaTimesCircle, FaEye, FaDownload, FaArrowLeft, FaFilter, FaShoppingBag } from 'react-icons/fa';
import Header from '../components/Header/Header';
import './MyOrders.css';

// Import local images
import hoodieImg from '../assets/hoodie2.png';
import tShirtImg from '../assets/tShirt.jpeg';
import jacketImg from '../assets/jacket.png';
import pinkHoodieImg from '../assets/pinkHoodie.png';

const MyOrders = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Sample orders with local images
  const orders = [
    {
      id: '#ORD-2024-001',
      date: 'December 5, 2024',
      total: 450.00,
      itemCount: 3,
      status: 'Shipped',
      estimatedDelivery: 'Dec 12, 2024',
      trackingNumber: 'RYYZ-TRK-9999999',
      items: [
        {
          id: 1,
          name: 'Classic Black Hoodie',
          size: 'L',
          color: 'Black',
          qty: 2,
          price: 150.00,
          image: hoodieImg
        },
        {
          id: 2,
          name: 'Premium T-Shirt',
          size: 'M',
          color: 'White',
          qty: 1,
          price: 150.00,
          image: tShirtImg
        }
      ]
    },
    {
      id: '#ORD-2024-002',
      date: 'November 28, 2024',
      total: 320.00,
      itemCount: 2,
      status: 'Delivered',
      deliveredDate: 'Dec 1, 2024',
      items: [
        {
          id: 1,
          name: 'Pink Hoodie',
          size: 'M',
          color: 'Pink',
          qty: 1,
          price: 180.00,
          image: pinkHoodieImg
        },
        {
          id: 2,
          name: 'Leather Jacket',
          size: 'L',
          color: 'Brown',
          qty: 1,
          price: 140.00,
          image: jacketImg
        }
      ]
    },
    {
      id: '#ORD-2024-003',
      date: 'November 15, 2024',
      total: 180.00,
      itemCount: 1,
      status: 'Processing',
      items: [
        {
          id: 1,
          name: 'White Hoodie',
          size: 'XL',
          color: 'White',
          qty: 1,
          price: 180.00,
          image: hoodieImg
        }
      ]
    },
    {
      id: '#ORD-2024-004',
      date: 'October 20, 2024',
      total: 280.00,
      itemCount: 2,
      status: 'Cancelled',
      items: [
        {
          id: 1,
          name: 'Premium Jacket',
          size: 'M',
          color: 'Black',
          qty: 1,
          price: 280.00,
          image: jacketImg
        }
      ]
    }
  ];

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'shipped': return <FaTruck />;
      case 'delivered': return <FaCheckCircle />;
      case 'cancelled': return <FaTimesCircle />;
      case 'processing': return <FaBox />;
      default: return <FaBox />;
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'shipped': return 'status-shipped';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      case 'processing': return 'status-processing';
      default: return '';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSearch = (query) => {
    console.log('Searching orders:', query);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleDownloadInvoice = (orderId) => {
    alert(`Downloading invoice for order ${orderId}`);
  };

  return (
    <div className="my-orders-page">
      <Header user={user} onLogout={onLogout} onSearch={handleSearch} />

      {/* Breadcrumb */}
      <div className="breadcrumb-orders">
        <Link to="/">Home</Link>
        <span className="separator">/</span>
        <Link to="/my-account">My Account</Link>
        <span className="separator">/</span>
        <span className="active">My Orders</span>
      </div>

      <div className="orders-container">
        {/* Page Header */}
        <div className="orders-header">
          <div className="header-left">
            <button className="back-btn" onClick={() => navigate('/my-account')}>
              <FaArrowLeft />
            </button>
            <div>
              <h1><FaShoppingBag /> My Orders</h1>
              <p className="orders-count">{filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'} found</p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="orders-filters">
          <div className="search-box-orders">
            <FaSearch />
            <input
              type="text"
              placeholder="Search orders by ID or product name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <FaFilter />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-filter"
            >
              <option value="All">All Status</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <FaShoppingBag className="no-orders-icon" />
            <h2>No Orders Found</h2>
            <p>Try adjusting your search or filter criteria</p>
            <Link to="/" className="shop-now-btn">Start Shopping</Link>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div className="order-info-left">
                    <h3>{order.id}</h3>
                    <p className="order-date">Placed on {order.date}</p>
                  </div>
                  <div className="order-info-right">
                    <span className={`order-status ${getStatusClass(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="order-card-body">
                  <div className="order-items-preview">
                    {order.items.slice(0, 3).map(item => (
                      <div key={item.id} className="order-item-mini">
                        <img src={item.image} alt={item.name} />
                        <div className="item-mini-info">
                          <h4>{item.name}</h4>
                          <p>Qty: {item.qty} | Size: {item.size}</p>
                        </div>
                      </div>
                    ))}
                    {order.itemCount > 3 && (
                      <div className="more-items">
                        +{order.itemCount - 3} more {order.itemCount - 3 === 1 ? 'item' : 'items'}
                      </div>
                    )}
                  </div>

                  <div className="order-summary-mini">
                    <div className="summary-item">
                      <span>Total Amount</span>
                      <strong>{order.total.toFixed(2)} LE</strong>
                    </div>
                    {order.status === 'Shipped' && order.trackingNumber && (
                      <div className="summary-item">
                        <span>Tracking</span>
                        <strong>{order.trackingNumber}</strong>
                      </div>
                    )}
                    {order.status === 'Shipped' && order.estimatedDelivery && (
                      <div className="summary-item">
                        <span>Est. Delivery</span>
                        <strong>{order.estimatedDelivery}</strong>
                      </div>
                    )}
                    {order.status === 'Delivered' && order.deliveredDate && (
                      <div className="summary-item">
                        <span>Delivered on</span>
                        <strong>{order.deliveredDate}</strong>
                      </div>
                    )}
                  </div>
                </div>

                <div className="order-card-footer">
                  <button
                    className="btn-view-details"
                    onClick={() => handleViewOrder(order)}
                  >
                    <FaEye /> View Details
                  </button>
                  <button
                    className="btn-download"
                    onClick={() => handleDownloadInvoice(order.id)}
                  >
                    <FaDownload /> Invoice
                  </button>
                  {order.status === 'Delivered' && (
                    <button className="btn-reorder">
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="order-modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="order-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details</h2>
              <button className="close-modal-btn" onClick={() => setSelectedOrder(null)}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="order-detail-section">
                <h3>Order Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Order ID</span>
                    <span className="value">{selectedOrder.id}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Order Date</span>
                    <span className="value">{selectedOrder.date}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Status</span>
                    <span className={`value ${getStatusClass(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)} {selectedOrder.status}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Total</span>
                    <span className="value">{selectedOrder.total.toFixed(2)} LE</span>
                  </div>
                </div>
              </div>

              {selectedOrder.trackingNumber && (
                <div className="order-detail-section">
                  <h3><FaTruck /> Shipping Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">Tracking Number</span>
                      <span className="value">{selectedOrder.trackingNumber}</span>
                    </div>
                    {selectedOrder.estimatedDelivery && (
                      <div className="detail-item">
                        <span className="label">Estimated Delivery</span>
                        <span className="value">{selectedOrder.estimatedDelivery}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="order-detail-section">
                <h3>Order Items</h3>
                <div className="modal-items-list">
                  {selectedOrder.items.map(item => (
                    <div key={item.id} className="modal-item">
                      <img src={item.image} alt={item.name} />
                      <div className="modal-item-info">
                        <h4>{item.name}</h4>
                        <p>Size: {item.size} | Color: {item.color}</p>
                        <p>Quantity: {item.qty}</p>
                      </div>
                      <div className="modal-item-price">
                        {item.price.toFixed(2)} LE
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-download-full" onClick={() => handleDownloadInvoice(selectedOrder.id)}>
                <FaDownload /> Download Invoice
              </button>
              <button className="btn-close" onClick={() => setSelectedOrder(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="orders-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>RYYZ Store</h3>
            <p>Your premium fashion destination</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/women">Women</Link>
            <Link to="/men">Men</Link>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <Link to="/my-account">My Account</Link>
            <Link to="/cart">Shopping Cart</Link>
            <Link to="/">Help Center</Link>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: support@ryyzstore.com</p>
            <p>Phone: 01118801218</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 RYYZ Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MyOrders;
