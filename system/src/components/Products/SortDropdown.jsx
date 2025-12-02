// src/components/Products/SortDropdown.jsx
import React, { useState } from 'react';

const SortDropdown = ({ sortOption, setSortOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest' }
  ];

  const handleSelect = (value) => {
    setSortOption(value);
    setIsOpen(false);
  };

  const currentLabel = sortOptions.find(opt => opt.value === sortOption)?.label || 'Sort';

  return (
    <div 
      className="sort-dropdown"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="sort-button">
        Sort: {currentLabel} ▼
      </button>
      {isOpen && (
        <div className="sort-options">
          {sortOptions.map((option) => (
            <div
              key={option.value}
              className={`sort-option ${sortOption === option.value ? 'active' : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;