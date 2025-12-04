
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTshirt, FaMapMarkerAlt, FaEnvelope, FaPhone, FaCreditCard, FaTimes } from 'react-icons/fa';
import './EmployeeOrderDetails.css';

const EmployeeOrderDetails = ({ order: propOrder, onBack: propOnBack }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const order = propOrder || location.state?.orderData;

  if (!order) {
    return (
      <div className="order-details-page">
        <div className="order-details-container">
          <div className="no-order">
            <h2>No order selected</h2>
            <button 
              onClick={propOnBack || (() => navigate('/employee/orders'))} 
              className="back-btn"
            >
              Back to {propOnBack ? 'Dashboard' : 'Orders'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    if (propOnBack) {
      propOnBack();
    } else {
      navigate('/employee/orders');
    }
  };

  const subtotal = order.products ? order.products.reduce((sum, product) => 
    sum + (product.price * product.quantity), 0) : 0;
  
  const shippingCost = 10.85;
  const discount = 9.00;
  const total = subtotal + shippingCost - discount;

  const getProductImage = (productName) => {
    if (!productName) return '/src/assets/hoodie2.png';
    
    const name = productName.toLowerCase();
    
    if (name.includes('dress')) {
      return '/src/assets/pinkHoodie.png';
    } else if (name.includes('shirt') || name.includes('tshirt')) {
      return '/src/assets/tshirt.png';
    } else if (name.includes('jacket') || name.includes('leather')) {
      return '/src/assets/jacket.png';
    } else if (name.includes('sweatshirt') || name.includes('white')) {
      return '/src/assets/hoodie3.png';
    } else if (name.includes('hoodie')) {
      return '/src/assets/hoodie2.png';
    } else {
      const defaultImages = [
        '/src/assets/hoodie2.png',
        '/src/assets/pinkHoodie.png', 
        '/src/assets/tshirt.png',
        '/src/assets/jacket.png',
        '/src/assets/hoodie3.png'
      ];
      const hash = productName.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
      const index = Math.abs(hash) % defaultImages.length;
      return defaultImages[index];
    }
  };

  const getCustomerInitials = (name) => {
    if (!name) return 'CU';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getPaymentStatus = () => {
    switch(order.status) {
      case 'completed':
        return {
          show: true,
          message: 'Cash Paid on ' + order.date,
          icon: <FaCreditCard size={16} />,
          className: 'payment-status paid'
        };
      case 'pending':
      case 'process':
        return {
          show: true,
          message: 'Payment Pending - Not Received Yet',
          icon: <FaTimes size={16} />,
          className: 'payment-status pending'
        };
      case 'canceled':
      default:
        return {
          show: false,
          message: '',
          icon: null,
          className: ''
        };
    }
  };

  const paymentStatus = getPaymentStatus();

  return (
    <div className="order-details-page">
      <div className="order-details-container">
        <div className="order-header">
          <div className="order-info">
            <button className="back-button" onClick={handleBack}>
              <FaArrowLeft size={14} />
              Back to {propOnBack ? 'Dashboard' : 'Orders'}
            </button>
            <div className="order-title">
              <h1>Order #{order.id}</h1>
              <p>{order.date} at 10:34 PM</p>
            </div>
          </div>
          <div className={`status-badge ${order.status}`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </div>
        </div>

        <div className="order-content">
          <div className="customer-info-wide">
            <div className="customer-main-info">
              <div className="customer-avatar-large">
                {getCustomerInitials(order.customer?.name || order.user)}
              </div>
              <div className="customer-details-wide">
                <h2>{order.customer?.name || order.user || 'Customer'}</h2>
                <p className="customer-meta">1 Previous Orders • New Customer</p>
                <div className="customer-contact-wide">
                  <div className="contact-item-wide">
                    <FaEnvelope size={14} />
                    <span>Email: {order.customer?.email || 'customer@example.com'}</span>
                  </div>
                  <div className="contact-item-wide">
                    <FaPhone size={14} />
                    <span>Phone: {order.customer?.phone || '+20 101 342 7001'}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="customer-address-wide">
              <div className="address-section">
                <h4>
                  <FaMapMarkerAlt size={14} />
                  Shipping Address
                </h4>
                <p>{order.shipping?.address || 'ElSheikh Zaid, Giza, Egypt'}</p>
              </div>
              <div className="address-section">
                <h4>
                  <FaMapMarkerAlt size={14} />
                  Billing Address
                </h4>
                <p>{order.customer?.address || 'El maadiy, Cairo, Egypt'}</p>
              </div>
            </div>
          </div>

          <div className="content-grid">
            <div className="left-column">
              <div className="section">
                <h2 className="section-title">Product Details</h2>
                <div className="products-table">
                  <div className="table-header">
                    <div className="header-product">PRODUCT</div>
                    <div className="header-quantity">QUANTITY</div>
                    <div className="header-price">PRICE</div>
                  </div>
                  
                  {order.products && order.products.length > 0 ? (
                    order.products.map((product, index) => (
                      <div className="table-row" key={index}>
                        <div className="product-info">
                          <div className="product-image">
                            <img 
                              src={getProductImage(product.name)} 
                              alt={product.name}
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className="image-placeholder">
                              <FaTshirt size={20} />
                            </div>
                          </div>
                          <div className="product-details">
                            <h4>{product.name || `Product ${index + 1}`}</h4>
                            <div className="product-attributes">
                              <span className="attribute">Color: {product.color || 'Various'}</span>
                              <span className="attribute">Size: {product.size || 'Standard'}</span>
                            </div>
                            <div className="product-meta">
                              <span className="product-sku">SKU: {product.sku || 'N/A'}</span>
                              <span className="product-category">{product.category || 'Clothing'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="quantity">{product.quantity?.toString().padStart(2, '0') || '01'}</div>
                        <div className="price">{(product.price || 0).toFixed(2)} LE</div>
                      </div>
                    ))
                  ) : (
                    <div className="no-products">
                      <p>No products found in this order</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="right-column">
              <div className="section">
                <h2 className="section-title">Order Summary</h2>
                <div className="order-summary">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>{subtotal.toFixed(2)} LE</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping Cost</span>
                    <span>{shippingCost.toFixed(2)} LE</span>
                  </div>
                  <div className="summary-row">
                    <span>Discount</span>
                    <span className="discount">-{discount.toFixed(2)} LE</span>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-row total-row">
                    <span>Total Order</span>
                    <span>{total.toFixed(2)} LE</span>
                  </div>
                </div>
                
                {paymentStatus.show && (
                  <div className={paymentStatus.className}>
                    {paymentStatus.icon}
                    <span>{paymentStatus.message}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EmployeeOrderDetails.propTypes = {
  order: PropTypes.object,
  onBack: PropTypes.func
};

export default EmployeeOrderDetails;
