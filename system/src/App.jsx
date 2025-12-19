// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import './App.css';
import Layout from './components/Layout/Layout';
// ... other imports
import ProductPage from './pages/ProductPage';
import ProductDetails from './pages/ProductDetails'; // 1. Import the page
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<Layout><ProductPage /></Layout>} />
            
            {/* 2. Add this specific route for product details */}
            <Route path="/product/:productId" element={<Layout><ProductDetails /></Layout>} />
            
            <Route path="/cart" element={<Layout><CartPage /></Layout>} />
            <Route path="/wishlist" element={<Layout><WishlistPage /></Layout>} />
            {/* ... other routes */}
          </Routes>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;