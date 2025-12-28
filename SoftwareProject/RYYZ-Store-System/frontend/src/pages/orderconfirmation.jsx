import { Link } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaBox } from 'react-icons/fa';
import Header from '../components/Header/Header';
import PropTypes from 'prop-types';
import './OrderConfirmation.css';

const OrderConfirmation = ({ user, onLogout }) => {
  return (
    <div className="order-confirmation-page">
      <Header user={user} onLogout={onLogout} />
      
      <div className="confirmation-container">
        <FaCheckCircle className="success-icon" />
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase. Your order has been confirmed.</p>
        
        <div className="order-details">
          <p className="order-number">Order #: {Math.floor(Math.random() * 1000000)}</p>
          <p>You will receive an email confirmation shortly.</p>
        </div>

        <div className="confirmation-actions">
          <Link to="/home" className="btn-home">
            <FaHome /> Back to Home
          </Link>
          <Link to="/my-account" className="btn-orders">
            <FaBox /> View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

OrderConfirmation.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};

export default OrderConfirmation;