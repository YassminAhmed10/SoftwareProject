// src/components/Customer/OrdersSection.jsx
import React from 'react';
import { Package, Clock, CheckCircle, AlertCircle, Truck, ChevronRight } from 'lucide-react';
import './OrdersSection.css';

const OrdersSection = () => {
  // Mock order data - replace with real data from your API
  const orders = [
    {
      id: 'ORD-2025-001',
      date: '2025-01-15',
      status: 'Delivered',
      items: [
        { name: 'Premium Denim Jacket', quantity: 1, price: 89.99 },
        { name: 'Cotton T-Shirt', quantity: 2, price: 24.99 }
      ],
      total: 139.97,
      trackingNumber: 'TRK789456123'
    },
    {
      id: 'ORD-2025-002',
      date: '2025-01-10',
      status: 'Processing',
      items: [
        { name: 'Leather Boots', quantity: 1, price: 129.99 }
      ],
      total: 129.99,
      trackingNumber: null
    },
    {
      id: 'ORD-2024-125',
      date: '2024-12-20',
      status: 'Shipped',
      items: [
        { name: 'Winter Coat', quantity: 1, price: 149.99 },
        { name: 'Wool Scarf', quantity: 1, price: 29.99 }
      ],
      total: 179.98,
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-2024-120',
      date: '2024-12-05',
      status: 'Cancelled',
      items: [
        { name: 'Sneakers', quantity: 1, price: 79.99 }
      ],
      total: 79.99,
      trackingNumber: null
    }
  ];

  // Status configuration
  const statusConfig = {
    'Delivered': { color: 'text-green-600', bgColor: 'bg-green-100', icon: CheckCircle },
    'Processing': { color: 'text-blue-600', bgColor: 'bg-blue-100', icon: Clock },
    'Shipped': { color: 'text-purple-600', bgColor: 'bg-purple-100', icon: Truck },
    'Cancelled': { color: 'text-red-600', bgColor: 'bg-red-100', icon: AlertCircle }
  };

  return (
    <div className="orders-section">
      {/* Section Header */}
      <div className="section-header">
        <div className="header-content">
          <Package className="section-icon" />
          <div>
            <h2>My Orders</h2>
            <p>Track and manage your orders</p>
          </div>
        </div>
        <button className="view-all-button">
          View All Orders
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Orders List */}
      <div className="orders-list">
        {orders.length === 0 ? (
          <div className="empty-orders">
            <Package size={48} className="empty-icon" />
            <h3>No Orders Yet</h3>
            <p>You haven't placed any orders. Start shopping!</p>
            <button className="shop-now-button">Shop Now</button>
          </div>
        ) : (
          orders.map((order) => {
            const StatusIcon = statusConfig[order.status]?.icon || Package;
            const statusColor = statusConfig[order.status]?.color || 'text-gray-600';
            const statusBgColor = statusConfig[order.status]?.bgColor || 'bg-gray-100';

            return (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order.id}</h3>
                    <p className="order-date">Placed on {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className={`status-badge ${statusColor} ${statusBgColor}`}>
                    <StatusIcon size={16} />
                    <span>{order.status}</span>
                  </div>
                </div>

                <div className="order-items">
                  <h4>Items</h4>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index} className="order-item">
                        <span className="item-name">{item.name}</span>
                        <div className="item-details">
                          <span className="item-quantity">Qty: {item.quantity}</span>
                          <span className="item-price">${item.price.toFixed(2)}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="order-footer">
                  <div className="order-total">
                    <span>Total:</span>
                    <span className="total-amount">${order.total.toFixed(2)}</span>
                  </div>
                  
                  <div className="order-actions">
                    {order.trackingNumber && (
                      <button className="track-button">
                        <Truck size={16} />
                        Track Order
                      </button>
                    )}
                    <button className="details-button">
                      View Details
                      <ChevronRight size={16} />
                    </button>
                    {order.status === 'Delivered' && (
                      <button className="review-button">Write Review</button>
                    )}
                    {order.status === 'Processing' && (
                      <button className="cancel-button">Cancel Order</button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default OrdersSection;