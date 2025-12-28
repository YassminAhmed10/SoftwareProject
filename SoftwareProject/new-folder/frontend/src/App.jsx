import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import AdminLayout from './components/Layout/AdminLayout';
import EmployeeLayout from './components/Layout/EmployeeLayout';
import Dashboard from './pages/Admin/Dashboard';
import EmployeeDashboard from './pages/Employee/EmployeeDashboard';
import AdminAllOrders from './pages/Admin/AdminAllOrders';
import EmployeeAllOrders from './pages/Employee/EmployeeAllOrders';
import AdminOrderDetails from './pages/Admin/AdminOrderDetails';
import EmployeeOrderDetails from './pages/Employee/EmployeeOrderDetails';
import AdminSettings from './pages/Admin/AdminSettings';
import EmployeeSettings from './pages/Employee/EmployeeSettings';
import NewRequests from './pages/Employee/NewRequests';
import AddProduct from './pages/Employee/AddProduct';
import MyStore from './pages/Admin/MyStore';
import Analytics from './pages/Admin/Analytics';
import Finance from './pages/Admin/Finance';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout'; // Add this import
import OrderConfirmation from './pages/orderconfirmation'; // Add this import
import Wishlist from './pages/Wishlist';
import MenProducts from './pages/MenProducts';
import WomenProducts from './pages/WomenProducts';
import MyAccount from './pages/MyAccount';
import ProductDetails from './pages/ProductDetails';
import { CartProvider } from './Contexts/CartContext';
import { api } from './services/api';
import Chatbot from './components/Chatbot/Chatbot';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('accessToken');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData, tokens) => {
    const userWithRole = {
      ...userData,
      role: api.getUserRole(userData.email),
    };
    console.log('Login - User data:', userData);
    console.log('Login - User with role:', userWithRole);
    console.log('Login - Tokens:', tokens);
    setUser(userWithRole);
    localStorage.setItem('user', JSON.stringify(userWithRole));
    localStorage.setItem('accessToken', tokens.access);
    localStorage.setItem('refreshToken', tokens.refresh);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  // Determine dashboard route based on role
  const getDashboardRoute = () => {
    if (!user) return '/';
    if (user.role === 'admin') return '/admin/dashboard';
    if (user.role === 'employee') return '/employee/dashboard';
    return '/home'; // Customers go to home page
  };

  // Protected Route Component
  const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return <Navigate to={getDashboardRoute()} replace />;
    }
    return <>{children}</>;
  };

  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    allowedRoles: PropTypes.array
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Routes>
          {/* Login Route - Default Page */}
          <Route 
            path="/" 
            element={user ? <Navigate to={getDashboardRoute()} replace /> : <LoginPageWrapper onLogin={login} />}
          />
          
          <Route 
            path="/login" 
            element={user ? <Navigate to={getDashboardRoute()} replace /> : <LoginPageWrapper onLogin={login} />}
          />

          {/* Register/Signup Route */}
          <Route 
            path="/register" 
            element={user ? <Navigate to={getDashboardRoute()} replace /> : <SignUpPageWrapper onLogin={login} />}
          />

          {/* Customer Home Page */}
          <Route 
            path="/home"
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <Home user={user} onLogout={logout} />
              </ProtectedRoute>
            }
          />

          {/* Shopping Cart Route */}
          <Route 
            path="/cart"
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <ShoppingCart user={user} onLogout={logout} />
              </ProtectedRoute>
            }
          />

          {/* Checkout Route - UPDATED */}
          <Route 
            path="/checkout"
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <Checkout user={user} onLogout={logout} />
              </ProtectedRoute>
            }
          />

          {/* Order Confirmation Route - NEW */}
          <Route 
            path="/order-confirmation"
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <OrderConfirmation user={user} onLogout={logout} />
              </ProtectedRoute>
            }
          />

          {/* Wishlist Route */}
          <Route 
            path="/wishlist"
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <Wishlist user={user} onLogout={logout} />
              </ProtectedRoute>
            }
          />

          {/* Men Products Route */}
          <Route 
            path="/men"
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <MenProducts user={user} onLogout={logout} />
              </ProtectedRoute>
            }
          />

          {/* Women Products Route */}
          <Route 
            path="/women"
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <WomenProducts user={user} onLogout={logout} />
              </ProtectedRoute>
            }
          />

          {/* My Account Route */}
          <Route 
            path="/my-account"
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <MyAccount user={user} onLogout={logout} />
              </ProtectedRoute>
            }
          />

          {/* Product Details Route */}
          <Route 
            path="/product/:id"
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <ProductDetails user={user} onLogout={logout} />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route 
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/admin/mystore"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout>
                  <MyStore />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/admin/analytics"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout>
                  <Analytics />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/admin/orders"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout>
                  <AdminAllOrders />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/admin/order/:orderId"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout>
                  <AdminOrderDetails />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/admin/finance"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout>
                  <Finance />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/admin/settings"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout>
                  <AdminSettings />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          
          {/* Employee Routes */}
          <Route 
            path="/employee/dashboard"
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <EmployeeLayout>
                  <EmployeeDashboard />
                </EmployeeLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/employee/orders"
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <EmployeeLayout>
                  <EmployeeAllOrders />
                </EmployeeLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/employee/order/:orderId"
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <EmployeeLayout>
                  <EmployeeOrderDetails />
                </EmployeeLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/employee/requests"
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <EmployeeLayout>
                  <NewRequests />
                </EmployeeLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/employee/add-product"
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <EmployeeLayout>
                  <AddProduct />
                </EmployeeLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/employee/settings"
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <EmployeeLayout>
                  <EmployeeSettings />
                </EmployeeLayout>
              </ProtectedRoute>
            }
          />

          {/* Legacy Routes - Redirect based on role */}
          <Route 
            path="/dashboard"
            element={user ? <Navigate to={getDashboardRoute()} replace /> : <Navigate to="/" replace />}
          />
          
          <Route 
            path="/orders"
            element={user ? <Navigate to={user.role === 'admin' ? '/admin/orders' : '/employee/orders'} replace /> : <Navigate to="/" replace />}
          />
          
          <Route 
            path="/order/:orderId"
            element={user ? <Navigate to={user.role === 'admin' ? '/admin/orders' : '/employee/orders'} replace /> : <Navigate to="/" replace />}
          />
          
          <Route 
            path="/settings"
            element={user ? <Navigate to={user.role === 'admin' ? '/admin/settings' : '/employee/settings'} replace /> : <Navigate to="/" replace />}
          />
          
          <Route 
            path="/requests"
            element={user ? <Navigate to="/employee/requests" replace /> : <Navigate to="/" replace />}
          />
          
          <Route 
            path="/add-product"
            element={user ? <Navigate to="/employee/add-product" replace /> : <Navigate to="/" replace />}
          />
          
          {/* Logout Route */}
          <Route 
            path="/logout"
            element={<LogoutHandler onLogout={logout} />}
          />

          {/* Fallback to Login for all other routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {/* Chatbot - Only available for customers */}
        {user && user.role === 'customer' && <Chatbot />}
      </div>
    </Router>
    </CartProvider>
  );
}

