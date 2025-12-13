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
import './EmployeeDashboard.css';

const API_BASE = "http://127.0.0.1:8000/api"; // your Django backend

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

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch stats
        const statsRes = await fetch(`${API_BASE}/orders/dashboard-stats/?time=${timeFilter}`);
        const statsData = await statsRes.json();

        // Fetch recent orders
        const ordersRes = await fetch(`${API_BASE}/orders/recent/?time=${timeFilter}`);
        const ordersData = await ordersRes.json();

        // Fetch pending tasks
        const tasksRes = await fetch(`${API_BASE}/tasks/pending/`);
        const tasksData = await tasksRes.json();

        setStats({
          totalOrders: statsData.total_orders,
          totalRevenue: statsData.total_revenue,
          newCustomers: statsData.new_customers,
          pendingOrders: statsData.pending_orders
        });

        setRecentOrders(ordersData);
        setPendingTasks(tasksData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [timeFilter]);

  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter);
  };

  const handleTaskComplete = (taskId) => {
    // Optimistic update
    setPendingTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    ));

    // Call backend to mark task complete
    fetch(`${API_BASE}/tasks/${taskId}/complete/`, { method: 'POST' })
      .catch(err => console.error(err));
  };

  const handleOrderAction = (orderId, action) => {
    console.log(`${action} order ${orderId}`);
    // You can implement view/edit APIs here
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
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Employee Dashboard</h1>
          <p>Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="header-right">
          <div className="date-display">
            <Calendar size={18} />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Time Filter */}
      <div className="time-filter-section">
        <div className="filter-tabs">
          {['today','week','month','year'].map(filter => (
            <button 
              key={filter}
              className={`filter-tab ${timeFilter === filter ? 'active' : ''}`}
              onClick={() => handleTimeFilterChange(filter)}
            >
              {filter === 'today' ? 'Today' : filter === 'week' ? 'This Week' : filter === 'month' ? 'This Month' : 'This Year'}
            </button>
          ))}
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
        <StatCard title="Total Orders" value={stats.totalOrders.toLocaleString()} icon={<ShoppingBag size={24} />} trend="up" percentage={12.5} color="#8b5cf6"/>
        <StatCard title="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} icon={<DollarSign size={24} />} trend="up" percentage={8.2} color="#10b981"/>
        <StatCard title="New Customers" value={stats.newCustomers.toLocaleString()} icon={<Users size={24} />} trend="up" percentage={5.7} color="#3b82f6"/>
        <StatCard title="Pending Orders" value={stats.pendingOrders} icon={<Package size={24} />} trend="down" percentage={3.2} color="#f59e0b"/>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {/* Left Column */}
        <div className="content-left">
          {/* Recent Orders */}
          <div className="orders-section">
            <div className="section-header">
              <h2><ShoppingBag size={20}/> Recent Orders</h2>
              <button className="btn-view-all">View All Orders</button>
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
                      <td className="order-id">#{order.id.toString().padStart(4,'0')}</td>
                      <td className="customer-cell">
                        <div className="customer-info">
                          <div className="customer-name">{order.customer}</div>
                          <div className="customer-email">{order.email}</div>
                        </div>
                      </td>
                      <td>{order.date}</td>
                      <td><span className={`status-badge status-${order.status}`}>{order.status}</span></td>
                      <td className="order-total">${order.total.toFixed(2)}</td>
                      <td>
                        <div className="order-actions">
                          <button className="btn-view" onClick={() => handleOrderAction(order.id,'view')}><Eye size={14}/></button>
                          <button className="btn-edit" onClick={() => handleOrderAction(order.id,'edit')}><Edit size={14}/></button>
                          <button className="btn-more"><MoreVertical size={14}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sales Chart (Placeholder) */}
          <div className="chart-section">
            <div className="section-header">
              <h2><BarChart3 size={20}/> Sales Overview</h2>
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
                    <div key={index} className="chart-bar" style={{height:`${height}%`}}></div>
                  ))}
                </div>
                <div className="chart-labels">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>
              <div className="chart-info">
                <div className="chart-stat">
                  <span className="stat-label">Total Sales</span>
                  <span className="stat-value">${stats.totalRevenue.toLocaleString()}</span>
                </div>
                <div className="chart-stat">
                  <span className="stat-label">Growth</span>
                  <span className="stat-value trend-up"><TrendingUp size={14}/> 8.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="content-right">
          {/* Pending Tasks */}
          <div className="tasks-section">
            <div className="section-header">
              <h2><Clock size={20}/> Pending Tasks</h2>
              <span className="task-count">{pendingTasks.length} tasks</span>
            </div>
            <div className="tasks-list">
              {pendingTasks.length > 0 ? pendingTasks.map(task => (
                <TaskCard key={task.id} task={task} onComplete={() => handleTaskComplete(task.id)} />
              )) : (
                <div className="no-tasks">
                  <CheckCircle size={48} className="check-icon"/>
                  <p>All tasks completed!</p>
                  <span>Great job!</span>
                </div>
              )}
            </div>
            <button className="btn-add-task">+ Add New Task</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
