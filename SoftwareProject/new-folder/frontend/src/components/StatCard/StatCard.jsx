// src/components/StatCard/StatCard.jsx
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './StatCard.css';

const StatCard = ({ title, value, icon, trend, percentage, color }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <div className="stat-icon" style={{ backgroundColor: color + '20', color: color }}>
          {icon}
        </div>
        <div className="stat-trend">
          {trend === 'up' ? (
            <span className="trend-up">
              <TrendingUp size={16} />
              <span>{percentage}%</span>
            </span>
          ) : (
            <span className="trend-down">
              <TrendingDown size={16} />
              <span>{percentage}%</span>
            </span>
          )}
        </div>
      </div>
      
      <div className="stat-card-content">
        <h3 className="stat-title">{title}</h3>
        <p className="stat-value">{value}</p>
      </div>
      
      <div className="stat-card-footer">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ 
              width: `${percentage}%`,
              backgroundColor: color
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;