import { useState } from 'react';
import { Search, Download, Eye, Printer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AdminAllOrders.css';

const AdminAllOrders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  // بيانات الطلبات مع كل التفاصيل
  const orders = [
    { 
      id: 'CUST001', 
      customer: 'Yassmin Ahmed', 
      date: '01-10-2025', 
      status: 'completed', 
      amount: '$99.99', 
      category: 'Women Item', 
      items: 2,
      user: 'Yassmin Ahmed',
      products: [
        { name: 'Women Dress', quantity: 1, price: 89.99, color: 'Red', size: 'M', sku: 'WD001', category: 'Women Item' },
        { name: 'Handbag', quantity: 1, price: 45.50, color: 'Black', size: 'One Size', sku: 'HB001', category: 'Accessories' }
      ],
      shipping: { address: 'ElSheikh Zaid, Giza, Egypt' },
      customerDetails: { 
        name: 'Yassmin Ahmed',
        email: 'yassmin@example.com',
        phone: '+20 101 342 7001',
        address: 'El maadiy, Cairo, Egypt'
      }
    },
    { 
      id: 'CUST002', 
      customer: 'Zeina Mohamed', 
      date: '02-10-2025', 
      status: 'pending', 
      amount: '$149.99', 
      category: 'Men Item', 
      items: 1,
      user: 'Zeina Mohamed',
      products: [
        { name: 'Men Shirt', quantity: 2, price: 29.99, color: 'Blue', size: 'L', sku: 'MS001', category: 'Men Item' },
        { name: 'Jeans', quantity: 1, price: 59.99, color: 'Navy', size: '32', sku: 'JN001', category: 'Men Item' }
      ],
      shipping: { address: 'Nasr City, Cairo, Egypt' },
      customerDetails: { 
        name: 'Zeina Mohamed',
        email: 'zeina@example.com',
        phone: '+20 102 555 8888',
        address: 'Nasr City, Cairo, Egypt'
      }
    },
    { 
      id: 'CUST003', 
      customer: 'Ramy Kamal', 
      date: '03-10-2025', 
      status: 'process', 
      amount: '$299.99', 
      category: 'Women Item', 
      items: 3,
      user: 'Ramy Hassan',
      products: [
        { name: 'Blouse', quantity: 1, price: 39.99, color: 'White', size: 'S', sku: 'BL001', category: 'Women Item' },
        { name: 'Skirt', quantity: 1, price: 34.99, color: 'Black', size: 'M', sku: 'SK001', category: 'Women Item' },
        { name: 'Accessories', quantity: 3, price: 75.00, color: 'Various', size: 'One Size', sku: 'AC001', category: 'Accessories' }
      ],
      shipping: { address: 'Heliopolis, Cairo, Egypt' },
      customerDetails: { 
        name: 'Ramy Hassan',
        email: 'ramy@example.com',
        phone: '+20 100 111 2222',
        address: 'Heliopolis, Cairo, Egypt'
      }
    },
    { 
      id: 'CUST004', 
      customer: 'Youssef Khaled', 
      date: '04-10-2025', 
      status: 'completed', 
      amount: '$199.99', 
      category: 'Men Item', 
      items: 2,
      user: 'Youssef Ali',
      products: [
        { name: 'Men Jacket', quantity: 1, price: 129.99, color: 'Black', size: 'XL', sku: 'MJ001', category: 'Men Item' },
        { name: 'T-Shirt', quantity: 2, price: 19.99, color: 'White', size: 'L', sku: 'TS001', category: 'Men Item' }
      ],
      shipping: { address: '6th October, Giza, Egypt' },
      customerDetails: { 
        name: 'Youssef Ali',
        email: 'youssef@example.com',
        phone: '+20 122 333 4444',
        address: '6th October, Giza, Egypt'
      }
    },
    { 
      id: 'CUST005', 
      customer: 'Sara Mostafa', 
      date: '05-10-2025', 
      status: 'pending', 
      amount: '$159.99', 
      category: 'Women Item', 
      items: 1,
      user: 'Sara Ibrahim',
      products: [
        { name: 'Shoes', quantity: 1, price: 79.99, color: 'Beige', size: '38', sku: 'SH001', category: 'Women Item' },
        { name: 'Accessories', quantity: 2, price: 25.00, color: 'Gold', size: 'One Size', sku: 'AC002', category: 'Accessories' }
      ],
      shipping: { address: 'Zamalek, Cairo, Egypt' },
      customerDetails: { 
        name: 'Sara Ibrahim',
        email: 'sara@example.com',
        phone: '+20 106 777 8888',
        address: 'Zamalek, Cairo, Egypt'
      }
    },
    { 
      id: 'CUST006', 
      customer: 'Laila Mohamed', 
      date: '06-10-2025', 
      status: 'completed', 
      amount: '$249.99', 
      category: 'Men Item', 
      items: 4,
      user: 'Laila Mohamed',
      products: [
        { name: 'Suit', quantity: 1, price: 199.99, color: 'Navy', size: 'L', sku: 'ST001', category: 'Men Item' },
        { name: 'Tie', quantity: 2, price: 15.00, color: 'Red', size: 'One Size', sku: 'TI001', category: 'Accessories' }
      ],
      shipping: { address: 'Maadi, Cairo, Egypt' },
      customerDetails: { 
        name: 'Laila Mohamed',
        email: 'ahmed@example.com',
        phone: '+20 111 999 0000',
        address: 'Maadi, Cairo, Egypt'
      }
    },
    { 
      id: 'CUST007', 
      customer: 'Mariam Mohamed', 
      date: '07-10-2025', 
      status: 'canceled', 
      amount: '$89.99', 
      category: 'Women Item', 
      items: 1,
      user: 'Mona Salem',
      products: [
        { name: 'Scarf', quantity: 1, price: 29.99, color: 'Blue', size: 'One Size', sku: 'SC001', category: 'Accessories' },
        { name: 'Belt', quantity: 1, price: 19.99, color: 'Brown', size: 'M', sku: 'BT001', category: 'Accessories' }
      ],
      shipping: { address: 'New Cairo, Cairo, Egypt' },
      customerDetails: { 
        name: 'Mariam Mohamed',
        email: 'mona@example.com',
        phone: '+20 127 444 5555',
        address: 'New Cairo, Cairo, Egypt'
      }
    },
    { 
      id: 'CUST008', 
      customer: 'Omar Alansary', 
      date: '08-10-2025', 
      status: 'process', 
      amount: '$179.99', 
      category: 'Men Item', 
      items: 2,
      user: 'Omar Alansary',
      products: [
        { name: 'Hoodie', quantity: 1, price: 89.99, color: 'Gray', size: 'L', sku: 'HD001', category: 'Men Item' },
        { name: 'Pants', quantity: 1, price: 59.99, color: 'Black', size: '34', sku: 'PN001', category: 'Men Item' }
      ],
      shipping: { address: 'Dokki, Giza, Egypt' },
      customerDetails: { 
        name: 'Omar Alansary',
        email: 'omar@example.com',
        phone: '+20 109 666 7777',
        address: 'Dokki, Giza, Egypt'
      }
    },
  ];

  // إحصائيات سريعة
  const stats = [
    { label: 'Total Orders', value: orders.length, color: 'blue' },
    { label: 'Completed', value: orders.filter(o => o.status === 'completed').length, color: 'green' },
    { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, color: 'orange' },
    { label: 'Processing', value: orders.filter(o => o.status === 'process').length, color: 'yellow' },
  ];

  // فلترة الطلبات
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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
    // نقل البيانات كاملة للصفحة التانية
    navigate(`/order/${order.id}`, {
      state: { 
        order: order,
        // إضافة البيانات بشكل واضح
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

      {/* إحصائيات سريعة */}
      <div className="orders-stats">
        {stats.map((stat, index) => (
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
          Showing {filteredOrders.length} of {orders.length} orders
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-table-card">
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
              {filteredOrders.map((order, index) => (
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
          <button className="pagination-btn" disabled>Previous</button>
          <div className="pagination-pages">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
          </div>
          <button className="pagination-btn">Next</button>
        </div>
      </div>
    </div>
  );
};

export default AdminAllOrders;