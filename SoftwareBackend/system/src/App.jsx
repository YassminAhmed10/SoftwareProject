// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DarkModeProvider } from './Contexts/DarkModeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';
import './App.css';

import Dashboard from './pages/Dashboard';
import OrderDetails from './pages/OrderDetails';
import MyStore from './pages/MyStore';
import Analytics from './pages/Analytics';
import AllOrders from './pages/AllOrders';
import Finance from './pages/Finance';
import Settings from './pages/Settings';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* ==================== */}
            {/* PUBLIC ROUTES - Anyone can access */}
            {/* ==================== */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* ==================== */}
            {/* PROTECTED ROUTES - Require authentication */}
            {/* ==================== */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Navigate to="/dashboard" replace />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/order/:orderId"
              element={
                <ProtectedRoute>
                  <Layout>
                    <OrderDetails />
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/my-store"
              element={
                <ProtectedRoute>
                  <Layout>
                    <MyStore />
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Analytics />
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AllOrders />
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/finance"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Finance />
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Settings />
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            {/* ==================== */}
            {/* CATCH-ALL ROUTE - Redirect to login */}
            {/* ==================== */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