// Wrapper component for LoginPage to handle navigation
function LoginPageWrapper({ onLogin }) {
  const navigate = useNavigate();
  
  const handleLogin = async (email, password) => {
    try {
      const response = await api.login(email, password);
      onLogin(response.user, response.tokens);
      const role = api.getUserRole(response.user.email);
      // Route based on role
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'employee') {
        navigate('/employee/dashboard');
      } else {
        navigate('/home'); // Customer goes to home page
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Let LoginPage handle the error display
    }
  };
  
  return (
    <LoginPage 
      onNavigateToSignup={() => navigate('/register')}
      onLogin={handleLogin}
    />
  );
}

LoginPageWrapper.propTypes = {
  onLogin: PropTypes.func.isRequired
};

// Wrapper component for SignUpPage to handle navigation
function SignUpPageWrapper({ onLogin }) {
  const navigate = useNavigate();
  
  const handleSignUp = async (username, email, password, confirmPassword) => {
    try {
      console.log('SignUpPageWrapper - Calling api.signup with:', { 
        username, 
        email, 
        password, 
        confirmPassword 
      });
      
      // CALL API WITH OBJECT, NOT SEPARATE PARAMETERS
      const response = await api.signup(username, email, password, confirmPassword);
      
      console.log('SignUpPageWrapper - Signup response:', response);
      
      // Check if response has user data
      if (response.user && response.tokens) {
        onLogin(response.user, response.tokens);
        
        const role = api.getUserRole(response.user.email);
        console.log('SignUpPageWrapper - User role:', role);
        
        // Route based on role
        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else if (role === 'employee') {
          navigate('/employee/dashboard');
        } else {
          navigate('/home');
        }
      } else {
        // Handle case where response structure is different
        console.error('Unexpected response structure:', response);
        throw new Error('Signup successful but unexpected response format');
      }
    } catch (error) {
      console.error('Signup error in wrapper:', error);
      
      // Try to parse the error message
      try {
        const errorData = JSON.parse(error.message);
        if (errorData.username) {
          throw new Error(`Username: ${errorData.username[0]}`);
        }
        if (errorData.email) {
          throw new Error(`Email: ${errorData.email[0]}`);
        }
        if (errorData.password) {
          throw new Error(`Password: ${errorData.password[0]}`);
        }
        throw new Error(error.message);
      } catch (parseError) {
        // If it's not JSON, use the original error
        throw error;
      }
    }
  };
  
  return (
    <SignUpPage 
      onNavigateToLogin={() => navigate('/login')}
      onSignup={handleSignUp}
    />
  );
}
SignUpPageWrapper.propTypes = {
  onLogin: PropTypes.func.isRequired
};

// Logout Handler Component
function LogoutHandler({ onLogout }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    onLogout();
    navigate('/');
  }, [onLogout, navigate]);
  
  return null;
}

LogoutHandler.propTypes = {
  onLogout: PropTypes.func.isRequired
};

export default App;