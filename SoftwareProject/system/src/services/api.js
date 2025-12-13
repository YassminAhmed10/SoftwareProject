const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const api = {
  async login(emailOrUsername, password) {
    try {
      console.log('Attempting login to:', `${API_BASE_URL}/login/`);
      console.log('Email/Username:', emailOrUsername);
      
      // Check if it's an email or username
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

  async signup(email, password, firstName = '', lastName = '') {
    try {
      const username = email.split('@')[0];
      console.log('Attempting signup to:', `${API_BASE_URL}/signup/`);
      console.log('Signup data:', { email, username, firstName, lastName });
      
      const response = await fetch(`${API_BASE_URL}/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          username,
          first_name: firstName,
          last_name: lastName,
        }),
      });

      console.log('Signup response status:', response.status);
      const data = await response.json();
      console.log('Signup response data:', data);

      if (!response.ok) {
        const errorMessage = data.error || data.detail || JSON.stringify(data) || 'Signup failed';
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

  // Helper function to determine user role based on email
  getUserRole(email) {
    if (email.endsWith('@admin.com')) {
      return 'admin';
    } else if (email.endsWith('@employee.com')) {
      return 'employee';
    }
    return 'customer'; // Regular users are customers
  },
};
