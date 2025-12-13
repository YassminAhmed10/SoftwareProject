import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTruck, FaMapMarkerAlt, FaHeadset, FaMobileAlt, FaStar, FaFire } from 'react-icons/fa';
import Header from '../components/Header/Header';
import './Home.css';

// ========== IMAGE IMPORTS ==========
import img1 from '../assets/trending1.jpeg';
import img2 from '../assets/trending2.jpeg';
import img3 from '../assets/trending3.jpeg';
import img4 from '../assets/trending4.jpeg';
import hoodieImg from '../assets/hoddie.png';
import tShirtImg from '../assets/tShirt.jpeg';
import ryyzImage from '../assets/RYYZ.png'; // Import RYYZ image

const Home = ({ darkMode, user, onLogout }) => {

  const handleImageError = (e, fallbackUrl) => {
    console.error("Image failed to load:", e.target.src);
    if (fallbackUrl) {
      e.target.src = fallbackUrl;
    } else {
      e.target.style.display = 'none';
      e.target.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  };

  // ========== MIDDLE SECTION PRODUCTS ==========
  const middleSectionProducts = [
    {
      id: 'mid-1',
      name: "Premium Leather Jacket",
      price: "129.99 LE",
      originalPrice: "189.99 LE",
      discount: "30% OFF",
      image: img4,
      category: "Winter Collection",
      rating: 4.8,
      reviews: 124,
      features: ["Genuine Leather", "Water Resistant", "5 Colors"],
      fallback: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=400&fit=crop"
    },
    {
      id: 'mid-2',
      name: "Designer Hoodie Collection",
      price: "79.99 LE",
      originalPrice: "99.99 LE",
      discount: "20% OFF",
      image: hoodieImg,
      category: "Limited Edition",
      rating: 4.9,
      reviews: 89,
      features: ["Premium Cotton", "Embroidery", "Oversized Fit"],
      fallback: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=400&fit=crop"
    },
    {
      id: 'mid-3',
      name: "Casual T-Shirt Bundle",
      price: "59.99 LE",
      originalPrice: "89.99 LE",
      discount: "33% OFF",
      image: tShirtImg,
      category: "Best Value",
      rating: 4.7,
      reviews: 256,
      features: ["Pack of 3", "Breathable Fabric", "Multiple Colors"],
      fallback: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Classic Blue T-Shirt",
      price: "29.99 LE",
      image: tShirtImg,
      category: "T-Shirts",
      fallback: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Leather Jacket",
      price: "79.99 LE",
      image: img4,
      category: "Jackets",
      fallback: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "White Hoodie",
      price: "49.99 LE",
      image: hoodieImg,
      category: "Hoodies",
      badge: "Popular",
      fallback: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop"
    },
  ];

  const trendingProducts = [
    {
      id: 1,
      name: "Elegant Summer Dress",
      price: "89.99 LE",
      category: "Premium Brand",
      badge: "Best Seller",
      image: img1,
      fallback: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      name: "White Hoodie",
      price: "100 LE",
      category: "Premium Brand",
      badge: "New Arrival",
      image: img2,
      fallback: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      name: "Black Hoodie",
      price: "90 LE",
      category: "Premium Brand",
      badge: "Casual",
      image: img3,
      fallback: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=250&fit=crop"
    },
    {
      id: 4,
      name: "Leather Jacket",
      price: "100 LE",
      category: "Premium Brand",
      badge: "Outerwear",
      image: img4,
      fallback: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=250&fit=crop"
    },
  ];

  return (
    <div className={`home ${darkMode ? 'dark' : ''}`}>
      <Header user={user} onLogout={onLogout} />

      {/* HERO SECTION WITH IMAGE BACKGROUND */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1>RYYZ Brand</h1>
            <h2>Discover Your Perfect Look</h2>
            <p className="hero-subtitle">
              Elevate Your Wardrobe with Premium Fashion
            </p>
          </div>
          <div className="hero-product-image">
            <img 
              src={hoodieImg} 
              alt="Hoodie" 
              className="hero-tshirt"
              onError={(e) => {
                console.error("Hoodie image failed to load");
                e.target.style.display = 'none';
              }}
            />
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
              <p>On Orders Over 50 LE</p>
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

      {/* TRENDING NOW */}
      <section className="trending-now">
        <div className="container">
          <h2>Trending Now</h2>
          <div className="trending-grid">
            {trendingProducts.map(product => (
              <div key={product.id} className="trending-card">
                <div className="trending-badge">{product.badge}</div>
                <div className="trending-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="trending-product-image"
                    onError={(e) => handleImageError(e, product.fallback)}
                  />
                </div>
                <div className="trending-card-content">
                  <div className="brand-logo">{product.name.split(" ")[0]}</div>
                  <div className="brand-name">Premium</div>
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <span className="product-price">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RYYZ IMAGE SECTION */}
      <section className="ryyz-image-section">
        <div className="container">
          <div className="ryyz-image-container">
            <img 
              src={ryyzImage} 
              alt="RYYZ" 
              className="ryyz-image"
              onError={(e) => {
                console.error("RYYZ image failed to load");
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>
      </section>

      {/* ========== MIDDLE SECTION ========== */}
      <section className="middle-section">
        <div className="container">
          <div className="section-header">
            <h2>
              <FaFire className="header-icon" />
              Special Offers
              <span className="header-subtitle">Limited Time Deals</span>
            </h2>
            <p className="section-description">
              Don't miss out on our exclusive limited-time offers. Premium quality at unbeatable prices.
            </p>
          </div>

          <div className="middle-products-grid">
            {middleSectionProducts.map(product => (
              <div key={product.id} className="middle-product-card">
                <div className="product-discount">{product.discount}</div>
                
                <div className="middle-product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => handleImageError(e, product.fallback)}
                  />
                  <div className="product-overlay">
                    <button className="quick-view-btn">Quick View</button>
                    <button className="add-to-cart-btn">Add to Cart</button>
                  </div>
                </div>

                <div className="middle-product-info">
                  <div className="product-header">
                    <span className="product-category">{product.category}</span>
                    <div className="product-rating">
                      <FaStar className="star-icon" />
                      <span>{product.rating}</span>
                      <span className="reviews">({product.reviews} reviews)</span>
                    </div>
                  </div>

                  <h3 className="product-name">{product.name}</h3>

                  <div className="price-section">
                    <span className="current-price">{product.price}</span>
                    <span className="original-price">{product.originalPrice}</span>
                  </div>

                  <div className="product-features">
                    {product.features.map((feature, index) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))}
                  </div>

                  <div className="product-actions">
                    <button className="buy-now-btn">Buy Now</button>
                    <button className="wishlist-btn">
                      <FaStar />
                    </button>
                  </div>
                </div>
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
                  <img 
                    src={product.image} 
                    alt={product.name}
                    onError={(e) => handleImageError(e, product.fallback)}
                  />
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
              <p>Your premium fashion destination for style and comfort</p>
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