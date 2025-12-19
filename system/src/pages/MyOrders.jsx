// src/pages/MyOrders.jsx - UPDATED: REMOVED BUTTONS & FIXED CALCULATIONS
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./MyOrders.css";
import ShipmentTracking from "./ShipmentTracking";
import { mockProducts, formatPrice, getProductById } from "./ProductPage";
import { getCartFromStorage, updateCartInStorage } from "./CartPage";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showTracking, setShowTracking] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");

  // Initialize with localStorage data
  useEffect(() => {
    // Load orders from localStorage or create sample orders
    const savedOrders = localStorage.getItem('ecommerceOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Create sample orders based on actual products
      const sampleOrders = createSampleOrders();
      setOrders(sampleOrders);
      localStorage.setItem('ecommerceOrders', JSON.stringify(sampleOrders));
    }

    // Load cart items
    setCartItems(getCartFromStorage());
  }, []);

  // Create sample orders using real product data with correct calculations
  const createSampleOrders = () => {
    const getRandomDate = (daysAgo) => {
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      return date.toISOString().split('T')[0];
    };

    const shippingAddresses = [
      "123 Main St, New York, NY 10001",
      "456 Oak Ave, Chicago, IL 60601",
      "789 Pine Rd, Los Angeles, CA 90001",
      "321 Maple Blvd, Boston, MA 02101"
    ];
    const paymentMethods = ["Visa **** 4242", "Mastercard **** 8888", "PayPal", "American Express **** 1234"];

    // Order 1: Leather Jacket + 2 Classic T-Shirts
    const order1Items = [
      { 
        productId: 1, 
        name: "Leather Jacket", 
        qty: 1, 
        price: 700, // discount price
        basePrice: 800,
        image: mockProducts[0].image 
      },
      { 
        productId: 2, 
        name: "Classic T-Shirt", 
        qty: 2, 
        price: 350, // discount price
        basePrice: 400,
        image: mockProducts[1].image 
      }
    ];
    const order1Subtotal = (700 * 1) + (350 * 2); // 700 + 700 = 1400
    const order1Tax = order1Subtotal * 0.08; // 112
    const order1Total = order1Subtotal + order1Tax; // 1512

    // Order 2: Cloud White Hoodie
    const order2Items = [
      { 
        productId: 5, 
        name: "Cloud White Hoodie", 
        qty: 1, 
        price: 550, // discount price
        basePrice: 600,
        image: mockProducts[4].image 
      }
    ];
    const order2Subtotal = 550 * 1; // 550
    const order2Tax = order2Subtotal * 0.08; // 44
    const order2Total = order2Subtotal + order2Tax; // 594

    // Order 3: Leather Jacket + Rose Zip Hoodie
    const order3Items = [
      { 
        productId: 1, 
        name: "Leather Jacket", 
        qty: 1, 
        price: 700, // discount price
        basePrice: 800,
        image: mockProducts[0].image 
      },
      { 
        productId: 6, 
        name: "Rose Zip Hoodie", 
        qty: 1, 
        price: 600, // base price (no discount)
        basePrice: 600,
        image: mockProducts[5].image 
      }
    ];
    const order3Subtotal = (700 * 1) + (600 * 1); // 700 + 600 = 1300
    const order3Tax = order3Subtotal * 0.08; // 104
    const order3Total = order3Subtotal + order3Tax; // 1404

    return [
      {
        id: "ORD-1001",
        date: getRandomDate(3),
        subtotal: order1Subtotal,
        tax: order1Tax,
        total: order1Total,
        status: "shipped",
        tracking: "TRK93284723EG",
        items: order1Items,
        shippingAddress: shippingAddresses[0],
        paymentMethod: paymentMethods[0],
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
        date: getRandomDate(7),
        subtotal: order2Subtotal,
        tax: order2Tax,
        total: order2Total,
        status: "delivered",
        tracking: "TRK83472311EG",
        items: order2Items,
        shippingAddress: shippingAddresses[1],
        paymentMethod: paymentMethods[1],
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
        date: getRandomDate(1),
        subtotal: order3Subtotal,
        tax: order3Tax,
        total: order3Total,
        status: "processing",
        tracking: "TRK99283746EG",
        items: order3Items,
        shippingAddress: shippingAddresses[2],
        paymentMethod: paymentMethods[2],
        trackingEvents: [
          { status: "Order Placed", location: "LA Warehouse", date: "2025-01-22", time: "11:15 AM" },
          { status: "Confirmed", location: "Processing Center", date: "2025-01-22", time: "3:00 PM" }
        ],
        estimatedDelivery: "2025-01-28"
      },
    ];
  };

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
      const updatedCart = [...cartItems];
      let addedCount = 0;

      order.items.forEach(orderItem => {
        const product = getProductById(orderItem.productId);
        if (product && product.inStock) {
          const defaultSize = product.sizes[0] || 'One Size';
          const defaultColor = product.colors[0] || 'Default';
          const itemId = `${product.id}-${defaultSize}-${defaultColor}`;

          const existingItemIndex = updatedCart.findIndex(item => item.itemId === itemId);

          if (existingItemIndex >= 0) {
            updatedCart[existingItemIndex].quantity += orderItem.qty;
          } else {
            updatedCart.push({
              ...product,
              itemId,
              quantity: orderItem.qty,
              size: defaultSize,
              color: defaultColor
            });
          }
          addedCount++;
        }
      });

      if (addedCount > 0) {
        setCartItems(updatedCart);
        updateCartInStorage(updatedCart);
        alert(`${addedCount} item(s) from ${order.id} added to cart!`);
        navigate('/cart');
      } else {
        alert("No items from this order are currently in stock.");
      }
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
            <div style={{ marginTop: '20px' }}>
              <Link to="/products" className="btn-secondary">
                🛍️ Shop Now
              </Link>
            </div>
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
                        <p className="order-total-amount">{formatPrice(order.total)}</p>
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
                  {order.items.map((item, index) => {
                    const itemTotal = item.price * item.qty;
                    const hasDiscount = item.basePrice > item.price;
                    
                    return (
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
                            <span className="item-price">{formatPrice(item.price)} each</span>
                          </div>
                          {hasDiscount && (
                            <div className="item-discount-info">
                              <span className="original-price-line">Original: {formatPrice(item.basePrice)}</span>
                              <span className="discount-amount">Save {formatPrice((item.basePrice - item.price) * item.qty)}</span>
                            </div>
                          )}
                          <div className="item-subtotal">
                            Subtotal: <span>{formatPrice(itemTotal)}</span>
                          </div>
                        </div>
                        <div className="item-total">
                          <span>{formatPrice(itemTotal)}</span>
                        </div>
                      </div>
                    );
                  })}
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
                          <span>{formatPrice(order.subtotal)}</span>
                        </div>
                        <div className="summary-row">
                          <span>Shipping:</span>
                          <span>Free</span>
                        </div>
                        <div className="summary-row">
                          <span>Tax (8%):</span>
                          <span>{formatPrice(order.tax)}</span>
                        </div>
                        <div className="summary-row total">
                          <span>Total:</span>
                          <span>{formatPrice(order.total)}</span>
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
                        🔄 Reorder All
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