import { useState, useEffect } from 'react';
import { Search, Download, Eye, Printer, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminAllOrders.css';

const AdminAllOrders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    processing: 0
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

  // Fetch orders from backend
  const fetchOrders = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      console.log('📋 Fetching orders...', {
        search: searchTerm,
        status: filterStatus,
        dateRange: dateRange,
        page: page
      });

      const response = await axios.get(`${API_URL}/orders/all-orders/`, {
        params: {
          search: searchTerm,
          status: filterStatus,
          dateRange: dateRange,
          page: page,
          pageSize: 10
        }
      });

      console.log('✅ Orders response:', response.data);

      if (response.data.success) {
        setOrders(response.data.orders || []);
        setPagination(response.data.pagination || {});
        
        if (response.data.stats) {
          setStats({
            total: response.data.stats.total || 0,
            completed: response.data.stats.completed || 0,
            pending: response.data.stats.pending || 0,
            processing: response.data.stats.processing || 0
          });
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

  // Fetch on mount and when filters change
  useEffect(() => {
    fetchOrders(1);
  }, [searchTerm, filterStatus, dateRange]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('🔄 Auto-refreshing orders...');
      fetchOrders(pagination.page);
    }, 30000);

    return () => clearInterval(interval);
  }, [pagination.page, searchTerm, filterStatus, dateRange]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'status-completed';
      case 'pending': return 'status-pending';
      case 'process': return 'status-process';
      case 'canceled': return 'status-canceled';
      default: return '';
    }
  };

  const handleViewOrder = (order) => {
    console.log('👁️ Viewing order:', order.id);
    navigate(`/order/${order.id}`, {
      state: { 
        order: order,
        orderData: order
      }
    });
  };

  const handleExportOrders = () => {
    // Create CSV content
    const headers = ['Order ID', 'Customer', 'Date', 'Items', 'Category', 'Amount', 'Status'];
    const csvContent = [
      headers.join(','),
      ...orders.map(order => [
        order.id,
        order.customer,
        order.date,
        order.items,
        order.category,
        order.amount,
        order.status
      ].join(','))
    ].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handlePrintOrders = () => {
    window.print();
  };

  const handleRefresh = () => {
    console.log('🔄 Manual refresh triggered');
    fetchOrders(pagination.page);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchOrders(newPage);
    }
  };

  // Quick stats with real data
  const statsData = [
    { label: 'Total Orders', value: stats.total, color: 'blue' },
    { label: 'Completed', value: stats.completed, color: 'green' },
    { label: 'Pending', value: stats.pending, color: 'orange' },
    { label: 'Processing', value: stats.processing, color: 'yellow' },
  ];

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
        </div>

        <div className="header-actions">
          <button className="action-btn" onClick={handleRefresh} disabled={loading}>
            <RefreshCw size={18} className={loading ? 'spinning' : ''} />
            Refresh
          </button>
          <button className="action-btn" onClick={handleExportOrders}>
            <Download size={18} />
            Export
          </button>
          <button className="action-btn" onClick={handlePrintOrders}>
            <Printer size={18} />
            Print
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Quick Statistics */}
      <div className="orders-stats">
        {statsData.map((stat, index) => (
          <div key={index} className={`stat-box stat-${stat.color}`}>
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>

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
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="process">Processing</option>
            <option value="canceled">Canceled</option>
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        <div className="results-count">
          Showing {orders.length} of {pagination.total} orders
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-table-card">
        {loading ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px',
            color: '#6b7280'
          }}>
            <RefreshCw size={32} className="spinning" style={{ marginBottom: '16px' }} />
            <p>Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px',
            color: '#6b7280'
          }}>
            <p style={{ fontSize: '18px', marginBottom: '8px' }}>No orders found</p>
            <p style={{ fontSize: '14px', color: '#9ca3af' }}>
              Try adjusting your filters or search criteria
            </p>
          </div>
        ) : (
          <>
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
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td className="order-id">{order.id}</td>
                      <td className="customer-cell">
                        <div className="customer-avatar">
                          {order.customer.charAt(0)}
                        </div>
                        <span>{order.customer}</span>
                      </td>
                      <td>{order.date}</td>
                      <td>{order.items} items</td>
                      <td>
                        <span className={`category-tag ${order.category === 'Women Item' ? 'women' : 'men'}`}>
                          {order.category}
                        </span>
                      </td>
                      <td className="amount">{order.amount}</td>
                      <td>
                        <span className={`status-badge ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
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
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="table-pagination">
              <button 
                className="pagination-btn" 
                disabled={!pagination.hasPrevious}
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                Previous
              </button>
              
              <div className="pagination-pages">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    className={`page-btn ${pageNum === pagination.page ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
              
              <button 
                className="pagination-btn"
                disabled={!pagination.hasNext}
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminAllOrders;