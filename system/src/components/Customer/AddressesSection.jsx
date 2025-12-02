// src/components/Customer/AddressesSection.jsx
import React, { useState } from 'react';
import { MapPin, Plus, Edit2, Trash2, Check } from 'lucide-react';
import './AddressesSection.css';

const AddressesSection = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: 'Home',
      name: 'John Doe',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '+1 234 567 8900',
      isDefault: true
    },
    {
      id: 2,
      label: 'Work',
      name: 'John Doe',
      street: '456 Business Ave',
      city: 'Manhattan',
      state: 'NY',
      zipCode: '10002',
      phone: '+1 234 567 8900',
      isDefault: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    const address = {
      id: addresses.length + 1,
      ...newAddress,
      isDefault: addresses.length === 0
    };
    setAddresses([...addresses, address]);
    setNewAddress({
      label: '',
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      phone: ''
    });
    setShowAddForm(false);
  };

  const handleSetDefault = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };

  return (
    <div className="addresses-section">
      <div className="section-header">
        <div>
          <h2>Saved Addresses</h2>
          <p>Manage your delivery addresses</p>
        </div>
        <button 
          className="add-address-button"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus size={20} />
          Add New Address
        </button>
      </div>

      {/* Add Address Form */}
      {showAddForm && (
        <form className="add-address-form" onSubmit={handleAddAddress}>
          <h3>Add New Address</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Address Label</label>
              <input
                type="text"
                name="label"
                placeholder="Home, Work, etc."
                value={newAddress.label}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={newAddress.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group full-width">
              <label>Street Address</label>
              <input
                type="text"
                name="street"
                placeholder="123 Main Street"
                value={newAddress.street}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                placeholder="New York"
                value={newAddress.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                placeholder="NY"
                value={newAddress.state}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>ZIP Code</label>
              <input
                type="text"
                name="zipCode"
                placeholder="10001"
                value={newAddress.zipCode}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="+1 234 567 8900"
                value={newAddress.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">Save Address</button>
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Addresses Grid */}
      <div className="addresses-grid">
        {addresses.length === 0 ? (
          <div className="no-addresses">
            <MapPin size={60} />
            <h3>No addresses saved</h3>
            <p>Add a new address to get started</p>
          </div>
        ) : (
          addresses.map(address => (
            <div 
              key={address.id} 
              className={`address-card ${address.isDefault ? 'default' : ''}`}
            >
              {address.isDefault && (
                <div className="default-badge">
                  <Check size={16} />
                  Default
                </div>
              )}
              
              <div className="address-header">
                <h3>
                  <MapPin size={20} />
                  {address.label}
                </h3>
                <div className="address-actions">
                  <button className="icon-button edit">
                    <Edit2 size={18} />
                  </button>
                  <button 
                    className="icon-button delete"
                    onClick={() => handleDeleteAddress(address.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="address-content">
                <p className="name">{address.name}</p>
                <p>{address.street}</p>
                <p>{address.city}, {address.state} {address.zipCode}</p>
                <p className="phone">Phone: {address.phone}</p>
              </div>

              {!address.isDefault && (
                <button 
                  className="set-default-button"
                  onClick={() => handleSetDefault(address.id)}
                >
                  Set as Default
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddressesSection;