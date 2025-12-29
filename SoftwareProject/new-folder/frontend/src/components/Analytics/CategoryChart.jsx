import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const CategoryChart = ({ data }) => {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h2>Sales by Category</h2>
        <p className="chart-subtitle">Product category distribution</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="category-legend">
        {data.map((cat, index) => (
          <div key={index} className="legend-item">
            <div className="legend-color" style={{ background: cat.color }}></div>
            <span>{cat.name}</span>
            <strong>{cat.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryChart;