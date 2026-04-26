import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const BarChartComponent = ({ data }) => {
  // Transform model comparison data
  const chartData = Object.entries(data).map(([model, metrics]) => ({
    name: model,
    MAE: metrics.mae,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="name" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            border: '1px solid #00d4ff',
            borderRadius: '8px',
            color: '#e0e0e0',
          }}
        />
        <Legend />
        <Bar dataKey="MAE" fill="#00d4ff" radius={[8, 8, 0, 0]} name="Mean Absolute Error" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
