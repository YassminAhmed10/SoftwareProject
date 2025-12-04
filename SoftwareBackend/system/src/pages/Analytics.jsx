import React, { useState } from 'react';
import './Analytics.css'; // ضيف السطر ده
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
  Star
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
  const [timeRange, setTimeRange] = useState('week');

  // بيانات المبيعات
  const salesData = [
    { month: 'Jan', sales: 4000, orders: 240, revenue: 2400 },
    { month: 'Feb', sales: 3000, orders: 198, revenue: 2210 },
    { month: 'Mar', sales: 5000, orders: 300, revenue: 2290 },
    { month: 'Apr', sales: 4500, orders: 280, revenue: 2000 },
    { month: 'May', sales: 6000, orders: 350, revenue: 2181 },
    { month: 'Jun', sales: 7000, orders: 420, revenue: 2500 },
    { month: 'Jul', sales: 6500, orders: 390, revenue: 2100 },
  ];

  // بيانات الفئات - فقط Men و Women
  const categoryData = [
    { name: 'Women Items', value: 650, color: '#ec4899' },
    { name: 'Men Items', value: 450, color: '#3b82f6' },
  ];

  // بيانات الزوار
  const visitorData = [
    { day: 'Mon', visitors: 1200, newVisitors: 400 },
    { day: 'Tue', visitors: 1900, newVisitors: 600 },
    { day: 'Wed', visitors: 1500, newVisitors: 500 },
    { day: 'Thu', visitors: 2100, newVisitors: 700 },
    { day: 'Fri', visitors: 2500, newVisitors: 900 },
    { day: 'Sat', visitors: 3000, newVisitors: 1200 },
    { day: 'Sun', visitors: 2200, newVisitors: 800 },
  ];

  // إحصائيات سريعة
  const quickStats = [
    { 
      title: 'Total Revenue', 
      value: '$45,678', 
      change: '+12.5%', 
      isPositive: true,
      icon: DollarSign,
      color: 'blue'
    },
    { 
      title: 'Total Orders', 
      value: '1,234', 
      change: '+8.2%', 
      isPositive: true,
      icon: ShoppingBag,
      color: 'green'
    },
    { 
      title: 'Total Visitors', 
      value: '12,450', 
      change: '+15.3%', 
      isPositive: true,
      icon: Users,
      color: 'purple'
    },
    { 
      title: 'Conversion Rate', 
      value: '3.2%', 
      change: '-2.1%', 
      isPositive: false,
      icon: TrendingUp,
      color: 'orange'
    },
  ];

  // بيانات Top Selling Products مع الصور
  const topSellingProducts = [
    { 
      id: 1,
      name: 'Hoodie Pink', 
      category: 'Women Item', 
      sales: 2334, 
      revenue: 23400, 
      trend: '+12%',
      isTop: true,
      image: '/src/assets/pinkHoodie.png'
    },
    { 
      id: 2,
      name: 'Hoodie Black', 
      category: 'Men Item', 
      sales: 189, 
      revenue: 18900, 
      trend: '+8%',
      isTop: false,
      image: '/src/assets/hoodie2.png'
    },
    { 
      id: 3,
      name: 'Leather Jacket', 
      category: 'Women Item', 
      sales: 156, 
      revenue: 15600, 
      trend: '-3%',
      isTop: false,
      image: '/src/assets/jacket.png'
    },
    { 
      id: 4,
      name: 'Sweatshirt White', 
      category: 'Men Item', 
      sales: 142, 
      revenue: 14200, 
      trend: '+15%',
      isTop: false,
      image: '/src/assets/hoodie3.png'
    },
  ];

  const getStatColor = (color) => {
    const colors = {
      blue: { bg: 'var(--light-blue)', text: 'var(--blue)' },
      green: { bg: '#d1fae5', text: '#065f46' },
      purple: { bg: '#ede9fe', text: '#5b21b6' },
      orange: { bg: 'var(--light-orange)', text: 'var(--orange)' }
    };
    return colors[color] || colors.blue;
  };

  // دالة للتعامل مع أخطاء الصور
  const handleImageError = (e) => {
    e.target.src = '/src/assets';
    e.target.alt = 'Product image not available';
  };

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
          >
            Week
          </button>
          <button 
            className={timeRange === 'month' ? 'active' : ''}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
          <button 
            className={timeRange === 'year' ? 'active' : ''}
            onClick={() => setTimeRange('year')}
          >
            Year
          </button>
        </div>
      </div>

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

      {/* Top Products Table مع الصور والأيقونات - تم نقله هنا */}
      <div className="top-products-card">
        <div className="chart-header">
          <h2>Top Selling Products</h2>
          <p className="chart-subtitle">Best performing products this month</p>
        </div>
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
            {topSellingProducts.map((product, index) => (
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
                  <span className={`category-badge ${product.category.includes('Women') ? 'women' : 'men'}`}>
                    {product.category}
                  </span>
                </td>
                <td>{product.sales}</td>
                <td className="revenue">{product.revenue.toLocaleString()} LE</td>
                <td className={`trend ${product.trend.includes('+') ? 'positive' : 'negative'}`}>
                  {product.trend.includes('+') ? <TrendingUp size={34} /> : <TrendingDown size={34} />}
                  {product.trend}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts Grid - تم نقله إلى الأسفل */}
      <div className="charts-grid">
        {/* Revenue Chart */}
        <div className="chart-card large">
          <div className="chart-header">
            <h2>Revenue Overview</h2>
            <p className="chart-subtitle">Monthly revenue and sales performance</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} name="Sales ($)" />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue ($)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution - فقط Men و Women */}
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
            <p className="chart-subtitle">Daily visitors and new visitors</p>
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
            <h2>Monthly Orders</h2>
            <p className="chart-subtitle">Order trends over time</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
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
    </div>
  );
};

export default Analytics;