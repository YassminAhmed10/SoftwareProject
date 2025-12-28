import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import './StatCard.css';

const StatCard = ({ title, value, change, isPositive, icon: Icon, color }) => {
  const getStatColor = (color) => {
    const colors = {
      blue: { bg: 'var(--light-blue)', text: 'var(--blue)' },
      green: { bg: '#d1fae5', text: '#065f46' },
      purple: { bg: '#ede9fe', text: '#5b21b6' },
      orange: { bg: 'var(--light-orange)', text: 'var(--orange)' }
    };
    return colors[color] || colors.blue;
  };

  const colors = getStatColor(color);

  return (
    <div className="stat-card">
      <div className="stat-header">
        <div className="stat-icon" style={{ background: colors.bg, color: colors.text }}>
          <Icon size={24} />
        </div>
        <div className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          {change}
        </div>
      </div>
      <h3 className="stat-value">{value}</h3>
      <p className="stat-title">{title}</p>
    </div>
  );
};

export default StatCard;