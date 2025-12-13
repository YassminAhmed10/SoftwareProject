import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaHeart, FaShoppingCart, FaTrash, FaTimes } from 'react-icons/fa';
import { useCart } from '../Contexts/CartContext';
import Header from '../components/Header/Header';
import hoodieImg from '../assets/hoodie2.png';
import tShirtImg from '../assets/tShirt.jpeg';
import jacketImg from '../assets/jacket.png';
import pinkHoodieImg from '../assets/pinkHoodie.png';
import './Wishlist.css';

const Wishlist = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Sample wishlist items (in real app, would come from context/API)
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Classic Black Hoodie',
      price: 450,
      image: hoodieImg,
      inStock: true,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Gray']
    },
    {
      id: 2,
      name: 'Pink Comfort Hoodie',
      price: 420,
      image: pinkHoodieImg,
      inStock: true,
      sizes: ['S', 'M', 'L'],
      colors: ['Pink', 'White']
    },
    {
      id: 3,
      name: 'Denim Jacket',
      price: 550,
      image: jacketImg,
      inStock: false,
      sizes: ['M', 'L', 'XL'],
      colors: ['Blue', 'Black']
    },
    {
      id: 4,
      name: 'RYYZ White T-Shirt',
      price: 250,
      image: tShirtImg,
      inStock: true,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Black', 'Gray']
    }
  ]);

  const [selectedItems, setSelectedItems] = useState([]);

  const removeFromWishlist = (itemId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
  };

  const moveToCart = (item) => {
    if (!item.inStock) {
      alert('This item is currently out of stock');
      return;
    }

    addToCart({
      ...item,
      quantity: 1,
      selectedSize: item.sizes[0],
      selectedColor: item.colors[0]
    });

    removeFromWishlist(item.id);
    alert('Item moved to cart!');
  };

  const toggleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const selectAll = () => {
    if (selectedItems.length === wishlistItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems.map(item => item.id));
    }
  };

  const moveSelectedToCart = () => {
    const itemsToMove = wishlistItems.filter(item => 
      selectedItems.includes(item.id) && item.inStock
    );

    if (itemsToMove.length === 0) {
      alert('Please select in-stock items to move to cart');
      return;
    }

    itemsToMove.forEach(item => {
      addToCart({
        ...item,
        quantity: 1,
        selectedSize: item.sizes[0],
        selectedColor: item.colors[0]
      });
    });

    setWishlistItems(wishlistItems.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    alert(`${itemsToMove.length} item(s) moved to cart!`);
  };

  const removeSelectedFromWishlist = () => {
    if (selectedItems.length === 0) {
      alert('Please select items to remove');
      return;
    }

    setWishlistItems(wishlistItems.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <Header user={user} onLogout={onLogout} />
        <div className="empty-wishlist">
          <FaHeart className="empty-wishlist-icon" />
          <h2>Your Wishlist is Empty</h2>
          <p>Add items you love to your wishlist and shop them later</p>
          <Link to="/home" className="btn-start-shopping">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <Header user={user} onLogout={onLogout} />

      {/* Page Title */}
      <div className="wishlist-hero">
        <FaHeart className="hero-icon" />
        <h1>My wishlist</h1>
      </div>

      {/* Tabs */}
      <div className="wishlist-tabs">
        <button className="tab active">Create a wishlist</button>
        <button className="tab">Your wishlists</button>
        <button className="tab">Search wishlist</button>
      </div>

      <div className="wishlist-container-new">
        {/* Wishlist Table */}
        <div className="wishlist-table-wrapper">
          <table className="wishlist-table">
            <thead>
              <tr>
                <th className="col-checkbox">
                  <input 
                    type="checkbox" 
                    checked={selectedItems.length === wishlistItems.length && wishlistItems.length > 0}
                    onChange={selectAll}
                  />
                </th>
                <th className="col-product">Product name</th>
                <th className="col-price">Unit price</th>
                <th className="col-quantity">Quantity</th>
                <th className="col-stock">Stock status</th>
                <th className="col-actions"></th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems.map(item => (
                <tr key={item.id}>
                  <td className="col-checkbox">
                    <input 
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelectItem(item.id)}
                    />
                  </td>
                  <td className="col-product">
                    <div className="product-cell">
                      <img src={item.image} alt={item.name} />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="col-price">
                    {item.price > 0 ? `${item.price} LE` : item.price}
                  </td>
                  <td className="col-quantity">1</td>
                  <td className="col-stock">
                    <span className={item.inStock ? 'stock-in' : 'stock-out'}>
                      {item.inStock ? 'In Stock' : 'Out in stock'}
                    </span>
                  </td>
                  <td className="col-actions">
                    <div className="action-buttons">
                      <button 
                        className="btn-add-cart"
                        onClick={() => moveToCart(item)}
                        disabled={!item.inStock}
                      >
                        Add to cart
                      </button>
                      <button 
                        className="btn-select"
                        onClick={() => toggleSelectItem(item.id)}
                      >
                        Select options
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Bar */}
        <div className="wishlist-actions-bar">
          <div className="action-left">
            <span className="action-text">Apply the action to all the selected items:</span>
            <select className="action-select">
              <option value="">Add to cart</option>
              <option value="remove">Remove</option>
              <option value="move">Move to another list</option>
            </select>
            <button className="btn-apply">APPLY</button>
          </div>
        </div>

        {/* Add All to Cart Button */}
        <div className="add-all-section">
          <button className="btn-add-all" onClick={moveSelectedToCart}>
            ADD ALL TO CART
          </button>
        </div>

        {/* Social Share Section */}
        <div className="social-share-section">
          <h3>Share on social media</h3>
          <div className="social-icons">
            <button className="social-btn facebook">f</button>
            <button className="social-btn twitter">t</button>
            <button className="social-btn pinterest">p</button>
            <button className="social-btn email">@</button>
          </div>
        </div>
      </div>
    </div>
  );
};

Wishlist.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};

export default Wishlist;
