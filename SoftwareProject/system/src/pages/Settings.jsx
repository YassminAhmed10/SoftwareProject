import React, { useState } from 'react';
import { User, Store, Users, Bell } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [adminProfile, setAdminProfile] = useState({
    name: 'Yassmin Ahmed ',
    email: 'Yassmin@ryyz.com',
    phone: '01013427001',
    role: 'Admin'
  });
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Ramy', role: 'Men Category Manager', email: 'ramy@rawwz.com', status: 'Active', category: 'Men', expanded: false },
    { id: 2, name: 'Zeina', role: 'Women Category Manager', email: 'zeina@rawwz.com', status: 'Active', category: 'Women', expanded: false }
  ]);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    type: 'add',
    priority: 'medium',
    images: [],
    sendEmail: true,
    sendNotification: true
  });
  const [notifications, setNotifications] = useState({
    orderAlerts: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true
  });

  const tabs = [
    { id: 'profile', icon: User, label: 'Admin Profile' },
    { id: 'store', icon: Store, label: 'Store Status' },
    { id: 'team', icon: Users, label: 'Team Management' },
    { id: 'notifications', icon: Bell, label: 'Notifications' }
  ];

  const handleProfileUpdate = () => {
    alert('Profile updated successfully!');
  };

  const handleRemoveTeamMember = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this team member?')) {
      setTeamMembers(teamMembers.filter(member => member.id !== id));
    }
  };

  const toggleMemberExpand = (id) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id 
        ? { ...member, expanded: !member.expanded }
        : { ...member, expanded: false }
    ));
    setTaskData({
      title: '',
      description: '',
      type: 'add',
      priority: 'medium',
      images: [],
      sendEmail: true,
      sendNotification: true
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setTaskData({ ...taskData, images: [...taskData.images, ...imageUrls] });
  };

  const removeImage = (index) => {
    const newImages = taskData.images.filter((_, i) => i !== index);
    setTaskData({ ...taskData, images: newImages });
  };

  const handleSendTask = (member) => {
    if (!taskData.title || !taskData.description) {
      alert('Please fill in all task details');
      return;
    }

    const notificationMethod = [];
    if (taskData.sendEmail) notificationMethod.push('Email');
    if (taskData.sendNotification) notificationMethod.push('System Notification');

    alert(`Task assigned to ${member.name}!\n\nTask: ${taskData.title}\nType: ${taskData.type}\nPriority: ${taskData.priority}\nImages: ${taskData.images.length}\nSent via: ${notificationMethod.join(' & ')}`);
    
    toggleMemberExpand(member.id);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="settings-content">
            <h2>Admin Profile</h2>
            <p className="section-description">Manage your personal information and account details</p>
            
            <div className="profile-card">
              <div className="profile-avatar">
                <User size={48} />
              </div>
              <div className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={adminProfile.name}
                      onChange={(e) => setAdminProfile({ ...adminProfile, name: e.target.value })}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <input
                      type="text"
                      value={adminProfile.role}
                      onChange={(e) => setAdminProfile({ ...adminProfile, role: e.target.value })}
                      placeholder="Your role"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={adminProfile.email}
                      onChange={(e) => setAdminProfile({ ...adminProfile, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      value={adminProfile.phone}
                      onChange={(e) => setAdminProfile({ ...adminProfile, phone: e.target.value })}
                      placeholder="+1234567890"
                    />
                  </div>
                </div>
                
                <button onClick={handleProfileUpdate} className="btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );

      case 'store':
        return (
          <div className="settings-content">
            <h2>Store Status</h2>
            <p className="section-description">Control your store availability for customers</p>
            
            <div className="store-status-card">
              <div className="status-header">
                <div className="status-info">
                  <div className={`store-icon ${isStoreOpen ? 'open' : 'closed'}`}>
                    <Store size={40} strokeWidth={2} />
                  </div>
                  <div>
                    <h3>Store is Currently {isStoreOpen ? 'Open' : 'Closed'}</h3>
                    <p>{isStoreOpen ? 'Your store is accepting orders' : 'Your store is not accepting orders'}</p>
                  </div>
                </div>
                
                <div className="toggle-control">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={isStoreOpen}
                      onChange={() => setIsStoreOpen(!isStoreOpen)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
              
              <div className="store-details">
                <div className="detail-item">
                  <span className="detail-label">Status</span>
                  <span className={`detail-value ${isStoreOpen ? 'status-open' : 'status-closed'}`}>
                    {isStoreOpen ? 'Open' : 'Closed'}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Last Updated</span>
                  <span className="detail-value">Just now</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Operating Hours</span>
                  <span className="detail-value">9:00 AM - 10:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="settings-content">
            <h2>Team Management</h2>
            <p className="section-description">Manage your team members and assign tasks</p>
            
            <div className="team-header">
              <div className="team-stats">
                <div className="">
                </div>
                <div className="">
                </div>
                <div className="">
                </div>
                <div className="">
                </div>
              </div>
            </div>
            
            <div className="team-list">
              {teamMembers.map(member => (
                <div key={member.id} className={`team-card ${member.expanded ? 'expanded' : ''}`}>
                  <div className="team-card-main" onClick={() => toggleMemberExpand(member.id)}>
                    <div className="team-card-left">
                      <div className="member-avatar">
                        <User size={24} />
                      </div>
                      <div className="member-details">
                        <h4>{member.name}</h4>
                        <p className="member-role">{member.role}</p>
                        <p className="member-email">{member.email}</p>
                        <p className="member-category">Category: {member.category}</p>
                      </div>
                    </div>
                    <div className="team-card-right">
                      <span className={`status-badge ${member.status.toLowerCase()}`}>
                        {member.status}
                      </span>
                      <button
                        onClick={(e) => handleRemoveTeamMember(member.id, e)}
                        className="btn-remove"
                      >
                        Remove
                      </button>
                      <span className={`expand-icon ${member.expanded ? 'rotated' : ''}`}>▼</span>
                    </div>
                  </div>

                  {member.expanded && (
                    <div className="task-form" onClick={(e) => e.stopPropagation()}>
                      <h3>Assign Task to {member.name}</h3>
                      
                      <div className="form-group">
                        <label>Task Title</label>
                        <input
                          type="text"
                          value={taskData.title}
                          onChange={(e) => setTaskData({...taskData, title: e.target.value})}
                          placeholder="e.g., Update Men's Winter Collection"
                        />
                      </div>

                      <div className="form-group">
                        <label>Task Description</label>
                        <textarea
                          value={taskData.description}
                          onChange={(e) => setTaskData({...taskData, description: e.target.value})}
                          placeholder="Describe the task in detail..."
                          rows={4}
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Task Type</label>
                          <select
                            value={taskData.type}
                            onChange={(e) => setTaskData({...taskData, type: e.target.value})}
                          >
                            <option value="add">Add New Items</option>
                            <option value="update">Update Existing Items</option>
                            <option value="remove">Remove Items</option>
                            <option value="review">Review & Approve</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label>Priority</label>
                          <select
                            value={taskData.priority}
                            onChange={(e) => setTaskData({...taskData, priority: e.target.value})}
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Upload Images (Optional)</label>
                        <div className="image-upload-area">
                          <input
                            type="file"
                            id={`file-upload-${member.id}`}
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                          />
                          <label htmlFor={`file-upload-${member.id}`} className="upload-label">
                            <span className="upload-icon">📷</span>
                            <span>Click to upload images</span>
                          </label>
                        </div>
                        
                        {taskData.images.length > 0 && (
                          <div className="image-preview-grid">
                            {taskData.images.map((img, index) => (
                              <div key={index} className="image-preview">
                                <img src={img} alt={`Preview ${index + 1}`} />
                                <button
                                  className="remove-image-btn"
                                  onClick={() => removeImage(index)}
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="notification-options">
                        <h4>Send Notification Via:</h4>
                        <div className="checkbox-group">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={taskData.sendEmail}
                              onChange={(e) => setTaskData({...taskData, sendEmail: e.target.checked})}
                            />
                            <span>Email to {member.email}</span>
                          </label>
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={taskData.sendNotification}
                              onChange={(e) => setTaskData({...taskData, sendNotification: e.target.checked})}
                            />
                            <span>System Notification</span>
                          </label>
                        </div>
                      </div>

                      <div className="task-form-actions">
                        <button className="btn-secondary" onClick={() => toggleMemberExpand(member.id)}>
                          Cancel
                        </button>
                        <button className="btn-primary" onClick={() => handleSendTask(member)}>
                          Send Task
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="settings-content">
            <h2>Notifications</h2>
            <p className="section-description">Configure how you want to receive notifications</p>
            
            <div className="notification-list">
              <div className="notification-card">
                <div className="notification-info">
                  <Bell size={24} className="notification-icon" />
                  <div>
                    <h4>Order Alerts</h4>
                    <p>Get notified when you receive new orders</p>
                  </div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.orderAlerts}
                    onChange={() => setNotifications({
                      ...notifications,
                      orderAlerts: !notifications.orderAlerts
                    })}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="notification-card">
                <div className="notification-info">
                  <Bell size={24} className="notification-icon" />
                  <div>
                    <h4>Email Notifications</h4>
                    <p>Receive important updates via email</p>
                  </div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.emailNotifications}
                    onChange={() => setNotifications({
                      ...notifications,
                      emailNotifications: !notifications.emailNotifications
                    })}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="notification-card">
                <div className="notification-info">
                  <Bell size={24} className="notification-icon" />
                  <div>
                    <h4>SMS Notifications</h4>
                    <p>Get text messages for urgent alerts</p>
                  </div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.smsNotifications}
                    onChange={() => setNotifications({
                      ...notifications,
                      smsNotifications: !notifications.smsNotifications
                    })}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="notification-card">
                <div className="notification-info">
                  <Bell size={24} className="notification-icon" />
                  <div>
                    <h4>Push Notifications</h4>
                    <p>Receive push notifications on your device</p>
                  </div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.pushNotifications}
                    onChange={() => setNotifications({
                      ...notifications,
                      pushNotifications: !notifications.pushNotifications
                    })}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
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
              <div className={`tab-icon-wrapper ${tab.id === 'store' ? (isStoreOpen ? 'store-open' : 'store-closed') : ''}`}>
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