// src/pages/CustomerDashboard.jsx
import React from 'react';
import { User, Package, MapPin, Heart, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// FIX: ALL external component imports are removed (they cause the compilation error)
// import ProfileSection from '../components/Customer/ProfileSection';
// import OrdersSection from '../components/Customer/OrdersSection';
// ... etc.

// FIX: Ensure the CSS file exists or comment out the import if it doesn't
// import './CustomerDashboard.css'; 

const CustomerDashboard = ({ darkMode }) => {
    const navigate = useNavigate(); 
    
    const customerData = {
        name: 'Ramy',
        tier: 'Premium',
        loyaltyPoints: 450,
    };

    // Placeholder data structure for stats and main content area
    const statCards = [
        { label: 'Total Orders', count: 12, icon: Package },
        { label: 'Pending Orders', count: 3, icon: Clock },
        { label: 'Saved Addresses', count: 2, icon: MapPin },
        { label: 'Wishlist Items', count: 8, icon: Heart },
    ];
    
    // Logic to redirect the internal 'My Orders' tab to the main sidebar link
    const handleTabClick = (tabId) => {
        if (tabId === 'orders') {
            // Redirects to the main sidebar link
            navigate('/my-orders'); 
        }
        // For profile, addresses, wishlist: remain on the placeholder
    };

    return (
        <div className={`customer-dashboard ${darkMode ? 'dark' : ''}`}>
            
            {/* Dashboard Header */}
            <div className="dashboard-header">
                <h1>Welcome back, {customerData.name}! 👋</h1>
                <p>Manage your account and track your orders.</p>
            </div>

            {/* Quick Stats (Using lucide-react icons which are installed) */}
            <div className="quick-stats">
                {statCards.map(stat => (
                    <div className="stat-card" key={stat.label}>
                        <div className="stat-icon"><stat.icon size={24} /></div>
                        <div className="stat-info">
                            <h3>{stat.count}</h3>
                            <p>{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area - Placeholder for stability */}
            <div className="dashboard-content">
                <div className="dashboard-tabs">
                    {/* Simplified Tabs */}
                    {['Profile', 'My Orders', 'Addresses', 'Wishlist'].map(label => (
                        <button
                            key={label}
                            className={`tab-button ${label === 'Profile' ? 'active' : ''}`}
                            onClick={() => handleTabClick(label.toLowerCase().replace(' ', '_'))}
                        >
                            <User size={20} />
                            <span>{label}</span>
                        </button>
                    ))}
                </div>

                {/* Stable Placeholder Content */}
                <div className="tab-content" style={{border: '2px dashed #007bff', padding: '30px', borderRadius: '8px', textAlign: 'center', marginTop: '20px'}}>
                    <h2>PROFILE Section Placeholder</h2>
                    <p>This content is a placeholder because the supporting files are missing in your current branch.</p>
                    <p>Click **"My Orders"** in the left sidebar to confirm navigation works.</p>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;