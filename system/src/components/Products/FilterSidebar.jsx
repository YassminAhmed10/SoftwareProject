// src/components/Products/FilterSidebar.jsx
import React from 'react';

const FilterSidebar = ({
  categories,
  sizes,
  colors,
  selectedCategory,
  setSelectedCategory,
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
  priceRange,
  setPriceRange,
  maxPrice
}) => {
  
  const handleSizeToggle = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleColorToggle = (color) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, maxPrice]);
  };

  return (
    <div className="filter-sidebar">
      {/* Clear All Filters */}
      <div className="filter-section">
        <div className="filter-title">
          Filters
          <button className="filter-clear" onClick={clearAllFilters}>
            Clear All
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="filter-section">
        <h3 className="filter-title">Category</h3>
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category.name} className="category-item">
              <button
                className={`category-button ${selectedCategory === category.name ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
                <span className="category-count">{category.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Size Filter */}
      <div className="filter-section">
        <h3 className="filter-title">Size</h3>
        <div className="size-grid">
          {sizes.map((size) => (
            <button
              key={size}
              className={`size-button ${selectedSizes.includes(size) ? 'selected' : ''}`}
              onClick={() => handleSizeToggle(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="filter-section">
        <h3 className="filter-title">Color</h3>
        <div className="color-grid">
          {colors.map((color) => (
            <button
              key={color.name}
              className={`color-option ${selectedColors.includes(color.name) ? 'selected' : ''}`}
              style={{ backgroundColor: color.hex }}
              onClick={() => handleColorToggle(color.name)}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="filter-section">
        <h3 className="filter-title">Price Range</h3>
        <div className="price-inputs">
          <input
            type="number"
            className="price-input"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
            min="0"
            max={maxPrice}
          />
          <input
            type="number"
            className="price-input"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || maxPrice])}
            min="0"
            max={maxPrice}
          />
        </div>
        <div className="price-display">
          ${priceRange[0]} - ${priceRange[1]}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;