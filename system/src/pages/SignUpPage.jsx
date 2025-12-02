import { useState } from 'react';
import PropTypes from 'prop-types';
import './SignUpPage.css';
import { registerUser } from '../service/apiservice';
import bgImage from '../assets/bb.jpg';
import logoImage from '../assets/RYYZstore.jpg';

function SignUpPage({ onNavigateToLogin, onSignupSuccess }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate inputs
    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser(fullName, email, password);
      console.log('Signup successful:', response);
      
      // Call the success callback to navigate to dashboard
      if (onSignupSuccess) {
        onSignupSuccess(response.user);
      }
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-left-side">
          <div className="signup-background-image">
            <img 
              src={bgImage}
              alt="Background" 
              className="background-img"
            />
          </div>
          <h1 className="welcome-text">Welcome!</h1>
        </div>

        <div className="signup-right-side">
          <div className="logo-container">
            <img 
              src={logoImage}
              alt="RYYZ Logo" 
              className="logo-img"
            />
          </div>

          <h2 className="signup-title">Sign up</h2>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              placeholder="Daniel Gallego"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              placeholder="hello@reallygreatsite.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="password-row">
            <div className="form-group-half">
              <label className="form-label">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input password-input"
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

            <div className="form-group-half">
              <label className="form-label">Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input password-input"
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="toggle-password-btn"
                >
                  <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                    {showConfirmPassword ? (
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10z" />
                    ) : (
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleSignUp}
            disabled={loading}
            className="create-account-btn"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
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
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;

SignUpPage.propTypes = {
  onNavigateToLogin: PropTypes.func.isRequired,
  onSignupSuccess: PropTypes.func,
};
