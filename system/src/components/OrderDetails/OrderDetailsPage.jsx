import React from 'react';
import { ArrowLeft, User, Calendar, CreditCard, Package, MapPin, Phone, Mail, ShoppingBag } from 'lucide-react';

const OrderDetails = ({ order, onBack }) => {
  if (!order) {
    return <div>No order selected</div>;
  }

  // بيانات المنتج
  const productDetails = {
    name: order.category === 'Women Item' ? 'Elegant Summer Dress' : 'Classic Men\'s Shirt',
    image: order.category === 'Women Item' 
      ? 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop'
      : 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop',
    description: order.category === 'Women Item' 
      ? 'Beautiful elegant summer dress perfect for any occasion. Made from high-quality cotton fabric.'
      : 'Classic men\'s formal shirt with premium quality fabric. Perfect for business and casual wear.',
    size: order.category === 'Women Item' ? 'M' : 'L',
    color: order.category === 'Women Item' ? 'Blue' : 'White',
    quantity: 1,
    price: order.amount
  };

  // معلومات العميل
  const customerInfo = {
    email: `${order.user.toLowerCase().replace(' ', '.')}@example.com`,
    phone: '+20 123 456 7890',
    address: '123 Main Street, Cairo, Egypt',
    city: 'Cairo',
    zipCode: '11511'
  };

  return (
    <div className="order-details-container">
      <div className="head-title">
        <div className="left">
          <button className="back-btn" onClick={onBack}>
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <h1>Order Details</h1>
        </div>
      </div>

      <div className="order-details-content">
        {/* معلومات الطلب الأساسية */}
        <div className="order-info-card">
          <h2>Order Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon">
                <Package size={24} />
              </div>
              <div>
                <p className="info-label">Order ID</p>
                <p className="info-value">{order.id}</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <User size={24} />
              </div>
              <div>
                <p className="info-label">Customer</p>
                <p className="info-value">{order.user}</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <Calendar size={24} />
              </div>
              <div>
                <p className="info-label">Order Date</p>
                <p className="info-value">{order.date}</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <CreditCard size={24} />
              </div>
              <div>
                <p className="info-label">Amount</p>
                <p className="info-value">{order.amount}</p>
              </div>
            </div>
          </div>

          <div className="status-row">
            <div className="status-section">
              <p className="info-label">Order Status</p>
              <span className={`status ${order.status}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            <div className="category-section">
              <p className="info-label">Category</p>
              <span className={`category-badge ${order.category === 'Women Item' ? 'women' : 'men'}`}>
                {order.category}
              </span>
            </div>
          </div>
        </div>

        {/* تفاصيل المنتج */}
        <div className="product-details-card">
          <h2>Product Details</h2>
          <div className="product-content">
            <div className="product-image-container">
              <img 
                src={productDetails.image} 
                alt={productDetails.name}
                className="product-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400?text=Product';
                }}
              />
            </div>
            
            <div className="product-info">
              <h3 className="product-name">{productDetails.name}</h3>
              <p className="product-description">{productDetails.description}</p>
              
              <div className="product-specs">
                <div className="spec-item">
                  <span className="spec-label">Size:</span>
                  <span className="spec-value">{productDetails.size}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Color:</span>
                  <span className="spec-value">{productDetails.color}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Quantity:</span>
                  <span className="spec-value">{productDetails.quantity}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Price:</span>
                  <span className="spec-value price">{productDetails.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* معلومات العميل */}
        <div className="customer-details-card">
          <h2>Customer Information</h2>
          <div className="customer-grid">
            <div className="customer-item">
              <div className="customer-icon">
                <Mail size={20} />
              </div>
              <div>
                <p className="info-label">Email</p>
                <p className="info-value">{customerInfo.email}</p>
              </div>
            </div>
            
            <div className="customer-item">
              <div className="customer-icon">
                <Phone size={20} />
              </div>
              <div>
                <p className="info-label">Phone</p>
                <p className="info-value">{customerInfo.phone}</p>
              </div>
            </div>
            
            <div className="customer-item full-width">
              <div className="customer-icon">
                <MapPin size={20} />
              </div>
              <div>
                <p className="info-label">Shipping Address</p>
                <p className="info-value">{customerInfo.address}</p>
                <p className="info-value-small">{customerInfo.city}, {customerInfo.zipCode}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ملخص السعر */}
        <div className="price-summary-card">
          <h2>Price Summary</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>{order.amount}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>$10.00</span>
          </div>
          <div className="summary-row">
            <span>Tax (14%):</span>
            <span>${(parseFloat(order.amount.replace('$', '')) * 0.14).toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${(parseFloat(order.amount.replace('$', '')) * 1.14 + 10).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;