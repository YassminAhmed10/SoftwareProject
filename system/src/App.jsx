// src/App.jsx - FULL UPDATED
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
import AdminProducts from './pages/AdminProducts'; // Separate admin products
import CustomerDashboard from './pages/CustomerDashboard';
import CartPage from './pages/CartPage';
import ProductDetails from './pages/ProductDetails';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import WishlistPage from './pages/WishlistPage';
import ProductPage from './pages/ProductPage'; // Customer product page

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            
            {/* Customer Routes - NO Layout wrapper */}
            <Route path="/products" element={<ProductPage />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            
            {/* Admin Routes with Layout */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/admin/order/:orderId" element={<Layout><OrderDetails /></Layout>} />
            <Route path="/admin/my-store" element={<Layout><MyStore /></Layout>} />
            <Route path="/admin/analytics" element={<Layout><Analytics /></Layout>} />
            <Route path="/admin/orders" element={<Layout><AllOrders /></Layout>} />
            <Route path="/admin/finance" element={<Layout><Finance /></Layout>} />
            <Route path="/admin/settings" element={<Layout><Settings /></Layout>} />
            <Route path="/admin/products" element={<Layout><AdminProducts /></Layout>} />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/products" replace />} />
          </Routes>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;