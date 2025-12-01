// /src/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import ProductList from './components/product/ProductList';
import FilterSidebar from './components/product/FilterSidebar';
import SearchBar from './components/product/SearchBar';
import SortDropdown from './components/product/SortDropdown';
import { mockProducts, categories, sizes, colors } from './Data/mockProducts';
import './ProductsPage.css';

const ProductsPage = () => {
  // State for all products
  const [allProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  
  // Search and sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const [loading, setLoading] = useState(false);

  // Apply filters and sorting
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      let filtered = [...allProducts];
      
      // Apply search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );
      }
      
      // Apply category filter
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }
      
      // Apply size filter
      if (selectedSizes.length > 0) {
        filtered = filtered.filter(product =>
          selectedSizes.some(size => product.sizes.includes(size))
        );
      }
      
      // Apply color filter
      if (selectedColors.length > 0) {
        filtered = filtered.filter(product =>
          selectedColors.some(color => product.colors.includes(color))
        );
      }
      
      // Apply price filter
      const [minPrice, maxPrice] = priceRange;
      filtered = filtered.filter(product => {
        const price = product.discountPrice || product.price;
        return price >= minPrice && price <= maxPrice;
      });
      
      // Apply sorting
      switch (sortOption) {
        case 'price-low':
          filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
          break;
        case 'price-high':
          filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'popular':
          filtered.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
        case 'newest':
          filtered.sort((a, b) => b.id - a.id);
          break;
        default:
          // Featured: Show discounted/new items first
          filtered.sort((a, b) => {
            const aScore = (a.discountPrice ? 2 : 0) + (a.isNew ? 1 : 0);
            const bScore = (b.discountPrice ? 2 : 0) + (b.isNew ? 1 : 0);
            return bScore - aScore;
          });
      }
      
      setFilteredProducts(filtered);
      setLoading(false);
    }, 300); // Simulate 300ms API delay
    
    return () => clearTimeout(timer);
  }, [allProducts, searchQuery, selectedCategory, selectedSizes, selectedColors, priceRange, sortOption]);

  // Get active filter count
  const activeFilterCount = 
    (selectedCategory !== 'All' ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    (priceRange[0] > 0 || priceRange[1] < 200 ? 1 : 0);

  return (
    <div className="products-page">
      {/* Page Header */}
      <header className="products-header">
        <h1>Shop Clothing</h1>
        <p>Discover our latest collection of premium clothing</p>
      </header>
      
      {/* Search Section */}
      <section className="search-section">
        <div className="container">
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </section>
      
      {/* Main Content */}
      <div className="products-container">
        <div className="container">
          <div className="products-layout">
            {/* Filters Sidebar */}
            <aside className="filters-column">
              <FilterSidebar
                categories={categories}
                sizes={sizes}
                colors={colors}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSizes={selectedSizes}
                setSelectedSizes={setSelectedSizes}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                maxPrice={200}
              />
            </aside>
            
            {/* Products Column */}
            <main className="products-column">
              {/* Products Header with Controls */}
              <div className="products-controls">
                <div className="results-info">
                  <h2>Products</h2>
                  <span className="results-count">
                    {filteredProducts.length} products
                    {activeFilterCount > 0 && (
                      <span className="active-filters">
                        ({activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''})
                      </span>
                    )}
                  </span>
                </div>
                
                <div className="controls-right">
                  <SortDropdown
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                  />
                </div>
              </div>
              
              {/* Loading State */}
              {loading ? (
                <div className="loading-state">
                  <div className="loading-spinner"></div>
                  <p>Loading products...</p>
                </div>
              ) : (
                /* Products Grid */
                <ProductList products={filteredProducts} />
              )}
              
              {/* No Results State */}
              {!loading && filteredProducts.length === 0 && (
                <div className="no-results-suggestions">
                  <h3>Try these suggestions:</h3>
                  <ul>
                    <li>Clear some filters</li>
                    <li>Check your spelling</li>
                    <li>Browse all categories</li>
                  </ul>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage; 