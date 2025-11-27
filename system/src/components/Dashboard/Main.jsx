import React, { useState, useEffect } from 'react';
import { Calendar, Users, DollarSign, ChevronRight, Search, Filter, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Main = ({ darkMode }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const orders = [
    { id: 'CUST001', user: 'Yassmin Ahmed', date: '01-10-2025', status: 'completed', category: 'Women Item' },
    { id: 'CUST002', user: 'Zeina Mohamed', date: '02-10-2021', status: 'pending', category: 'Women Item' },
    { id: 'CUST003', user: 'Ramy', date: '03-10-2025', status: 'process', category: 'Men Item' },
    { id: 'CUST004', user: 'Youssef', date: '04-10-2025', status: 'completed', category: 'Men Item' },
    { id: 'CUST005', user: 'Sara', date: '05-10-2025', status: 'pending', category: 'Women Item' }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === 'all' || 
      order.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleViewOrder = (order) => {
    navigate(`/order/${order.id}`, {
      state: {
        order: {
          orderId: `ORD${order.id.slice(-3)}`,
          date: order.date,
          customer: {
            name: order.user,
            email: `${order.user.toLowerCase().replace(' ', '.')}@example.com`,
            phone: '+20 123 456 7890',
            address: '123 Main Street, Cairo, Egypt'
          },
          statusDetails: {
            payment: order.status === 'completed' ? 'Paid' : 'Payment pending',
            fulfillment: order.status === 'completed' ? 'Fulfilled' : 'Unfulfilled',
            shipping: order.status === 'completed' ? 'Delivered' : 'In Transit'
          },
          items: [
            {
              name: order.category === 'Women Item' ? 'Women\'s Premium Dress' : 'Men\'s Casual Shirt',
              image: 'https://via.placeholder.com/100',
              category: order.category,
              size: 'M',
              color: 'Blue',
              sku: `SKU-${order.id.slice(-3)}`,
              price: '€45.00',
              quantity: 2,
              total: '€90.00'
            }
          ],
          totals: {
            subtotal: '€90.00',
            shipping: '€10.00',
            tax: '€15.00',
            total: '€115.00'
          },
          timeline: [
            { status: 'Order Placed', date: order.date, completed: true },
            { status: 'Processing', date: order.date, completed: order.status !== 'pending' },
            { status: 'Shipped', date: order.date, completed: order.status === 'completed' },
            { status: 'Delivered', date: order.date, completed: order.status === 'completed' }
          ],
          shipping: {
            method: 'Standard Shipping',
            estimated: 'Nov 25, 2025',
            tracking: order.status === 'completed' ? 'TRK123456789' : 'Not available yet'
          }
        }
      }
    });
  };

  return (
    <main>
      {/* Header Section */}
      <div className="head-title">
        <div className="left">
          <h1>Dashboard</h1>
          <ul className="breadcrumb">
            <li>
              <a href="#">MY Dashboard</a>
            </li>
            <li><ChevronRight size={16} /></li>
            <li>
              <a className="active" href="#">Home</a>
            </li>
          </ul>
        </div>
        <div className="date-time-display">
          <div className="date-info">
            <Calendar size={20} />
            <span>{formatDate(currentDateTime)}</span>
          </div>
          <div className="time-info">
            <Clock size={20} />
            <span>{formatTime(currentDateTime)}</span>
          </div>
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
            <DollarSign size={38} />
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
                className="filter-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
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
                <th>Order ID</th>
                <th>User</th>
                <th>Date Order</th>
                <th>Category</th>
                <th>Status</th>
                <th className="text-center">Customer Order</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
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
                    <td className="text-center">
                      <button 
                        className="view-order-btn"
                        onClick={() => handleViewOrder(order)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-results">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Main;