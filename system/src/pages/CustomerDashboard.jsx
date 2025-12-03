import React, { useState } from 'react';
import { User, Package, MapPin, Heart, Clock, ShoppingBag, ArrowRight, TrendingUp, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock customer data
  const customerData = {
    name: 'Ramy',
    email: 'ramy@example.com',
    phone: '+1 234 567 8900',
    memberSince: 'January 2024',
    loyaltyPoints: 450,
    tier: 'Premium',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ramy'
  };

  // Recent orders for dashboard
  const recentOrders = [
    { id: 'ORD-1001', date: '2025-01-12', total: 149.99, status: 'Shipped', items: 2 },
    { id: 'ORD-1002', date: '2025-01-18', total: 89.00, status: 'Delivered', items: 1 },
    { id: 'ORD-1003', date: '2025-01-22', total: 234.50, status: 'Processing', items: 3 },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Package },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'wishlist', label: 'Wishlist', icon: Heart }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="overview-content">
            {/* Recent Orders Section */}
            <div className="recent-orders-section">
              <div className="section-header">
                <h2>Recent Orders</h2>
                <Link to="/my-orders" className="view-all-link">
                  View All Orders <ArrowRight size={16} />
                </Link>
              </div>
              
              <div className="orders-grid">
                {recentOrders.map((order) => (
                  <div key={order.id} className="order-preview-card">
                    <div className="order-preview-header">
                      <span className="order-id">Order #{order.id}</span>
                      <span className={`status-badge status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-preview-body">
                      <div className="order-info-row">
                        <span>Date:</span>
                        <span>{new Date(order.date).toLocaleDateString()}</span>
                      </div>
                      <div className="order-info-row">
                        <span>Total:</span>
                        <span className="order-total">${order.total.toFixed(2)}</span>
                      </div>
                      <div className="order-info-row">
                        <span>Items:</span>
                        <span>{order.items}</span>
                      </div>
                    </div>
                    <div className="order-preview-footer">
                      <Link to="/my-orders" className="view-order-btn">
                        View Order <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions-section">
              <h2>Quick Actions</h2>
              <div className="actions-grid">
                <Link to="/my-orders" className="action-card">
                  <Package size={24} />
                  <div className="action-info">
                    <h3>View All Orders</h3>
                    <p>Track your purchases</p>
                  </div>
                  <ArrowRight size={18} className="action-arrow" />
                </Link>
                
                <Link to="/products" className="action-card">
                  <ShoppingBag size={24} />
                  <div className="action-info">
                    <h3>Continue Shopping</h3>
                    <p>Browse products</p>
                  </div>
                  <ArrowRight size={18} className="action-arrow" />
                </Link>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="profile-content">
            <h2>Profile Settings</h2>
            <p>Manage your personal information and preferences.</p>
            {/* Add profile form here */}
          </div>
        );
      case 'addresses':
        return (
          <div className="addresses-content">
            <h2>Saved Addresses</h2>
            <p>Manage your shipping and billing addresses.</p>
            {/* Add addresses management here */}
          </div>
        );
      case 'wishlist':
        return (
          <div className="wishlist-content">
            <h2>Wishlist</h2>
            <p>View your saved items.</p>
            {/* Add wishlist items here */}
          </div>
        );
      default:
        return (
          <div className="default-content">
            <h2>Welcome to Your Dashboard</h2>
            <p>Select a tab to view different sections.</p>
          </div>
        );
    }
  };

  return (
    <div className="customer-dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="welcome-section">
            <div className="avatar-container">
              <img src={customerData.avatar} alt={customerData.name} className="customer-avatar" />
            </div>
            <div className="welcome-text">
              <h1>Welcome back, {customerData.name}! 👋</h1>
              <p>Here's what's happening with your account today</p>
            </div>
          </div>
          <div className="loyalty-badge">
            <div className="badge-icon">⭐</div>
            <div className="badge-info">
              <span className="tier">{customerData.tier} Member</span>
              <span className="points">{customerData.loyaltyPoints} Points</span>
            </div>
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
            <h3>{recentOrders.length}</h3>
            <p>Total Orders</p>
          </div>
          <Link to="/my-orders" className="stat-link">
            View <ArrowRight size={14} />
          </Link>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon pending">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <h3>{recentOrders.filter(o => o.status === 'Processing').length}</h3>
            <p>Pending Orders</p>
          </div>
          <Link to="/my-orders" className="stat-link">
            Track <ArrowRight size={14} />
          </Link>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon delivered">
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <h3>{recentOrders.filter(o => o.status === 'Delivered').length}</h3>
            <p>Delivered</p>
          </div>
          <Link to="/my-orders" className="stat-link">
            Review <ArrowRight size={14} />
          </Link>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon wishlist">
            <Heart size={24} />
          </div>
          <div className="stat-info">
            <h3>8</h3>
            <p>Wishlist Items</p>
          </div>
          <Link to="/wishlist" className="stat-link">
            View <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="dashboard-content">
        {/* Navigation Tabs */}
        <div className="dashboard-tabs">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;