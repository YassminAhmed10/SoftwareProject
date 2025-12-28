import React, { useState, useEffect } from 'react';
import { User, Store, Users, Bell, Save, Upload, X, Plus, Mail, Phone, Building, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import './AdminSettings.css';

const API_BASE = "http://127.0.0.1:8000/api";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [storeOpen, setStoreOpen] = useState(true);
  const [expandedMember, setExpandedMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);
  
  const [notifications, setNotifications] = useState({
    orderAlerts: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true
  });

  const [adminProfile, setAdminProfile] = useState({
    name: 'Yassmin Ahmed',
    email: 'yassmin@admin.com',
    phone: '+20 101 234 5678',
    role: 'Store Owner & Admin'
  });

  const [storeHours, setStoreHours] = useState({
    weekdays: '9:00 AM - 9:00 PM',
    saturday: '10:00 AM - 11:00 PM',
    sunday: '10:00 AM - 8:00 PM'
  });

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assigned_to: '',
    priority: 'medium',
    image: null,
    imageFile: null
  });

  const [newEmployee, setNewEmployee] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    department: 'Sales',
    role: 'Employee',
    password: '',
    confirm_password: ''
  });

  // Tabs configuration
  const tabs = [
    { id: 'profile', icon: User, label: 'Admin Profile' },
    { id: 'store', icon: Store, label: 'Store Status' },
    { id: 'employees', icon: Users, label: 'Employees' },
    { id: 'team', icon: Users, label: 'Team Management' },
    { id: 'notifications', icon: Bell, label: 'Notifications' }
  ];

  // Load employees from localStorage on mount
  useEffect(() => {
    loadEmployeesFromStorage();
    fetchTasks();
  }, []);

  // Fetch employees when component mounts or when employees tab is active
  useEffect(() => {
    if (activeTab === 'employees' || activeTab === 'team') {
      console.log('🔄 Refreshing employee list for tab:', activeTab);
    }
  }, [activeTab]);

  // Function to load employees from localStorage
  const loadEmployeesFromStorage = () => {
    console.log('📂 Loading employees from localStorage...');
    
    try {
      const savedEmployees = localStorage.getItem('employees_list');
      
      if (savedEmployees) {
        const parsed = JSON.parse(savedEmployees);
        console.log('✅ Found saved employees:', parsed.length);
        setEmployees(parsed);
      } else {
        // If no saved employees, use mock data
        console.log('ℹ️ No saved employees, using mock data');
        useMockEmployees();
      }
    } catch (error) {
      console.error('❌ Error loading employees:', error);
      useMockEmployees();
    }
  };

  // Function to save employees to localStorage
  const saveEmployeesToStorage = (employeesList) => {
    console.log('💾 Saving employees to localStorage...');
    try {
      localStorage.setItem('employees_list', JSON.stringify(employeesList));
      console.log('✅ Saved', employeesList.length, 'employees');
    } catch (error) {
      console.error('❌ Error saving employees:', error);
    }
  };

  // Mock employees data
  const useMockEmployees = () => {
    console.log('📱 Initializing mock employee data');
    const mockEmployees = [
      { 
        id: 1, 
        username: 'zeina_employee',
        email: 'zeina@employee.com',
        first_name: 'Zeina',
        last_name: 'Mohamed',
        full_name: 'Zeina Mohamed',
        role: 'Employee',
        phone: '+20 101 234 5678',
        department: 'Sales',
        is_staff: true,
        date_joined: '2024-01-15T10:30:00Z'
      },
      { 
        id: 2, 
        username: 'ramy_employee',
        email: 'ramy@employee.com',
        first_name: 'Ramy',
        last_name: 'Kamal',
        full_name: 'Ramy Kamal',
        role: 'Employee',
        phone: '+20 102 345 6789',
        department: 'Warehouse',
        is_staff: true,
        date_joined: '2024-02-20T14:45:00Z'
      }
    ];
    
    setEmployees(mockEmployees);
    saveEmployeesToStorage(mockEmployees);
    return mockEmployees;
  };

  // Fetch tasks from Django API
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_BASE}/tasks/`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.tasks) {
          setAssignedTasks(data.tasks);
          console.log('✅ Fetched tasks from Django:', data.tasks.length, 'tasks');
        }
      } else {
        console.log('⚠️ Could not fetch tasks from Django');
        // Try to get from localStorage as fallback
        const saved = localStorage.getItem('assigned_tasks');
        if (saved) {
          setAssignedTasks(JSON.parse(saved));
        }
      }
    } catch (error) {
      console.error('❌ Error fetching tasks:', error);
    }
  };

  // Profile handlers
  const handleProfileChange = (field, value) => {
    setAdminProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleStoreHoursChange = (field, value) => {
    setStoreHours(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Task handlers
  const handleTaskInputChange = (field, value) => {
    setNewTask(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewTask(prev => ({ 
        ...prev, 
        image: URL.createObjectURL(file),
        imageFile: file
      }));
    }
  };

  // Employee handlers
  const handleEmployeeInputChange = (field, value) => {
    setNewEmployee(prev => ({ ...prev, [field]: value }));
  };

  // Add new employee - FIXED VERSION
  const handleAddEmployee = async () => {
    // Validation
    if (!newEmployee.username || !newEmployee.email || !newEmployee.password) {
      alert('Please fill in required fields: Username, Email, and Password');
      return;
    }

    if (newEmployee.password !== newEmployee.confirm_password) {
      alert('Passwords do not match!');
      return;
    }

    // Ensure email ends with @employee.com
    if (!newEmployee.email.endsWith('@employee.com')) {
      alert('Employee email must end with @employee.com');
      return;
    }

    setLoading(true);

    try {
      console.log('📤 Creating new employee...');
      
      // Generate a unique ID
      const maxId = employees.length > 0 
        ? Math.max(...employees.map(emp => emp.id)) 
        : 0;
      
      // Create properly formatted employee object
      const newEmployeeObj = {
        id: maxId + 1,
        username: newEmployee.username,
        email: newEmployee.email,
        first_name: newEmployee.first_name || newEmployee.username,
        last_name: newEmployee.last_name || '',
        full_name: `${newEmployee.first_name || ''} ${newEmployee.last_name || ''}`.trim() || newEmployee.username,
        role: 'Employee',
        phone: newEmployee.phone || '+20 000 000 0000',
        department: newEmployee.department || 'Sales',
        is_staff: true,
        date_joined: new Date().toISOString()
      };

      console.log('✅ New employee object:', newEmployeeObj);
      
      // Update state
      const updatedEmployees = [...employees, newEmployeeObj];
      setEmployees(updatedEmployees);
      
      // ✅ CRITICAL: Save to localStorage
      saveEmployeesToStorage(updatedEmployees);
      
      console.log('✅ Employee saved! Total:', updatedEmployees.length);

      alert(`✅ Employee "${newEmployee.first_name || newEmployee.username}" created successfully!`);
      
      // Reset form
      setNewEmployee({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        phone: '',
        department: 'Sales',
        role: 'Employee',
        password: '',
        confirm_password: ''
      });
      
      setShowAddEmployeeModal(false);
      setLoading(false);

    } catch (error) {
      console.error('❌ Error creating employee:', error);
      alert('Error creating employee. Please check console for details.');
      setLoading(false);
    }
  };

  // Assign task to employee
  const assignTask = async (employeeId) => {
    if (!newTask.title || !newTask.description) {
      alert('Please fill in task details');
      return;
    }

    if (!employeeId) {
      alert('Please select an employee');
      return;
    }

    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) {
      alert('Employee not found!');
      return;
    }

    setLoading(true);

    try {
      // Send task to Django backend
      const response = await fetch(`${API_BASE}/tasks/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTask.title,
          description: newTask.description,
          priority: newTask.priority,
          assigned_to_email: employee.email,
          status: 'pending'
        })
      });

      const data = await response.json();
      console.log('📝 Django task creation response:', data);

      if (data.success) {
        alert(`✅ Task "${newTask.title}" assigned to ${employee.first_name || employee.username}!`);
        
        // Add to local state
        const newTaskObj = {
          id: data.task.id,
          title: newTask.title,
          description: newTask.description,
          priority: newTask.priority,
          assigned_to: employeeId,
          assigned_to_name: employee.first_name || employee.username,
          assigned_to_email: employee.email,
          assigned_by: adminProfile.name || 'Admin',
          assigned_by_details: { first_name: adminProfile.name || 'Admin' },
          created_at: data.task.created_at || new Date().toISOString(),
          status: 'pending'
        };

        setAssignedTasks(prevTasks => [...prevTasks, newTaskObj]);
        
        // Also save to localStorage as backup
        const saved = JSON.parse(localStorage.getItem('assigned_tasks') || '[]');
        localStorage.setItem('assigned_tasks', JSON.stringify([...saved, newTaskObj]));
        
      } else {
        alert(`❌ Failed to create task: ${data.error}`);
        console.error('Task creation error:', data);
      }

    } catch (error) {
      console.error('❌ Error creating task in Django:', error);
      alert('Failed to create task. Using local storage as fallback.');
      
      // Fallback to localStorage
      const newTaskObj = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        assigned_to: employeeId,
        assigned_to_name: employee.first_name || employee.username,
        assigned_to_email: employee.email,
        assigned_by: adminProfile.name || 'Admin',
        assigned_by_details: { first_name: adminProfile.name || 'Admin' },
        created_at: new Date().toISOString(),
        status: 'pending'
      };

      setAssignedTasks(prevTasks => [...prevTasks, newTaskObj]);
      const saved = JSON.parse(localStorage.getItem('assigned_tasks') || '[]');
      localStorage.setItem('assigned_tasks', JSON.stringify([...saved, newTaskObj]));
      
      alert(`✅ Task "${newTask.title}" assigned to ${employee.first_name || employee.username}! (Local storage)`);
    }

    // Reset form
    setNewTask({ 
      title: '', 
      description: '', 
      assigned_to: '', 
      priority: 'medium',
      image: null,
      imageFile: null
    });
    setExpandedMember(null);
    
    setLoading(false);
  };

  // Get tasks for a specific employee
  const getEmployeeTasks = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) return [];
    
    return assignedTasks.filter(task => 
      task.assigned_to === employeeId || 
      task.assigned_to_email === employee.email
    );
  };

  // Complete a task
  const completeTask = async (taskId) => {
    try {
      // Send completion to Django
      const response = await fetch(`${API_BASE}/tasks/complete/${taskId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Update local state
          setAssignedTasks(prevTasks => 
            prevTasks.map(task => 
              task.id === taskId 
                ? { ...task, status: 'completed', completed_at: new Date().toISOString() }
                : task
            )
          );
          alert('Task marked as completed!');
          return;
        }
      }
    } catch (error) {
      console.error('❌ Error completing task:', error);
    }
    
    // Fallback: update local state only
    setAssignedTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: 'completed', completed_at: new Date().toISOString() }
          : task
      )
    );
    alert('Task marked as completed locally!');
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return '#ef4444';
      case 'high': return '#f59e0b';
      case 'medium': return '#3b82f6';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  // Tab content renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="settings-tab-content">
            <h2>Admin Profile</h2>
            <div className="profile-section">
              <div className="profile-avatar">
                <div className="avatar-circle">YA</div>
                <button className="upload-avatar-btn">
                  <Upload size={16} />
                  Change Photo
                </button>
              </div>
              <div className="profile-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={adminProfile.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={adminProfile.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={adminProfile.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input
                    type="text"
                    value={adminProfile.role}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'store':
        return (
          <div className="settings-tab-content">
            <h2>Store Status</h2>
            <div className="store-status-section">
              <div className="store-toggle">
                <div className="store-icon-container">
                  <Store size={48} className={storeOpen ? 'store-open' : 'store-closed'} />
                </div>
                <div className="toggle-info">
                  <h3>{storeOpen ? 'Store is Open' : 'Store is Closed'}</h3>
                  <p>Control your store's online visibility</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={storeOpen}
                    onChange={() => setStoreOpen(!storeOpen)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="operating-hours">
                <h3>Operating Hours</h3>
                <div className="hours-grid">
                  <div className="hour-item">
                    <label>Weekdays (Mon - Fri)</label>
                    <input
                      type="text"
                      value={storeHours.weekdays}
                      onChange={(e) => handleStoreHoursChange('weekdays', e.target.value)}
                    />
                  </div>
                  <div className="hour-item">
                    <label>Saturday</label>
                    <input
                      type="text"
                      value={storeHours.saturday}
                      onChange={(e) => handleStoreHoursChange('saturday', e.target.value)}
                    />
                  </div>
                  <div className="hour-item">
                    <label>Sunday</label>
                    <input
                      type="text"
                      value={storeHours.sunday}
                      onChange={(e) => handleStoreHoursChange('sunday', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'employees':
        return (
          <div className="settings-tab-content">
            <div className="employees-header">
              <h2>Employee Management</h2>
              <div className="header-info">
                <span className="employee-count">Total Employees: {employees.length}</span>
                <button 
                  className="add-employee-btn"
                  onClick={() => setShowAddEmployeeModal(true)}
                >
                  <Plus size={18} />
                  Add New Employee
                </button>
              </div>
            </div>

            <div className="employees-section">
              {employees.length === 0 ? (
                <div className="no-employees">
                  <Users size={48} />
                  <h3>No Employees Found</h3>
                  <p>Add your first employee to get started</p>
                  <button 
                    className="add-employee-btn"
                    onClick={() => setShowAddEmployeeModal(true)}
                  >
                    <Plus size={18} />
                    Add First Employee
                  </button>
                </div>
              ) : (
                <div className="employees-table-container">
                  <div className="table-header-info">
                    Showing {employees.length} employee{employees.length !== 1 ? 's' : ''}
                  </div>
                  <table className="employees-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Employee</th>
                        <th>Contact</th>
                        <th>Department</th>
                        <th>Assigned Tasks</th>
                        <th>Status</th>
                        <th>Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map(employee => {
                        const employeeTasks = getEmployeeTasks(employee.id);
                        const pendingTasks = employeeTasks.filter(t => t.status === 'pending');
                        
                        return (
                          <tr key={employee.id} className="employee-row">
                            <td className="employee-id">#{employee.id}</td>
                            <td>
                              <div className="employee-info">
                                <div className="employee-avatar">
                                  {employee.first_name?.charAt(0) || employee.username.charAt(0)}
                                </div>
                                <div className="employee-details">
                                  <div className="employee-name">
                                    {employee.full_name || `${employee.first_name} ${employee.last_name}`.trim() || employee.username}
                                  </div>
                                  <div className="employee-username">@{employee.username}</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="employee-contact">
                                <div className="contact-item">
                                  <Mail size={14} />
                                  <span>{employee.email}</span>
                                </div>
                                {employee.phone && (
                                  <div className="contact-item">
                                    <Phone size={14} />
                                    <span>{employee.phone}</span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="employee-department">
                              <span className="department-badge">{employee.department || 'Sales'}</span>
                            </td>
                            <td className="employee-tasks">
                              <div className="tasks-count">
                                <span className="tasks-badge">
                                  {pendingTasks.length} pending
                                  {employeeTasks.length > 0 && (
                                    <span className="total-tasks"> / {employeeTasks.length} total</span>
                                  )}
                                </span>
                                {pendingTasks.length > 0 && (
                                  <button 
                                    className="view-tasks-btn"
                                    onClick={() => {
                                      setActiveTab('team');
                                      setExpandedMember(employee.id);
                                    }}
                                  >
                                    View
                                  </button>
                                )}
                              </div>
                            </td>
                            <td>
                              <span className={`status-badge ${employee.is_staff ? 'active' : 'inactive'}`}>
                                {employee.is_staff ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td>
                              {new Date(employee.date_joined).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Add Employee Modal */}
            {showAddEmployeeModal && (
              <div className="modal-overlay" onClick={() => setShowAddEmployeeModal(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>Add New Employee</h3>
                    <button 
                      className="close-btn"
                      onClick={() => setShowAddEmployeeModal(false)}
                    >
                      &times;
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Username *</label>
                        <input
                          type="text"
                          value={newEmployee.username}
                          onChange={(e) => handleEmployeeInputChange('username', e.target.value)}
                          placeholder="Enter username"
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Email Address *</label>
                        <input
                          type="email"
                          value={newEmployee.email}
                          onChange={(e) => handleEmployeeInputChange('email', e.target.value)}
                          placeholder="employee@employee.com"
                          required
                        />
                        <small className="email-hint">Must end with @employee.com</small>
                      </div>
                      
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          value={newEmployee.first_name}
                          onChange={(e) => handleEmployeeInputChange('first_name', e.target.value)}
                          placeholder="First name (optional)"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          value={newEmployee.last_name}
                          onChange={(e) => handleEmployeeInputChange('last_name', e.target.value)}
                          placeholder="Last name (optional)"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          value={newEmployee.phone}
                          onChange={(e) => handleEmployeeInputChange('phone', e.target.value)}
                          placeholder="+20 123 456 7890 (optional)"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Department</label>
                        <select
                          value={newEmployee.department}
                          onChange={(e) => handleEmployeeInputChange('department', e.target.value)}
                        >
                          <option value="Sales">Sales</option>
                          <option value="Warehouse">Warehouse</option>
                          <option value="Customer Service">Customer Service</option>
                          <option value="Management">Management</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>Password *</label>
                        <input
                          type="password"
                          value={newEmployee.password}
                          onChange={(e) => handleEmployeeInputChange('password', e.target.value)}
                          placeholder="Enter password"
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Confirm Password *</label>
                        <input
                          type="password"
                          value={newEmployee.confirm_password}
                          onChange={(e) => handleEmployeeInputChange('confirm_password', e.target.value)}
                          placeholder="Confirm password"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="modal-footer">
                    <button 
                      className="btn-secondary"
                      onClick={() => setShowAddEmployeeModal(false)}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button 
                      className="btn-primary"
                      onClick={handleAddEmployee}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner"></span>
                          Creating...
                        </>
                      ) : (
                        'Create Employee'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'team':
        return (
          <div className="settings-tab-content">
            <div className="team-header">
              <h2>Team Management</h2>
              <div className="header-info">
                <span className="team-count">Team Members: {employees.length}</span>
                <span className="tasks-count">Total Tasks Assigned: {assignedTasks.length}</span>
              </div>
            </div>
            
            <div className="team-section">
              {employees.length === 0 ? (
                <div className="no-employees">
                  <Users size={48} />
                  <h3>No Team Members Available</h3>
                  <p>Add employees first to assign tasks</p>
                  <button 
                    className="add-employee-btn"
                    onClick={() => setActiveTab('employees')}
                  >
                    <Plus size={18} />
                    Go to Employees
                  </button>
                </div>
              ) : (
                <div className="team-members-grid">
                  {employees.map(member => {
                    const memberTasks = getEmployeeTasks(member.id);
                    const pendingTasks = memberTasks.filter(t => t.status === 'pending');
                    
                    return (
                      <div key={member.id} className="team-member-card">
                        <div className="member-header">
                          <div className="member-info">
                            <span className="member-avatar">
                              {member.first_name?.charAt(0) || member.username.charAt(0)}
                            </span>
                            <div>
                              <h3>{member.first_name && member.last_name ? 
                                `${member.first_name} ${member.last_name}` : member.username}</h3>
                              <div className="member-details-row">
                                <span className="member-role">Employee</span>
                                <span className="member-department">{member.department || 'Sales'}</span>
                                <span className="member-tasks-count">
                                  {pendingTasks.length} pending tasks
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            className="expand-btn"
                            onClick={() => setExpandedMember(expandedMember === member.id ? null : member.id)}
                          >
                            {expandedMember === member.id ? '▲ Hide Tasks' : '▼ Assign Task'}
                          </button>
                        </div>
                        
                        <div className="member-contact-info">
                          <div className="contact-info-item">
                            <Mail size={14} />
                            <span>{member.email}</span>
                          </div>
                          {member.phone && (
                            <div className="contact-info-item">
                              <Phone size={14} />
                              <span>{member.phone}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Display existing tasks */}
                        {pendingTasks.length > 0 && (
                          <div className="existing-tasks">
                            <h4>Current Tasks</h4>
                            <div className="tasks-list">
                              {pendingTasks.map(task => (
                                <div key={task.id} className="existing-task-item">
                                  <div className="task-item-header">
                                    <span className="task-title">{task.title}</span>
                                    <div className="task-priority-badge" style={{backgroundColor: getPriorityColor(task.priority)}}>
                                      <AlertCircle size={12} />
                                      <span>{task.priority}</span>
                                    </div>
                                  </div>
                                  <p className="task-description">{task.description}</p>
                                  <div className="task-item-footer">
                                    <span className="task-date">
                                      <Calendar size={12} />
                                      Assigned: {new Date(task.created_at).toLocaleDateString()}
                                    </span>
                                    <button 
                                      className="task-complete-btn-small"
                                      onClick={() => completeTask(task.id)}
                                    >
                                      <CheckCircle size={14} />
                                      Mark Complete
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {expandedMember === member.id && (
                          <div className="task-assignment">
                            <h4>Assign New Task to {member.first_name || member.username}</h4>
                            <div className="task-form">
                              <div className="form-group">
                                <label>Task Title *</label>
                                <input
                                  type="text"
                                  placeholder="Enter task title"
                                  value={newTask.title}
                                  onChange={(e) => handleTaskInputChange('title', e.target.value)}
                                />
                              </div>
                              
                              <div className="form-group">
                                <label>Task Description *</label>
                                <textarea
                                  placeholder="Describe the task details"
                                  value={newTask.description}
                                  onChange={(e) => handleTaskInputChange('description', e.target.value)}
                                  rows="3"
                                />
                              </div>
                              
                              <div className="form-group">
                                <label>Priority</label>
                                <select
                                  value={newTask.priority}
                                  onChange={(e) => handleTaskInputChange('priority', e.target.value)}
                                  className="priority-select"
                                >
                                  <option value="low">Low Priority</option>
                                  <option value="medium">Medium Priority</option>
                                  <option value="high">High Priority</option>
                                  <option value="urgent">Urgent</option>
                                </select>
                              </div>
                              
                              <button 
                                className="assign-btn" 
                                onClick={() => assignTask(member.id)}
                                disabled={loading || !newTask.title || !newTask.description}
                              >
                                {loading ? 'Assigning...' : 'Assign Task'}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* All Tasks Overview */}
            {assignedTasks.length > 0 && (
              <div className="all-tasks-overview">
                <h3>All Assigned Tasks</h3>
                <div className="tasks-summary">
                  <div className="summary-item">
                    <span className="summary-label">Total Tasks:</span>
                    <span className="summary-value">{assignedTasks.length}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Pending:</span>
                    <span className="summary-value">
                      {assignedTasks.filter(t => t.status === 'pending').length}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Completed:</span>
                    <span className="summary-value">
                      {assignedTasks.filter(t => t.status === 'completed').length}
                    </span>
                  </div>
                </div>
              </div>
            )}
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
                  <p>Get notified for new orders</p>
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

      default:
        return null;
    }
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
    console.log('Saved settings:', { 
      adminProfile, 
      storeOpen, 
      storeHours, 
      notifications,
      assignedTasksCount: assignedTasks.length,
      employeesCount: employees.length
    });
  };

  return (
    <div className="settings-container">
      <div className="page-header">
        <h1>Admin Settings</h1>
        <p>Manage your admin profile and store settings</p>
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

export default AdminSettings;