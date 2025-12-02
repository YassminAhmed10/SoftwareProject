// src/pages/CustomerDashboard.jsx
import React, { useState } from 'react';
import { User, Package, MapPin, Heart, Settings, Clock } from 'lucide-react';
import ProfileSection from '../components/Customer/ProfileSection';
import OrdersSection from '../components/Customer/OrdersSection';
import AddressesSection from '../components/Customer/AddressesSection';
import WishlistSection from '../components/Customer/WishlistSection';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Mock customer data
  const customerData = {
    name: 'Ramy',
    email: 'Ramy@example.com',
    phone: '+1 234 567 8900',
    memberSince: 'January 2024',
    loyaltyPoints: 450,
    tier: 'Premium'
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'wishlist', label: 'Wishlist', icon: Heart }
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

  return (
    <div className="customer-dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="welcome-section">
            <h1>Welcome back, {customerData.name}! 👋</h1>
            <p>Manage your account and track your orders</p>
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