import { useState } from 'react';
import './Login.css';

function LoginPage({ onNavigateToSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log('Login clicked', { username, password, rememberMe });
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

          <div className="input-group">
            <div className="input-wrapper">
              <span className="input-icon">
                <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
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
                className="input-field with-icon-right"
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
          >
            Log in
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
