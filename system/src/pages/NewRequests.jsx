// src/pages/NewRequests.jsx
import React, { useState, useEffect } from 'react';
import RequestCard from '../components/RequestCard/RequestCard';
import RequestFilters from '../components/RequestFilters/RequestFilters';
import './NewRequests.css';

const NewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    reviewed: 0,
    approved: 0,
    rejected: 0
  });

  // Mock data
  const mockRequests = [
    {
      id: 1,
      title: 'New Product Request',
      description: 'Request to add new smartphone model to catalog',
      user: 'John Doe',
      date: '2024-01-15',
      type: 'product',
      priority: 'high',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Order Refund Request',
      description: 'Customer requesting refund for damaged product',
      user: 'Jane Smith',
      date: '2024-01-14',
      type: 'order',
      priority: 'medium',
      status: 'pending'
    },
    {
      id: 3,
      title: 'User Account Issue',
      description: 'User cannot login to their account',
      user: 'Bob Johnson',
      date: '2024-01-13',
      type: 'user',
      priority: 'low',
      status: 'reviewed'
    },
    {
      id: 4,
      title: 'Website Bug Report',
      description: 'Checkout page not working on mobile devices',
      user: 'Alice Brown',
      date: '2024-01-12',
      type: 'other',
      priority: 'high',
      status: 'pending'
    },
    {
      id: 5,
      title: 'Feature Request',
      description: 'Add wishlist functionality to user profiles',
      user: 'Charlie Wilson',
      date: '2024-01-11',
      type: 'other',
      priority: 'medium',
      status: 'approved'
    },
    {
      id: 6,
      title: 'Inventory Update',
      description: 'Update stock quantities for seasonal products',
      user: 'Emma Davis',
      date: '2024-01-10',
      type: 'product',
      priority: 'low',
      status: 'rejected'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRequests(mockRequests);
      setFilteredRequests(mockRequests);
      calculateStats(mockRequests);
      setLoading(false);
    }, 500);
  }, []);

  const calculateStats = (data) => {
    const stats = {
      total: data.length,
      pending: data.filter(req => req.status === 'pending').length,
      reviewed: data.filter(req => req.status === 'reviewed').length,
      approved: data.filter(req => req.status === 'approved').length,
      rejected: data.filter(req => req.status === 'rejected').length
    };
    setStats(stats);
  };

  const handleFilterChange = (filters) => {
    let filtered = [...requests];

    if (filters.status !== 'all') {
      filtered = filtered.filter(req => req.status === filters.status);
    }

    if (filters.priority !== 'all') {
      filtered = filtered.filter(req => req.priority === filters.priority);
    }

    if (filters.type !== 'all') {
      filtered = filtered.filter(req => req.type === filters.type);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(req => 
        req.title.toLowerCase().includes(searchTerm) ||
        req.description.toLowerCase().includes(searchTerm) ||
        req.user.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredRequests(filtered);
  };

  const handleRespond = (requestId) => {
    console.log('Responding to request:', requestId);
    // Handle response logic here
  };

  const handleApprove = (requestId) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'approved' } : req
    ));
    calculateStats(requests.map(req => 
      req.id === requestId ? { ...req, status: 'approved' } : req
    ));
  };

  const handleReject = (requestId) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'rejected' } : req
    ));
    calculateStats(requests.map(req => 
      req.id === requestId ? { ...req, status: 'rejected' } : req
    ));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading requests...</p>
      </div>
    );
  }

  return (
    <div className="new-requests-container">
      <div className="page-header">
        <div>
          <h1>New Requests</h1>
          <p>Manage and respond to customer and employee requests</p>
        </div>
        <button className="btn-refresh" onClick={() => window.location.reload()}>
          Refresh
        </button>
      </div>

      <div className="stats-overview">
        <div className="stat-item">
          <span className="stat-label">Total Requests</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Pending</span>
          <span className="stat-value stat-pending">{stats.pending}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Reviewed</span>
          <span className="stat-value stat-reviewed">{stats.reviewed}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Approved</span>
          <span className="stat-value stat-approved">{stats.approved}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Rejected</span>
          <span className="stat-value stat-rejected">{stats.rejected}</span>
        </div>
      </div>

      <RequestFilters onFilterChange={handleFilterChange} />

      <div className="requests-list">
        {filteredRequests.length === 0 ? (
          <div className="empty-state">
            <p>No requests found matching your filters.</p>
            <button 
              className="btn-clear-filters"
              onClick={() => handleFilterChange({
                status: 'all',
                priority: 'all',
                type: 'all',
                dateRange: 'all',
                search: ''
              })}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="requests-grid">
            {filteredRequests.map(request => (
              <RequestCard 
                key={request.id}
                request={request}
                onRespond={() => handleRespond(request.id)}
                onApprove={() => handleApprove(request.id)}
                onReject={() => handleReject(request.id)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="requests-actions">
        <div className="actions-left">
          <span>{filteredRequests.length} requests found</span>
        </div>
        <div className="actions-right">
          <button className="btn-export">Export as CSV</button>
          <button className="btn-mark-all">Mark All as Reviewed</button>
        </div>
      </div>
    </div>
  );
};

export default NewRequests;