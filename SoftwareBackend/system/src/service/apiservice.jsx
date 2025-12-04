// src/service/apiservice.js
import axios from 'axios';

// Create axios instance for your Django backend
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Your Django backend URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Token keys
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const getToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const isAuthenticated = () => {
    return !!getToken() && localStorage.getItem('isLoggedIn') === 'true';
};

export const isCustomer = () => {
    return localStorage.getItem('userType') === 'customer';
};

export const logoutUser = () => {
  // Clear all customer data
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('customerData');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userType');
  localStorage.removeItem('cartItems'); // Clear cart if exists
  
  return Promise.resolve();
};

// Customer login
export const loginUser = async ({ email, password }) => {
  try {
    // Try email login first (for customers)
    const loginData = {
      email: email,
      password: password
    };
    
    console.log('Customer login attempt:', { email });
    
    const response = await api.post('/login/', loginData);
    
    const { tokens, user, message } = response.data;
    
    // Save tokens
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', 'customer');
    
    console.log('Customer login successful! User:', user);
    
    return { 
      success: true, 
      token: tokens.access, 
      refreshToken: tokens.refresh,
      user,
      message
    };
    
  } catch (error) {
    console.error("Customer login error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    // Try alternative login if email fails
    if (error.response?.status === 401) {
      try {
        // Try using the email as username
        const usernameLoginData = {
          username: email,
          password: password
        };
        
        console.log('Trying login with username:', email);
        
        const retryResponse = await api.post('/login/', usernameLoginData);
        const { tokens, user, message } = retryResponse.data;
        
        // Save tokens
        localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access);
        localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userType', 'customer');
        
        return { 
          success: true, 
          token: tokens.access, 
          refreshToken: tokens.refresh,
          user,
          message
        };
      } catch (retryError) {
        console.error("Retry login failed:", retryError.response?.data);
      }
    }
    
    // Handle error response
    if (error.response) {
      const message = error.response.data?.error || 
                     error.response.data?.detail || 
                     "Invalid email or password";
      return { success: false, message };
    } else if (error.request) {
      return { success: false, message: "Unable to connect to server. Please check your internet connection." };
    } else {
      return { success: false, message: "Login failed. Please try again." };
    }
  }
};

// Customer registration
export const signupUser = async ({ name, email, password }) => {
  try {
    // Split name into first and last name
    const nameParts = name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    // Generate username from email
    const username = email.split('@')[0];
    
    const registerData = {
      username: username,
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName
    };
    
    console.log('Sending registration data:', registerData);
    
    const response = await api.post('/signup/', registerData);    
    const { tokens, user, message } = response.data;
    
    // Save tokens
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', 'customer');
    
    console.log('Registration successful! User:', user);
    
    return { 
      success: true, 
      token: tokens.access, 
      refreshToken: tokens.refresh,
      user,
      message
    };
    
  } catch (error) {
    console.error("Registration error details:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response) {
      // Handle Django validation errors
      const errors = error.response.data;
      let message = "Registration failed";
      
      if (errors.email) {
        message = `Email: ${Array.isArray(errors.email) ? errors.email[0] : errors.email}`;
      } else if (errors.username) {
        message = `Username: ${Array.isArray(errors.username) ? errors.username[0] : errors.username}`;
      } else if (errors.password) {
        message = `Password: ${Array.isArray(errors.password) ? errors.password[0] : errors.password}`;
      } else if (errors.non_field_errors) {
        message = Array.isArray(errors.non_field_errors) ? errors.non_field_errors[0] : errors.non_field_errors;
      } else if (errors.detail) {
        message = errors.detail;
      } else if (typeof errors === 'object') {
        // Try to get first error message
        const firstError = Object.values(errors)[0];
        if (firstError) {
          message = Array.isArray(firstError) ? firstError[0] : firstError;
        }
      }
      
      return { success: false, message };
    } else if (error.request) {
      return { success: false, message: "Unable to connect to server. Please check if backend is running." };
    } else {
      return { success: false, message: "Registration failed. Please try again." };
    }
  }
};

// Get customer profile
export const getCustomerProfile = async () => {
  try {
    const response = await api.get('/profile/');
    return response.data;
  } catch (error) {
    console.error("Get profile error:", error);
    
    if (error.response?.status === 401) {
      logoutUser();
    }
    
    return null;
  }
};

// Get customer orders
export const fetchCustomerOrders = async () => {
  try {
    const response = await api.get('/orders/my-orders/'); // You need to create this endpoint
    return response.data;
  } catch (error) {
    console.error("Fetch orders error:", error);
    return [];
  }
};

// Check if backend is connected
export const pingBackend = async () => {
  try {
    const response = await api.get('/ping/');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};