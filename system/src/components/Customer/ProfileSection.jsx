// src/components/Customer/ProfileSection.jsx
import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Edit2, Save, X } from 'lucide-react';
import './ProfileSection.css';

const ProfileSection = ({ customerData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: customerData.name,
    email: customerData.email,
    phone: customerData.phone
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Here you would typically send the data to your backend
    console.log('Saving profile:', formData);
    setIsEditing(false);
    // Show success message
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData({
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-section">
      <div className="section-header">
        <h2>Personal Information</h2>
        {!isEditing ? (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            <Edit2 size={18} />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="edit-actions">
            <button className="save-button" onClick={handleSave}>
              <Save size={18} />
              <span>Save</span>
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              <X size={18} />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      <div className="profile-content">
        {/* Profile Picture */}
        <div className="profile-picture-section">
          <div className="profile-avatar">
            <User size={60} />
          </div>
          <button className="change-photo-button">Change Photo</button>
        </div>

        {/* Profile Form */}
        <div className="profile-form">
          <div className="form-group">
            <label>
              <User size={18} />
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
            ) : (
              <p className="form-value">{formData.name}</p>
            )}
          </div>

          <div className="form-group">
            <label>
              <Mail size={18} />
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
            ) : (
              <p className="form-value">{formData.email}</p>
            )}
          </div>

          <div className="form-group">
            <label>
              <Phone size={18} />
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
              />
            ) : (
              <p className="form-value">{formData.phone}</p>
            )}
          </div>

          <div className="form-group">
            <label>
              <Calendar size={18} />
              Member Since
            </label>
            <p className="form-value">{customerData.memberSince}</p>
          </div>
        </div>
      </div>

      {/* Account Stats */}
      <div className="account-stats">
        <h3>Account Statistics</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Loyalty Tier</span>
            <span className="stat-value premium">{customerData.tier}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Points</span>
            <span className="stat-value">{customerData.loyaltyPoints}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Next Reward At</span>
            <span className="stat-value">500 points</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;