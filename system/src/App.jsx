// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout
import CustomerLayout from './components/Layout/CustomerLayout';

// Pages
import MyOrders from './pages/MyOrders';
import Dashboard from './pages/Dashboard';
// Add more pages later…

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark' : ''}`}>
        <Routes>
          {/* Default homepage */}
          <Route
            path="/"
            element={
              <CustomerLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                <Dashboard />
              </CustomerLayout>
            }
          />

          {/* Dashboard route */}
          <Route
            path="/dashboard"
            element={
              <CustomerLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                <Dashboard />
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

          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;