import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard,
  ShoppingCart,
  Calendar,
  Download,
  Users,
  Package,
  Truck
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
  ResponsiveContainer 
} from 'recharts';
import './Finance.css';

const Finance = () => {
  const [selectedDate, setSelectedDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  });

  const [salesData, setSalesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [employeesData, setEmployeesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const WEEKS_TEMPLATE = [
  { week: 'Week 1', revenue: 0, expenses: 0, profit: 0, orders: 0, shipping: 0 },
  { week: 'Week 2', revenue: 0, expenses: 0, profit: 0, orders: 0, shipping: 0 },
  { week: 'Week 3', revenue: 0, expenses: 0, profit: 0, orders: 0, shipping: 0 },
  { week: 'Week 4', revenue: 0, expenses: 0, profit: 0, orders: 0, shipping: 0 }
];

  // Fetch data from API
  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken') || 
                     localStorage.getItem('access') || 
                     localStorage.getItem('access_token');

        const response = await axios.get('http://127.0.0.1:8000/api/orders/analytics/', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          params: {
            year: selectedDate.year,
            month: selectedDate.month,
            day: selectedDate.day,
            range: 'month'
          }
        });

        if (response.data.success) {
          // Transform sales data to match expected format
          const transformedSalesData = (response.data.weekly_sales || response.data.sales_data || []).map(week => ({
            week: week.period || week.week,
            revenue: week.revenue || week.sales || 0,
            expenses: week.expenses || (week.revenue * 0.6) || (week.sales * 0.6) || 0,
            profit: week.profit || ((week.revenue || week.sales || 0) - (week.expenses || 0)),
            orders: week.orders || 0,
            shipping: week.shipping || 0
          }));

          setSalesData(transformedSalesData);
          setProductsData(response.data.products_distribution || response.data.category_data || []);
          setExpensesData(response.data.expenses_breakdown || []);
          setEmployeesData(response.data.employees || []);
        }
      } catch (error) {
        console.error('Error fetching finance data:', error);
        // Use default data if API fails
        setSalesData(generateSalesData());
        setProductsData(generateProductsData());
        setExpensesData(generateExpensesData());
        setEmployeesData(generateEmployeesData());
      } finally {
        setLoading(false);
      }
    };

    fetchFinanceData();
  }, [selectedDate.year, selectedDate.month, selectedDate.day]);

  // Fallback data generators (keep for when API fails)
  const generateSalesData = () => {
    const baseRevenue = 40000 + (selectedDate.month * 2000) + (selectedDate.day * 100);
    const baseExpenses = 25000 + (selectedDate.month * 1000) + (selectedDate.day * 50);
    const shippingCost = 1500 + (selectedDate.day * 20);
    
    return [
      { 
        week: 'Week 1', 
        revenue: baseRevenue * 0.9, 
        expenses: baseExpenses * 0.85,
        profit: (baseRevenue * 0.9) - (baseExpenses * 0.85),
        orders: 40 + selectedDate.day,
        shipping: shippingCost * 0.9
      },
      { 
        week: 'Week 2', 
        revenue: baseRevenue * 1.1, 
        expenses: baseExpenses * 0.95,
        profit: (baseRevenue * 1.1) - (baseExpenses * 0.95),
        orders: 45 + selectedDate.day,
        shipping: shippingCost * 1.0
      },
      { 
        week: 'Week 3', 
        revenue: baseRevenue * 1.2, 
        expenses: baseExpenses * 1.05,
        profit: (baseRevenue * 1.2) - (baseExpenses * 1.05),
        orders: 50 + selectedDate.day,
        shipping: shippingCost * 1.1
      },
      { 
        week: 'Week 4', 
        revenue: baseRevenue * 1.3, 
        expenses: baseExpenses * 1.15,
        profit: (baseRevenue * 1.3) - (baseExpenses * 1.15),
        orders: 55 + selectedDate.day,
        shipping: shippingCost * 1.2
      },
    ];
  };

  const generateProductsData = () => {
    const total = 100;
    const womenPercentage = 60 + (selectedDate.month % 3) * 5;
    const menPercentage = total - womenPercentage;
    
    return [
      { name: 'Women Items', value: womenPercentage, color: '#ec4899' },
      { name: 'Men Items', value: menPercentage, color: '#3b82f6' },
    ];
  };

  const generateExpensesData = () => {
    const baseAmount = 30000 + (selectedDate.month * 1000) + (selectedDate.day * 10);
    const shipping = 4500 + (selectedDate.day * 15);
    
    return [
      { 
        category: 'Employee Salaries', 
        amount: Math.round(baseAmount * 0.42),
        percentage: 42,
        color: '#3b82f6'
      },
      { 
        category: 'Marketing & Ads', 
        amount: Math.round(baseAmount * 0.22),
        percentage: 22,
        color: '#10b981'
      },
      { 
        category: 'Store Operations', 
        amount: Math.round(baseAmount * 0.16),
        percentage: 16,
        color: '#f59e0b'
      },
      { 
        category: 'Shipping & Delivery', 
        amount: shipping,
        percentage: Math.round((shipping / baseAmount) * 100),
        color: '#8b5cf6'
      },
      { 
        category: 'Other Expenses', 
        amount: Math.round(baseAmount * 0.08),
        percentage: 8,
        color: '#ef4444'
      },
    ];
  };

  const generateEmployeesData = () => {
    const baseOrders = 30 + selectedDate.day;
    return [
      { 
        name: 'Zeina', 
        orders: baseOrders + 15,
        completed: Math.round((baseOrders + 15) * 0.95),
        pending: Math.round((baseOrders + 15) * 0.05),
        efficiency: 95 - (selectedDate.day % 5)
      },
      { 
        name: 'Ramy', 
        orders: baseOrders + 8,
        completed: Math.round((baseOrders + 8) * 0.92),
        pending: Math.round((baseOrders + 8) * 0.08),
        efficiency: 92 - (selectedDate.day % 3)
      },
    ];
  };

  // Use API data if available, otherwise use generated data
  const finalSalesData = salesData.length > 0 ? salesData : generateSalesData();
  const finalProductsData = productsData.length > 0 ? productsData : generateProductsData();
  const finalExpensesData = expensesData.length > 0 ? expensesData : generateExpensesData();
  const finalEmployeesData = employeesData.length > 0 ? employeesData : generateEmployeesData();

  const totalRevenue = finalSalesData.reduce((sum, week) => sum + week.revenue, 0);
  const totalExpenses = finalSalesData.reduce((sum, week) => sum + week.expenses, 0);
  const totalProfit = finalSalesData.reduce((sum, week) => sum + week.profit, 0);
  const totalOrders = finalSalesData.reduce((sum, week) => sum + week.orders, 0);
  const totalShipping = finalSalesData.reduce((sum, week) => sum + week.shipping, 0);

  // Main statistics
  const mainStats = [
    {
      title: 'Total Revenue',
      value: Math.round(totalRevenue).toLocaleString(),
      change: '+18.5%',
      isPositive: true,
      icon: DollarSign,
      color: 'revenue'
    },
    {
      title: 'Total Orders',
      value: totalOrders.toLocaleString(),
      change: '+12.3%',
      isPositive: true,
      icon: ShoppingCart,
      color: 'orders'
    },
    {
      title: 'Total Expenses',
      value: Math.round(totalExpenses).toLocaleString(),
      change: '+8.2%',
      isPositive: false,
      icon: CreditCard,
      color: 'expenses'
    },
    {
      title: 'Net Profit',
      value: Math.round(totalProfit).toLocaleString(),
      change: '+25.7%',
      isPositive: true,
      icon: TrendingUp,
      color: 'profit'
    },
  ];

  const formatCurrency = (value) => {
    return `LE ${Math.round(value).toLocaleString()}`;
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  if (loading) {
    return (
      <div className="finance-page">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
          <div>Loading financial data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="finance-page">
      {/* Header */}
      <div className="finance-header">
        <div className="header-content">
          <h1>Financial Reports</h1>
          <p>Complete overview of your store's performance</p>
        </div>
        <div className="header-controls">
          <div className="date-selector">
            <Calendar size={20} />
            <select 
              value={selectedDate.year}
              onChange={(e) => setSelectedDate(prev => ({ ...prev, year: parseInt(e.target.value) }))}
            >
              <option value={2023}>2023</option>
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
            </select>
            <select 
              value={selectedDate.month}
              onChange={(e) => setSelectedDate(prev => ({ ...prev, month: parseInt(e.target.value) }))}
            >
              <option value={1}>January</option>
              <option value={2}>February</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
            </select>
            <select 
              value={selectedDate.day}
              onChange={(e) => setSelectedDate(prev => ({ ...prev, day: parseInt(e.target.value) }))}
            >
              {Array.from({ length: getDaysInMonth(selectedDate.month, selectedDate.year) }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <button className="export-btn">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        {mainStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className={`stat-icon ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div className="stat-content">
                <h3>{stat.color === 'orders' ? stat.value : formatCurrency(parseFloat(stat.value.replace(/,/g, '')))}</h3>
                <p>{stat.title}</p>
                <span className={`stat-change ${stat.isPositive ? 'positive' : 'negative'}`}>
                  {stat.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts */}
      <div className="main-charts">
        {/* Revenue vs Expenses */}
        <div className="chart-card">
          <div className="chart-header">
            <h2>Revenue vs Expenses</h2>
            <p>Weekly performance for {selectedDate.month}/{selectedDate.year}</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={finalSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
              <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sales Distribution */}
        <div className="chart-card">
          <div className="chart-header">
            <h2>Sales Distribution</h2>
            <p>Category share of total sales</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={finalProductsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {finalProductsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="chart-legend">
            {finalProductsData.map((product, index) => (
              <div key={index} className="legend-item">
                <div className="legend-color" style={{ backgroundColor: product.color }}></div>
                <span>{product.name}</span>
                <strong>{product.value}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        {/* Employee Performance */}
        <div className="detail-card">
          <div className="card-header">
            <h2>Employee Performance</h2>
            <p>Order management efficiency</p>
          </div>
          <div className="employees-list">
            {finalEmployeesData.map((employee, index) => (
              <div key={index} className="employee-item">
                <div className="employee-info">
                  <div className="employee-avatar">
                    {employee.name.charAt(0)}
                  </div>
                  <div className="employee-details">
                    <h4>{employee.name}</h4>
                    <div className="employee-stats">
                      <div className="stat">
                        <span className="label">Total Orders:</span>
                        <span className="value">{employee.orders}</span>
                      </div>
                      <div className="stat">
                        <span className="label">Completed:</span>
                        <span className="value completed">{employee.completed}</span>
                      </div>
                      <div className="stat">
                        <span className="label">Pending:</span>
                        <span className="value pending">{employee.pending}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="employee-efficiency">
                  <div className="efficiency-circle">
                    <span>{employee.efficiency}%</span>
                  </div>
                  <p>Efficiency</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expenses Breakdown */}
        <div className="detail-card">
          <div className="card-header">
            <div>
              <h2>Expenses Breakdown</h2>
              <p>Monthly expenses distribution</p>
            </div>
            <div className="expenses-date">
              <Calendar size={16} />
              <span>{selectedDate.day}/{selectedDate.month}/{selectedDate.year}</span>
            </div>
          </div>
          <div className="expenses-list">
            {finalExpensesData.map((expense, index) => (
              <div key={index} className="expense-item">
                <div className="expense-info">
                  <div className="expense-color" style={{ backgroundColor: expense.color }}></div>
                  <span className="expense-category">{expense.category}</span>
                  <span className="expense-amount">{formatCurrency(expense.amount)}</span>
                </div>
                <div className="expense-bar">
                  <div 
                    className="expense-bar-fill"
                    style={{ width: `${expense.percentage}%`, backgroundColor: expense.color }}
                  ></div>
                </div>
                <span className="expense-percentage">{expense.percentage}%</span>
              </div>
            ))}
          </div>
          <div className="shipping-summary">
            <div className="shipping-icon">
              <Truck size={20} />
            </div>
            <div className="shipping-info">
              <span className="shipping-label">Total Shipping Cost</span>
              <span className="shipping-amount">{formatCurrency(totalShipping)}</span>
            </div>
          </div>
        </div>

        {/* Profit Trend */}
        <div className="detail-card">
          <div className="card-header">
            <h2>Profit Trend</h2>
            <p>Weekly profit analysis</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={finalSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="profit-summary">
            <div className="summary-item">
              <span>Avg Weekly Profit</span>
              <strong>{formatCurrency(totalProfit / finalSalesData.length)}</strong>
            </div>
            <div className="summary-item">
              <span>Total Monthly Profit</span>
              <strong>{formatCurrency(totalProfit)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Finance;