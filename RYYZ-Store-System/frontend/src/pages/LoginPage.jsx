import { useState } from 'react';
import './Login.css';
import hoodieImg from '../assets/hoddie.png';
import backgroundVideo from '../assets/Gradient Color and Style Video Background Black Slate Grey in Minimalist Style.mp4';
import logoImg from '../assets/logoo.png';

function LoginPage({ onNavigateToSignup, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      await onLogin(email, password);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left-side">
          <div className="login-background-image">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              preload="auto"
              className="background-video"
              onLoadedData={(e) => {
                e.target.playbackRate = 1.5;
                e.target.play();
              }}
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          </div>
          <div className="hoodie-image-container">
            <img 
              src={hoodieImg} 
              alt="Hoodie" 
              className="hoodie-img"
            />
          </div>
          <h1 className="welcome-text">Welcome Back!</h1>
        </div>

        <div className="login-right-side">
          <div className="logo-container">
            <img 
              src={logoImg} 
              alt="RYYZ Logo" 
              className="logo-img"
            />
          </div>

          <h2 className="login-title">Log in</h2>

          {error && (
            <div style={{ 
              color: '#ef4444', 
              backgroundColor: '#fee2e2', 
              padding: '12px', 
              borderRadius: '8px', 
              marginBottom: '16px',
              fontSize: '14px'
            }}>
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
                type="text"
                placeholder="Email or Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="input-field"
                disabled={isLoading}
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
                disabled={isLoading}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password-btn"
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
              />
              <span className="checkbox-text">Remember Me</span>
            </label>
            <button className="forgot-password-btn">
              Forgot Password?
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>

          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">Or</span>
            <div className="divider-line"></div>
          </div>

          <button
            onClick={onNavigateToSignup}
            className="signup-btn"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
