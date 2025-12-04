import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import EmployeeDashboard from './pages/EmployeeDashboard/EmployeeDashboard';
import AllOrders from './pages/AllOrders';
import OrderDetails from './pages/OrderDetails';
import Settings from './pages/Settings';
import NewRequests from './pages/NewRequests';
import AddProduct from './pages/AddProduct';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }
    return <Layout>{children}</Layout>;
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Login Route - Default Page */}
          <Route 
            path="/" 
            element={user ? <Navigate to="/dashboard" replace /> : <LoginPageWrapper onLogin={login} />}
          />
          
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" replace /> : <LoginPageWrapper onLogin={login} />}
          />

          {/* Register/Signup Route */}
          <Route 
            path="/register" 
            element={user ? <Navigate to="/dashboard" replace /> : <SignUpPageWrapper onLogin={login} />}
          />

          {/* Protected Employee Routes with Layout */}
          <Route 
            path="/dashboard"
            element={
              <ProtectedRoute>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/orders"
            element={
              <ProtectedRoute>
                <AllOrders />
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/order/:orderId"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/requests"
            element={
              <ProtectedRoute>
                <NewRequests />
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/add-product"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          
          {/* Logout Route */}
          <Route 
            path="/logout"
            element={<LogoutHandler onLogout={logout} />}
          />

          {/* Fallback to Login for all other routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

// Wrapper component for LoginPage to handle navigation
function LoginPageWrapper({ onLogin }) {
  const navigate = useNavigate();
  
  const handleLogin = (userData) => {
    onLogin(userData);
    navigate('/dashboard');
  };
  
  return (
    <LoginPage 
      onNavigateToSignup={() => navigate('/register')}
      onLogin={handleLogin}
    />
  );
}

// Wrapper component for SignUpPage to handle navigation
function SignUpPageWrapper({ onLogin }) {
  const navigate = useNavigate();
  
  const handleSignUp = (userData) => {
    onLogin(userData);
    navigate('/dashboard');
  };
  
  return (
    <SignUpPage 
      onNavigateToLogin={() => navigate('/login')}
      onLogin={handleSignUp}
    />
  );
}

// Logout Handler Component
function LogoutHandler({ onLogout }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    onLogout();
    navigate('/');
  }, [onLogout, navigate]);
  
  return null;
}

export default App;