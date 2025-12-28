import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const VisitorChart = ({ data }) => {
  return (
    <div className="chart-card large">
      <div className="chart-header">
        <h2>Visitor Analytics</h2>
        <p className="chart-subtitle">Daily visitors and new visitors</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="day" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Bar dataKey="visitors" fill="#3b82f6" name="Total Visitors" radius={[8, 8, 0, 0]} />
          <Bar dataKey="newVisitors" fill="#10b981" name="New Visitors" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisitorChart;