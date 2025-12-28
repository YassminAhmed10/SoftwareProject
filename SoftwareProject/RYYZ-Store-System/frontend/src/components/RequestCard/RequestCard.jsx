// src/components/RequestCard/RequestCard.jsx
import React from 'react';
import { User, Calendar, MessageSquare } from 'lucide-react';
import './RequestCard.css';

const RequestCard = ({ request }) => {
  const getPriorityColor = (priority) => {
    switch(priority.toLowerCase()) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="request-card">
      <div className="request-card-header">
        <div className="request-title">
          <h3>{request.title}</h3>
          <div 
            className="request-priority"
            style={{ 
              backgroundColor: getPriorityColor(request.priority) + '20', 
              color: getPriorityColor(request.priority) 
            }}
          >
            {request.priority} Priority
          </div>
        </div>
        <div className="request-date">
          <Calendar size={16} />
          <span>{request.date}</span>
        </div>
      </div>
      
      <div className="request-card-body">
        <div className="request-description">
          <p>{request.description}</p>
        </div>
        
        <div className="request-meta">
          <div className="request-user">
            <User size={16} />
            <span>{request.user}</span>
          </div>
          <div className="request-type">
            <span className="type-badge">{request.type}</span>
          </div>
        </div>
      </div>
      
      <div className="request-card-footer">
        <button className="btn-respond">
          <MessageSquare size={16} />
          <span>Respond</span>
        </button>
        <div className="request-actions">
          <button className="btn-approve">Approve</button>
          <button className="btn-reject">Reject</button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;