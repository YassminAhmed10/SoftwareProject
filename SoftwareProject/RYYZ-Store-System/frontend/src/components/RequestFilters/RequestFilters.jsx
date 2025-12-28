// src/components/RequestFilters/RequestFilters.jsx
import React, { useState } from 'react';
import { Filter, Search, Calendar } from 'lucide-react';
import './RequestFilters.css';

const RequestFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    type: 'all',
    dateRange: 'all',
    search: ''
  });

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  return (
    <div className="request-filters">
      <div className="filters-header">
        <div className="filters-title">
          <Filter size={20} />
          <h3>Filters</h3>
        </div>
        <button 
          className="btn-clear"
          onClick={() => {
            const resetFilters = {
              status: 'all',
              priority: 'all',
              type: 'all',
              dateRange: 'all',
              search: ''
            };
            setFilters(resetFilters);
            if (onFilterChange) {
              onFilterChange(resetFilters);
            }
          }}
        >
          Clear All
        </button>
      </div>

      <div className="filters-grid">
        <div className="filter-group">
          <label htmlFor="status-filter">Status</label>
          <select
            id="status-filter"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="priority-filter">Priority</label>
          <select
            id="priority-filter"
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="type-filter">Type</label>
          <select
            id="type-filter"
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="product">Product</option>
            <option value="order">Order</option>
            <option value="user">User</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="date-filter">
            <Calendar size={16} />
            Date Range
          </label>
          <select
            id="date-filter"
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>
      </div>

      <div className="search-box">
        <div className="search-input-wrapper">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search requests..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="search-input"
          />
        </div>
        <button 
          className="btn-apply"
          onClick={() => onFilterChange && onFilterChange(filters)}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default RequestFilters;