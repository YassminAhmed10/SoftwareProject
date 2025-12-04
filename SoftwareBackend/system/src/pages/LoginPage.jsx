import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../service/apiservice';
import './Login.css';

function LoginPage() { // Remove the prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    
    try {
      const response = await loginUser({ email, password });
      
      console.log('Login response:', response);
      
      if (response.success) {
        // Save user data
        const userData = {
          email: email,
          role: response.role || 'User',
          name: response.role === 'Admin' ? 'Admin User' : 'Regular User'
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        
        console.log('User data saved:', userData);
        console.log('isLoggedIn:', localStorage.getItem('isLoggedIn'));
        console.log('auth_token:', localStorage.getItem('auth_token'));
        
        // Force page reload to ensure ProtectedRoute picks up the auth state
        window.location.href = '/dashboard';
      } else {
        setError(response.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left-side">
          <div className="login-background-image">
            <img 
              src="src/assets/bb.jpg" 
              alt="Background" 
              className="background-img"
            />
          </div>
          <h1 className="welcome-text">Welcome Back!</h1>
        </div>

        <div className="login-right-side">
          <div className="logo-container">
            <img 
              src="src/assets/RYYZstore.jpg" 
              alt="RYYZ Logo" 
              className="logo-img"
            />
          </div>

          <h2 className="login-title">Log in</h2>
          
          {/* Error message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="input-group">
            <div className="input-wrapper">
              <span className="input-icon">
                <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="input-field"
                disabled={loading}
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <span className="input-icon">
                <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="input-field with-icon-right"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password-btn"
                disabled={loading}
              >
                <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                  {showPassword ? (
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10z" />
                  ) : (
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div className="login-options">
            <label className="remember-me-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox"
                disabled={loading}
              />
              <span className="checkbox-text">Remember Me</span>
            </label>
            <button 
              type="button"
              className="forgot-password-btn"
              disabled={loading}
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password?
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="login-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>

          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">Or</span>
            <div className="divider-line"></div>
          </div>

          {/* FIXED: Use navigate directly */}
          <button
            onClick={() => navigate('/signup')}
            className="signup-btn"
            disabled={loading}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;