import React, { useState, useEffect } from 'react';
import './ShipmentTracking.css';

const ShipmentTracking = ({ order, darkMode }) => {
  const [expandedEvent, setExpandedEvent] = useState(null);

  // Get current status index
  const getCurrentStatusIndex = () => {
    const statusPriority = {
      'Order Placed': 0,
      'Confirmed': 1,
      'Processing': 2,
      'Shipped': 3,
      'In Transit': 4,
      'Out for Delivery': 5,
      'Delivered': 6
    };
    
    let maxIndex = -1;
    order.trackingEvents.forEach(event => {
      const index = statusPriority[event.status] || -1;
      if (index > maxIndex) maxIndex = index;
    });
    
    return maxIndex;
  };

  const currentStatusIndex = getCurrentStatusIndex();

  // Format time
  const formatTime = (timeString) => {
    return timeString;
  };

  // Get status icon
  const getEventIcon = (status) => {
    const icons = {
      'Order Placed': '📝',
      'Confirmed': '✓',
      'Processing': '⚙️',
      'Shipped': '📦',
      'In Transit': '🚚',
      'Out for Delivery': '🚗',
      'Delivered': '✅'
    };
    return icons[status] || '•';
  };

  return (
    <div className={`shipment-tracking ${darkMode ? 'dark' : ''}`}>
      <div className="tracking-header">
        <h3>📍 Shipment Tracking</h3>
        <p className="tracking-id">Tracking #: {order.trackingNumber}</p>
      </div>

      {/* Progress Bar */}
      <div className="tracking-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentStatusIndex + 1) / 7) * 100}%` }}
          ></div>
        </div>
        <div className="progress-stats">
          <span className="progress-current">
            {((currentStatusIndex + 1) / 7) * 100 | 0}% Complete
          </span>
          {order.status === 'delivered' && (
            <span className="progress-delivered">✅ Delivered</span>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="tracking-timeline">
        {order.trackingEvents.map((event, index) => {
          const isCompleted = index <= currentStatusIndex;
          const isCurrent = index === currentStatusIndex;
          const isExpanded = expandedEvent === index;

          return (
            <div 
              key={index}
              className={`timeline-item ${isCompleted ? 'completed' : 'pending'} ${isCurrent ? 'current' : ''}`}
            >
              {/* Timeline Node */}
              <div className="timeline-node">
                <div className={`node-circle ${isCurrent ? 'current' : ''}`}>
                  <span className="node-icon">{getEventIcon(event.status)}</span>
                </div>
              </div>

              {/* Timeline Content */}
              <div 
                className="timeline-content"
                onClick={() => setExpandedEvent(isExpanded ? null : index)}
              >
                <div className="content-header">
                  <div className="status-info">
                    <h4 className="event-status">{event.status}</h4>
                    <p className="event-location">📍 {event.location}</p>
                  </div>
                  <div className="event-datetime">
                    <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
                    <p className="event-time">{formatTime(event.time)}</p>
                  </div>
                  <span className={`expand-btn ${isExpanded ? 'open' : ''}`}>
                    {isExpanded ? '−' : '+'}
                  </span>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="content-details">
                    <div className="detail-item">
                      <span className="detail-label">Status:</span>
                      <span className="detail-value">{event.status}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Location:</span>
                      <span className="detail-value">{event.location}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Date & Time:</span>
                      <span className="detail-value">
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Delivery Estimate */}
      {order.status !== 'delivered' && order.estimatedDelivery && (
        <div className="delivery-estimate">
          <p className="estimate-label">Estimated Delivery</p>
          <p className="estimate-date">
            {new Date(order.estimatedDelivery).toLocaleDateString('en-US', { 
              weekday: 'short', 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
        </div>
      )}

      {/* Delivery Complete */}
      {order.status === 'delivered' && (
        <div className="delivery-complete">
          <span className="complete-icon">🎉</span>
          <p>Your order has been delivered!</p>
          {order.trackingEvents[order.trackingEvents.length - 1] && (
            <p className="delivered-date">
              Delivered on {new Date(order.trackingEvents[order.trackingEvents.length - 1].date).toLocaleDateString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ShipmentTracking;