// src/pages/Settings.jsx
import React, { useState } from 'react';
import { Save, Bell, Shield, Globe, CreditCard, Users, Database } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    storeName: 'RYYZ Store',
    storeEmail: 'contact@ryyzstore.com',
    storePhone: '+1 (555) 123-4567',
    timezone: 'America/New_York',
    currency: 'USD',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    orderEmails: true,
    marketingEmails: false,
    
    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    loginAlerts: true,
    
    // Payment Settings
    stripeEnabled: true,
    paypalEnabled: true,
    manualPayment: true,
    
    // User Settings
    userRegistration: true,
    emailVerification: true,
    autoApproveUsers: false,
    
    // Data Settings
    dataRetention: 365,
    exportData: true,
    anonymizeData: false
  });

  const handleInputChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [`${category}_${field}`]: value
    }));
  };

  const handleToggleChange = (field) => {
    setSettings(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  const resetToDefaults = () => {
    const defaultSettings = {
      storeName: 'RYYZ Store',
      storeEmail: 'contact@ryyzstore.com',
      storePhone: '+1 (555) 123-4567',
      timezone: 'America/New_York',
      currency: 'USD',
      emailNotifications: true,
      pushNotifications: true,
      orderEmails: true,
      marketingEmails: false,
      twoFactorAuth: true,
      sessionTimeout: 30,
      loginAlerts: true,
      stripeEnabled: true,
      paypalEnabled: true,
      manualPayment: true,
      userRegistration: true,
      emailVerification: true,
      autoApproveUsers: false,
      dataRetention: 365,
      exportData: true,
      anonymizeData: false
    };
    setSettings(defaultSettings);
    alert('Settings reset to defaults!');
  };

  return (
    <div className="settings-container">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your store settings and preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-sections">
          {/* General Settings */}
          <div className="settings-section">
            <div className="section-header">
              <Globe size={20} />
              <h2>General Settings</h2>
            </div>
            <div className="section-content">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="storeName">Store Name</label>
                  <input
                    type="text"
                    id="storeName"
                    value={settings.storeName}
                    onChange={(e) => setSettings({...settings, storeName: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="storeEmail">Store Email</label>
                  <input
                    type="email"
                    id="storeEmail"
                    value={settings.storeEmail}
                    onChange={(e) => setSettings({...settings, storeEmail: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="storePhone">Store Phone</label>
                  <input
                    type="tel"
                    id="storePhone"
                    value={settings.storePhone}
                    onChange={(e) => setSettings({...settings, storePhone: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="timezone">Timezone</label>
                  <select
                    id="timezone"
                    value={settings.timezone}
                    onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Europe/Paris">Paris (CET)</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="currency">Currency</label>
                <select
                  id="currency"
                  value={settings.currency}
                  onChange={(e) => setSettings({...settings, currency: e.target.value})}
                >
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">British Pound (GBP)</option>
                  <option value="CAD">Canadian Dollar (CAD)</option>
                  <option value="AUD">Australian Dollar (AUD)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="settings-section">
            <div className="section-header">
              <Bell size={20} />
              <h2>Notification Settings</h2>
            </div>
            <div className="section-content">
              <div className="toggle-group">
                <div className="toggle-item">
                  <div className="toggle-label">
                    <span className="label-text">Email Notifications</span>
                    <span className="label-description">Receive email updates</span>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={() => handleToggleChange('emailNotifications')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="toggle-item">
                  <div className="toggle-label">
                    <span className="label-text">Push Notifications</span>
                    <span className="label-description">Browser push notifications</span>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.pushNotifications}
                      onChange={() => handleToggleChange('pushNotifications')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="toggle-item">
                  <div className="toggle-label">
                    <span className="label-text">Order Emails</span>
                    <span className="label-description">Email for new orders</span>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.orderEmails}
                      onChange={() => handleToggleChange('orderEmails')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="toggle-item">
                  <div className="toggle-label">
                    <span className="label-text">Marketing Emails</span>
                    <span className="label-description">Promotional emails</span>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.marketingEmails}
                      onChange={() => handleToggleChange('marketingEmails')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="settings-section">
            <div className="section-header">
              <Shield size={20} />
              <h2>Security Settings</h2>
            </div>
            <div className="section-content">
              <div className="toggle-group">
                <div className="toggle-item">
                  <div className="toggle-label">
                    <span className="label-text">Two-Factor Authentication</span>
                    <span className="label-description">Require 2FA for admin login</span>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.twoFactorAuth}
                      onChange={() => handleToggleChange('twoFactorAuth')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="toggle-item">
                  <div className="toggle-label">
                    <span className="label-text">Login Alerts</span>
                    <span className="label-description">Email on new device login</span>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.loginAlerts}
                      onChange={() => handleToggleChange('loginAlerts')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="sessionTimeout">Session Timeout (minutes)</label>
                <input
                  type="number"
                  id="sessionTimeout"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({...settings, sessionTimeout: e.target.value})}
                  min="5"
                  max="1440"
                />
              </div>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="settings-section">
            <div className="section-header">
              <CreditCard size={20} />
              <h2>Payment Settings</h2>
            </div>
            <div className="section-content">
              <div className="toggle-group">
                <div className="toggle-item">
                  <div className="toggle-label">
                    <span className="label-text">Stripe Payments</span>
                    <span className="label-description">Enable Stripe payment gateway</span>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.stripeEnabled}
                      onChange={() => handleToggleChange('stripeEnabled')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="toggle-item">
                  <div className="toggle-label">
                    <span className="label-text">PayPal Payments</span>
                    <span className="label-description">Enable PayPal payment gateway</span>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.paypalEnabled}
                      onChange={() => handleToggleChange('paypalEnabled')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="toggle-item">
                  <div className="toggle-label">
                    <span className="label-text">Manual Payments</span>
                    <span className="label-description">Allow manual payment methods</span>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.manualPayment}
                      onChange={() => handleToggleChange('manualPayment')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* User Settings */}
          <div className="settings-section">
            <div className="section-header">
              <Users size={20} />
              <h2>User Settings</h2>
            </div>
            <div className="section-content">
              <div className="toggle-group">
                <div className="toggle-item">
                  <div className="toggle-label">
                    <span className="label-text">User Registration</span>
                    <span className="label-description">Allow new user registration</span>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.userRegistration}
                      onChange={() => handleToggleChange('userRegistration')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="toggle-item">
                  <div className="toggle-label">
                    <span className="label-text">Email Verification</span>
                    <span className="label-description">Require email verification</span>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.emailVerification}
                      onChange={() => handleToggleChange('emailVerification')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="toggle-item">
                  <div className="toggle-label">
                    <span className="label-text">Auto-approve Users</span>
                    <span className="label-description">Automatically approve new users</span>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.autoApproveUsers}
                      onChange={() => handleToggleChange('autoApproveUsers')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Data Settings */}
          <div className="settings-section">
            <div className="section-header">
              <Database size={20} />
              <h2>Data Settings</h2>
            </div>
            <div className="section-content">
              <div className="form-group">
                <label htmlFor="dataRetention">Data Retention Period (days)</label>
                <input
                  type="number"
                  id="dataRetention"
                  value={settings.dataRetention}
                  onChange={(e) => setSettings({...settings, dataRetention: e.target.value})}
                  min="30"
                  max="3650"
                />
              </div>
              <div className="toggle-group">
                <div className="toggle-item">
                  <div className="toggle-label">
                    <span className="label-text">Export Data</span>
                    <span className="label-description">Allow data export by users</span>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.exportData}
                      onChange={() => handleToggleChange('exportData')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="toggle-item">
                  <div className="toggle-label">
                    <span className="label-text">Anonymize Data</span>
                    <span className="label-description">Remove personal data from exports</span>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.anonymizeData}
                      onChange={() => handleToggleChange('anonymizeData')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-actions">
          <button type="button" className="btn-reset" onClick={resetToDefaults}>
            Reset to Defaults
          </button>
          <button type="submit" className="btn-save">
            <Save size={18} />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;