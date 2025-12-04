// src/pages/OrderDetails.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, Mail, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';
import './OrderDetails.css';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // Mock order data
  const order = {
    id: orderId || '123',
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY 10001'
    },
    date: '2024-01-15',
    status: 'processing',
    total: 245.99,
    items: [
      { id: 1, name: 'Wireless Headphones', price: 89.99, quantity: 2, total: 179.98 },
      { id: 2, name: 'Phone Case', price: 24.99, quantity: 1, total: 24.99 },
      { id: 3, name: 'Screen Protector', price: 14.99, quantity: 1, total: 14.99 },
      { id: 4, name: 'USB-C Cable', price: 11.99, quantity: 2, total: 23.98 }
    ],
    shipping: {
      method: 'Express',
      cost: 9.99,
      trackingNumber: 'TRK123456789',
      estimatedDelivery: '2024-01-18'
    },
    payment: {
      method: 'Credit Card',
      status: 'paid',
      transactionId: 'TXN987654321'
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle size={20} className="status-icon completed" />;
      case 'processing': return <Clock size={20} className="status-icon processing" />;
      case 'cancelled': return <XCircle size={20} className="status-icon cancelled" />;
      default: return <Clock size={20} className="status-icon pending" />;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return 'Completed';
      case 'processing': return 'Processing';
      case 'cancelled': return 'Cancelled';
      default: return 'Pending';
    }
  };

  return (
    <div className="order-details-container">
      <div className="page-header">
        <div className="header-left">
          <button className="btn-back" onClick={() => navigate('/dashboard/orders')}>
            <ArrowLeft size={20} />
            Back to Orders
          </button>
          <div>
            <h1>Order #{order.id}</h1>
            <p>Order details and management</p>
          </div>
        </div>
        <div className="header-right">
          <button className="btn-action">
            <Printer size={18} />
            Print Invoice
          </button>
          <button className="btn-action">
            <Mail size={18} />
            Email Customer
          </button>
          <button className="btn-primary">
            Update Status
          </button>
        </div>
      </div>

      <div className="order-overview">
        <div className="overview-card">
          <div className="overview-header">
            <div className="order-status">
              {getStatusIcon(order.status)}
              <div>
                <h3>{getStatusText(order.status)}</h3>
                <p>Order Status</p>
              </div>
            </div>
            <div className="order-total">
              <h3>${order.total.toFixed(2)}</h3>
              <p>Total Amount</p>
            </div>
          </div>
          
          <div className="overview-details">
            <div className="detail-item">
              <span className="detail-label">Order Date</span>
              <span className="detail-value">{order.date}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Customer</span>
              <span className="detail-value">{order.customer.name}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Payment</span>
              <span className="detail-value">{order.payment.method} - {order.payment.status}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Shipping</span>
              <span className="detail-value">{order.shipping.method} - ${order.shipping.cost}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="order-content">
        <div className="order-section">
          <div className="section-header">
            <h2>Order Items</h2>
            <span className="item-count">{order.items.length} items</span>
          </div>
          <div className="items-table">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map(item => (
                  <tr key={item.id}>
                    <td className="product-name">
                      <div className="product-info">
                        <div className="product-thumbnail"></div>
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td className="item-total">${item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="text-right">Subtotal</td>
                  <td>${(order.total - order.shipping.cost).toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="3" className="text-right">Shipping</td>
                  <td>${order.shipping.cost.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="3" className="text-right total-label">Total</td>
                  <td className="total-amount">${order.total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="order-sidebar">
          <div className="sidebar-section">
            <h3>Customer Information</h3>
            <div className="customer-details">
              <div className="detail-row">
                <span className="detail-label">Name</span>
                <span className="detail-value">{order.customer.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email</span>
                <span className="detail-value">{order.customer.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone</span>
                <span className="detail-value">{order.customer.phone}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Address</span>
                <span className="detail-value">{order.customer.address}</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Shipping Information</h3>
            <div className="shipping-details">
              <div className="detail-row">
                <span className="detail-label">Method</span>
                <span className="detail-value">{order.shipping.method}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Tracking</span>
                <span className="detail-value">{order.shipping.trackingNumber}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Est. Delivery</span>
                <span className="detail-value">{order.shipping.estimatedDelivery}</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Payment Information</h3>
            <div className="payment-details">
              <div className="detail-row">
                <span className="detail-label">Method</span>
                <span className="detail-value">{order.payment.method}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status</span>
                <span className={`detail-value status-${order.payment.status}`}>
                  {order.payment.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Transaction ID</span>
                <span className="detail-value">{order.payment.transactionId}</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Order Actions</h3>
            <div className="order-actions">
              <button className="btn-action-full">
                <Truck size={18} />
                Update Shipping
              </button>
              <button className="btn-action-full">
                <Mail size={18} />
                Send Tracking
              </button>
              <button className="btn-action-full btn-danger">
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;