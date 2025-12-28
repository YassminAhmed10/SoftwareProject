import { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import './MyOrders.css';

const MyAccount = ({ user, onLogout }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [timeFilter, setTimeFilter] = useState('Last 6 Months');

  const orders = [
    {
      id: '#123-4567890',
      date: 'October 26, 2023',
      total: 145.99,
      itemCount: 3,
      status: 'Shipped',
      estimatedDelivery: 'Nov 2, 2023',
      trackingNumber: 'UPS: 1Z9999W99999999999',
      items: [
        {
          id: 1,
          name: 'Classic Denim Jacket',
          size: 'M',
          qty: 1,
          price: 79.99,
          image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300&h=300&fit=crop'
        },
        {
          id: 2,
          name: 'Essential Crewneck Tee',
          size: 'M',
          qty: 2,
          price: 40.00,
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop'
        },
        {
          id: 3,
          name: 'Retro Runner Sneaker',
          size: '10',
          qty: 1,
          price: 26.00,
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop'
        }
      ]
    },
    {
      id: '#123-9876543',
      date: 'September 15, 2023',
      total: 89.99,
      itemCount: 2,
      status: 'Delivered',
      estimatedDelivery: 'Sep 22, 2023',
      trackingNumber: 'UPS: 1Z8888W88888888888',
      items: [
        {
          id: 4,
          name: 'Skinny Fit Jeans',
          size: '32',
          qty: 1,
          price: 59.99,
          image: 'https://images.unsplash.com/photo-1542272454315-7fbfa0b56a27?w=300&h=300&fit=crop'
        },
        {
          id: 5,
          name: 'Baseball Cap',
          size: 'One Size',
          qty: 1,
          price: 30.00,
          image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&h=300&fit=crop'
        }
      ]
    },
    {
      id: '#123-1122334',
      date: 'August 10, 2023',
      total: 225.99,
      itemCount: 4,
      status: 'Delivered',
      estimatedDelivery: 'Aug 18, 2023',
      trackingNumber: 'USPS: 9400111111111111111111',
      items: [
        {
          id: 6,
          name: 'Leather Bomber Jacket',
          size: 'L',
          qty: 1,
          price: 149.99,
          image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop'
        },
        {
          id: 7,
          name: 'Wool Blend Sweater',
          size: 'M',
          qty: 2,
          price: 76.00,
          image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop'
        }
      ]
    }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  return (
    <div className="my-orders-page">
      <Header user={user} onLogout={onLogout} onSearch={handleSearch} />

      <div className="orders-container">
        {/* Left Side - Orders List */}
        <div className="orders-left">
          <div className="orders-header-section">
            <h1>My Account - Orders</h1>
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by order # or product name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="orders-filters">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>All</option>
              <option>Pending</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Returned</option>
            </select>
            <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
              <option>Last 6 Months</option>
              <option>2023</option>
              <option>2022</option>
              <option>Older</option>
            </select>
          </div>

          <div className="orders-list">
            {orders.map(order => (
              <div
                key={order.id}
                className={`order-card ${selectedOrder?.id === order.id ? 'active' : ''}`}
                onClick={() => setSelectedOrder(order)}
              >
                <div className="order-header">
                  <div className="order-id">
                    <span className="order-number">{order.id}</span>
                    <span className={`order-status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <span className="order-date">{order.date}</span>
                </div>

                <div className="order-summary">
                  <div className="order-info">
                    <span className="item-count">{order.itemCount} items</span>
                    <span className="order-total">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Order Details */}
        <div className="orders-right">
          {selectedOrder ? (
            <>
              <div className="order-details-header">
                <div className="order-details-title">
                  <h2>Order Details</h2>
                  <span className="order-number">{selectedOrder.id}</span>
                </div>
                <div className="order-actions">
                  <button className="btn-secondary">Download Invoice</button>
                  <button className="btn-primary">Track Package</button>
                </div>
              </div>

              <div className="tracking-info">
                <div className="tracking-header">
                  <div className="tracking-status">
                    <span className={`status-badge ${selectedOrder.status.toLowerCase()}`}>
                      {selectedOrder.status}
                    </span>
                    <span className="tracking-text">Tracking: {selectedOrder.trackingNumber}</span>
                  </div>
                  <span className="estimated-delivery">
                    Estimated Delivery: {selectedOrder.estimatedDelivery}
                  </span>
                </div>

                <div className="tracking-progress">
                  <div className="progress-steps">
                    <div className={`step ${selectedOrder.status === 'Shipped' || selectedOrder.status === 'Delivered' ? 'completed' : ''}`}>
                      <div className="step-circle">📦</div>
                      <span className="step-label">Processing</span>
                    </div>
                    <div className="step-line"></div>
                    <div className={`step ${selectedOrder.status === 'Shipped' || selectedOrder.status === 'Delivered' ? 'completed' : ''}`}>
                      <div className="step-circle">🚚</div>
                      <span className="step-label">Shipped</span>
                    </div>
                    <div className="step-line"></div>
                    <div className={`step ${selectedOrder.status === 'Delivered' ? 'completed' : ''}`}>
                      <div className="step-circle">✓</div>
                      <span className="step-label">Delivered</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-items">
                <h3>Order Items</h3>
                {selectedOrder.items.map(item => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-specs">Size: {item.size} | Qty: {item.qty}</p>
                    </div>
                    <div className="item-price">${item.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="order-summary-section">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="no-order-selected">
              <div className="placeholder-icon">📦</div>
              <h3>Select an order to view details</h3>
              <p>Choose an order from the list to see tracking information and order details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

MyAccount.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};

export default MyAccount;
