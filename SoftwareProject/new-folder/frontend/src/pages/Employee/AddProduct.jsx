// src/pages/AddProduct.jsx
import React, { useState } from 'react';
import { Upload, X, DollarSign, Package, Tag, Hash, BarChart } from 'lucide-react';
import './AddProduct.css';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    images: []
  });

  const [uploadedImages, setUploadedImages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));
    setUploadedImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product Data:', formData);
    console.log('Images:', uploadedImages);
    // Here you would typically send the data to your API
    alert('Product added successfully!');
    // Reset form
    setFormData({
      name: '',
      sku: '',
      category: '',
      price: '',
      stock: '',
      description: '',
      images: []
    });
    setUploadedImages([]);
  };

  return (
    <div className="add-product-container">
      <div className="page-header">
        <h1>Add New Product</h1>
        <p>Add a new product to your store</p>
      </div>

      <div className="add-product-content">
        <div className="product-form-section">
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">
                  <Package size={16} />
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="sku">
                  <Hash size={16} />
                  SKU
                </label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  placeholder="Enter SKU"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">
                  <Tag size={16} />
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home & Garden</option>
                  <option value="beauty">Beauty</option>
                  <option value="sports">Sports</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="price">
                  <DollarSign size={16} />
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="stock">
                  <BarChart size={16} />
                  Stock Quantity
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Product Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description..."
                rows="4"
                required
              />
            </div>

            <div className="image-upload-section">
              <label>Product Images</label>
              <div className="upload-area">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="file-input"
                />
                <label htmlFor="image-upload" className="upload-label">
                  <Upload size={24} />
                  <p>Click to upload or drag and drop</p>
                  <span>SVG, PNG, JPG or GIF (max. 5MB each)</span>
                </label>
              </div>

              {uploadedImages.length > 0 && (
                <div className="image-preview-container">
                  <h4>Uploaded Images ({uploadedImages.length})</h4>
                  <div className="image-preview-grid">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="image-preview">
                        <img src={image.preview} alt={image.name} />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="remove-image-btn"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="form-actions">
              <button type="button" className="btn-cancel">
                Cancel
              </button>
              <button type="submit" className="btn-submit">
                Add Product
              </button>
            </div>
          </form>
        </div>

        <div className="product-preview-section">
          <div className="preview-card">
            <h3>Product Preview</h3>
            <div className="preview-content">
              <div className="preview-image">
                {uploadedImages.length > 0 ? (
                  <img src={uploadedImages[0].preview} alt="Preview" />
                ) : (
                  <div className="placeholder-image">No image uploaded</div>
                )}
              </div>
              <div className="preview-details">
                <h4>{formData.name || 'Product Name'}</h4>
                <p className="preview-description">
                  {formData.description || 'Product description will appear here...'}
                </p>
                <div className="preview-meta">
                  <div className="meta-item">
                    <span className="meta-label">Price:</span>
                    <span className="meta-value">
                      ${formData.price ? parseFloat(formData.price).toFixed(2) : '0.00'}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">SKU:</span>
                    <span className="meta-value">{formData.sku || 'N/A'}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Category:</span>
                    <span className="meta-value">{formData.category || 'N/A'}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Stock:</span>
                    <span className="meta-value">{formData.stock || '0'} units</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="preview-tips">
            <h4>Tips for better products:</h4>
            <ul>
              <li>Use high-quality images</li>
              <li>Write clear, detailed descriptions</li>
              <li>Set competitive pricing</li>
              <li>Choose accurate categories</li>
              <li>Keep stock levels updated</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;