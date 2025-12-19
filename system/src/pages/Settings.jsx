import React, { useState, useEffect } from 'react';
import { User, MapPin, Save, Check, Plus, Trash2, Star } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [saveStatus, setSaveStatus] = useState({ profile: 'idle', address: 'idle' });
  
  // Load data from localStorage or use defaults
  const loadFromStorage = (key, defaultValue) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return defaultValue;
    }
  };

  const saveToStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // Profile Data with localStorage persistence
  const [adminProfile, setAdminProfile] = useState(() => 
    loadFromStorage('userProfile', {
      name: 'Ramy',
      email: 'ramy@example.com',
      phone: '+1 234 567 8900',
      memberSince: 'January 2024',
      loyaltyPoints: 450,
      tier: 'Premium'
    })
  );

  // Addresses Data with localStorage persistence
  const [addresses, setAddresses] = useState(() => 
    loadFromStorage('userAddresses', [
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
    ])
  );

  // New Address Form State
  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    name: '',
    address: '',
    phone: '',
    isDefault: false
  });

  // Form validation state
  const [formErrors, setFormErrors] = useState({
    name: '',
    address: '',
    phone: ''
  });

  // Updated Tabs - Only Profile and Addresses
  const tabs = [
    { id: 'profile', icon: User, label: 'My Profile' },
    { id: 'addresses', icon: MapPin, label: 'My Addresses' }
  ];

  // Save profile to localStorage
  const saveProfileToStorage = () => {
    saveToStorage('userProfile', adminProfile);
  };

  // Save addresses to localStorage
  const saveAddressesToStorage = (addressList = addresses) => {
    saveToStorage('userAddresses', addressList);
  };

  // Validate address form
  const validateAddressForm = () => {
    const errors = {
      name: '',
      address: '',
      phone: ''
    };
    let isValid = true;

    if (!newAddress.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!newAddress.address.trim()) {
      errors.address = 'Address is required';
      isValid = false;
    }

    if (!newAddress.phone.trim()) {
      errors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^[+]?[0-9\s\-()]{10,}$/.test(newAddress.phone)) {
      errors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Save profile function with feedback
  const handleProfileUpdate = () => {
    setSaveStatus({ ...saveStatus, profile: 'saving' });
    
    setTimeout(() => {
      saveProfileToStorage();
      setSaveStatus({ ...saveStatus, profile: 'saved' });
      
      setTimeout(() => {
        setSaveStatus({ ...saveStatus, profile: 'idle' });
      }, 2000);
    }, 500);
  };

  // Handle profile input changes
  const handleProfileChange = (field, value) => {
    setAdminProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle new address input changes
  const handleAddressChange = (field, value) => {
    setNewAddress(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Add address function
  const handleAddAddress = (e) => {
    e.preventDefault();
    
    if (!validateAddressForm()) {
      return;
    }

    setSaveStatus({ ...saveStatus, address: 'saving' });

    let updatedAddresses;
    
    // If setting as default, update all other addresses
    if (newAddress.isDefault) {
      updatedAddresses = addresses.map(addr => ({ 
        ...addr, 
        isDefault: false 
      }));
    } else {
      updatedAddresses = [...addresses];
    }

    const newAddr = {
      ...newAddress,
      id: Date.now(), // Use timestamp for unique ID
      isDefault: newAddress.isDefault
    };

    updatedAddresses = [...updatedAddresses, newAddr];
    
    // Update state
    setAddresses(updatedAddresses);
    
    // Save to localStorage
    saveAddressesToStorage(updatedAddresses);

    // Reset form
    setNewAddress({
      type: 'Home',
      name: '',
      address: '',
      phone: '',
      isDefault: false
    });

    setFormErrors({
      name: '',
      address: '',
      phone: ''
    });

    setSaveStatus({ ...saveStatus, address: 'saved' });
    
    setTimeout(() => {
      setSaveStatus({ ...saveStatus, address: 'idle' });
    }, 2000);
  };

  // Remove address function
  const handleRemoveAddress = (id, e) => {
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to remove this address?')) {
      const addressToRemove = addresses.find(addr => addr.id === id);
      let updatedAddresses = addresses.filter(addr => addr.id !== id);
      
      // If removing default address and there are other addresses, set first as default
      if (addressToRemove.isDefault && updatedAddresses.length > 0) {
        updatedAddresses = updatedAddresses.map((addr, index) => ({
          ...addr,
          isDefault: index === 0
        }));
      }
      
      setAddresses(updatedAddresses);
      saveAddressesToStorage(updatedAddresses);
    }
  };

  // Set default address function
  const handleSetDefault = (id) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
    
    setAddresses(updatedAddresses);
    saveAddressesToStorage(updatedAddresses);
  };

  // Auto-save profile when fields change (with debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (adminProfile && activeTab === 'profile') {
        saveProfileToStorage();
      }
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [adminProfile, activeTab]);

  // Auto-save addresses when they change
  useEffect(() => {
    if (addresses && addresses.length > 0 && activeTab === 'addresses') {
      saveAddressesToStorage();
    }
  }, [addresses, activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="settings-content">
            <div className="content-header">
              <div>
                <h2>My Profile</h2>
                <p className="section-description">Manage your personal information and account details</p>
              </div>
              <div className="save-status">
                {saveStatus.profile === 'saving' && (
                  <span className="saving-indicator">Saving...</span>
                )}
                {saveStatus.profile === 'saved' && (
                  <span className="saved-indicator">
                    <Check size={16} /> Saved!
                  </span>
                )}
              </div>
            </div>
            
            <div className="profile-card">
              <div className="profile-avatar">
                <div className="avatar-initial">
                  {adminProfile.name?.charAt(0) || 'U'}
                </div>
              </div>
              <div className="profile-form">
                <form onSubmit={(e) => { e.preventDefault(); handleProfileUpdate(); }}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        id="name"
                        type="text"
                        value={adminProfile.name}
                        onChange={(e) => handleProfileChange('name', e.target.value)}
                        placeholder="Enter your name"
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        value={adminProfile.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        placeholder="your@email.com"
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        id="phone"
                        type="tel"
                        value={adminProfile.phone}
                        onChange={(e) => handleProfileChange('phone', e.target.value)}
                        placeholder="+1234567890"
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Member Since</label>
                      <input
                        type="text"
                        value={adminProfile.memberSince}
                        disabled
                        className="form-input disabled-input"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Loyalty Points</label>
                      <div className="points-display">
                        <span className="points-value">{adminProfile.loyaltyPoints}</span>
                        <span className="points-label">Points</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Tier</label>
                      <div className="tier-badge">
                        {adminProfile.tier} Member
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-actions">
                    <button type="submit" className="btn-primary save-btn">
                      <Save size={18} />
                      Save Changes
                    </button>
                    <span className="auto-save-note">Changes are auto-saved locally</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );

      case 'addresses':
        return (
          <div className="settings-content">
            <div className="content-header">
              <div>
                <h2>My Addresses</h2>
                <p className="section-description">Manage your shipping and billing addresses</p>
              </div>
              <div className="save-status">
                {saveStatus.address === 'saving' && (
                  <span className="saving-indicator">Saving...</span>
                )}
                {saveStatus.address === 'saved' && (
                  <span className="saved-indicator">
                    <Check size={16} /> Saved!
                  </span>
                )}
              </div>
            </div>
            
            {/* Add New Address Form */}
            <div className="address-form-card">
              <div className="form-header">
                <h3>
                  <Plus size={20} />
                  Add New Address
                </h3>
              </div>
              
              <form onSubmit={handleAddAddress}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="address-type">Address Type</label>
                    <select
                      id="address-type"
                      value={newAddress.type}
                      onChange={(e) => handleAddressChange('type', e.target.value)}
                      className="form-select"
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className={`form-group ${formErrors.name ? 'error' : ''}`}>
                    <label htmlFor="address-name">Name *</label>
                    <input
                      id="address-name"
                      type="text"
                      value={newAddress.name}
                      onChange={(e) => handleAddressChange('name', e.target.value)}
                      placeholder="Enter name for this address"
                      className="form-input"
                    />
                    {formErrors.name && (
                      <span className="error-message">{formErrors.name}</span>
                    )}
                  </div>
                </div>
                
                <div className={`form-group ${formErrors.address ? 'error' : ''}`}>
                  <label htmlFor="full-address">Full Address *</label>
                  <textarea
                    id="full-address"
                    value={newAddress.address}
                    onChange={(e) => handleAddressChange('address', e.target.value)}
                    placeholder="Enter complete address"
                    rows={3}
                    className="form-textarea"
                  />
                  {formErrors.address && (
                    <span className="error-message">{formErrors.address}</span>
                  )}
                </div>
                
                <div className="form-row">
                  <div className={`form-group ${formErrors.phone ? 'error' : ''}`}>
                    <label htmlFor="phone-number">Phone Number *</label>
                    <input
                      id="phone-number"
                      type="tel"
                      value={newAddress.phone}
                      onChange={(e) => handleAddressChange('phone', e.target.value)}
                      placeholder="+201234567890"
                      className="form-input"
                    />
                    {formErrors.phone && (
                      <span className="error-message">{formErrors.phone}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={newAddress.isDefault}
                        onChange={(e) => handleAddressChange('isDefault', e.target.checked)}
                      />
                      <span>Set as default address</span>
                    </label>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={!newAddress.name || !newAddress.address || !newAddress.phone}
                  >
                    <Plus size={18} />
                    Add Address
                  </button>
                  <span className="auto-save-note">Addresses are auto-saved</span>
                </div>
              </form>
            </div>
            
            {/* Address List */}
            <div className="addresses-list">
              <div className="addresses-header">
                <h3>Saved Addresses ({addresses.length})</h3>
              </div>
              
              {addresses.length === 0 ? (
                <div className="no-addresses">
                  <MapPin size={48} />
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
                          <div className="type-info">
                            <span className="type-label">{address.type}</span>
                            {address.isDefault && (
                              <span className="default-badge">
                                <Star size={12} fill="currentColor" />
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="address-actions">
                          <button 
                            onClick={() => handleSetDefault(address.id)}
                            className="btn-set-default"
                            disabled={address.isDefault}
                            title={address.isDefault ? 'This is your default address' : 'Set as default address'}
                          >
                            {address.isDefault ? 'Default' : 'Make Default'}
                          </button>
                          <button 
                            onClick={(e) => handleRemoveAddress(address.id, e)}
                            className="btn-remove"
                            title="Remove address"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="address-details">
                        <h4>{address.name}</h4>
                        <p className="address-text">{address.address}</p>
                        <div className="address-phone">
                          <span className="phone-icon">📱</span>
                          <span className="phone-number">{address.phone}</span>
                        </div>
                      </div>
                      <div className="address-footer">
                        <span className="address-id">ID: {address.id}</span>
                        <span className="auto-save-note">Saved</span>
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
    <div className="settings-page">
      <div className="settings-tabs">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="tab-icon-wrapper">
                <Icon size={28} strokeWidth={2} />
              </div>
              <span className="tab-label">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="settings-body">
        {renderContent()}
      </div>
    </div>
  );
};

export default Settings;