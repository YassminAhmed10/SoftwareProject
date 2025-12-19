// services/api.js - COMPLETE CORRECTED VERSION
const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const api = {
  async login(emailOrUsername, password) {
    try {
      console.log('Attempting login to:', `${API_BASE_URL}/login/`);
      console.log('Email/Username:', emailOrUsername);
      
      const isEmail = emailOrUsername.includes('@');
      const requestBody = isEmail 
        ? { email: emailOrUsername, password }
        : { username: emailOrUsername, password };
      
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      if (error.message === 'Failed to fetch') {
        throw new Error('Cannot connect to server. Please ensure the backend is running at http://127.0.0.1:8000');
      }
      throw error;
    }
  },

  async signup(username, email, password, password2, firstName = '', lastName = '') {
  try {
    console.log('Attempting signup to:', `${API_BASE_URL}/signup/`);
    console.log('Signup data:', { username, email, password, password2, firstName, lastName });
    
    const response = await fetch(`${API_BASE_URL}/signup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,      // This is now first parameter
        email,         // Second parameter
        password,      // Third parameter
        password2,     // Fourth parameter
        first_name: firstName,
        last_name: lastName,
      }),
    });

    console.log('Signup response status:', response.status);
    
    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error('Non-JSON response:', text.substring(0, 200));
      throw new Error(`Server error (${response.status}): Check backend logs`);
    }
    
    console.log('Signup response data:', data);

    if (!response.ok) {
      // Handle validation errors properly
      let errorMessage = 'Signup failed';
      
      if (data.username && Array.isArray(data.username)) {
        errorMessage = `Username: ${data.username[0]}`;
      } else if (data.email && Array.isArray(data.email)) {
        errorMessage = `Email: ${data.email[0]}`;
      } else if (data.password && Array.isArray(data.password)) {
        errorMessage = `Password: ${data.password[0]}`;
      } else if (data.password2 && Array.isArray(data.password2)) {
        errorMessage = `Password confirmation: ${data.password2[0]}`;
      } else if (data.non_field_errors && Array.isArray(data.non_field_errors)) {
        errorMessage = data.non_field_errors[0];
      } else if (typeof data === 'object') {
        errorMessage = JSON.stringify(data);
      } else {
        errorMessage = data.error || data.detail || String(data);
      }
      
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('Signup error:', error);
    if (error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to server. Please ensure the backend is running at http://127.0.0.1:8000');
    }
    throw error;
  }
},

  async getUserProfile(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      return data;
    } catch (error) {
      console.error('Profile fetch error:', error);
      throw error;
    }
  },

  getUserRole(email) {
    if (email.endsWith('@admin.com')) {
      return 'admin';
    } else if (email.endsWith('@employee.com')) {
      return 'employee';
    }
    return 'customer';
  },
};