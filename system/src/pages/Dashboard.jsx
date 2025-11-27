import React, { useState } from 'react';
import { Calendar, Users, DollarSign, ChevronRight, Search, Filter } from 'lucide-react';

const Dashboard = ({ onViewOrder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const orders = [
    { id: 'CUST001', user: 'Yassmin Ahmed', date: '01-10-2025', status: 'completed', category: 'Women Item', amount: '$99.99' },
    { id: 'CUST002', user: 'Zeina Mohamed', date: '02-10-2021', status: 'pending', category: 'Men Item', amount: '$149.99' },
    { id: 'CUST003', user: 'Ramy', date: '03-10-2025', status: 'process', category: 'Women Item', amount: '$299.99' },
    { id: 'CUST004', user: 'Youssef', date: '04-10-2025', status: 'completed', category: 'Men Item', amount: '$199.99' },
    { id: 'CUST005', user: 'Sara', date: '05-10-2025', status: 'pending', category: 'Women Item', amount: '$159.99' }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || order.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
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
              <a className="active" href="#">Home</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Stats Cards */}
      <ul className="box-info">
        <li>
          <div className="bx">
            <Calendar size={36} />
          </div>
          <span className="text">
            <h3>233</h3>
            <p>New Order</p>
          </span>
        </li>
        <li>
          <div className="bx">
            <Users size={36} />
          </div>
          <span className="text">
            <h3>590</h3>
            <p>Visitors</p>
          </span>
        </li>
        <li>
          <div className="bx">
            <DollarSign size={36} />
          </div>
          <span className="text">
            <h3>5550 LE</h3>
            <p>Total Sales</p>
          </span>
        </li>
      </ul>

      {/* Recent Orders Table */}
      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Recent Orders</h3>
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
              </select>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>User</th>
                <th>Date Order</th>
                <th>Category</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Customer Order</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr key={index}>
                  <td className="customer-id">
                    <span className="id-badge">{order.id}</span>
                  </td>
                  <td>
                    <img 
                      src="/src/assets/Admin.png" 
                      alt="User" 
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/36x36?text=U';
                      }}
                    />
                    <p>{order.user}</p>
                  </td>
                  <td>{order.date}</td>
                  <td>
                    <span className={`category-badge ${order.category === 'Women Item' ? 'women' : 'men'}`}>
                      {order.category}
                    </span>
                  </td>
                  <td>
                    <span className={`status ${order.status}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      className="blue-bottom-btn"
                      onClick={() => onViewOrder(order)}
                    >
                      View Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
