// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { DarkModeProvider } from "./Contexts/DarkModeContext";
import "./App.css";

import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import OrderDetails from "./pages/OrderDetails";
import MyStore from "./pages/MyStore";
import Analytics from "./pages/Analytics";
import AllOrders from "./pages/AllOrders";
import Finance from "./pages/Finance";
import Settings from "./pages/Settings";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import { isAuthenticated } from "./service/apiservice";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  const handleLoginSuccess = (user) => {
    console.log("User logged in:", user);
    setAuthenticated(true);
  };

  const handleSignupSuccess = (user) => {
    console.log("User signed up:", user);
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          {!authenticated ? (
            <>
              <Route
                path="/login"
                element={
                  <LoginPage
                    onLoginSuccess={handleLoginSuccess}
                    onNavigateToSignup={() => window.location.href = "/signup"}
                  />
                }
              />
              <Route
                path="/signup"
                element={
                  <SignUpPage
                    onSignupSuccess={handleSignupSuccess}
                    onNavigateToLogin={() => window.location.href = "/login"}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              {/* Protected routes */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route
                path="/dashboard"
                element={
                  <Layout onLogout={handleLogout}>
                    <Dashboard />
                  </Layout>
                }
              />
              <Route
                path="/order/:orderId"
                element={
                  <Layout onLogout={handleLogout}>
                    <OrderDetails />
                  </Layout>
                }
              />
              <Route
                path="/my-store"
                element={
                  <Layout onLogout={handleLogout}>
                    <MyStore />
                  </Layout>
                }
              />
              <Route
                path="/analytics"
                element={
                  <Layout onLogout={handleLogout}>
                    <Analytics />
                  </Layout>
                }
              />
              <Route
                path="/orders"
                element={
                  <Layout onLogout={handleLogout}>
                    <AllOrders />
                  </Layout>
                }
              />
              <Route
                path="/finance"
                element={
                  <Layout onLogout={handleLogout}>
                    <Finance />
                  </Layout>
                }
              />
              <Route
                path="/settings"
                element={
                  <Layout onLogout={handleLogout}>
                    <Settings />
                  </Layout>
                }
              />
              {/* Redirect login/signup to dashboard if authenticated */}
              <Route path="/login" element={<Navigate to="/dashboard" replace />} />
              <Route path="/signup" element={<Navigate to="/dashboard" replace />} />
            </>
          )}
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
