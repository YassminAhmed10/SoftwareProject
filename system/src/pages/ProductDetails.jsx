// src/pages/ProductDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import '../ProductDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  
  return (
    <div className="product-details-page">
      <h1>Product Details for ID: {productId}</h1>
      <p>This is a placeholder. You'll need to create the actual product details page.</p>
      {/* Add your product details content here */}
    </div>
  );
};

export default ProductDetails;