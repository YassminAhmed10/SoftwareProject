import React from 'react';
import { Link } from 'react-router-dom';
import { FaTruck, FaMapMarkerAlt, FaHeadset, FaMobileAlt, FaSearch, FaUser } from 'react-icons/fa';
import './Home.css';
import img1 from '../assets/trending1.jpeg';
import img2 from '../assets/trending2.jpeg';
import img3 from '../assets/trending3.jpeg';
import img4 from '../assets/trending4.jpeg';
import hoodieImg from '../assets/hoddie.png';
import tShirt from '../assets/tShirt.jpeg';


const Home = ({ darkMode, user, onLogout }) => {

  // ========== FEATURED PRODUCTS ==========
  const featuredProducts = [
    {
      id: 1,
      name: "Classic Blue T-Shirt",
      price: "$29.99",
      image: tShirt,
      category: "T-Shirts"
    },
    {
      id: 2,
      name: "Leather Jacket",
      price: "$79.99",
      image: img4,
      category: "Jackets"
    },
    {
      id: 3,
      name: "White Hoodie",
      price: "$49.99",
      image: hoodieImg,
      category: "Hoodies",
      badge: "Popular"
    },
    
  ];

  // ========== TRENDING PRODUCTS (UPDATED WITH IMAGES) ==========
  const trendingProducts = [
    {
      id: 1,
      name: "Elegant Summer Dress",
      price: "$89.99",
      category: "Premium Brand",
      badge: "Best Seller",
      image: img1
    },
     
    {
      id: 2,
      name: "White Hoodie",
      price: "$100",
      category: "Premium Brand",
      badge: "New arrival",
      image: img2
    },
    
    {
      id: 3,
      name: "Black Hoodie",
      price: "$90",
      category: "Premium Brand",
      badge: "Casual",
      image: img3
    },
    
    {
      id: 4,
      name: "Leather Jacket",
      price: "$100",
      category: "Premium Brand",
      badge: "Outerwear",
      image: img4
    },

    
    
    
  ];

  return (
    <div className={`home ${darkMode ? 'dark' : ''}`}>

      {/* TOP NAVIGATION */}
      <nav className="top-navbar">
        <div className="nav-container">

          <div className="nav-logo">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2>RYYZ Store</h2>
            </Link>
          </div>

          <div className="category-nav">
            <Link to="/men" className="category-link">Men</Link>
            <Link to="/women" className="category-link">Women</Link>
            <Link to="/my-orders" className="category-link">My Orders</Link>
          </div>

          <div className="nav-actions">
            <div className="search-bar">
              <input type="text" placeholder="Search products..." className="search-input" />
              <button className="search-btn">
                <FaSearch />
              </button>
            </div>

            <div className="user-section">
              {user ? (
                <>
                  <Link to="/dashboard" className="nav-link">
                    <FaUser className="nav-icon" />
                    My Account
                  </Link>
                  <button onClick={onLogout} className="nav-link logout-btn">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">
                    <FaUser className="nav-icon" />
                    Login
                  </Link>
                  <Link to="/register" className="nav-link register-btn">
                    Register
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-simple">
        <div className="hero-simple-content">
          <div className="hero-simple-text">
            <h1>Style, Quality & Comfort</h1>
            <h2>Discover Your Perfect Look</h2>
            <p className="hero-simple-subtitle">
              Elevate Your Wardrobe with Premium Fashion
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="features-grid">
        <div className="container">
          <div className="features-row">
            <div className="feature-box">
              <div className="feature-icon"><FaTruck /></div>
              <h3>Free Delivery</h3>
              <p>On Orders Over $50</p>
            </div>
            <div className="feature-box">
              <div className="feature-icon"><FaMapMarkerAlt /></div>
              <h3>Store Pickup</h3>
              <p>Collect Your Order Today</p>
            </div>
            <div className="feature-box">
              <div className="feature-icon"><FaHeadset /></div>
              <h3>Style Support</h3>
              <p>Fashion Advice 24/7</p>
            </div>
            <div className="feature-box">
              <div className="feature-icon"><FaMobileAlt /></div>
              <h3>Mobile Shopping</h3>
              <p>Download Our App</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING NOW (UPDATED) */}
      <section className="trending-now">
        <div className="container">
          <h2>Trending Now</h2>

          <div className="trending-grid">
            {trendingProducts.map(product => (
              <div key={product.id} className="trending-card">

                <div className="trending-badge">{product.badge}</div>

                {/* PRODUCT IMAGE */}
                <div className="trending-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="trending-product-image"
                    onError={(e) => {
                      console.error("Image failed:", product.image);
                      e.target.src =
                        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400";
                    }}
                  />
                </div>

                <div className="brand-logo">
                  {product.name.split(" ")[0]}
                </div>

                <div className="brand-name">Brand</div>

                <h3 className="product-title">{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <span className="product-price">{product.price}</span>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured-products">
        <div className="container">
          <h2>Featured Collection</h2>

          <div className="products-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <span className="product-price">{product.price}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">

            <div className="footer-section">
              <h3>RYYZ Store</h3>
              <p>Your premium fashion destination</p>
            </div>

            <div className="footer-section">
              <h4>Shop</h4>
              <Link to="/men">Men's Collection</Link>
              <Link to="/women">Women's Collection</Link>
              <Link to="/new-arrivals">New Arrivals</Link>
              <Link to="/bestsellers">Best Sellers</Link>
            </div>

            <div className="footer-section">
              <h4>Support</h4>
              <Link to="/help">Style Guide</Link>
              <Link to="/shipping">Shipping Info</Link>
              <Link to="/returns">Returns & Exchanges</Link>
              <Link to="/size-guide">Size Guide</Link>
            </div>

            <div className="footer-section">
              <h4>Contact Info</h4>
              <p>Email: support@ryyzstore.com</p>
              <p>Phone: 01118801218</p>
            </div>

          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 RYYZ Store. All rights reserved.</p>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default Home;
