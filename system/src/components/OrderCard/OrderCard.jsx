// src/components/OrderCard/OrderCard.jsx
import React from 'react';
import './OrderCard.css';

const OrderCard = ({ order }) => {
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'completed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'processing': return '#3b82f6';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="order-card">
      <div className="order-card-header">
        <div className="order-id">Order #{order.id}</div>
        <div 
          className="order-status"
          style={{ backgroundColor: getStatusColor(order.status) + '20', color: getStatusColor(order.status) }}
        >
          {order.status}
        </div>
      </div>
      
      <div className="order-card-body">
        <div className="customer-info">
          <div className="customer-name">
            <span className="label">Customer:</span>
            <span>{order.customer}</span>
          </div>
          <div className="customer-email">
            <span className="label">Email:</span>
            <span>{order.email}</span>
          </div>
        </div>
        
        <div className="order-details">
          <div className="order-date">
            <span className="label">Date:</span>
            <span>{order.date}</span>
          </div>
          <div className="order-total">
            <span className="label">Total:</span>
            <span className="amount">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="order-card-footer">
        <button className="btn-view">View Details</button>
        <button className="btn-process">Process</button>
      </div>
    </div>
  );
};

export default OrderCard;