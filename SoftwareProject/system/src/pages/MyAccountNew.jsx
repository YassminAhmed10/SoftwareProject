import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaMapMarkerAlt, FaCreditCard, FaShoppingBag, FaHeart, FaCog, FaSignOutAlt, FaEdit, FaSave, FaTimes, FaLock, FaBell } from 'react-icons/fa';
import Header from '../components/Header/Header';
import PropTypes from 'prop-types';

const MyAccount = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

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
    }
  ]);

  const [editData, setEditData] = useState({ ...profileData });

  const orderStats = {
    total: 24,
    pending: 2,
    delivered: 20,
    cancelled: 2
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
    alert('Profile updated successfully!');
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

      <div className="breadcrumb-account">
        <Link to="/">Home</Link>
        <span className="separator">/</span>
        <span className="active">My Account</span>
      </div>

      <div className="account-container">
        <div className="account-sidebar">
          <div className="user-profile-card">
            <div className="user-avatar">
              {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
            </div>
            <h3>{profileData.firstName} {profileData.lastName}</h3>
            <p>{profileData.email}</p>
          </div>

          <nav className="account-nav">
            <button
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <FaUser /> Profile
            </button>
            <button
              className={`nav-item ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              <FaMapMarkerAlt /> Addresses
            </button>
            <Link to="/my-orders" className="nav-item">
              <FaShoppingBag /> Orders
            </Link>
            <Link to="/wishlist" className="nav-item">
              <FaHeart /> Wishlist
            </Link>
            <button
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <FaCog /> Settings
            </button>
            <button className="nav-item logout" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </nav>
        </div>

        <div className="account-main">
          {activeTab === 'profile' && (
            <div className="account-content">
              <div className="content-header">
                <h2><FaUser /> Personal Information</h2>
                {!isEditing ? (
                  <button className="btn-edit" onClick={handleEdit}>
                    <FaEdit /> Edit Profile
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button className="btn-save" onClick={handleSave}>
                      <FaSave /> Save
                    </button>
                    <button className="btn-cancel" onClick={handleCancel}>
                      <FaTimes /> Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={isEditing ? editData.firstName : profileData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={isEditing ? editData.lastName : profileData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={isEditing ? editData.email : profileData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={isEditing ? editData.phone : profileData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="account-content">
              <div className="content-header">
                <h2><FaMapMarkerAlt /> Saved Addresses</h2>
                <button className="btn-add-new">+ Add New Address</button>
              </div>

              <div className="addresses-grid">
                {addresses.map(address => (
                  <div key={address.id} className={`address-card ${address.isDefault ? 'default' : ''}`}>
                    {address.isDefault && <span className="default-badge">Default</span>}
                    <div className="address-type">{address.type}</div>
                    <h3>{address.name}</h3>
                    <p>{address.street}</p>
                    <p>{address.city}, {address.zipCode}</p>
                    <p>{address.country}</p>
                    <p className="address-phone">{address.phone}</p>
                    <div className="address-actions">
                      <button className="btn-edit-address"><FaEdit /> Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="account-content">
              <div className="content-header">
                <h2><FaCog /> Account Settings</h2>
              </div>

              <div className="settings-sections">
                <div className="settings-section">
                  <h3><FaLock /> Security</h3>
                  <div className="settings-item">
                    <div>
                      <h4>Password</h4>
                      <p>Last changed 3 months ago</p>
                    </div>
                    <button className="btn-change">Change Password</button>
                  </div>
                </div>

                <div className="settings-section">
                  <h3><FaBell /> Notifications</h3>
                  <div className="settings-item">
                    <div>
                      <h4>Order Updates</h4>
                      <p>Get notified about your order status</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="account-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>RYYZ Store</h3>
            <p>Your premium fashion destination</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: support@ryyzstore.com</p>
            <p>Phone: 01118801218</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 RYYZ Store. All rights reserved.</p>
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
