// src/components/Layout/Sidebar.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaShoppingBag, FaSync } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoBagAddSharp, IoLogOutOutline } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import "../Layout.css";

function Sidebar({ sidebarHidden, toggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [settingsMenu, setSettingsMenu] = useState(false);

  const isSettingsActive = [
    "/setting/profile",
    "/setting/changepassword",
    "/setting/settingdelete",
  ].includes(location.pathname);

  const toggleSettingsMenu = () => setSettingsMenu(!settingsMenu);
  const handleLogout = () => navigate("/login", { replace: true });

  const getNavLinkClassName = (path) => location.pathname === path ? "active" : "";

  return (
    <div id="sidebar" className={sidebarHidden ? "hide" : ""}>
      <Link to="/" className="logo">
        <img
          src="https://cdn.staticcrate.com/stock-hd/effects/footagecrate-black-bright-streak-uphd-gai7y1f5-Thumb.png"
          alt="Logo"
        />
      </Link>

      <ul className="list">
        <li className={getNavLinkClassName("/")}>
          <Link to="/"><FaTachometerAlt /> Dashboard</Link>
        </li>
        <li className={getNavLinkClassName("/customer")}>
          <Link to="/customer"><FaUsers /> Customers</Link>
        </li>
        <li className={getNavLinkClassName("/category")}>
          <Link to="/category"><BiSolidCategoryAlt /> Category</Link>
        </li>
        <li className={getNavLinkClassName("/addproduct")}>
          <Link to="/addproduct"><IoBagAddSharp /> Add Product</Link>
        </li>
        <li className={getNavLinkClassName("/manageproducts")}>
          <Link to="/manageproducts"><FaShoppingBag /> Manage Products</Link>
        </li>
        <li className={getNavLinkClassName("/sales")}>
          <Link to="/sales"><FaSync /> Sales</Link>
        </li>
        <li className={getNavLinkClassName("/analytics")}>
          <Link to="/analytics"><TbReportAnalytics /> Analytics</Link>
        </li>
        <li className={isSettingsActive ? "active" : ""}>
          <Link onClick={toggleSettingsMenu}><CiSettings /> Settings</Link>
          {settingsMenu && (
            <div className="dropdown">
              <Link to="/setting/profile">Profile</Link>
              <Link to="/setting/changepassword">Change Password</Link>
              <Link to="/setting/settingdelete">Delete Account</Link>
            </div>
          )}
        </li>
      </ul>

      <button className="logout" onClick={handleLogout}>
        <IoLogOutOutline /> Logout
      </button>

      <button className="toggle-sidebar" onClick={toggleSidebar}>
        {sidebarHidden ? "Open" : "Close"}
      </button>
    </div>
  );
}

Sidebar.propTypes = {
  sidebarHidden: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
