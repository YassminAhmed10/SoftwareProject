// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import './App.css';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import OrderDetails from './pages/OrderDetails';
import MyStore from './pages/MyStore';
import Analytics from './pages/Analytics';
import AllOrders from './pages/AllOrders';
import Finance from './pages/Finance';
import Settings from './pages/Settings';
import ProductPage from './pages/ProductPage';
import CustomerDashboard from './pages/CustomerDashboard';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Redirect root to products instead of dashboard */}
            <Route path="/" element={<Navigate to="/products" replace />} />
            {/* You can keep or remove the dashboard route */}
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/order/:orderId" element={<Layout><OrderDetails /></Layout>} />
            <Route path="/my-store" element={<Layout><MyStore /></Layout>} />
            <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
            <Route path="/orders" element={<Layout><AllOrders /></Layout>} />
            <Route path="/finance" element={<Layout><Finance /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="/products" element={<Layout><ProductPage /></Layout>} />
            {/* CustomerDashboard should NOT be wrapped with Layout since it has its own sidebar */}
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/cart" element={<Layout><CartPage /></Layout>} />
            <Route path="/wishlist" element={<Layout><WishlistPage /></Layout>} />
          </Routes>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;