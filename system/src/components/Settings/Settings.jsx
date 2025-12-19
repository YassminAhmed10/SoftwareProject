// src/components/Settings/Settings.jsx
import React, { useState, useEffect } from 'react';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  // Load profile data from localStorage or use defaults
  const loadProfileData = () => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }
    return {
      name: 'Ramy',
      email: 'ramy@example.com',
      phone: '+1 234 567 8900',
      memberSince: 'January 2024',
      loyaltyPoints: 450,
      tier: 'Premium'
    };
  };

  // Load addresses from localStorage or use defaults
  const loadAddresses = () => {
    const savedAddresses = localStorage.getItem('userAddresses');
    if (savedAddresses) {
      return JSON.parse(savedAddresses);
    }
    return [
      { 
        id: 1, 
        type: 'Home', 
        name: 'Ramy', 
        address: '123 Main St, New York, NY 10001', 
        phone: '+1 234 567 8900', 
        isDefault: true 
      },
      { 
        id: 2, 
        type: 'Work', 
        name: 'Ramy Office', 
        address: '456 Business Ave, Suite 300, NY 10002', 
        phone: '+1 234 567 8901', 
        isDefault: false 
      }
    ];
  };

  const [profileData, setProfileData] = useState(loadProfileData());
  const [addresses, setAddresses] = useState(loadAddresses());
  
  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    name: '',
    address: '',
    phone: '',
    isDefault: false
  });

  const tabs = [
    { id: 'profile', icon: '👤', label: 'My Profile' },
    { id: 'addresses', icon: '📍', label: 'My Addresses' }
  ];

  // Save profile data to localStorage
  const saveProfileData = () => {
    setIsSaving(true);
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    
    // Show saved message
    setShowSavedMessage(true);
    setIsSaving(false);
    
    // Hide message after 3 seconds
    setTimeout(() => {
      setShowSavedMessage(false);
    }, 3000);
  };

  // Save addresses to localStorage
  const saveAddresses = (updatedAddresses = addresses) => {
    localStorage.setItem('userAddresses', JSON.stringify(updatedAddresses));
  };

  // Auto-save profile when it changes (with debounce)
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (activeTab === 'profile') {
        saveProfileData();
      }
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [profileData, activeTab]);

  // Save addresses when they change
  useEffect(() => {
    if (addresses.length > 0) {
      saveAddresses();
    }
  }, [addresses]);

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    
    if (!newAddress.name.trim() || !newAddress.address.trim() || !newAddress.phone.trim()) {
      alert('Please fill all required fields');
      return;
    }

    let updatedAddresses = [...addresses];
    
    // If setting as default, update all other addresses
    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map(addr => ({
        ...addr,
        isDefault: false
      }));
    }

    const newAddr = {
      ...newAddress,
      id: Date.now() // Use timestamp for unique ID
    };

    updatedAddresses.push(newAddr);
    setAddresses(updatedAddresses);
    
    // Reset form
    setNewAddress({
      type: 'Home',
      name: '',
      address: '',
      phone: '',
      isDefault: false
    });

    alert('Address added successfully!');
  };

  const handleRemoveAddress = (id) => {
    if (window.confirm('Are you sure you want to remove this address?')) {
      const addressToRemove = addresses.find(addr => addr.id === id);
      let updatedAddresses = addresses.filter(addr => addr.id !== id);
      
      // If removing default address, set first as default
      if (addressToRemove?.isDefault && updatedAddresses.length > 0) {
        updatedAddresses[0].isDefault = true;
      }
      
      setAddresses(updatedAddresses);
      alert('Address removed successfully!');
    }
  };

  const handleSetDefault = (id) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
    
    setAddresses(updatedAddresses);
    alert('Default address updated!');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="profile-content">
            <h2>My Profile</h2>
            <p className="section-description">Manage your personal information and account details</p>
            
            <div className="profile-card">
              <div className="profile-avatar">
                <div className="avatar-initial">
                  {profileData.name?.charAt(0) || 'U'}
                </div>
              </div>
              
              <div className="profile-info">
                <h3>{profileData.name}</h3>
                <p className="email">{profileData.email}</p>
                
                <div className="profile-meta">
                  <div className="meta-item">
                    <strong>Member Since:</strong> {profileData.memberSince}
                  </div>
                  <div className="meta-item">
                    <strong>Tier:</strong> <span className="tier-badge">{profileData.tier} Member</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-form">
              <div className="form-header">
                <h4>Personal Information</h4>
                <div className="save-status">
                  {isSaving && <span className="saving">Saving...</span>}
                  {showSavedMessage && <span className="saved">✓ Saved!</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Loyalty Points</label>
                  <div className="points-display">
                    <span className="points-value">{profileData.loyaltyPoints}</span>
                    <span className="points-label">Points</span>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Member Since</label>
                  <input
                    type="text"
                    value={profileData.memberSince}
                    onChange={(e) => handleProfileChange('memberSince', e.target.value)}
                    className="form-input"
                  />
                </div>
                {/* REMOVED Tier dropdown - only shows as read-only badge */}
                <div className="form-group">
                  <label>Account Tier</label>
                  <div className="tier-display">
                    <span className="tier-value">{profileData.tier}</span>
                    <span className="tier-label">Member</span>
                  </div>
                </div>
              </div>

              <div className="auto-save-note">
                Changes are saved automatically to your browser
              </div>
            </div>
          </div>
        );

      case 'addresses':
        return (
          <div className="addresses-content">
            <h2>My Addresses</h2>
            <p className="section-description">Manage your shipping and billing addresses</p>

            {/* Add New Address Form */}
            <div className="add-address-form">
              <h3><span>➕</span> Add New Address</h3>
              
              <form onSubmit={handleAddAddress}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Address Type</label>
                    <select
                      value={newAddress.type}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, type: e.target.value }))}
                      className="form-select"
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Name *</label>
                    <input
                      type="text"
                      value={newAddress.name}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter name"
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Full Address *</label>
                  <textarea
                    value={newAddress.address}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter complete address"
                    rows={3}
                    className="form-textarea"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+1 234 567 8900"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={newAddress.isDefault}
                        onChange={(e) => setNewAddress(prev => ({ ...prev, isDefault: e.target.checked }))}
                      />
                      Set as default address
                    </label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="add-address-btn"
                  disabled={!newAddress.name || !newAddress.address || !newAddress.phone}
                >
                  <span>➕</span> Add Address
                </button>
              </form>
            </div>

            {/* Address List */}
            <div className="addresses-list">
              <h3>Saved Addresses ({addresses.length})</h3>
              
              {addresses.length === 0 ? (
                <div className="no-addresses">
                  <span className="icon">📍</span>
                  <p>No addresses saved yet. Add your first address above.</p>
                </div>
              ) : (
                <div className="address-grid">
                  {addresses.map(address => (
                    <div key={address.id} className={`address-card ${address.isDefault ? 'default' : ''}`}>
                      <div className="address-header">
                        <div className="address-type">
                          <div className="type-icon">
                            {address.type === 'Home' ? '🏠' : address.type === 'Work' ? '🏢' : '📍'}
                          </div>
                          <span className="type-label">{address.type}</span>
                          {address.isDefault && (
                            <span className="default-badge">
                              <span>⭐</span> Default
                            </span>
                          )}
                        </div>
                        <div className="address-actions">
                          <button 
                            onClick={() => handleSetDefault(address.id)}
                            className="set-default-btn"
                            disabled={address.isDefault}
                          >
                            {address.isDefault ? 'Default' : 'Make Default'}
                          </button>
                          <button 
                            onClick={() => handleRemoveAddress(address.id)}
                            className="remove-btn"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      
                      <div className="address-details">
                        <h4>{address.name}</h4>
                        <p className="address-text">{address.address}</p>
                        <div className="address-phone">
                          <span className="phone-label">Phone:</span>
                          <span className="phone-number">{address.phone}</span>
                        </div>
                      </div>
                      
                      <div className="address-saved">
                        Saved in your browser
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-page">
        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              type="button"
            >
              <div className="tab-icon">
                {tab.icon}
              </div>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="settings-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;