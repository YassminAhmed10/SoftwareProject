import React, { useState, useEffect } from 'react';
import { Calendar, Users, DollarSign, ChevronRight, Search, Eye, RefreshCw } from 'lucide-react';
import OrderDetails from './AdminOrderDetails';
import axios from 'axios';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    newOrders: 0,
    visitors: 0,
    totalSales: '0.00 LE',
    pendingOrders: 0
  });

  // API base URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('accessToken') || 
                    localStorage.getItem('access') || 
                    localStorage.getItem('access_token');
      
      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }
      
      console.log('🔄 Fetching dashboard orders...');
      console.log('Search:', searchTerm);
      console.log('Category:', filterCategory);
      
      const response = await axios.get(`${API_URL}/orders/dashboard/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        params: {
          search: searchTerm,
          category: filterCategory !== 'all' ? filterCategory : undefined
        }
      });
      
      console.log('✅ Dashboard response:', response.data);
      
      if (response.data.success) {
        setOrders(response.data.orders || []);
        
        // Update statistics if provided
        if (response.data.statistics) {
          const stats = response.data.statistics;
          setStats({
            newOrders: stats.new_orders_today || 0,
            visitors: stats.visitors_count || 0,
            totalSales: stats.total_sales || '0.00 LE',
            pendingOrders: stats.pending_orders || 0
          });
          console.log('📊 Updated stats:', stats);
        }
      } else {
        setError(response.data.error || 'Failed to fetch orders');
      }
      
      setLoading(false);
    } catch (err) {
      console.error('❌ Error fetching orders:', err);
      setError(err.response?.data?.error || err.message || 'Failed to fetch orders');
      setLoading(false);
    }
  };

  // Fetch orders on component mount and when filters change
  useEffect(() => {
    fetchOrders();
  }, [searchTerm, filterCategory]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('🔄 Auto-refreshing dashboard...');
      fetchOrders();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [searchTerm, filterCategory]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleCloseOrderDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  const handleBackToOrders = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  const handleRefresh = () => {
    console.log('🔄 Manual refresh triggered');
    fetchOrders();
  };

  return (
    <div className={`dashboard-main ${showOrderDetails ? 'with-order-details' : ''}`}>
      {/* Header Section */}
      <div className="head-title">
        <div className="left">
          <h1>Dashboard</h1>
          <ul className="breadcrumb">
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li><ChevronRight size={16} /></li>
            <li>
              <a className="active" href="#">
                {showOrderDetails ? 'Order Details' : 'Home'}
              </a>
            </li>
          </ul>
        </div>
        <button 
          onClick={handleRefresh} 
          className="refresh-btn"
          disabled={loading}
          style={{
            background: '#3B82F6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          <RefreshCw size={16} className={loading ? 'spinning' : ''} />
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          background: '#FEE2E2',
          border: '1px solid #EF4444',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '20px',
          color: '#991B1B'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Stats Cards */}
      {!showOrderDetails && (
        <ul className="box-info">
          <li>
            <div className="bx">
              <Calendar size={36} />
            </div>
            <span className="text">
              <h3>{stats.newOrders}</h3>
              <p>New Orders Today</p>
            </span>
          </li>
          <li>
            <div className="bx">
              <Users size={36} />
            </div>
            <span className="text">
              <h3>{stats.visitors}</h3>
              <p>Visitors Today</p>
            </span>
          </li>
          <li>
            <div className="bx">
              <DollarSign size={36} />
            </div>
            <span className="text">
              <h3>{stats.totalSales}</h3>
              <p>Total Sales</p>
            </span>
          </li>
        </ul>
      )}

      {/* Main Content Area */}
      <div className="dashboard-content-area">
        {/* Recent Orders Table */}
        {!showOrderDetails && (
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Recent Orders ({orders.length})</h3>
                <div className="head-actions">
                  <div className="search-box">
                    <Search size={18} />
                    <input
                      type="text"
                      placeholder="Search by name or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Categories</option>
                    <option value="Women Item">Women Item</option>
                    <option value="Men Item">Men Item</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>
              
              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <p>Loading orders...</p>
                </div>
              ) : orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <p>No orders found</p>
                </div>
              ) : (
                <table className="recent-orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="order-row">
                        <td className="customer-id">
                          <span className="id-badge">{order.order_id}</span>
                        </td>
                        <td className="user-name">
                          {order.user}
                        </td>
                        <td className="order-date">{order.date}</td>
                        <td className="order-category">
                          <span className={`category-badge ${order.category === 'Women Item' ? 'women' : order.category === 'Men Item' ? 'men' : 'general'}`}>
                            {order.category}
                          </span>
                        </td>
                        <td className="order-amount">{order.amount}</td>
                        <td className="order-status">
                          <span className={`status status-${order.status}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="order-action">
                          <button 
                            className="view-order-btn"
                            onClick={() => handleViewOrder(order)}
                          >
                            <Eye size={16} />
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Order Details Section */}
        {showOrderDetails && selectedOrder && (
          <OrderDetails 
            order={selectedOrder} 
            onBack={handleBackToOrders}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;