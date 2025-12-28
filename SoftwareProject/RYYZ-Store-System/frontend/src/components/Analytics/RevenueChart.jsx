import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueChart = ({ data }) => {
  return (
    <div className="chart-card large">
      <div className="chart-header">
        <h2>Revenue Overview</h2>
        <p className="chart-subtitle">Monthly revenue and sales performance</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} name="Sales ($)" />
          <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue ($)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;