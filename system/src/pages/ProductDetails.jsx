// src/pages/ProductDetails.jsx - UPDATED WITH CORRECT PRICING
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Heart, ShieldCheck, Truck, RotateCcw, Check } from 'lucide-react';
import './ProductDetails.css';

// Import the mockProducts from ProductPage to ensure consistency
const CATEGORY_PRICES = {
  'T-Shirts': {
    basePrice: 400,
    discountPrice: 350,
    discountPercentage: 12
  },
  'Hoodies': {
    basePrice: 600,
    discountPrice: 550,
    discountPercentage: 8
  },
  'Jackets': {
    basePrice: 800,
    discountPrice: 700,
    discountPercentage: 12
  },
  'Sweaters': {
    basePrice: 550,
    discountPrice: 500,
    discountPercentage: 9
  }
};

// Import images (same as ProductPage)
import jacketImage from '../assets/jacket.png';
import hoodie4Image from '../assets/hoodie4.png';
import hoodie2Image from '../assets/hoodie2.png';
import hoddieImage from '../assets/hoddie.png';
import tshirtImage from '../assets/tshirt.png';
import pinkHoodieImage from '../assets/pinkHoodie.png';

// Mock products data - CORRECTED: Classic T-Shirt now has only Navy color
const mockProducts = [
  {
    id: 1,
    name: 'Leather Jacket',
    description: 'Genuine leather jacket with asymmetrical zip and snap collar.',
    basePrice: CATEGORY_PRICES.Jackets.basePrice,
    discountPrice: CATEGORY_PRICES.Jackets.discountPrice,
    category: 'Jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black'],
    image: jacketImage,
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    isNew: true,
    discountPercentage: CATEGORY_PRICES.Jackets.discountPercentage
  },
  {
    id: 2,
    name: 'Classic T-Shirt',
    description: '100% cotton comfortable t-shirt for everyday wear',
    basePrice: CATEGORY_PRICES['T-Shirts'].basePrice,
    discountPrice: CATEGORY_PRICES['T-Shirts'].discountPrice,
    category: 'T-Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Navy'],
    image: tshirtImage,
    rating: 4.2,
    reviewCount: 89,
    inStock: true,
    isNew: false,
    discountPercentage: CATEGORY_PRICES['T-Shirts'].discountPercentage
  },
  {
    id: 3,
    name: 'Ocean Striped Sweater',
    description: 'Navy and white striped cotton-blend sweater with raglan sleeves.',
    basePrice: CATEGORY_PRICES.Sweaters.basePrice,
    discountPrice: CATEGORY_PRICES.Sweaters.discountPrice,
    category: 'Sweaters',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'White'],
    image: hoodie4Image,
    rating: 4.8,
    reviewCount: 56,
    inStock: true,
    isNew: true,
    discountPercentage: CATEGORY_PRICES.Sweaters.discountPercentage
  },
  {
    id: 4,
    name: 'Black Pullover Hoodie',
    description: 'Heavyweight cotton pullover hoodie with front pocket.',
    basePrice: CATEGORY_PRICES.Hoodies.basePrice,
    discountPrice: CATEGORY_PRICES.Hoodies.discountPrice,
    category: 'Hoodies',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    image: hoodie2Image,
    rating: 4.4,
    reviewCount: 42,
    inStock: true,
    isNew: false,
    discountPercentage: CATEGORY_PRICES.Hoodies.discountPercentage
  },
  {
    id: 5,
    name: 'Cloud White Hoodie',
    description: 'Thick, premium white hoodie with a smooth finish and drawstrings.',
    basePrice: CATEGORY_PRICES.Hoodies.basePrice,
    discountPrice: CATEGORY_PRICES.Hoodies.discountPrice,
    category: 'Hoodies',
    sizes: ['S', 'M', 'L'],
    colors: ['White', 'Beige'],
    image: hoddieImage,
    rating: 4.6,
    reviewCount: 75,
    inStock: true,
    isNew: true,
    discountPercentage: CATEGORY_PRICES.Hoodies.discountPercentage
  },
  {
    id: 6,
    name: 'Rose Zip Hoodie',
    description: 'Light pink full-zip hoodie, perfect for layering.',
    basePrice: CATEGORY_PRICES.Hoodies.basePrice,
    discountPrice: null,
    category: 'Hoodies',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Pink'],
    image: pinkHoodieImage,
    rating: 4.1,
    reviewCount: 50,
    inStock: false,
    isNew: true,
    discountPercentage: 0
  },
];

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Load product and initial states
  useEffect(() => {
    const foundProduct = mockProducts.find(p => p.id === parseInt(productId));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes?.[0] || 'M');
      
      // Check if item is already in wishlist
      const savedWishlist = JSON.parse(localStorage.getItem('ecommerceWishlistItems') || '[]');
      setIsWishlisted(savedWishlist.some(item => item.id === foundProduct.id));
    }
  }, [productId]);

  // Format price in L.E with proper decimal handling - UPDATED
  const formatPrice = (price) => {
    if (price === null || price === undefined) return '';
    
    // If price has decimal places, show them, otherwise show as integer
    const formattedPrice = price % 1 === 0 
      ? price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
      : price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    return `${formattedPrice} L.E`;
  };

  if (!product) return <div className="loading-state">Loading Product...</div>;

  // Calculate discount percentage if applicable
  const discountPercentage = product.discountPrice
    ? Math.round(((product.basePrice - product.discountPrice) / product.basePrice) * 100)
    : 0;

  // --- ADD TO CART LOGIC ---
  const handleAddToCart = () => {
    if (!product.inStock) {
      alert('This item is currently out of stock');
      return;
    }

    const cartItem = {
      ...product,
      itemId: `${product.id}-${selectedSize}`, // Unique ID for specific size
      quantity: 1,
      selectedSize,
      // Use discountPrice if available, otherwise use basePrice
      price: product.discountPrice || product.basePrice
    };

    const existingCart = JSON.parse(localStorage.getItem('ecommerceCartItems') || '[]');
    const itemIndex = existingCart.findIndex(item => item.itemId === cartItem.itemId);

    if (itemIndex >= 0) {
      existingCart[itemIndex].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('ecommerceCartItems', JSON.stringify(existingCart));
    
    // UI Feedback
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // --- WISHLIST TOGGLE LOGIC ---
  const handleWishlistToggle = () => {
    const savedWishlist = JSON.parse(localStorage.getItem('ecommerceWishlistItems') || '[]');
    let updatedWishlist;

    if (isWishlisted) {
      updatedWishlist = savedWishlist.filter(item => item.id !== product.id);
      setIsWishlisted(false);
    } else {
      updatedWishlist = [...savedWishlist, { 
        ...product, 
        addedDate: new Date().toISOString().split('T')[0],
        // Use discountPrice if available, otherwise use basePrice
        price: product.discountPrice || product.basePrice
      }];
      setIsWishlisted(true);
    }

    localStorage.setItem('ecommerceWishlistItems', JSON.stringify(updatedWishlist));
  };

  return (
    <div className="product-details-wrapper">
      <div className="custom-container">
        <Link to="/products" className="back-navigation">
          <ArrowLeft size={18} /> <span>Back to Collection</span>
        </Link>

        <div className="product-main-grid">
          <div className="image-showcase">
            <div className="main-image-frame">
              <img src={product.image} alt={product.name} />
              {product.isNew && <span className="premium-tag">New Arrival</span>}
              {product.discountPrice && discountPercentage > 0 && (
                <span className="premium-tag" style={{ 
                  top: product.isNew ? '60px' : '20px',
                  background: '#ef4444'
                }}>
                  -{discountPercentage}% OFF
                </span>
              )}
            </div>
          </div>

          <div className="product-info-stack">
            <header className="info-header">
              <span className="category-label">{product.category}</span>
              <h1 className="product-main-title">{product.name}</h1>
              
              <div className="rating-summary">
                <div className="stars-group">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"} stroke="#fbbf24" />
                  ))}
                </div>
                <span className="reviews-text">{product.rating.toFixed(1)} ({product.reviewCount} Verified Reviews)</span>
              </div>
            </header>

            <div className="pricing-stack">
              {/* Show discount price if available, otherwise show base price */}
              <span className="current-price">
                {product.discountPrice 
                  ? formatPrice(product.discountPrice)
                  : formatPrice(product.basePrice)}
              </span>
              {/* Show original price only if there's a discount */}
              {product.discountPrice && product.discountPrice < product.basePrice && (
                <span className="old-price">{formatPrice(product.basePrice)}</span>
              )}
            </div>

            <p className="product-description-text">
              {product.description || "Experience premium comfort and timeless style with our latest collection."}
            </p>

            <section className="purchase-options">
              <div className="option-block">
                <label>Select Size</label>
                <div className="size-chips">
                  {product.sizes?.map(size => (
                    <button 
                      key={size} 
                      className={`size-chip ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="interaction-row">
                <button 
                  className={`atc-button-premium ${isAdded ? 'success' : ''} ${!product.inStock ? 'disabled' : ''}`} 
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  style={{
                    opacity: !product.inStock ? 0.6 : 1,
                    cursor: !product.inStock ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isAdded ? <><Check size={20} /> Item Added</> : 
                   !product.inStock ? 'Out of Stock' : <><ShoppingCart size={20} /> Add to Cart</>}
                </button>
                
                {/* Heart Button linked to Wishlist logic */}
                <button 
                  className={`wishlist-btn-premium ${isWishlisted ? 'active' : ''}`}
                  onClick={handleWishlistToggle}
                >
                  <Heart size={22} fill={isWishlisted ? "#ef4444" : "none"} color={isWishlisted ? "#ef4444" : "#64748b"} />
                </button>
              </div>
            </section>

            <footer className="trust-footer">
              <div className="trust-item"><Truck size={18} /> <span>Fast & Free Shipping</span></div>
              <div className="trust-item"><ShieldCheck size={18} /> <span>Secure Checkout</span></div>
              <div className="trust-item"><RotateCcw size={18} /> <span>30-Day Returns</span></div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;