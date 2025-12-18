import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./MyOrders.css";
import ShipmentTracking from "./ShipmentTracking";

const MyOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD-1001",
      date: "2025-01-12",
      total: 149.99,
      status: "shipped",
      tracking: "TRK93284723EG",
      items: [
        { name: "Nike Running Shoes", qty: 1, price: 99.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop" },
        { name: "Sports Socks", qty: 2, price: 25.00, image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&h=400&fit=crop" }
      ],
      shippingAddress: "123 Main St, New York, NY 10001",
      paymentMethod: "Visa **** 4242",
      trackingEvents: [
        { status: "Order Placed", location: "New York Warehouse", date: "2025-01-12", time: "10:30 AM" },
        { status: "Confirmed", location: "Processing Center", date: "2025-01-12", time: "2:15 PM" },
        { status: "Processing", location: "Quality Check", date: "2025-01-13", time: "9:00 AM" },
        { status: "Shipped", location: "New York Hub", date: "2025-01-14", time: "3:45 PM" },
        { status: "In Transit", location: "Chicago Distribution", date: "2025-01-15", time: "11:20 AM" }
      ],
      estimatedDelivery: "2025-01-18"
    },
    {
      id: "ORD-1002",
      date: "2025-01-18",
      total: 89.00,
      status: "delivered",
      tracking: "TRK83472311EG",
      items: [
        { name: "Blue Hoodie", qty: 1, price: 89.00, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop" }
      ],
      shippingAddress: "456 Oak Ave, Chicago, IL 60601",
      paymentMethod: "Mastercard **** 8888",
      trackingEvents: [
        { status: "Order Placed", location: "Chicago Warehouse", date: "2025-01-18", time: "2:30 PM" },
        { status: "Confirmed", location: "Processing Center", date: "2025-01-18", time: "4:45 PM" },
        { status: "Processing", location: "Quality Check", date: "2025-01-19", time: "10:00 AM" },
        { status: "Shipped", location: "Chicago Hub", date: "2025-01-19", time: "3:20 PM" },
        { status: "In Transit", location: "Local Distribution", date: "2025-01-20", time: "9:15 AM" },
        { status: "Out for Delivery", location: "Your Area", date: "2025-01-20", time: "1:30 PM" },
        { status: "Delivered", location: "Front Door", date: "2025-01-20", time: "3:45 PM" }
      ],
      estimatedDelivery: "2025-01-20"
    },
    {
      id: "ORD-1003",
      date: "2025-01-22",
      total: 234.50,
      status: "processing",
      tracking: "TRK99283746EG",
      items: [
        { name: "Leather Jacket", qty: 1, price: 189.99, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop" },
        { name: "Baseball Cap", qty: 1, price: 24.99, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop" },
        { name: "Sunglasses", qty: 1, price: 19.52, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop" }
      ],
      shippingAddress: "789 Pine Rd, Los Angeles, CA 90001",
      paymentMethod: "PayPal",
      trackingEvents: [
        { status: "Order Placed", location: "LA Warehouse", date: "2025-01-22", time: "11:15 AM" },
        { status: "Confirmed", location: "Processing Center", date: "2025-01-22", time: "3:00 PM" }
      ],
      estimatedDelivery: "2025-01-28"
    },
    {
      id: "ORD-1004",
      date: "2025-01-25",
      total: 65.99,
      status: "pending",
      tracking: "TRK77482901EG",
      items: [
        { name: "White T-Shirt", qty: 2, price: 19.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop" },
        { name: "Jeans", qty: 1, price: 45.99, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop" }
      ],
      shippingAddress: "321 Maple Blvd, Boston, MA 02101",
      paymentMethod: "American Express **** 1234",
      trackingEvents: [
        { status: "Order Placed", location: "Boston Warehouse", date: "2025-01-25", time: "3:45 PM" }
      ],
      estimatedDelivery: "2025-02-01"
    }
  ]);

  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showTracking, setShowTracking] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredOrders = orders.filter(order => {
    if (activeFilter === "all") return true;
    return order.status === activeFilter;
  });

  const handleTrackShipment = (orderId) => {
    setShowTracking(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const handleViewDetails = (orderId) => {
    setExpandedOrder(prev => prev === orderId ? null : orderId);
  };

  const handleRequestReturn = (orderId) => {
    if (window.confirm("Are you sure you want to request a return for this order?")) {
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status: "return_requested" }
          : order
      ));
      alert(`Return request submitted for ${orderId}. You'll receive an email with instructions.`);
    }
  };

  const handleReorder = (order) => {
    const confirmed = window.confirm(`Add ${order.items.length} item(s) from ${order.id} to your cart?`);
    if (confirmed) {
      // In a real app, you would add items to cart here
      alert(`Items from ${order.id} added to cart!`);
    }
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm("Cancel this order? This action cannot be undone.")) {
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status: "cancelled" }
          : order
      ));
      alert(`Order ${orderId} has been cancelled.`);
    }
  };

  const handleContactSupport = (orderId) => {
    window.open(`mailto:support@example.com?subject=Support Request for Order ${orderId}`, '_blank');
  };

  const handleDownloadInvoice = (orderId) => {
    alert(`Invoice for ${orderId} would be downloaded. In a real app, this would generate a PDF.`);
  };

  const statusConfig = {
    pending: { label: "Pending", color: "#FF9800", bg: "#FFF3E0", icon: "⏳" },
    processing: { label: "Processing", color: "#9C27B0", bg: "#F3E5F5", icon: "⚙️" },
    shipped: { label: "Shipped", color: "#2196F3", bg: "#E3F2FD", icon: "🚚" },
    delivered: { label: "Delivered", color: "#4CAF50", bg: "#E8F5E9", icon: "✅" },
    cancelled: { label: "Cancelled", color: "#F44336", bg: "#FFEBEE", icon: "❌" },
    return_requested: { label: "Return Requested", color: "#FF9800", bg: "#FFF3E0", icon: "↩️" }
  };

  const getStatusConfig = (status) => statusConfig[status] || statusConfig.pending;

  return (
    <div className="orders-container">
      {/* Header with Stats */}
      <div className="orders-header">
        <div>
          <h1 className="orders-title">My Orders</h1>
          <p className="orders-subtitle">Track and manage your purchases</p>
        </div>
        <div className="orders-stats">
          <div className="stat-card">
            <span className="stat-number">{orders.length}</span>
            <span className="stat-label">Total Orders</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {orders.filter(o => o.status === 'delivered').length}
            </span>
            <span className="stat-label">Delivered</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {orders.filter(o => o.status === 'processing' || o.status === 'shipped').length}
            </span>
            <span className="stat-label">In Progress</span>
          </div>
        </div>
      </div>

      {/* Back to Dashboard Link */}
      <div className="dashboard-back-link">
        <Link to="/customer-dashboard" className="back-to-dashboard">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="orders-filters">
        <button 
          className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => setActiveFilter("all")}
        >
          All Orders ({orders.length})
        </button>
        <button 
          className={`filter-btn ${activeFilter === "pending" ? "active" : ""}`}
          onClick={() => setActiveFilter("pending")}
        >
          Pending ({orders.filter(o => o.status === "pending").length})
        </button>
        <button 
          className={`filter-btn ${activeFilter === "processing" ? "active" : ""}`}
          onClick={() => setActiveFilter("processing")}
        >
          Processing ({orders.filter(o => o.status === "processing").length})
        </button>
        <button 
          className={`filter-btn ${activeFilter === "shipped" ? "active" : ""}`}
          onClick={() => setActiveFilter("shipped")}
        >
          Shipped ({orders.filter(o => o.status === "shipped").length})
        </button>
        <button 
          className={`filter-btn ${activeFilter === "delivered" ? "active" : ""}`}
          onClick={() => setActiveFilter("delivered")}
        >
          Delivered ({orders.filter(o => o.status === "delivered").length})
        </button>
      </div>

      {/* Orders List */}
      <div className="orders-list">
        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <div className="no-orders-icon">📦</div>
            <h3>No orders found</h3>
            <p>No orders match your current filter.</p>
            <button 
              className="btn-primary"
              onClick={() => setActiveFilter("all")}
            >
              View All Orders
            </button>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const statusConfig = getStatusConfig(order.status);
            const isExpanded = expandedOrder === order.id;
            const showOrderTracking = showTracking[order.id];

            return (
              <div className="order-card-modern" key={order.id}>
                {/* Order Header */}
                <div className="order-header">
                  <div className="order-info">
                    <div className="order-id-container">
                      <div className="order-id-wrapper">
                        <h2 className="order-id">Order #{order.id}</h2>
                        <div className="order-badges">
                          {order.status === "delivered" && (
                            <span className="badge success">✓ Delivered</span>
                          )}
                          {order.status === "shipped" && (
                            <span className="badge warning">🚚 In Transit</span>
                          )}
                          {order.status === "processing" && (
                            <span className="badge info">⚙️ Processing</span>
                          )}
                          {order.status === "pending" && (
                            <span className="badge pending">⏳ Pending</span>
                          )}
                        </div>
                      </div>
                      <div className="order-meta">
                        <p className="order-date">Placed {formatDate(order.date)}</p>
                        <p className="order-total-amount">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="order-status-container">
                    <span 
                      className="order-status-badge"
                      style={{ 
                        backgroundColor: statusConfig.bg,
                        color: statusConfig.color,
                        border: `1px solid ${statusConfig.color}20`
                      }}
                    >
                      <span className="status-icon">{statusConfig.icon}</span>
                      {statusConfig.label}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="order-items-modern">
                  {order.items.map((item, index) => (
                    <div className="order-item-card" key={index}>
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="item-image"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/80x80/e0e0e0/969696?text=No+Image";
                        }}
                      />
                      <div className="item-details">
                        <h4 className="item-name">{item.name}</h4>
                        <div className="item-meta">
                          <span className="item-qty">Quantity: {item.qty}</span>
                          <span className="item-price">${item.price.toFixed(2)} each</span>
                        </div>
                        <div className="item-subtotal">
                          Subtotal: <span>${(item.price * item.qty).toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="item-total">
                        <span>${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="order-details-expanded">
                    <div className="details-grid">
                      <div className="detail-section">
                        <h4>📦 Shipping Information</h4>
                        <p>{order.shippingAddress}</p>
                      </div>
                      <div className="detail-section">
                        <h4>💳 Payment Method</h4>
                        <p>{order.paymentMethod}</p>
                      </div>
                      <div className="detail-section">
                        <h4>📊 Order Summary</h4>
                        <div className="summary-row">
                          <span>Subtotal:</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                          <span>Shipping:</span>
                          <span>Free</span>
                        </div>
                        <div className="summary-row">
                          <span>Tax:</span>
                          <span>${(order.total * 0.08).toFixed(2)}</span>
                        </div>
                        <div className="summary-row total">
                          <span>Total:</span>
                          <span>${(order.total * 1.08).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Shipment Tracking */}
                {showOrderTracking && (
                  <div className="tracking-container">
                    <ShipmentTracking order={order} />
                  </div>
                )}

                {/* Order Actions */}
                <div className="order-actions-modern">
                  <button 
                    className="btn-outline"
                    onClick={() => handleTrackShipment(order.id)}
                  >
                    {showOrderTracking ? "Hide Tracking" : "📍 Track Shipment"}
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={() => handleViewDetails(order.id)}
                  >
                    {isExpanded ? "▲ Hide Details" : "▼ View Details"}
                  </button>
                  
                  {/* Additional Actions */}
                  <div className="secondary-actions">
                    {order.status === "delivered" && (
                      <button 
                        className="btn-secondary"
                        onClick={() => handleReorder(order)}
                      >
                        🔄 Reorder
                      </button>
                    )}
                    {(order.status === "pending" || order.status === "processing") && (
                      <button 
                        className="btn-danger"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        🗑️ Cancel Order
                      </button>
                    )}
                    {(order.status === "delivered" || order.status === "shipped") && (
                      <button 
                        className="btn-warning"
                        onClick={() => handleRequestReturn(order.id)}
                      >
                        ↩️ Request Return
                      </button>
                    )}
                    
                    {/* Always Available Actions */}
                    <button 
                      className="btn-info"
                      onClick={() => handleContactSupport(order.id)}
                    >
                      💬 Support
                    </button>
                    <button 
                      className="btn-light"
                      onClick={() => handleDownloadInvoice(order.id)}
                    >
                      📄 Invoice
                    </button>
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

export default MyOrders;