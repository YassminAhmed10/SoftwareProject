import React, { useState } from 'react';
import { Heart, ShoppingCart, Trash2, Grid, List, Share2, Check, Star } from 'lucide-react';
import './Wishlist.css';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Classic Black Hoodie',
      price: 450,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
      inStock: true,
      category: 'Hoodies',
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: 'Pink Comfort Hoodie',
      price: 420,
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400',
      inStock: true,
      category: 'Hoodies',
      rating: 4.6,
      reviews: 89
    },
    {
      id: 3,
      name: 'Denim Jacket',
      price: 550,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
      inStock: false,
      category: 'Jackets',
      rating: 4.9,
      reviews: 203
    },
    {
      id: 4,
      name: 'White Premium T-Shirt',
      price: 250,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      inStock: true,
      category: 'T-Shirts',
      rating: 4.7,
      reviews: 156
    },
    {
      id: 5,
      name: 'Leather Bomber Jacket',
      price: 890,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
      inStock: true,
      category: 'Jackets',
      rating: 4.9,
      reviews: 78
    },
    {
      id: 6,
      name: 'Gray Pullover Hoodie',
      price: 380,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
      inStock: true,
      category: 'Hoodies',
      rating: 4.5,
      reviews: 92
    }
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [notification, setNotification] = useState('');

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const toggleSelectItem = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const removeFromWishlist = (itemId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
    setSelectedItems(prev => prev.filter(id => id !== itemId));
    showNotification('Removed from wishlist');
  };

  const moveToCart = (item) => {
    if (!item.inStock) {
      showNotification('Item out of stock');
      return;
    }
    showNotification('Added to cart!');
    removeFromWishlist(item.id);
  };

  const moveSelectedToCart = () => {
    const inStockSelected = wishlistItems.filter(
      item => selectedItems.includes(item.id) && item.inStock
    );
    if (inStockSelected.length === 0) {
      showNotification('No in-stock items selected');
      return;
    }
    inStockSelected.forEach(item => removeFromWishlist(item.id));
    showNotification(`${inStockSelected.length} items added to cart!`);
  };

  const removeSelected = () => {
    if (selectedItems.length === 0) return;
    setWishlistItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    showNotification('Items removed');
  };

  const selectAll = () => {
    if (selectedItems.length === wishlistItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems.map(item => item.id));
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center px-4">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center shadow-2xl">
                <Heart className="w-12 h-12 text-white fill-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              Your Wishlist is Empty
            </h2>
            <p className="text-slate-600 mb-10 max-w-md mx-auto text-lg">
              Start adding items you love and create your perfect collection
            </p>
            <button className="group px-10 py-4 bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden">
              <span className="relative z-10">Explore Products</span>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);
  const inStockCount = wishlistItems.filter(item => item.inStock).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-right duration-300">
          <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-sm border border-white/10">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <span className="font-medium">{notification}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white fill-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    My Wishlist
                  </h1>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-slate-600 font-medium">
                      {wishlistItems.length} items • {inStockCount} in stock
                    </p>
                    <span className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-sm font-semibold">
                      {totalValue} LE Total
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="px-4 py-3 rounded-xl border-2 border-slate-200 hover:border-slate-400 hover:bg-white transition-all duration-300 group">
                  <Share2 className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
                </button>
                
                <div className="flex gap-1 bg-slate-100/80 p-1.5 rounded-xl backdrop-blur-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      viewMode === 'grid'
                        ? 'bg-white shadow-lg text-slate-900 scale-105'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      viewMode === 'list'
                        ? 'bg-white shadow-lg text-slate-900 scale-105'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Bar */}
        {selectedItems.length > 0 && (
          <div className="mb-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={selectAll}
                className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  selectedItems.length === wishlistItems.length
                    ? 'bg-slate-900 border-slate-900'
                    : 'border-slate-300 hover:border-slate-400'
                }`}
              >
                {selectedItems.length === wishlistItems.length && (
                  <Check className="w-5 h-5 text-white" />
                )}
              </button>
              <span className="text-slate-700 font-semibold text-lg">
                {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={moveSelectedToCart}
                className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={removeSelected}
                className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-600 rounded-xl font-semibold hover:from-rose-100 hover:to-pink-100 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Remove
              </button>
            </div>
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map(item => (
              <div
                key={item.id}
                className="group bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-md border border-slate-200/50 hover:shadow-2xl hover:border-slate-300 transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Stock Badge */}
                  {!item.inStock && (
                    <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
                      OUT OF STOCK
                    </div>
                  )}

                  {/* Checkbox */}
                  <button
                    onClick={() => toggleSelectItem(item.id)}
                    className={`absolute top-4 left-4 w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-sm ${
                      selectedItems.includes(item.id)
                        ? 'bg-slate-900 border-slate-900 scale-110'
                        : 'bg-white/90 border-white hover:bg-white hover:scale-110'
                    }`}
                  >
                    {selectedItems.includes(item.id) && (
                      <Check className="w-5 h-5 text-white" />
                    )}
                  </button>

                  {/* Quick Actions */}
                  <div className="absolute inset-x-0 bottom-0 p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={() => moveToCart(item)}
                      disabled={!item.inStock}
                      className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-xl ${
                        item.inStock
                          ? 'bg-white text-slate-900 hover:bg-slate-100 hover:scale-105'
                          : 'bg-white/60 text-slate-400 cursor-not-allowed backdrop-blur-sm'
                      }`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full">
                      {item.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-slate-700 transition-colors">
                    {item.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-semibold text-slate-700">{item.rating}</span>
                    </div>
                    <span className="text-sm text-slate-500">({item.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div>
                      <span className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        {item.price}
                      </span>
                      <span className="text-base font-medium text-slate-600 ml-1">LE</span>
                    </div>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-300 hover:scale-110"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-slate-200/50 hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row items-center gap-6 p-6">
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleSelectItem(item.id)}
                    className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      selectedItems.includes(item.id)
                        ? 'bg-slate-900 border-slate-900 scale-110'
                        : 'border-slate-300 hover:border-slate-400 hover:scale-110'
                    }`}
                  >
                    {selectedItems.includes(item.id) && (
                      <Check className="w-5 h-5 text-white" />
                    )}
                  </button>

                  {/* Image */}
                  <div className="relative w-full lg:w-32 h-48 lg:h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 flex-shrink-0 shadow-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white font-bold text-sm">OUT OF STOCK</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 text-center lg:text-left">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 justify-center lg:justify-start">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-semibold text-slate-700">{item.rating}</span>
                      </div>
                      <span className="text-sm text-slate-500">({item.reviews} reviews)</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center lg:text-right flex-shrink-0">
                    <div className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                      {item.price} <span className="text-lg font-medium text-slate-600">LE</span>
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className="flex-shrink-0 w-full lg:w-32">
                    <span
                      className={`inline-block w-full px-4 py-2 rounded-xl text-sm font-bold text-center ${
                        item.inStock
                          ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700'
                          : 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700'
                      }`}
                    >
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 w-full lg:w-auto">
                    <button
                      onClick={() => moveToCart(item)}
                      disabled={!item.inStock}
                      className={`flex-1 lg:flex-none px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                        item.inStock
                          ? 'bg-gradient-to-r from-slate-900 to-slate-700 text-white hover:shadow-xl hover:scale-105'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-300 hover:scale-110"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Actions */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button
            onClick={moveSelectedToCart}
            className="group w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <ShoppingCart className="w-6 h-6" />
              Add All to Cart
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>
          <button className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all duration-300 border-2 border-slate-200 hover:border-slate-300 hover:scale-105 shadow-md">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
