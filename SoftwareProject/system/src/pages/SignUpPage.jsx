import { useState } from 'react';
import './SignupPage.css';
import hoodieImg from '../assets/hoddie.png';
import backgroundVideo from '../assets/Gradient Color and Style Video Background Black Slate Grey in Minimalist Style.mp4';
import logoImg from '../assets/logoo.png';

function SignupPage({ onNavigateToLogin, onSignup }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    setError('');
    
    // Validation
    if (!username || !email || !password || !password2) {
      setError('Please fill in all fields');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await onSignup(username, email, password, password2);
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignup();
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-left-side">
          <div className="signup-background-image">
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
          <h1 className="welcome-text">Join RYYZ Today!</h1>
        </div>

        <div className="signup-right-side">
          <div className="logo-container">
            <img 
              src={logoImg} 
              alt="RYYZ Logo" 
              className="logo-img"
            />
          </div>

          <h2 className="signup-title">Create Account</h2>

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

          {/* Username Field */}
          <div className="input-group">
            <div className="input-wrapper">
              <span className="input-icon">
                <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                className="input-field"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Email Field */}
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
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Field */}
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
                type="button"
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

          {/* Confirm Password Field */}
          <div className="input-group">
            <div className="input-wrapper">
              <span className="input-icon">
                <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              <input
                type={showPassword2 ? "text" : "password"}
                placeholder="Confirm Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                onKeyPress={handleKeyPress}
                className="input-field with-icon-right"
                disabled={isLoading}
              />
              <button
                onClick={() => setShowPassword2(!showPassword2)}
                className="toggle-password-btn"
                type="button"
              >
                <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                  {showPassword2 ? (
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10z" />
                  ) : (
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <button
            onClick={handleSignup}
            className="signup-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign up'}
          </button>

          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">Or</span>
            <div className="divider-line"></div>
          </div>

          <button
            onClick={onNavigateToLogin}
            className="login-btn"
          >
            Already have an account? Log in
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;