// src/components/Layout/Layout.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import {
  logoutUser,
  getUserProfile,
  isAuthenticated as checkAuthStatus,
} from "../../service/apiservice"; // Make sure this path is correct

import "./Layout.css";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  const [sidebarHide, setSidebarHide] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // ---------------------------
  // AUTH CHECK
  // ---------------------------
  useEffect(() => {
    const validateUserAuth = async () => {
      setLoading(true);
      try {
        if (!checkAuthStatus()) {
          setIsAuthenticatedState(false);
          setUser(null);
          if (!location.pathname.includes("/login") && !location.pathname.includes("/signup")) {
            navigate("/login");
          }
          return;
        }

        const userData = await getUserProfile();
        setIsAuthenticatedState(true);
        setUser(userData);

        if (location.pathname === "/login" || location.pathname === "/") {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Auth validation failed:", error);
        logoutUser();
        setIsAuthenticatedState(false);
        setUser(null);

        if (!location.pathname.includes("/login") && !location.pathname.includes("/signup")) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    validateUserAuth();
  }, [location.pathname, navigate]);

  // ---------------------------
  // LOGOUT
  // ---------------------------
  const handleLogout = () => {
    logoutUser();
    setIsAuthenticatedState(false);
    setUser(null);
    navigate("/login");
  };

  // ---------------------------
  // DARK MODE
  // ---------------------------
  const applyDarkMode = (isDark) => {
    if (isDark) {
      document.body.classList.add("dark", "dark-mode");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.body.classList.remove("dark", "dark-mode");
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
    setDarkMode(savedDarkMode);
    applyDarkMode(savedDarkMode);

    const handleResize = () => {
      setSidebarHide(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarHide(!sidebarHide);

  const toggleDarkMode = () => {
    const newDark = !darkMode;
    setDarkMode(newDark);
    localStorage.setItem("darkMode", JSON.stringify(newDark));
    applyDarkMode(newDark);
  };

  // ---------------------------
  // BLOCK LAYOUT ON AUTH PAGES
  // ---------------------------
  const authPages = ["/login", "/signup"];
  const isAuthPage = authPages.some((p) => location.pathname.startsWith(p));
  if (isAuthPage) return children;

  // ---------------------------
  // LOADING SCREEN
  // ---------------------------
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticatedState) return null;

  // ---------------------------
  // MAIN LAYOUT
  // ---------------------------
  return (
    <div className={`layout-wrapper ${darkMode ? "dark-theme" : "light-theme"}`}>
      <Sidebar
        sidebarHidden={sidebarHide}
        darkMode={darkMode}
        user={user}
        toggleSidebar={toggleSidebar}
        onLogout={handleLogout}
      />

      <section id="content" className={sidebarHide ? "sidebar-hidden" : ""}>
        <Navbar
          toggleSidebar={toggleSidebar}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
          user={user}
        />

        <main className="main-content">{children}</main>
      </section>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
