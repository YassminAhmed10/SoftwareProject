// src/pages/ShipmentTracking.jsx - NEW FILE
import React from 'react';
import { Truck, Package, CheckCircle, Clock, MapPin, ArrowRight } from 'lucide-react';
import './ShipmentTracking.css';

const ShipmentTracking = ({ order }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Order Placed':
        return <Package size={20} />;
      case 'Confirmed':
      case 'Processing':
        return <Clock size={20} />;
      case 'Shipped':
      case 'In Transit':
        return <Truck size={20} />;
      case 'Out for Delivery':
        return <MapPin size={20} />;
      case 'Delivered':
        return <CheckCircle size={20} />;
      default:
        return <Clock size={20} />;
    }
  };

  const getStatusColor = (status, index, currentIndex) => {
    if (index < currentIndex) return 'completed';
    if (index === currentIndex) return 'current';
    return 'pending';
  };

  const currentStepIndex = order.trackingEvents ? order.trackingEvents.length - 1 : 0;

  return (
    <div className="shipment-tracking">
      <div className="tracking-header">
        <div className="tracking-info">
          <h3>Shipment Tracking</h3>
          <div className="tracking-details">
            <div className="tracking-number">
              <span className="label">Tracking Number:</span>
              <span className="value">{order.tracking}</span>
            </div>
            <div className="estimated-delivery">
              <span className="label">Estimated Delivery:</span>
              <span className="value">
                {order.estimatedDelivery 
                  ? new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric'
                    })
                  : 'Calculating...'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="tracking-timeline">
        {order.trackingEvents && order.trackingEvents.map((event, index) => {
          const statusColor = getStatusColor(event.status, index, currentStepIndex);
          
          return (
            <div key={index} className={`timeline-step ${statusColor}`}>
              <div className="step-icon">
                {getStatusIcon(event.status)}
              </div>
              <div className="step-content">
                <div className="step-header">
                  <h4 className="step-title">{event.status}</h4>
                  <span className="step-status">{statusColor === 'completed' ? 'Completed' : statusColor === 'current' ? 'In Progress' : 'Pending'}</span>
                </div>
                <div className="step-details">
                  <div className="step-location">
                    <MapPin size={14} />
                    <span>{event.location}</span>
                  </div>
                  <div className="step-time">
                    <Clock size={14} />
                    <span>{event.date} at {event.time}</span>
                  </div>
                </div>
              </div>
              {index < order.trackingEvents.length - 1 && (
                <div className="step-connector">
                  <ArrowRight size={16} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="tracking-summary">
        <div className="summary-card">
          <h4>Current Status</h4>
          <p className="current-status">{order.trackingEvents?.[order.trackingEvents.length - 1]?.status || 'Processing'}</p>
          <p className="status-desc">
            {order.status === 'delivered' 
              ? 'Your order has been delivered successfully.'
              : 'Your order is on its way to you.'}
          </p>
        </div>
        
        <div className="summary-card">
          <h4>Shipping Details</h4>
          <div className="shipping-info">
            <p><strong>Carrier:</strong> Express Delivery Inc.</p>
            <p><strong>Service:</strong> Standard Shipping</p>
            <p><strong>Weight:</strong> {order.items ? order.items.length * 0.5 : 1} kg</p>
            <p><strong>Insurance:</strong> Included</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentTracking;