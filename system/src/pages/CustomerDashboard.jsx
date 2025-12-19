// src/pages/CustomerDashboard.jsx - UPDATED WITH PROPER MY ORDERS LINK
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  ShoppingCart, 
  Heart, 
  Package, 
  Settings, 
  User, 
  MapPin,
  LogOut,
  CreditCard,
  Truck,
  Clock,
  BarChart,
  ShoppingBasket // ADD THIS IMPORT
} from 'lucide-react';
import ProfileSection from '../components/Customer/ProfileSection';
import OrdersSection from '../components/Customer/OrdersSection';
import AddressesSection from '../components/Customer/AddressesSection';
import WishlistSection from '../components/Customer/WishlistSection';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'profile');

  // Format price in L.E
  const formatPrice = (price) => {
    return `${price.toLocaleString()} L.E`;
  };

  // Mock customer data
  const customerData = {
    name: 'Ramy',
    email: 'Ramy@example.com',
    phone: '+1 234 567 8900',
    memberSince: 'January 2024',
    loyaltyPoints: 450,
    tier: 'Premium'
  };

  const navigationItems = [
    { id: 'products', label: 'Products', icon: ShoppingBag, path: '/products' },
    { id: 'cart', label: 'Cart', icon: ShoppingCart, path: '/cart' },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, path: '/wishlist' },
    { id: 'addresses', label: 'Addresses', icon: MapPin, path: '/customer-dashboard', internal: 'addresses' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
    { id: 'orders', label: 'My Orders', icon: ShoppingBasket, path: '/my-orders' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSection customerData={customerData} />;
      case 'orders':
        return <OrdersSection />;
      case 'addresses':
        return <AddressesSection />;
      case 'wishlist':
        return <WishlistSection />;
      default:
        return <ProfileSection customerData={customerData} />;
    }
  };

  const handleNavigation = (item) => {
    if (item.internal) {
      setActiveTab(item.internal);
    } else {
      setActiveTab(item.id);
    }
  };

  // Recent orders for quick view
  const recentOrders = [
    { id: 'ORD-1001', date: '2025-01-12', total: 149.99, status: 'Shipped', items: 2 },
    { id: 'ORD-1002', date: '2025-01-10', total: 89.00, status: 'Delivered', items: 1 },
    { id: 'ORD-1003', date: '2025-01-08', total: 234.50, status: 'Processing', items: 3 },
  ];

  return (
    <div className="customer-dashboard">
      <div className="dashboard-layout">
        {/* Sidebar Navigation */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">
            <div className="user-info">
              <div className="avatar">
                R
              </div>
              <div className="user-details">
                <h3>Ramy</h3>
                <span className="user-tier">Premium Member</span>
              </div>
            </div>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section">
              <h4 className="nav-section-title">SHOPPING</h4>
              <ul className="nav-list">
                {navigationItems.slice(0, 3).map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <li key={item.id}>
                      <Link
                        to={item.path}
                        className={`nav-link ${isActive ? 'active' : ''}`}
                        onClick={() => handleNavigation(item)}
                      >
                        <Icon size={20} />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="nav-section">
              <h4 className="nav-section-title">ACCOUNT</h4>
              <ul className="nav-list">
                {navigationItems.slice(3, 6).map((item) => { // Updated slice range
                  const Icon = item.icon;
                  const isActive = activeTab === (item.internal || item.id);
                  return (
                    <li key={item.id}>
                      {item.internal ? (
                        <button
                          className={`nav-link ${isActive ? 'active' : ''}`}
                          onClick={() => handleNavigation(item)}
                        >
                          <Icon size={20} />
                          <span>{item.label}</span>
                        </button>
                      ) : (
                        <Link
                          to={item.path}
                          className={`nav-link ${isActive ? 'active' : ''}`}
                          onClick={() => handleNavigation(item)}
                        >
                          <Icon size={20} />
                          <span>{item.label}</span>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="nav-section logout-section">
              <ul className="nav-list">
                <li>
                  <button className="nav-link logout">
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>

          {/* Loyalty Points */}
          <div className="loyalty-card">
            <div className="loyalty-header">
              <span className="loyalty-icon">⭐</span>
              <div>
                <h4>Loyalty Points</h4>
                <p className="loyalty-points">{customerData.loyaltyPoints} Points</p>
              </div>
            </div>
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${(customerData.loyaltyPoints / 1000) * 100}%` }}
              ></div>
            </div>
            <p className="progress-text">
              {1000 - customerData.loyaltyPoints} points to next tier
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          {/* Dashboard Header */}
          <div className="dashboard-header">
            <div className="header-content">
              <div className="welcome-section">
                <h1>Customer Dashboard</h1>
                <p>Welcome back, {customerData.name}! Manage your account and track your orders</p>
              </div>
              <div className="header-actions">
                <Link to="/products" className="shop-now-btn">
                  <ShoppingBag size={18} />
                  Shop Now
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="quick-stats">
            <div className="stat-card">
              <div className="stat-icon orders">
                <Package size={24} />
              </div>
              <div className="stat-info">
                <h3>12</h3>
                <p>Total Orders</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon pending">
                <Clock size={24} />
              </div>
              <div className="stat-info">
                <h3>3</h3>
                <p>Pending Orders</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon addresses">
                <MapPin size={24} />
              </div>
              <div className="stat-info">
                <h3>2</h3>
                <p>Saved Addresses</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon wishlist">
                <Heart size={24} />
              </div>
              <div className="stat-info">
                <h3>8</h3>
                <p>Wishlist Items</p>
              </div>
            </div>
          </div>

          {/* Recent Orders & Activity */}
          <div className="dashboard-grid">
            <div className="recent-orders-card">
              <div className="card-header">
                <h3>Recent Orders</h3>
                <Link to="/my-orders" className="view-all">View All</Link>
              </div>
              <div className="orders-list">
                {recentOrders.map((order) => (
                  <div key={order.id} className="order-item">
                    <div className="order-info">
                      <h4>Order #{order.id}</h4>
                      <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <div className="order-details">
                      <span className="order-items">{order.items} items</span>
                      <span className="order-total">{formatPrice(order.total)}</span>
                      <span className={`order-status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="quick-actions-card">
              <div className="card-header">
                <h3>Quick Actions</h3>
              </div>
              <div className="actions-grid">
                <button className="action-btn">
                  <Truck size={20} />
                  <span>Track Order</span>
                </button>
                <button className="action-btn">
                  <CreditCard size={20} />
                  <span>Payment Methods</span>
                </button>
                <button className="action-btn">
                  <Settings size={20} />
                  <span>Account Settings</span>
                </button>
                <button className="action-btn">
                  <BarChart size={20} />
                  <span>Order History</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;