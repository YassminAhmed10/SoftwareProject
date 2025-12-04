import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TopProductsTable = () => {
  const products = [
    { name: 'Elegant Summer Dress', category: 'women', sales: 234, revenue: '$23,400', trend: '+12%', isPositive: true },
    { name: 'Classic Men\'s Shirt', category: 'men', sales: 189, revenue: '$18,900', trend: '+8%', isPositive: true },
    { name: 'Leather Handbag', category: 'women', sales: 156, revenue: '$15,600', trend: '-3%', isPositive: false },
    { name: 'Sport Sneakers', category: 'men', sales: 142, revenue: '$14,200', trend: '+15%', isPositive: true },
  ];

  return (
    <div className="top-products-card">
      <div className="chart-header">
        <h2>Top Selling Products</h2>
        <p className="chart-subtitle">Best performing products this month</p>
      </div>
      <table className="analytics-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Sales</th>
            <th>Revenue</th>
            <th>Trend</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td className="product-name">{product.name}</td>
              <td>
                <span className={`category-badge ${product.category}`}>
                  {product.category === 'women' ? 'Women Item' : 'Men Item'}
                </span>
              </td>
              <td>{product.sales}</td>
              <td className="revenue">{product.revenue}</td>
              <td className={`trend ${product.isPositive ? 'positive' : 'negative'}`}>
                {product.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {product.trend}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopProductsTable;