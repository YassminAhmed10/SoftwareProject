import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark' : ''}`}>
        <Routes>
          {/* Home Page */}
          <Route 
            path="/"
            element={<Home darkMode={darkMode} user={user} onLogout={logout} />}
          />
          
          {/* Login Route */}
          <Route 
            path="/login" 
            element={<LoginPageWrapper onLogin={login} />}
          />

          {/* Register/Signup Route */}
          <Route 
            path="/register" 
            element={<SignUpPageWrapper onLogin={login} />}
          />

          {/* Fallback to Home for all other routes */}
          <Route path="*" element={<Home darkMode={darkMode} user={user} onLogout={logout} />} />
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
    navigate('/');
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
    navigate('/');
  };
  
  return (
    <SignUpPage 
      onNavigateToLogin={() => navigate('/login')}
      onLogin={handleSignUp}
    />
  );
}

export default App;