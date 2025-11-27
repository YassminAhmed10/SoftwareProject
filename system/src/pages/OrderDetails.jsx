import React from 'react';
import { ArrowLeft, User, Calendar, CreditCard, Package } from 'lucide-react';

const OrderDetails = ({ order, onBack }) => {
  if (!order) {
    return <div>No order selected</div>;
  }

  return (
    <div className="order-details-container">
      <div className="head-title">
        <div className="left">
          <button className="back-btn" onClick={onBack}>
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <h1>Order Details</h1>
        </div>
      </div>

      <div className="order-details-content">
        <div className="order-info-card">
          <h2>Order Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon">
                <Package size={24} />
              </div>
              <div>
                <p className="info-label">Order ID</p>
                <p className="info-value">{order.id}</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <User size={24} />
              </div>
              <div>
                <p className="info-label">Customer</p>
                <p className="info-value">{order.user}</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <Calendar size={24} />
              </div>
              <div>
                <p className="info-label">Order Date</p>
                <p className="info-value">{order.date}</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <CreditCard size={24} />
              </div>
              <div>
                <p className="info-label">Amount</p>
                <p className="info-value">{order.amount}</p>
              </div>
            </div>
          </div>

          <div className="status-section">
            <p className="info-label">Order Status</p>
            <span className={`status ${order.status}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>

          <div className="category-section">
            <p className="info-label">Category</p>
            <span className={`category-badge ${order.category === 'Women Item' ? 'women' : 'men'}`}>
              {order.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
