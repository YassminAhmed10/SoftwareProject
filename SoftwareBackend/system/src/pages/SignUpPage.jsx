import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../service/apiservice";
import './SignUpPage.css';

function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await signupUser({ name: fullName, email, password });
      
      console.log('Signup response:', response);
      
      if (response.success) {
        // Save user data
        localStorage.setItem('customerData', JSON.stringify(response.user));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userType', 'customer');
        
        if (onSignupSuccess) onSignupSuccess(response.user);
        navigate("/dashboard");
      } else {
        setError(response.message || "Signup failed");
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.error || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignup(e);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-left-side">
          <div className="signup-background-image">
            <img 
              src="src/assets/bb.jpg" 
              alt="Welcome" 
              className="background-img"
            />
          </div>
          <h1 className="welcome-text">Join Us!</h1>
        </div>

        <div className="signup-right-side">
          <div className="logo-container">
            <img 
              src="src/assets/RYYZstore.jpg" 
              alt="RYYZ Store" 
              className="logo-img"
            />
          </div>

          <h2 className="signup-title">Create Account</h2>
          
          {/* Error message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="form-input"
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="form-input"
                disabled={loading}
                required
              />
            </div>

            <div className="password-row">
              <div className="form-group-half">
                <label className="form-label">Password</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="form-input password-input"
                    disabled={loading}
                    required
                    minLength="6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="toggle-password-btn"
                    disabled={loading}
                    aria-label={showPassword ? "Hide password" : "Show password"}
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
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="form-input"
                  disabled={loading}
                  required
                  minLength="6"
                />
              </div>
            </div>

            <button
              type="submit"
              className="create-account-btn"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">Already have an account?</span>
            <div className="divider-line"></div>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="login-btn"
            disabled={loading}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;