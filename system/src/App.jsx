import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import OrderDetails from './pages/OrderDetails';
import MyStore from './pages/MyStore';
import Checkout from './pages/Checkout';

// Create a CustomerDashboard component (if you don't have one)
const CustomerDashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Customer Dashboard</h1>
      <p>Welcome to your dashboard! Here you can:</p>
      <ul>
        <li>View your orders</li>
        <li>Track shipments</li>
        <li>Update your profile</li>
        <li>Manage addresses</li>
      </ul>
    </div>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark' : ''}`}>
        <Routes>
          {/* Home/Admin Dashboard */}
          <Route 
            path="/" 
            element={
              <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                <Dashboard darkMode={darkMode} />
              </Layout>
            } 
          />
          
          {/* Customer Dashboard */}
          <Route 
            path="/dashboard" 
            element={
              <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                <CustomerDashboard darkMode={darkMode} />
              </Layout>
            } 
          />
          
          <Route 
            path="/order/:orderId" 
            element={
              <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                <OrderDetails darkMode={darkMode} />
              </Layout>
            } 
          />
          <Route 
            path="/my-store" 
            element={
              <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                <MyStore darkMode={darkMode} />
              </Layout>
            } 
          />
          {/* CHECKOUT ROUTE - Full width, no sidebar */}
          <Route 
            path="/checkout" 
            element={
              <Layout 
                darkMode={darkMode} 
                setDarkMode={setDarkMode} 
                hideSidebar={true}
              >
                <Checkout />
              </Layout>
            }  
          />
          
          {/* Add other routes as needed */}
          <Route 
            path="*" 
            element={
              <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                <div style={{ padding: '50px', textAlign: 'center' }}>
                  <h1>404 - Page Not Found</h1>
                  <p>The page you're looking for doesn't exist.</p>
                </div>
              </Layout>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;