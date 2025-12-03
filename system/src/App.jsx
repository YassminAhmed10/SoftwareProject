// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout
import CustomerLayout from './components/Layout/CustomerLayout';

// Pages
import MyOrders from './pages/MyOrders';
import Dashboard from './pages/Dashboard';
import CustomerDashboard from './pages/CustomerDashboard';  // ✅ Import CustomerDashboard
// Add more pages later…

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark' : ''}`}>
        <Routes>
          {/* Default homepage - Customer Dashboard */}
          <Route
            path="/"
            element={
              <CustomerLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                <CustomerDashboard />
              </CustomerLayout>
            }
          />

          {/* Customer Dashboard route */}
          <Route
            path="/customer-dashboard"
            element={
              <CustomerLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                <CustomerDashboard />
              </CustomerLayout>
            }
          />

          {/* My Orders */}
          <Route
            path="/my-orders"
            element={
              <CustomerLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                <MyOrders />
              </CustomerLayout>
            }
          />

          {/* Admin Dashboard route (if you have it) */}
          <Route
            path="/dashboard"
            element={
              <CustomerLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                <Dashboard />
              </CustomerLayout>
            }
          />

          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;