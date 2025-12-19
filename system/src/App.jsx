// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import './App.css';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import ProductPage from './pages/ProductPage';
import CustomerDashboard from './pages/CustomerDashboard';
import CartPage from './pages/CartPage'; // Ensure this matches your filename
import WishlistPage from './pages/WishlistPage';

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<Layout><ProductPage /></Layout>} />
            <Route path="/cart" element={<Layout><CartPage /></Layout>} />
            <Route path="/wishlist" element={<Layout><WishlistPage /></Layout>} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/products" />} />
          </Routes>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;