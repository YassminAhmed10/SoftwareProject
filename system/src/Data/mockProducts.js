// src/Data/mockProducts.js

export const mockProducts = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    description: "Comfortable cotton t-shirt perfect for everyday wear",
    price: 29.99,
    discountPrice: 19.99,
    category: "T-Shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    rating: 4.5,
    reviewCount: 128,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray"],
    badge: "Sale",
    isNew: false,
    tags: ["Bestseller", "Cotton"]
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    description: "Modern slim fit jeans with stretch fabric",
    price: 79.99,
    discountPrice: null,
    category: "Jeans",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    rating: 4.8,
    reviewCount: 256,
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Blue", "Black"],
    badge: null,
    isNew: true,
    tags: ["Stretch", "Slim Fit"]
  },
  {
    id: 3,
    name: "Casual Button-Up Shirt",
    description: "Versatile button-up shirt for any occasion",
    price: 49.99,
    discountPrice: 34.99,
    category: "Shirts",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
    rating: 4.3,
    reviewCount: 89,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Blue", "Gray"],
    badge: "Sale",
    isNew: false,
    tags: ["Casual"]
  },
  {
    id: 4,
    name: "Leather Jacket",
    description: "Premium leather jacket with modern design",
    price: 199.99,
    discountPrice: null,
    category: "Jackets",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    rating: 4.9,
    reviewCount: 342,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown"],
    badge: null,
    isNew: true,
    tags: ["Premium", "Leather"]
  },
  {
    id: 5,
    name: "Hooded Sweatshirt",
    description: "Cozy hoodie perfect for cold weather",
    price: 59.99,
    discountPrice: 44.99,
    category: "Hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
    rating: 4.6,
    reviewCount: 178,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Gray", "Black", "Navy"],
    badge: "Sale",
    isNew: false,
    tags: ["Warm", "Casual"]
  },
  {
    id: 6,
    name: "Sports Shorts",
    description: "Breathable athletic shorts for workouts",
    price: 34.99,
    discountPrice: null,
    category: "Shorts",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400",
    rating: 4.4,
    reviewCount: 95,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Blue", "Gray"],
    badge: null,
    isNew: false,
    tags: ["Athletic", "Breathable"]
  },
  {
    id: 7,
    name: "Formal Dress Pants",
    description: "Elegant dress pants for professional settings",
    price: 89.99,
    discountPrice: 69.99,
    category: "Pants",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400",
    rating: 4.7,
    reviewCount: 143,
    sizes: ["30", "32", "34", "36"],
    colors: ["Black", "Navy", "Gray"],
    badge: "Sale",
    isNew: false,
    tags: ["Formal", "Professional"]
  },
  {
    id: 8,
    name: "Graphic T-Shirt",
    description: "Trendy graphic tee with unique design",
    price: 24.99,
    discountPrice: null,
    category: "T-Shirts",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400",
    rating: 4.2,
    reviewCount: 67,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black"],
    badge: null,
    isNew: true,
    tags: ["Graphic", "Trendy"]
  }
];

export const categories = [
  { name: "All", count: mockProducts.length },
  { name: "T-Shirts", count: mockProducts.filter(p => p.category === "T-Shirts").length },
  { name: "Jeans", count: mockProducts.filter(p => p.category === "Jeans").length },
  { name: "Shirts", count: mockProducts.filter(p => p.category === "Shirts").length },
  { name: "Jackets", count: mockProducts.filter(p => p.category === "Jackets").length },
  { name: "Hoodies", count: mockProducts.filter(p => p.category === "Hoodies").length },
  { name: "Shorts", count: mockProducts.filter(p => p.category === "Shorts").length },
  { name: "Pants", count: mockProducts.filter(p => p.category === "Pants").length }
];

export const sizes = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36"];

export const colors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Gray", hex: "#808080" },
  { name: "Blue", hex: "#0066CC" },
  { name: "Navy", hex: "#001F3F" },
  { name: "Brown", hex: "#8B4513" },
  { name: "Red", hex: "#FF0000" },
  { name: "Green", hex: "#00FF00" }
];