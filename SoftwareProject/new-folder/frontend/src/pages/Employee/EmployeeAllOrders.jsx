import React, { useState, useEffect } from 'react';
import { Search, Download, Eye, Printer, RefreshCw, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './EmployeeAllOrders.css';

const API_BASE = "http://127.0.0.1:8000/api";

const AllOrders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    processing: 0,
    canceled: 0
  });

  // Get authentication token
  const getAuthToken = () => {
    // Try different possible token storage locations
    return localStorage.getItem('access_token') || 
           localStorage.getItem('accessToken') || 
           localStorage.getItem('token') ||
           sessionStorage.getItem('access_token') ||
           sessionStorage.getItem('accessToken') ||
           sessionStorage.getItem('token');
  };

  // Fetch orders from backend
  const fetchOrders = async (page = 1) => {
    setLoading(true);
    try {
      console.log('📋 Fetching orders from backend...');
      
      // Get auth token
      const token = getAuthToken();
      console.log('🔑 Token available:', !!token);
      
      // Prepare headers
      const headers = {
        'Content-Type': 'application/json',
      };
      
      // Add authorization header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      // Build query parameters
      const params = new URLSearchParams({
        search: searchTerm,
        status: filterStatus !== 'all' ? filterStatus : '',
        dateRange: dateRange !== 'all' ? dateRange : '',
        page: page,
        pageSize: 10
      });

      console.log('🌐 API URL:', `${API_BASE}/orders/all/?${params}`);
      
      const response = await fetch(`${API_BASE}/orders/all/?${params}`, {
        headers: headers,
        credentials: 'include'  // Include cookies for session auth
      });

      console.log('📊 Response status:', response.status);
      
      if (!response.ok) {
        // Check if it's an auth issue
        if (response.status === 401) {
          console.warn('⚠️ Authentication required or token expired');
          // Try without auth token as a fallback (since view has AllowAny)
          return await fetchOrdersWithoutAuth(page);
        }
        throw new Error(`API failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('📦 Response data:', data);
      
      if (data.success) {
        console.log(`✅ Received ${data.orders?.length || 0} orders`);
        setOrders(data.orders || []);
        setStats(data.stats || {
          total: 0,
          completed: 0,
          pending: 0,
          processing: 0,
          canceled: 0
        });
        setTotalPages(data.pagination?.totalPages || 1);
        setCurrentPage(data.pagination?.page || 1);
      } else {
        console.error('❌ API returned error:', data.error);
        // Fallback to empty data
        useFallbackData();
      }
    } catch (error) {
      console.error('❌ Error fetching orders:', error);
      // Fallback to empty data
      useFallbackData();
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Try without authentication as fallback
  const fetchOrdersWithoutAuth = async (page = 1) => {
    console.log('🔄 Trying without authentication...');
    
    try {
      const params = new URLSearchParams({
        search: searchTerm,
        status: filterStatus !== 'all' ? filterStatus : '',
        dateRange: dateRange !== 'all' ? dateRange : '',
        page: page,
        pageSize: 10
      });

      const response = await fetch(`${API_BASE}/orders/all/?${params}`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`API failed without auth: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        console.log(`✅ Received ${data.orders?.length || 0} orders (no auth)`);
        setOrders(data.orders || []);
        setStats(data.stats || {
          total: 0,
          completed: 0,
          pending: 0,
          processing: 0,
          canceled: 0
        });
        setTotalPages(data.pagination?.totalPages || 1);
        setCurrentPage(data.pagination?.page || 1);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('❌ Failed without auth:', error);
      useFallbackData();
    }
  };

  // Fallback to mock data if API fails
  const useFallbackData = () => {
    console.log('📱 Using fallback data');
    // You can keep your mock data here if needed
    setOrders([]);
    setStats({
      total: 0,
      completed: 0,
      pending: 0,
      processing: 0,
      canceled: 0
    });
    setTotalPages(1);
    setCurrentPage(1);
  };

  // Fetch data on component mount and when filters change
  useEffect(() => {
    fetchOrders();
  }, [searchTerm, filterStatus, dateRange]);

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders(currentPage);
  };

  // Filter orders (client-side fallback)
  const filteredOrders = orders.filter(order => {
    const customerName = typeof order.customer === 'string' 
      ? order.customer 
      : order.customer?.name || 
        order.customer_name || 
        order.user || 
        order.customerDetails?.name || 
        '';
    
    const orderId = order.order_id || order.order_number || order.id || '';
    
    const matchesSearch = 
      customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orderId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': 
      case 'delivered': return 'status-completed';
      case 'pending': return 'status-pending';
      case 'process': 
      case 'processing': 
      case 'shipped': return 'status-process';
      case 'canceled': 
      case 'cancelled': return 'status-canceled';
      default: return '';
    }
  };

  const formatStatus = (status) => {
    switch(status) {
      case 'process': 
      case 'processing': 
      case 'shipped': return 'Processing';
      case 'cancelled': 
      case 'canceled': return 'Canceled';
      case 'delivered': return 'Completed';
      case 'pending': return 'Pending';
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const handleViewOrder = (order) => {
    console.log('👁️ Viewing order:', order.id || order.order_id);
    navigate(`/employee/order/${order.id || order.order_id || order.order_number}`, {
      state: { 
        order: order,
        orderData: order
      }
    });
  };

  const handleExportOrders = () => {
    alert('Exporting orders to CSV...');
  };

  const handlePrintOrders = () => {
    window.print();
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchOrders(newPage);
    }
  };

  const formatAmount = (amount) => {
    if (!amount) return '$0.00';
    if (typeof amount === 'string') {
      // If it's already formatted
      return amount.includes('LE') ? amount : 
             amount.includes('$') ? amount : 
             `$${amount}`;
    }
    if (typeof amount === 'number') {
      return `$${amount.toFixed(2)}`;
    }
    return amount;
  };

  const getDisplayCustomer = (order) => {
    if (typeof order.customer === 'string') {
      return order.customer;
    }
    return order.customer_name || 
           order.customer?.name || 
           order.user || 
           order.customerDetails?.name || 
           'Customer';
  };

  const getDisplayEmail = (order) => {
    return order.email || 
           order.customer_email || 
           order.customer?.email || 
           order.customerDetails?.email || 
           'N/A';
  };

  const getOrderId = (order) => {
    // Use order_number or id from backend
    return order.order_id || 
           order.order_number || 
           order.id || 
           'N/A';
  };

  const handleLoginRedirect = () => {
    // Redirect to login page
    navigate('/login');
  };

  if (loading && !orders.length) {
    return (
      <div className="all-orders-container">
        <div className="loading-overlay">
          <Loader2 size={32} className="spinning" />
          <p>Loading orders from backend...</p>
        </div>
      </div>
    );
  }

  // Check if we have any orders
  const hasOrders = orders.length > 0;

  return (
    <div className="all-orders-container">
      {/* Header */}
      <div className="head-title">
        <div className="left">
          <h1>All Orders</h1>
          <ul className="breadcrumb">
            <li><a href="#">Dashboard</a></li>
            <li>•</li>
            <li><a className="active" href="#">All Orders</a></li>
          </ul>
          <div className="data-source-indicator">
            <span className={`source-badge ${hasOrders ? 'live' : 'demo'}`}>
              {hasOrders ? '📊 Live Data' : '📱 No Data'}
            </span>
          </div>
        </div>

        <div className="header-actions">
          <button className="action-btn refresh-btn" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw size={18} className={refreshing ? 'spinning' : ''} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <button className="action-btn" onClick={handleExportOrders} disabled={!hasOrders}>
            <Download size={18} />
            Export
          </button>
          <button className="action-btn" onClick={handlePrintOrders} disabled={!hasOrders}>
            <Printer size={18} />
            Print
          </button>
          {!hasOrders && (
            <button className="action-btn login-btn" onClick={handleLoginRedirect}>
              🔑 Login
            </button>
          )}
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="orders-stats">
        <div className="stat-box stat-blue">
          <h3>{stats.total}</h3>
          <p>Total Orders</p>
        </div>
        <div className="stat-box stat-green">
          <h3>{stats.completed}</h3>
          <p>Completed</p>
        </div>
        <div className="stat-box stat-orange">
          <h3>{stats.pending}</h3>
          <p>Pending</p>
        </div>
        <div className="stat-box stat-yellow">
          <h3>{stats.processing}</h3>
          <p>Processing</p>
        </div>
        <div className="stat-box stat-red">
          <h3>{stats.canceled}</h3>
          <p>Canceled</p>
        </div>
      </div>

      {/* Authentication Warning */}
      {!hasOrders && orders.length === 0 && (
        <div className="auth-warning">
          <div className="warning-content">
            <h3>🔐 Authentication Required</h3>
            <p>The orders API requires authentication. Please make sure:</p>
            <ul>
              <li>You are logged into the system</li>
              <li>Your session is still valid</li>
              <li>You have the necessary permissions</li>
            </ul>
            <div className="warning-actions">
              <button className="btn-primary" onClick={handleLoginRedirect}>
                Go to Login
              </button>
              <button className="btn-secondary" onClick={handleRefresh}>
                Retry Connection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="orders-filters">
        <div className="search-filter-group">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by customer name or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  fetchOrders(1);
                }
              }}
              disabled={!hasOrders}
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="filter-select"
            disabled={!hasOrders}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="process">Processing</option>
            <option value="canceled">Canceled</option>
          </select>

          <select
            value={dateRange}
            onChange={(e) => {
              setDateRange(e.target.value);
              setCurrentPage(1);
            }}
            className="filter-select"
            disabled={!hasOrders}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        <div className="results-count">
          {hasOrders ? (
            <>
              Showing {filteredOrders.length} of {stats.total} orders
              {searchTerm && ` for "${searchTerm}"`}
              {filterStatus !== 'all' && ` (${filterStatus})`}
            </>
          ) : (
            'No orders available. Please check authentication.'
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-table-card">
        {refreshing && (
          <div className="refreshing-overlay">
            <Loader2 size={24} className="spinning" />
            <span>Refreshing data...</span>
          </div>
        )}

        <div className="table-responsive">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hasOrders ? (
                filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => (
                    <tr key={index}>
                      <td className="order-id">{getOrderId(order)}</td>
                      <td className="customer-cell">
                        <div className="customer-avatar">
                          {getDisplayCustomer(order).charAt(0)}
                        </div>
                        <div className="customer-info">
                          <span className="customer-name">{getDisplayCustomer(order)}</span>
                          <span className="customer-email">{getDisplayEmail(order)}</span>
                        </div>
                      </td>
                      <td>{order.date}</td>
                      <td>{order.items || 1} items</td>
                      <td>
                        <span className={`category-tag ${order.category === 'Women Item' ? 'women' : 'men'}`}>
                          {order.category || 'General'}
                        </span>
                      </td>
                      <td className="amount">{formatAmount(order.amount)}</td>
                      <td>
                        <span className={`status-badge ${getStatusColor(order.status)}`}>
                          {formatStatus(order.status)}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="view-btn"
                          onClick={() => handleViewOrder(order)}
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-orders">
                      <div className="empty-state">
                        <Search size={48} />
                        <h3>No orders match your filters</h3>
                        <p>Try changing your search or filter criteria</p>
                        <button 
                          className="reset-filters-btn"
                          onClick={() => {
                            setSearchTerm('');
                            setFilterStatus('all');
                            setDateRange('all');
                          }}
                        >
                          Reset Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="8" className="no-data">
                    <div className="empty-state">
                      <div className="error-icon">🔒</div>
                      <h3>No Orders Available</h3>
                      <p>Unable to fetch orders. Please check your authentication or try again later.</p>
                      <div className="action-buttons">
                        <button className="btn-primary" onClick={handleLoginRedirect}>
                          Login
                        </button>
                        <button className="btn-secondary" onClick={handleRefresh}>
                          Retry Connection
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination - Only show if we have orders */}
        {hasOrders && totalPages > 1 && (
          <div className="table-pagination">
            <button 
              className="pagination-btn" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="pagination-pages">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button 
                    key={i}
                    className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button 
              className="pagination-btn" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;