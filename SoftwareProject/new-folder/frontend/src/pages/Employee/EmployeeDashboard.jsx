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
  Eye,
  Edit,
  MoreVertical,
  RefreshCw
} from 'lucide-react';
import StatCard from '../../components/StatCard/StatCard';
import './EmployeeDashboard.css';

const API_BASE = "http://127.0.0.1:8000/api";

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
  const [salesData, setSalesData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, [timeFilter]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token') || 
                    localStorage.getItem('accessToken') || 
                    localStorage.getItem('token');
      
      const headers = token ? {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      } : {
        'Content-Type': 'application/json'
      };

      console.log('📊 Fetching dashboard data for:', timeFilter);

      // Fetch analytics data
      const analyticsRes = await fetch(`${API_BASE}/orders/analytics/?range=${timeFilter}`, { 
        headers,
        credentials: 'include'
      });
      
      let analyticsData = { success: false };
      if (analyticsRes.ok) {
        analyticsData = await analyticsRes.json();
        console.log('✅ Analytics data received');
        
        // Extract real sales data for chart
        if (analyticsData.sales_data && analyticsData.sales_data.length > 0) {
          const formattedSalesData = analyticsData.sales_data.map(item => ({
            period: item.period,
            sales: item.sales || 0,
            revenue: item.revenue || 0,
            orders: item.orders || 0
          }));
          setSalesData(formattedSalesData);
          console.log('📈 Sales data for chart:', formattedSalesData);
        }
      }

      // Fetch recent orders
      const ordersRes = await fetch(`${API_BASE}/orders/all/`, { 
        headers,
        credentials: 'include' 
      });
      
      let ordersData = { success: false, orders: [] };
      if (ordersRes.ok) {
        ordersData = await ordersRes.json();
        console.log('✅ Orders data received:', ordersData.orders?.length || 0, 'orders');
      }

      // Fetch tasks
      let tasksData = { success: false, tasks: [] };
      try {
        const tasksRes = await fetch(`${API_BASE}/tasks/pending/`, { 
          headers,
          credentials: 'include' 
        });
        if (tasksRes.ok) {
          tasksData = await tasksRes.json();
        }
      } catch (taskError) {
        console.log('⚠️ Tasks API not available');
      }

      // Process and set data
      processDashboardData(analyticsData, ordersData, tasksData);

    } catch (error) {
      console.error('❌ Error fetching dashboard data:', error);
      useFallbackData();
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const processDashboardData = (analyticsData, ordersData, tasksData) => {
    // Set stats from analytics
    if (analyticsData.success && analyticsData.quick_stats) {
      const statsData = analyticsData.quick_stats;
      
      // Helper to extract numeric values safely
      const extractNumber = (value) => {
        if (!value) return 0;
        if (typeof value === 'number') return value;
        if (typeof value === 'string') {
          const match = value.match(/[\d,\.]+/);
          return match ? parseFloat(match[0].replace(/,/g, '')) : 0;
        }
        if (typeof value === 'object' && value.raw_value !== undefined) {
          return value.raw_value;
        }
        return 0;
      };

      setStats({
        totalOrders: extractNumber(statsData.total_orders?.raw_value || statsData.total_orders?.value || 0),
        totalRevenue: extractNumber(statsData.total_revenue?.raw_value || statsData.total_revenue?.value || 0),
        newCustomers: extractNumber(statsData.total_visitors?.raw_value || statsData.total_visitors?.value || 0),
        pendingOrders: ordersData.stats?.pending || 
                      (ordersData.orders || []).filter(o => o.status === 'pending').length || 0
      });
    }

    // Set orders with proper email mapping
    if (ordersData.success && ordersData.orders) {
      const formattedOrders = ordersData.orders.slice(0, 10).map(order => {
        // Debug log to see what data we're getting
        console.log('📦 Processing order:', order);
        
        // Get email from multiple possible locations
        const email = order.email || 
                     order.customer_email || 
                     order.customer?.email || 
                     order.user?.email || 
                     'N/A';
        
        // Get customer name
        const customer = order.customer_name || 
                        order.customer?.name || 
                        order.user?.username || 
                        order.user || 
                        'Customer';
        
        // Parse amount
        let amount = 0;
        if (typeof order.amount === 'string') {
          const match = order.amount.match(/[\d,\.]+/);
          amount = match ? parseFloat(match[0].replace(/,/g, '')) : 0;
        } else if (typeof order.amount === 'number') {
          amount = order.amount;
        } else if (typeof order.total === 'number') {
          amount = order.total;
        }
        
        return {
          id: order.id || order.order_id || `ORD${Math.random().toString(36).substr(2, 9)}`,
          orderId: order.order_id || order.order_number || order.id,
          customer: customer,
          email: email,
          date: order.date || order.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
          status: order.status || 'pending',
          total: amount
        };
      });
      setRecentOrders(formattedOrders);
    } else {
      // Fallback mock orders
      setRecentOrders(generateMockOrders());
    }

    // Set tasks
    setPendingTasks(tasksData.tasks || generateMockTasks());
  };

  const generateMockOrders = () => [
    { 
      id: '1001', 
      orderId: 'RYZ241215123456',
      customer: 'John Doe', 
      email: 'john@example.com', 
      date: '2024-12-15', 
      status: 'completed', 
      total: 150.00 
    },
    { 
      id: '1002', 
      orderId: 'RYZ241215789012',
      customer: 'Jane Smith', 
      email: 'jane@example.com', 
      date: '2024-12-15', 
      status: 'processing', 
      total: 89.99 
    },
    { 
      id: '1003', 
      orderId: 'RYZ241214345678',
      customer: 'Bob Wilson', 
      email: 'bob@example.com', 
      date: '2024-12-14', 
      status: 'pending', 
      total: 210.50 
    }
  ];

  const generateMockTasks = () => [
    { 
      id: 1, 
      title: 'Review pending orders', 
      description: 'Check and process all pending orders from today', 
      priority: 'high', 
      created_at: new Date().toISOString(),
      assigned_by_details: { first_name: 'Manager' }
    },
    { 
      id: 2, 
      title: 'Update inventory levels', 
      description: 'Update stock levels for new arrivals', 
      priority: 'medium', 
      created_at: new Date().toISOString(),
      assigned_by_details: { first_name: 'Admin' }
    }
  ];

  const useFallbackData = () => {
    console.log('📱 Using fallback data');
    setStats({
      totalOrders: 24,
      totalRevenue: 3420.75,
      newCustomers: 12,
      pendingOrders: 5
    });
    setRecentOrders(generateMockOrders());
    setPendingTasks(generateMockTasks());
    setSalesData([
      { period: 'Week 1', sales: 450, revenue: 450, orders: 12 },
      { period: 'Week 2', sales: 520, revenue: 520, orders: 15 },
      { period: 'Week 3', sales: 480, revenue: 480, orders: 14 },
      { period: 'Week 4', sales: 550, revenue: 550, orders: 16 }
    ]);
  };

  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  // In EmployeeDashboard.js - Update handleTaskComplete function
const handleTaskComplete = async (taskId) => {
  const employeeEmail = localStorage.getItem('employee_email') || 'zeina@employee.com';
  
  try {
    // 1. Try to mark as complete in Django
    const response = await fetch(`${API_BASE}/tasks/complete/${taskId}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: employeeEmail
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        console.log('✅ Task marked as complete in Django:', data);
        
        // Clear localStorage cache for tasks to force fresh fetch
        localStorage.removeItem('task_cache_' + employeeEmail);
      } else {
        console.error('❌ Django returned error:', data.error);
      }
    } else {
      console.error('❌ Server error:', response.status);
    }
  } catch (error) {
    console.error('❌ Error updating task in Django:', error);
  }
  
  // 2. Also update localStorage to mark task as completed
  const allTasks = JSON.parse(localStorage.getItem('assigned_tasks') || '[]');
  const updatedTasks = allTasks.map(task => 
    task.id === taskId 
      ? { ...task, status: 'completed', completed: true, completed_at: new Date().toISOString() }
      : task
  );
  localStorage.setItem('assigned_tasks', JSON.stringify(updatedTasks));
  
  // 3. Remove from UI state
  setPendingTasks(prev => prev.filter(task => task.id !== taskId));
  
  alert('✅ Task marked as completed!');
  
  // 4. Force a refresh of task data after a short delay
  setTimeout(() => {
  // Update fetchEmployeeTasks function
const fetchEmployeeTasks = async (employeeEmail) => {
  try {
    console.log('🔄 Fetching tasks from Django for:', employeeEmail);
    
    // Check if we have a recent cache
    const cacheKey = 'task_cache_' + employeeEmail;
    const cachedData = localStorage.getItem(cacheKey);
    
    if (cachedData) {
      const cache = JSON.parse(cachedData);
      const now = new Date().getTime();
      // Use cache if less than 30 seconds old
      if (now - cache.timestamp < 30000) {
        console.log('📦 Using cached tasks');
        return {
          success: true,
          tasks: cache.tasks
        };
      }
    }
    
    // Try the pending endpoint first with email parameter
    const response = await fetch(`${API_BASE}/tasks/pending/?email=${encodeURIComponent(employeeEmail)}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Django tasks response:', data);
      
      if (data.success && data.tasks) {
        // Cache the results
        localStorage.setItem(cacheKey, JSON.stringify({
          timestamp: new Date().getTime(),
          tasks: data.tasks
        }));
        
        return {
          success: true,
          tasks: data.tasks.map(task => ({
            id: task.id,
            title: task.title,
            description: task.description,
            priority: task.priority,
            assigned_to: task.assigned_to,
            assigned_by_details: task.assigned_by_details || { first_name: 'Admin' },
            created_at: task.created_at,
            status: task.status || 'pending'
          }))
        };
      }
    }
    
    return { success: false, tasks: [] };
    
  } catch (error) {
    console.error('❌ Error fetching tasks from Django:', error);
    return { success: false, tasks: [] };
  }
};
  }, 500);
};
  const handleOrderAction = (orderId, action) => {
    console.log(`${action} order ${orderId}`);
    if (action === 'view') {
      alert(`View order ${orderId} - This would open order details`);
    } else if (action === 'edit') {
      alert(`Edit order ${orderId} - This would open edit form`);
    }
  };

  // Function to render real sales chart
  const renderSalesChart = () => {
    if (salesData.length === 0) {
      return (
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
      );
    }

    // Real chart with actual data
    const maxValue = Math.max(...salesData.map(item => item.revenue || item.sales || 0));
    
    return (
      <div className="real-chart">
        <div className="chart-bars-real">
          {salesData.map((item, index) => {
            const height = maxValue > 0 ? ((item.revenue || item.sales || 0) / maxValue) * 100 : 0;
            return (
              <div key={index} className="chart-bar-real-container">
                <div className="chart-bar-real" style={{height: `${height}%`}}>
                  <span className="bar-value">${(item.revenue || item.sales || 0).toFixed(0)}</span>
                </div>
                <span className="bar-label">{item.period}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
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
          <button className="refresh-button" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw size={18} className={refreshing ? 'spinning' : ''} />
            Refresh
          </button>
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
              {filter === 'today' ? 'Today' : 
               filter === 'week' ? 'This Week' : 
               filter === 'month' ? 'This Month' : 'This Year'}
            </button>
          ))}
        </div>
        <div className="filter-actions">
          <div className="search-box">
            <Search size={16} />
            <input type="text" placeholder="Search orders..." />
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
          value={`$${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
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
          value={stats.pendingOrders.toString()} 
          icon={<Package size={24} />} 
          trend="down" 
          percentage={3.2} 
          color="#f59e0b"
        />
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
                    <th>Email</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id}>
                      <td className="order-id">#{order.orderId || order.id}</td>
                      <td className="customer-cell">
                        <div className="customer-info">
                          <div className="customer-name">{order.customer}</div>
                        </div>
                      </td>
                      <td className="email-cell">{order.email}</td>
                      <td>{order.date}</td>
                      <td>
                        <span className={`status-badge status-${order.status.toLowerCase()}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="order-total">${order.total.toFixed(2)}</td>
                      <td>
                        <div className="order-actions">
                          <button className="btn-view" onClick={() => handleOrderAction(order.id,'view')}>
                            <Eye size={14}/>
                          </button>
                          <button className="btn-edit" onClick={() => handleOrderAction(order.id,'edit')}>
                            <Edit size={14}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {recentOrders.length === 0 && (
                    <tr>
                      <td colSpan="7" className="no-orders">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sales Chart with REAL Data */}
          <div className="chart-section">
            <div className="section-header">
              <h2><BarChart3 size={20}/> Sales Overview - {timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)}</h2>
              <div className="chart-legend">
                <span className="legend-item revenue">
                  <div className="legend-color"></div>
                  Revenue
                </span>
                <span className="legend-item orders">
                  <div className="legend-color"></div>
                  Orders
                </span>
              </div>
            </div>
            <div className="chart-container">
              {renderSalesChart()}
              <div className="chart-info">
                <div className="chart-stat">
                  <span className="stat-label">Total Revenue</span>
                  <span className="stat-value">${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="chart-stat">
                  <span className="stat-label">Avg. Order Value</span>
                  <span className="stat-value">
                    ${stats.totalOrders > 0 ? (stats.totalRevenue / stats.totalOrders).toFixed(2) : '0.00'}
                  </span>
                </div>
                <div className="chart-stat">
                  <span className="stat-label">Growth</span>
                  <span className="stat-value trend-up">
                    <TrendingUp size={14}/> 8.2%
                  </span>
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
          </div>

          {/* Data Status */}
          <div className="data-status">
            <div className="status-item">
              <span className="status-label">Data Source:</span>
              <span className="status-value live">Live API Data</span>
            </div>
            <div className="status-item">
              <span className="status-label">Last Updated:</span>
              <span className="status-value">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// TaskCard Component
const TaskCard = ({ task, onComplete }) => {
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return '#ef4444';
      case 'high': return '#f59e0b';
      case 'medium': return '#3b82f6';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <div className="task-priority" style={{backgroundColor: getPriorityColor(task.priority)}}>
          <AlertCircle size={16} />
          <span>{task.priority}</span>
        </div>
        <button className="task-complete-btn" onClick={onComplete}>
          <CheckCircle size={16} />
        </button>
      </div>
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
      <div className="task-footer">
        <span className="task-date">
          <Calendar size={14} />
          {new Date(task.created_at).toLocaleDateString()}
        </span>
        {task.assigned_by_details && (
          <span className="task-assignee">
            From: {task.assigned_by_details.first_name}
          </span>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;