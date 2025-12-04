const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const api = {
  async login(email, password) {
    try {
      console.log('Attempting login to:', `${API_BASE_URL}/login/`);
      console.log('Email:', email);
      
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      return data;
    } catch (error) {
      console.error('Signup error:', error);
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
    return 'user';
  },
};
