import React, { useState } from 'react';
import { Calendar, Users, DollarSign, ChevronRight, Search, Eye, ExternalLink } from 'lucide-react';
import OrderDetails from './OrderDetails';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // بيانات كاملة للطلبات
  const orders = [
    { 
      id: 'CUST001', 
      user: 'Yassmin Ahmed', 
      date: '01-10-2025', 
      status: 'completed', 
      category: 'Women Item', 
      amount: '334',
      customer: {
        name: 'Yassmin Ahmed',
        email: 'yassmin@gmail.com',
        phone: '01013427001',
        address: 'Sheikh Zayed, Giza, Egypt'
      },
      payment: {
        method: 'Cash',
        type: 'Cash',
      },
      shipping: {
        method: 'Standard',
        address: 'Timo City, Cairo, Egypt'
      },
      products: [
        { name: 'Hoodie Black', quantity: 1, price: 889 },
        { name: 'Sweatshirt White', quantity: 1, price: 889 }
      ],
      acceptedBy: {
        name: 'Admin User',
        role: 'Administrator',
        date: '01-10-2025 09:15 AM'
      }
    },
    { 
      id: 'CUST002', 
      user: 'Zeina Mohamed', 
      date: '02-10-2021', 
      status: 'pending', 
      category: 'Men Item', 
      amount: '$149.99',
      customer: {
        name: 'Zeina Mohamed',
        email: 'zeina@gmail.com',
        phone: '+1234567891',
        address: 'Elmaady, Cairo, Egypt'
      },
      payment: {
        method: 'Cash',
        type: 'Cash',
      },
      shipping: {
        method: 'Express',
        address: '456 Oak Avenue, City, Country'
      },
      products: [
        { name: 'Men Shirt', quantity: 2, price: 529.99 },
        { name: 'Hoodie', quantity: 1, price: 559.99 }
      ],
      acceptedBy: {
        name: 'Store Manager',
        role: 'Manager',
        date: '02-10-2021 14:30 PM'
      }
    },
    { 
      id: 'CUST003', 
      user: 'Ramy', 
      date: '03-10-2025', 
      status: 'process', 
      category: 'Women Item', 
      amount: '$299.99',
      customer: {
        name: 'Ramy',
        email: 'ramy@example.com',
        phone: '+1234567892',
        address: '789 Pine Road, City, Country'
      },
      payment: {
        method: 'Cash',
      },
      shipping: {
        method: 'Standard',
        address: '789 Pine Road, City, Country'
      },
      products: [
        { name: 'Leather Jacket', quantity: 1, price: 39.99 },
        { name: 'Hoodie Pink', quantity: 1, price: 34.99 },
        { name: 'Sweatshirt White', quantity: 3, price: 75.00 }
      ],
      acceptedBy: {
        name: 'Admin User',
        role: 'Administrator',
        date: '03-10-2025 11:20 AM'
      }
    },
    { 
      id: 'CUST004', 
      user: 'Youssef', 
      date: '04-10-2025', 
      status: 'completed', 
      category: 'Men Item', 
      amount: '$199.99',
      customer: {
        name: 'Youssef',
        email: 'youssef@example.com',
        phone: '+1234567893',
        address: '321 Elm Street, City, Country'
      },
      payment: {
        method: 'Cash',
        type: 'Cash',
        number: 'N/A'
      },
      shipping: {
        method: 'Standard',
        address: '321 Elm Street, City, Country'
      },
      products: [
        { name: 'Men Jacket', quantity: 1, price: 129.99 },
        { name: 'T-Shirt', quantity: 2, price: 19.99 }
      ],
      acceptedBy: {
        name: 'Sales Associate',
        role: 'Sales',
        date: '04-10-2025 16:45 PM'
      }
    },
    { 
      id: 'CUST005', 
      user: 'Sara', 
      date: '05-10-2025', 
      status: 'pending', 
      category: 'Women Item', 
      amount: '1159.99',
      customer: {
        name: 'Sara',
        email: 'sara@example.com',
        phone: '+1234567894',
        address: '654 Maple Avenue, City, Country'
      },
      payment: {
        method: 'Credit Card',
        type: 'Visa',
        number: '*******9012'
      },
      shipping: {
        method: 'Express',
        address: '654 Maple Avenue, City, Country'
      },
      products: [
        { name: 'Shoes', quantity: 1, price: 79.99 },
        { name: 'Accessories', quantity: 2, price: 25.00 }
      ],
      acceptedBy: null // لسة محدش قبل الطلب
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || order.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

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
      </div>

      {/* Stats Cards - تظهر لما Order Details مش ظاهر */}
      {!showOrderDetails && (
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
      )}

      {/* Main Content Area */}
      <div className="dashboard-content-area">
        {/* Recent Orders Table - يظهر لما Order Details مش ظاهر */}
        {!showOrderDetails && (
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
              <table className="recent-orders-table">
                <thead>
                  <tr>
                    <th>Customer ID</th>
                    <th>User</th>
                    <th>Date Order</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr key={index} className="order-row">
                      <td className="customer-id">
                        <span className="id-badge">{order.id}</span>
                      </td>
                      <td className="user-name">
                        {order.user}
                      </td>
                      <td className="order-date">{order.date}</td>
                      <td className="order-category">
                        <span className={`category-badge ${order.category === 'Women Item' ? 'women' : 'men'}`}>
                          {order.category}
                        </span>
                      </td>
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
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Order Details Section - تظهر لما Order Details ظاهر */}
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