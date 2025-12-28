import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaMapMarkerAlt, FaShoppingBag, FaHeart, FaCog, FaSignOutAlt, FaEdit, FaSave, FaTimes, FaLock, FaBell, FaShieldAlt, FaEnvelope, FaPhone, FaCalendar, FaCheckCircle } from 'react-icons/fa';
import Header from '../components/Header/Header';
import PropTypes from 'prop-types';
import './MyAccount.css';

const MyAccount = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState('');

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const [profileData, setProfileData] = useState({
    firstName: 'Ahmed',
    lastName: 'Hassan',
    email: 'ahmed.hassan@email.com',
    phone: '+20 111 234 5678',
    dateOfBirth: '1995-05-15',
    gender: 'Male'
  });

  const [addresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: 'Ahmed Hassan',
      street: '123 Tahrir Street',
      city: 'Cairo',
      zipCode: '11511',
      country: 'Egypt',
      phone: '+20 111 234 5678',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      name: 'Ahmed Hassan',
      street: '456 Nile Corniche',
      city: 'Cairo',
      zipCode: '11511',
      country: 'Egypt',
      phone: '+20 111 234 5678',
      isDefault: false
    }
  ]);

  const [editData, setEditData] = useState({ ...profileData });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
    showNotification('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...profileData });
  };

  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (query) => {
    console.log('Searching:', query);
  };

  return (
    <div className="my-account-page">
      <Header user={user} onLogout={onLogout} onSearch={handleSearch} />
      
      {notification && (
        <div className="notification-toast">
          <FaCheckCircle />
          <span>{notification}</span>
        </div>
      )}

      <div className="account-wrapper">
        <div className="account-container">
          {/* Sidebar */}
          <aside className="account-sidebar">
            <div className="profile-card">
              <div className="profile-header">
                <div className="avatar-wrapper">
                  <div className="user-avatar">
                    {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                  </div>
                  <div className="status-indicator"></div>
                </div>
                <div className="profile-info">
                  <h2>{profileData.firstName} {profileData.lastName}</h2>
                  <p className="email">{profileData.email}</p>
                  <span className="badge">Premium Member</span>
                </div>
              </div>
            </div>

            <nav className="sidebar-nav">
              <button
                className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <FaUser />
                <span>Profile</span>
              </button>
              <button
                className={`nav-link ${activeTab === 'addresses' ? 'active' : ''}`}
                onClick={() => setActiveTab('addresses')}
              >
                <FaMapMarkerAlt />
                <span>Addresses</span>
              </button>
              <Link to="/my-orders" className="nav-link">
                <FaShoppingBag />
                <span>Orders</span>
              </Link>
              <Link to="/wishlist" className="nav-link">
                <FaHeart />
                <span>Wishlist</span>
              </Link>
              <button
                className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <FaCog />
                <span>Settings</span>
              </button>
              <button className="nav-link logout-link" onClick={onLogout}>
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="account-content">
            {activeTab === 'profile' && (
              <div className="content-section">
                <div className="section-header">
                  <div className="header-left">
                    <h1>Personal Information</h1>
                    <p>Manage your personal details and preferences</p>
                  </div>
                  {!isEditing ? (
                    <button className="btn-primary" onClick={handleEdit}>
                      <FaEdit /> Edit Profile
                    </button>
                  ) : (
                    <div className="action-buttons">
                      <button className="btn-success" onClick={handleSave}>
                        <FaSave /> Save Changes
                      </button>
                      <button className="btn-secondary" onClick={handleCancel}>
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="form-container">
                  <div className="form-grid">
                    <div className="form-field">
                      <label>
                        <FaUser className="field-icon" />
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={isEditing ? editData.firstName : profileData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div className="form-field">
                      <label>
                        <FaUser className="field-icon" />
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={isEditing ? editData.lastName : profileData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-field">
                      <label>
                        <FaEnvelope className="field-icon" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={isEditing ? editData.email : profileData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Enter email"
                      />
                    </div>
                    <div className="form-field">
                      <label>
                        <FaPhone className="field-icon" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={isEditing ? editData.phone : profileData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Enter phone"
                      />
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-field">
                      <label>
                        <FaCalendar className="field-icon" />
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={isEditing ? editData.dateOfBirth : profileData.dateOfBirth}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="form-field">
                      <label>
                        <FaUser className="field-icon" />
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={isEditing ? editData.gender : profileData.gender}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="content-section">
                <div className="section-header">
                  <div className="header-left">
                    <h1>Saved Addresses</h1>
                    <p>Manage your delivery addresses</p>
                  </div>
                  <button className="btn-primary">+ Add New Address</button>
                </div>

                <div className="addresses-list">
                  {addresses.map(address => (
                    <div key={address.id} className={`address-item ${address.isDefault ? 'default-address' : ''}`}>
                      <div className="address-header">
                        <div className="address-type-badge">{address.type}</div>
                        {address.isDefault && <span className="default-tag">Default</span>}
                      </div>
                      <div className="address-content">
                        <h3>{address.name}</h3>
                        <p>{address.street}</p>
                        <p>{address.city}, {address.zipCode}</p>
                        <p>{address.country}</p>
                        <p className="phone-number">
                          <FaPhone /> {address.phone}
                        </p>
                      </div>
                      <div className="address-actions">
                        <button className="btn-icon"><FaEdit /></button>
                        {!address.isDefault && <button className="btn-text">Set as Default</button>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="content-section">
                <div className="section-header">
                  <div className="header-left">
                    <h1>Account Settings</h1>
                    <p>Manage your security and notification preferences</p>
                  </div>
                </div>

                <div className="settings-list">
                  <div className="settings-card">
                    <div className="settings-icon">
                      <FaLock />
                    </div>
                    <div className="settings-info">
                      <h3>Security</h3>
                      <div className="settings-item">
                        <div className="item-left">
                          <h4>Password</h4>
                          <p>Last changed 3 months ago</p>
                        </div>
                        <button className="btn-outline">Change Password</button>
                      </div>
                      <div className="settings-item">
                        <div className="item-left">
                          <h4>Two-Factor Authentication</h4>
                          <p>Add an extra layer of security</p>
                        </div>
                        <label className="switch">
                          <input type="checkbox" />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="settings-card">
                    <div className="settings-icon">
                      <FaBell />
                    </div>
                    <div className="settings-info">
                      <h3>Notifications</h3>
                      <div className="settings-item">
                        <div className="item-left">
                          <h4>Order Updates</h4>
                          <p>Get notified about your order status</p>
                        </div>
                        <label className="switch">
                          <input type="checkbox" defaultChecked />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="settings-item">
                        <div className="item-left">
                          <h4>Promotional Emails</h4>
                          <p>Receive offers and promotions</p>
                        </div>
                        <label className="switch">
                          <input type="checkbox" defaultChecked />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="settings-item">
                        <div className="item-left">
                          <h4>SMS Notifications</h4>
                          <p>Get text updates on your phone</p>
                        </div>
                        <label className="switch">
                          <input type="checkbox" />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <footer className="site-footer">
        <div className="footer-wrapper">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>RYYZ Store</h3>
              <p>Your premium fashion destination</p>
            </div>
            <div className="footer-links">
              <div className="footer-section">
                <h4>Contact</h4>
                <p>support@ryyzstore.com</p>
                <p>01118801218</p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 RYYZ Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

MyAccount.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};

export default MyAccount;