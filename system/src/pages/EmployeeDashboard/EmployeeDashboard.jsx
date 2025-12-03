// src/pages/EmployeeDashboard/EmployeeDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Package, 
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  Calendar,
  Filter,
  Search,
  BarChart3,
  Activity,
  Eye,
  Edit,
  MoreVertical
} from 'lucide-react';
import StatCard from '../../components/StatCard/StatCard';
import TaskCard from '../../components/TaskCard/TaskCard';
import OrderCard from '../../components/OrderCard/OrderCard';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    newCustomers: 0,
    pendingOrders: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('today');

  // Mock data
  const mockStats = {
    totalOrders: 1542,
    totalRevenue: 125430,
    newCustomers: 234,
    pendingOrders: 87
  };

  const mockRecentOrders = [
    { id: 1, customer: 'John Doe', email: 'john@example.com', date: '2024-01-15', status: 'processing', total: 245.99 },
    { id: 2, customer: 'Jane Smith', email: 'jane@example.com', date: '2024-01-14', status: 'completed', total: 189.50 },
    { id: 3, customer: 'Robert Johnson', email: 'robert@example.com', date: '2024-01-14', status: 'pending', total: 320.00 },
    { id: 4, customer: 'Emily Brown', email: 'emily@example.com', date: '2024-01-13', status: 'processing', total: 150.75 },
    { id: 5, customer: 'Michael Wilson', email: 'michael@example.com', date: '2024-01-13', status: 'cancelled', total: 95.99 },
  ];

  const mockTasks = [
    {
      id: 1,
      title: 'Review pending orders',
      description: 'Check and process 15 pending orders from yesterday',
      priority: 'high',
      completed: false,
      dueDate: '2024-01-15',
      assignee: 'You',
      tags: ['Orders', 'Urgent']
    },
    {
      id: 2,
      title: 'Update product inventory',
      description: 'Update stock levels for electronics category',
      priority: 'medium',
      completed: false,
      dueDate: '2024-01-16',
      assignee: 'Inventory Team',
      tags: ['Inventory', 'Products']
    },
    {
      id: 3,
      title: 'Customer support tickets',
      description: 'Respond to 5 pending customer support tickets',
      priority: 'high',
      completed: true,
      dueDate: '2024-01-14',
      assignee: 'You',
      tags: ['Support', 'Customers']
    },
    {
      id: 4,
      title: 'Monthly sales report',
      description: 'Prepare monthly sales report for management',
      priority: 'low',
      completed: false,
      dueDate: '2024-01-20',
      assignee: 'Sales Team',
      tags: ['Reports', 'Finance']
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats(mockStats);
      setRecentOrders(mockRecentOrders);
      setPendingTasks(mockTasks.filter(task => !task.completed));
      setLoading(false);
    }, 800);
  }, []);

  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter);
    setLoading(true);
    
    // Simulate data change based on time filter
    setTimeout(() => {
      let filteredStats = { ...mockStats };
      let filteredOrders = [...mockRecentOrders];
      
      switch(filter) {
        case 'today':
          filteredStats = { totalOrders: 42, totalRevenue: 4520, newCustomers: 8, pendingOrders: 12 };
          filteredOrders = mockRecentOrders.slice(0, 3);
          break;
        case 'week':
          filteredStats = { totalOrders: 324, totalRevenue: 28750, newCustomers: 56, pendingOrders: 34 };
          filteredOrders = mockRecentOrders;
          break;
        case 'month':
          filteredStats = { totalOrders: 1542, totalRevenue: 125430, newCustomers: 234, pendingOrders: 87 };
          filteredOrders = mockRecentOrders;
          break;
        default:
          break;
      }
      
      setStats(filteredStats);
      setRecentOrders(filteredOrders);
      setLoading(false);
    }, 500);
  };

  const handleTaskComplete = (taskId) => {
    setPendingTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    ));
  };

  const handleOrderAction = (orderId, action) => {
    console.log(`${action} order ${orderId}`);
    // Here you would typically make an API call
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="employee-dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Employee Dashboard</h1>
          <p>Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="header-right">
          <div className="date-display">
            <Calendar size={18} />
            <span>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>
      </div>

      {/* Time Filter */}
      <div className="time-filter-section">
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${timeFilter === 'today' ? 'active' : ''}`}
            onClick={() => handleTimeFilterChange('today')}
          >
            Today
          </button>
          <button 
            className={`filter-tab ${timeFilter === 'week' ? 'active' : ''}`}
            onClick={() => handleTimeFilterChange('week')}
          >
            This Week
          </button>
          <button 
            className={`filter-tab ${timeFilter === 'month' ? 'active' : ''}`}
            onClick={() => handleTimeFilterChange('month')}
          >
            This Month
          </button>
          <button 
            className={`filter-tab ${timeFilter === 'year' ? 'active' : ''}`}
            onClick={() => handleTimeFilterChange('year')}
          >
            This Year
          </button>
        </div>
        <div className="filter-actions">
          <button className="btn-filter">
            <Filter size={16} />
            More Filters
          </button>
          <div className="search-box">
            <Search size={16} />
            <input type="text" placeholder="Search dashboard..." />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard 
          title="Total Orders"
          value={stats.totalOrders.toLocaleString()}
          icon={<ShoppingBag size={24} />}
          trend="up"
          percentage={12.5}
          color="#8b5cf6"
        />
        
        <StatCard 
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={<DollarSign size={24} />}
          trend="up"
          percentage={8.2}
          color="#10b981"
        />
        
        <StatCard 
          title="New Customers"
          value={stats.newCustomers.toLocaleString()}
          icon={<Users size={24} />}
          trend="up"
          percentage={5.7}
          color="#3b82f6"
        />
        
        <StatCard 
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={<Package size={24} />}
          trend="down"
          percentage={3.2}
          color="#f59e0b"
        />
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Left Column - Orders & Activity */}
        <div className="content-left">
          {/* Recent Orders Section */}
          <div className="orders-section">
            <div className="section-header">
              <h2>
                <ShoppingBag size={20} />
                Recent Orders
              </h2>
              <button className="btn-view-all">
                View All Orders
              </button>
            </div>
            
            <div className="orders-table-container">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id}>
                      <td className="order-id">#{order.id.toString().padStart(4, '0')}</td>
                      <td className="customer-cell">
                        <div className="customer-info">
                          <div className="customer-name">{order.customer}</div>
                          <div className="customer-email">{order.email}</div>
                        </div>
                      </td>
                      <td>{order.date}</td>
                      <td>
                        <span className={`status-badge status-${order.status}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="order-total">${order.total.toFixed(2)}</td>
                      <td>
                        <div className="order-actions">
                          <button 
                            className="btn-view"
                            onClick={() => handleOrderAction(order.id, 'view')}
                          >
                            <Eye size={14} />
                          </button>
                          <button 
                            className="btn-edit"
                            onClick={() => handleOrderAction(order.id, 'edit')}
                          >
                            <Edit size={14} />
                          </button>
                          <button className="btn-more">
                            <MoreVertical size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sales Chart Placeholder */}
          <div className="chart-section">
            <div className="section-header">
              <h2>
                <BarChart3 size={20} />
                Sales Overview
              </h2>
              <select className="chart-filter">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="chart-container">
              <div className="chart-placeholder">
                <div className="chart-bars">
                  {[65, 80, 60, 90, 75, 85, 95].map((height, index) => (
                    <div 
                      key={index} 
                      className="chart-bar" 
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
                <div className="chart-labels">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
              <div className="chart-info">
                <div className="chart-stat">
                  <span className="stat-label">Total Sales</span>
                  <span className="stat-value">$12,543</span>
                </div>
                <div className="chart-stat">
                  <span className="stat-label">Growth</span>
                  <span className="stat-value trend-up">
                    <TrendingUp size={14} />
                    8.2%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Tasks & Quick Actions */}
        <div className="content-right">
          {/* Pending Tasks */}
          <div className="tasks-section">
            <div className="section-header">
              <h2>
                <Clock size={20} />
                Pending Tasks
              </h2>
              <span className="task-count">{pendingTasks.length} tasks</span>
            </div>
            
            <div className="tasks-list">
              {pendingTasks.length > 0 ? (
                pendingTasks.map(task => (
                  <TaskCard 
                    key={task.id}
                    task={task}
                    onComplete={() => handleTaskComplete(task.id)}
                  />
                ))
              ) : (
                <div className="no-tasks">
                  <CheckCircle size={48} className="check-icon" />
                  <p>All tasks completed!</p>
                  <span>Great job!</span>
                </div>
              )}
            </div>
            
            <button className="btn-add-task">
              + Add New Task
            </button>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions-section">
            <div className="section-header">
              <h2>
                <Activity size={20} />
                Quick Actions
              </h2>
            </div>
            <div className="actions-grid">
              <button className="action-card">
                <ShoppingBag size={24} />
                <span>New Order</span>
              </button>
              <button className="action-card">
                <Package size={24} />
                <span>Add Product</span>
              </button>
              <button className="action-card">
                <Users size={24} />
                <span>Add Customer</span>
              </button>
              <button className="action-card">
                <AlertCircle size={24} />
                <span>View Reports</span>
              </button>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="activity-section">
            <div className="section-header">
              <h2>Recent Activity</h2>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon success">
                  <CheckCircle size={16} />
                </div>
                <div className="activity-content">
                  <p>Order #1234 was completed</p>
                  <span>2 minutes ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon warning">
                  <AlertCircle size={16} />
                </div>
                <div className="activity-content">
                  <p>Low stock alert for iPhone 14</p>
                  <span>15 minutes ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon info">
                  <Users size={16} />
                </div>
                <div className="activity-content">
                  <p>New customer registered: John Doe</p>
                  <span>1 hour ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon primary">
                  <ShoppingBag size={16} />
                </div>
                <div className="activity-content">
                  <p>New order received: #1235</p>
                  <span>2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Performance Metrics */}
      <div className="performance-section">
        <div className="section-header">
          <h2>Performance Metrics</h2>
          <select className="metric-filter">
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
        </div>
        <div className="metrics-grid">
          <div className="metric-card">
            <h3>Order Conversion Rate</h3>
            <div className="metric-value">24.5%</div>
            <div className="metric-progress">
              <div className="progress-bar" style={{ width: '24.5%' }}></div>
            </div>
            <div className="metric-trend trend-up">+2.1% from last week</div>
          </div>
          <div className="metric-card">
            <h3>Average Order Value</h3>
            <div className="metric-value">$82.45</div>
            <div className="metric-progress">
              <div className="progress-bar" style={{ width: '65%' }}></div>
            </div>
            <div className="metric-trend trend-up">+$5.20 from last week</div>
          </div>
          <div className="metric-card">
            <h3>Customer Satisfaction</h3>
            <div className="metric-value">94%</div>
            <div className="metric-progress">
              <div className="progress-bar" style={{ width: '94%' }}></div>
            </div>
            <div className="metric-trend trend-up">+3% from last month</div>
          </div>
          <div className="metric-card">
            <h3>Return Rate</h3>
            <div className="metric-value">2.3%</div>
            <div className="metric-progress">
              <div className="progress-bar" style={{ width: '2.3%' }}></div>
            </div>
            <div className="metric-trend trend-down">-0.5% from last month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
