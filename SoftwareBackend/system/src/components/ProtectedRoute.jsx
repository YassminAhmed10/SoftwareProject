// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated
  const checkAuth = () => {
    // Check localStorage for authentication tokens
    const accessToken = localStorage.getItem('access_token');
    const authToken = localStorage.getItem('auth_token');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userData = localStorage.getItem('userData');
    
    // User is authenticated if they have any token AND isLoggedIn flag
    const hasToken = !!(accessToken || authToken);
    
    console.log('Auth check:', { 
      hasToken, 
      isLoggedIn, 
      hasUserData: !!userData,
      accessToken: !!accessToken,
      authToken: !!authToken
    });
    
    return hasToken && isLoggedIn;
  };

  const isAuthenticated = checkAuth();
  
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to /login');
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
