import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import OrderDetails from './pages/OrderDetails';
import MyStore from './pages/MyStore';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark' : ''}`}>
        <Routes>
          {/* Public Routes - NO Layout */}
          <Route 
            path="/"
            element={<Home darkMode={darkMode} user={user} onLogout={logout} />}
          />
          
          <Route 
            path="/login" 
            element={<LoginPage onLogin={login} darkMode={darkMode} />}
          />

          {/* Protected Routes - WITH Layout */}
          <Route 
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <Layout darkMode={darkMode} setDarkMode={setDarkMode} user={user} onLogout={logout}>
                  <Dashboard darkMode={darkMode} user={user} />
                </Layout>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/my-store" 
            element={
              <ProtectedRoute user={user} requiredRole="admin">
                <Layout darkMode={darkMode} setDarkMode={setDarkMode} user={user} onLogout={logout}>
                  <MyStore darkMode={darkMode} />
                </Layout>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/order/:orderId" 
            element={
              <ProtectedRoute user={user}>
                <Layout darkMode={darkMode} setDarkMode={setDarkMode} user={user} onLogout={logout}>
                  <OrderDetails darkMode={darkMode} />
                </Layout>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/my-orders"
            element={
              <ProtectedRoute user={user}>
                <Layout darkMode={darkMode} setDarkMode={setDarkMode} user={user} onLogout={logout}>
                  <div className="page-content">
                    <h1>My Orders</h1>
                    <p>Your order history will appear here.</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <Layout darkMode={darkMode} setDarkMode={setDarkMode} user={user} onLogout={logout}>
                  <div className="page-content">
                    <h1>Profile</h1>
                    <p>Manage your account settings and preferences.</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/wishlist"
            element={
              <ProtectedRoute user={user}>
                <Layout darkMode={darkMode} setDarkMode={setDarkMode} user={user} onLogout={logout}>
                  <div className="page-content">
                    <h1>Wishlist</h1>
                    <p>Your saved items will appear here.</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/settings"
            element={
              <ProtectedRoute user={user}>
                <Layout darkMode={darkMode} setDarkMode={setDarkMode} user={user} onLogout={logout}>
                  <div className="page-content">
                    <h1>Settings</h1>
                    <p>Configure your application preferences.</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            } 
          />

          {/* Fallback route */}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;