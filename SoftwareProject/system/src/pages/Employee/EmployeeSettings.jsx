// src/pages/Employee/EmployeeSettings.jsx - Employee Settings
import { useState } from 'react';
import { User, Bell, Lock, Save } from 'lucide-react';
import './EmployeeSettings.css';

const EmployeeSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    orderAlerts: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true
  });

  const [employeeProfile, setEmployeeProfile] = useState({
    name: 'Zeina Mohamed',
    email: 'zeina@emploee.com',
    phone: '+20 102 555 8888',
    role: 'Employee',
    department: 'Women Department'
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const tabs = [
    { id: 'profile', icon: User, label: 'My Profile' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'security', icon: Lock, label: 'Security' }
  ];

  const handleProfileChange = (field, value) => {
    setEmployeeProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSecurityChange = (field, value) => {
    setSecurity(prev => ({ ...prev, [field]: value }));
  };

  const handleChangePassword = () => {
    if (!security.currentPassword || !security.newPassword || !security.confirmPassword) {
      alert('Please fill in all password fields');
      return;
    }
    if (security.newPassword !== security.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    alert('Password changed successfully!');
    setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="settings-tab-content">
            <h2>My Profile</h2>
            <div className="profile-section">
              <div className="profile-avatar">
                <div className="avatar-circle">ZM</div>
              </div>
              <div className="profile-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={employeeProfile.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={employeeProfile.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={employeeProfile.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input
                    type="text"
                    value={employeeProfile.role}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    value={employeeProfile.department}
                    onChange={(e) => handleProfileChange('department', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="settings-tab-content">
            <h2>Notifications</h2>
            <div className="notifications-section">
              <div className="notification-item">
                <div className="notification-info">
                  <h3>Order Alerts</h3>
                  <p>Get notified for new assigned orders</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.orderAlerts}
                    onChange={() => handleNotificationToggle('orderAlerts')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="notification-item">
                <div className="notification-info">
                  <h3>Email Notifications</h3>
                  <p>Receive updates via email</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.emailNotifications}
                    onChange={() => handleNotificationToggle('emailNotifications')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="notification-item">
                <div className="notification-info">
                  <h3>SMS Notifications</h3>
                  <p>Get SMS for urgent updates</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.smsNotifications}
                    onChange={() => handleNotificationToggle('smsNotifications')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="notification-item">
                <div className="notification-info">
                  <h3>Push Notifications</h3>
                  <p>Browser push notifications</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.pushNotifications}
                    onChange={() => handleNotificationToggle('pushNotifications')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="settings-tab-content">
            <h2>Security Settings</h2>
            <div className="security-section">
              <div className="password-change-card">
                <h3>Change Password</h3>
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={security.currentPassword}
                    onChange={(e) => handleSecurityChange('currentPassword', e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={security.newPassword}
                    onChange={(e) => handleSecurityChange('newPassword', e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={security.confirmPassword}
                    onChange={(e) => handleSecurityChange('confirmPassword', e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
                <button className="change-password-btn" onClick={handleChangePassword}>
                  <Lock size={16} />
                  Change Password
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
    console.log('Saved settings:', { employeeProfile, notifications });
  };

  return (
    <div className="settings-container">
      <div className="page-header">
        <h1>Employee Settings</h1>
        <p>Manage your profile and preferences</p>
      </div>

      <div className="settings-tabs">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={20} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {renderTabContent()}

      <div className="settings-actions">
        <button className="save-btn" onClick={handleSave}>
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EmployeeSettings;
