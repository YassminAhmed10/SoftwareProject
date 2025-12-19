// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import './App.css';
import Layout from './components/Layout/Layout';
import Settings from './components/Settings/Settings';
import ProductPage from './pages/ProductPage';
import ProductDetails from './pages/ProductDetails';
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
            <Route path="/product/:productId" element={<Layout><ProductDetails /></Layout>} />
            <Route path="/cart" element={<Layout><CartPage /></Layout>} />
            <Route path="/wishlist" element={<Layout><WishlistPage /></Layout>} />
            {/* Add Settings route */}
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
          </Routes>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;