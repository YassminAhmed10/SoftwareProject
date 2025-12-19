// src/data/products.js
import jacketImage from '../assets/jacket.png';
import hoodie4Image from '../assets/hoodie4.png';
import hoodie2Image from '../assets/hoodie2.png';
import hoddieImage from '../assets/hoddie.png';
import tshirtImage from '../assets/tshirt.png';
import pinkHoodieImage from '../assets/pinkHoodie.png';

export const mockProducts = [
  {
    id: 1,
    name: 'Leather Jacket',
    description: 'Genuine leather jacket with asymmetrical zip and snap collar.',
    price: 189.99,
    discountPrice: 159.99,
    category: 'Jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black'],
    image: jacketImage,
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    isNew: true
  },
  {
    id: 2,
    name: 'Classic T-Shirt',
    description: '100% cotton comfortable t-shirt for everyday wear',
    price: 24.99,
    discountPrice: 19.99,
    category: 'T-Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Gray'],
    image: tshirtImage,
    rating: 4.2,
    reviewCount: 89,
    inStock: true,
    isNew: false
  },
  {
    id: 3,
    name: 'Ocean Striped Sweater',
    description: 'Navy and white striped cotton-blend sweater with raglan sleeves.',
    price: 79.99,
    discountPrice: null,
    category: 'Sweaters',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'White'],
    image: hoodie4Image,
    rating: 4.8,
    reviewCount: 56,
    inStock: true,
    isNew: true
  },
  {
    id: 4,
    name: 'Black Pullover Hoodie',
    description: 'Heavyweight cotton pullover hoodie with front pocket.',
    price: 59.99,
    discountPrice: 49.99,
    category: 'Hoodies',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    image: hoodie2Image,
    rating: 4.4,
    reviewCount: 42,
    inStock: true,
    isNew: false
  },
  {
    id: 5,
    name: 'Cloud White Hoodie',
    description: 'Thick, premium white hoodie with a smooth finish and drawstrings.',
    price: 69.99,
    discountPrice: 59.99,
    category: 'Hoodies',
    sizes: ['S', 'M', 'L'],
    colors: ['White', 'Beige'],
    image: hoddieImage,
    rating: 4.6,
    reviewCount: 75,
    inStock: true,
    isNew: true
  },
  {
    id: 6,
    name: 'Cobalt Blue T-Shirt',
    description: 'Vibrant blue athletic tee with moisture-wicking technology.',
    price: 39.99,
    discountPrice: 34.99,
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue'],
    image: tshirtImage,
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    isNew: false
  },
  {
    id: 7,
    name: 'Rose Zip Hoodie',
    description: 'Light pink full-zip hoodie, perfect for layering.',
    price: 64.99,
    discountPrice: null,
    category: 'Hoodies',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Pink'],
    image: pinkHoodieImage,
    rating: 4.1,
    reviewCount: 50,
    inStock: false,
    isNew: true
  }
];