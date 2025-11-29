import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import OrderDetails from './pages/OrderDetails';
import MyStore from './pages/MyStore';
import Checkout from './pages/Checkout';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark' : ''}`}>
        <Routes>
          <Route 
            path="/" 
            element={
              <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                <Dashboard darkMode={darkMode} />
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
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;