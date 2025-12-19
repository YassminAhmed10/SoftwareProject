import React, { useState, useEffect } from 'react';
import './Analytics.css';
import axios from 'axios';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingBag, 
  DollarSign,
  Eye,
  Calendar,
  ArrowUp,
  ArrowDown,
  Crown,
  Star,
  RefreshCw
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

  // Handle image errors
  const handleImageError = (e) => {
    e.target.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlNWU1ZTUiLz48cGF0aCBkPSJNNjYuNjY2NyAzMy4zMzMzSDMzLjMzMzNWNjYuNjY2N0g2Ni42NjY3VjMzLjMzMzNaTTMzLjMzMzMgMjZDNzIuNDQgMjYgNzIuNDQgMjYgNzMuMzMzMyAyNkM3NC4yMjY3IDI2IDc1IDI2Ljc3MzMgNzUgMjcuNjY2N1Y3Mi4zMzMzQzc1IDczLjIyNjcgNzQuMjI2NyA3NCA3My4zMzMzIDc0SDI2LjY2NjdDMjUuNzczMyA3NCAyNSA3My4yMjY3IDI1IDcyLjMzMzNWMjcuNjY2N0MyNSAyNi43NzMzIDI1Ljc3MzMgMjYgMjYuNjY2NyAyNkgyNy41NTY3QzI3LjU1NjcgMjYgNjUuNzc3OCAyNiA2Ni42NjY3IDI2WiIgZmlsbD0iIzk0OTQ5NCIvPjwvc3ZnPg==`;
    e.target.alt = 'Product image not available';
    e.target.onerror = null; // Prevent infinite loop
  };

  // Fetch analytics data
  const fetchAnalyticsData = async () => {
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

      console.log('📊 Fetching analytics data for:', timeRange);

      const response = await axios.get(`${API_URL}/orders/analytics/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        params: {
          range: timeRange
        }
      });

      console.log('✅ Analytics response:', response.data);

      if (response.data.success) {
        setAnalyticsData(response.data);
      } else {
        setError(response.data.error || 'Failed to fetch analytics');
      }

      setLoading(false);
    } catch (err) {
      console.error('❌ Error fetching analytics:', err);
      setError(err.response?.data?.error || err.message || 'Failed to fetch analytics');
      setLoading(false);
    }
  };

  // Fetch data on mount and when time range changes
  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('🔄 Auto-refreshing analytics...');
      fetchAnalyticsData();
    }, 60000);

    return () => clearInterval(interval);
  }, [timeRange]);

  // Map backend data to quick stats format
  const getQuickStats = () => {
    if (!analyticsData?.quick_stats) return [];

    const stats = analyticsData.quick_stats;

    return [
      { 
        title: 'Total Revenue', 
        value: stats.total_revenue?.value || '$0.00', 
        change: stats.total_revenue?.change || '+0%', 
        isPositive: stats.total_revenue?.is_positive ?? true,
        icon: DollarSign,
        color: 'blue'
      },
      { 
        title: 'Total Orders', 
        value: stats.total_orders?.value || '0', 
        change: stats.total_orders?.change || '+0%', 
        isPositive: stats.total_orders?.is_positive ?? true,
        icon: ShoppingBag,
        color: 'green'
      },
      { 
        title: 'Total Visitors', 
        value: stats.total_visitors?.value || '0', 
        change: stats.total_visitors?.change || '+0%', 
        isPositive: stats.total_visitors?.is_positive ?? true,
        icon: Users,
        color: 'purple'
      },
      { 
        title: 'Conversion Rate', 
        value: stats.conversion_rate?.value || '0%', 
        change: stats.conversion_rate?.change || '+0%', 
        isPositive: stats.conversion_rate?.is_positive ?? true,
        icon: TrendingUp,
        color: 'orange'
      },
    ];
  };

  const getStatColor = (color) => {
    const colors = {
      blue: { bg: 'var(--light-blue)', text: 'var(--blue)' },
      green: { bg: '#d1fae5', text: '#065f46' },
      purple: { bg: '#ede9fe', text: '#5b21b6' },
      orange: { bg: 'var(--light-orange)', text: 'var(--orange)' }
    };
    return colors[color] || colors.blue;
  };

  const handleRefresh = () => {
    console.log('🔄 Manual refresh triggered');
    fetchAnalyticsData();
  };

  if (loading && !analyticsData) {
    return (
      <div className="analytics-container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '400px',
          fontSize: '18px',
          color: '#6b7280'
        }}>
          <RefreshCw className="spinning" size={24} style={{ marginRight: '12px' }} />
          Loading analytics data...
        </div>
      </div>
    );
  }

  const quickStats = getQuickStats();
  const salesData = analyticsData?.sales_data || [];
  const categoryData = analyticsData?.category_data || [];
  const visitorData = analyticsData?.visitor_data || [];
  const topProducts = analyticsData?.top_products || [];

  return (
    <div className="analytics-container">
      {/* Header */}
      <div className="head-title">
        <div className="left">
          <h1>Analytics</h1>
          <ul className="breadcrumb">
            <li><a href="#">Dashboard</a></li>
            <li>•</li>
            <li><a className="active" href="#">Analytics</a></li>
          </ul>
        </div>
        
        <div className="time-range-selector">
          <button 
            className={timeRange === 'week' ? 'active' : ''}
            onClick={() => setTimeRange('week')}
            disabled={loading}
          >
            Week
          </button>
          <button 
            className={timeRange === 'month' ? 'active' : ''}
            onClick={() => setTimeRange('month')}
            disabled={loading}
          >
            Month
          </button>
          <button 
            className={timeRange === 'year' ? 'active' : ''}
            onClick={() => setTimeRange('year')}
            disabled={loading}
          >
            Year
          </button>
          
          <button 
            onClick={handleRefresh}
            disabled={loading}
            className="refresh-btn-analytics"
          >
            <RefreshCw size={16} className={loading ? 'spinning' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Quick Stats */}
      <div className="quick-stats-grid">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          const colors = getStatColor(stat.color);
          return (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <div className="stat-icon" style={{ background: colors.bg, color: colors.text }}>
                  <Icon size={24} />
                </div>
                <div className={`stat-change ${stat.isPositive ? 'positive' : 'negative'}`}>
                  {stat.isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  {stat.change}
                </div>
              </div>
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Top Products Table */}
      <div className="top-products-card">
        <div className="chart-header">
          <h2>Top Selling Products</h2>
          <p className="chart-subtitle">Best performing products this {timeRange}</p>
        </div>
        
        {topProducts.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
            No product data available yet
          </div>
        ) : (
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Product</th>
                <th>Category</th>
                <th>Sales</th>
                <th>Revenue</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={product.id} className={product.isTop ? 'top-product' : ''}>
                  <td className="rank-cell">
                    {product.isTop ? (
                      <div className="top-rank">
                        <Crown size={26} className="crown-icon" />
                        <span className="rank-number">1</span>
                      </div>
                    ) : (
                      <div className="normal-rank">
                        <span className="rank-number">{index + 1}</span>
                      </div>
                    )}
                  </td>
                  <td className="product-cell">
                    <div className="product-with-image">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="product-table-image"
                        onError={handleImageError}
                      />
                      <span className="product-name">{product.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`category-badge ${product.category?.includes('Women') ? 'women' : 'men'}`}>
                      {product.category || 'Uncategorized'}
                    </span>
                  </td>
                  <td>{product.sales || 0}</td>
                  <td className="revenue">{product.revenue ? product.revenue.toLocaleString() + ' LE' : '0 LE'}</td>
                  <td className={`trend ${product.trend?.includes('+') ? 'positive' : 'negative'}`}>
                    {product.trend?.includes('+') ? <TrendingUp size={34} /> : <TrendingDown size={34} />}
                    {product.trend || '0%'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Revenue Chart */}
        <div className="chart-card large">
          <div className="chart-header">
            <h2>Revenue Overview</h2>
            <p className="chart-subtitle">Sales performance over time</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="period" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} name="Sales (LE)" />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue (LE)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="chart-card">
          <div className="chart-header">
            <h2>Sales by Category</h2>
            <p className="chart-subtitle">Product category distribution</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="category-legend">
            {categoryData.map((cat, index) => (
              <div key={index} className="legend-item">
                <div className="legend-color" style={{ background: cat.color }}></div>
                <span>{cat.name}</span>
                <strong>{cat.value}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Visitors Chart */}
        <div className="chart-card large">
          <div className="chart-header">
            <h2>Visitor Analytics</h2>
            <p className="chart-subtitle">Visitor trends over time</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="visitors" fill="#3b82f6" name="Total Visitors" radius={[8, 8, 0, 0]} />
              <Bar dataKey="newVisitors" fill="#10b981" name="New Visitors" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h2>Orders Over Time</h2>
            <p className="chart-subtitle">Order trends</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="period" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="orders" fill="#ec4899" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Last Updated */}
      {analyticsData?.last_updated && (
        <div style={{ 
          textAlign: 'center', 
          marginTop: '20px', 
          color: '#9ca3af',
          fontSize: '14px'
        }}>
          Last updated: {new Date(analyticsData.last_updated).toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default Analytics;