import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const LineChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <defs>
          <linearGradient id="colorForecasted" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="time" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            border: '1px solid #00d4ff',
            borderRadius: '8px',
            color: '#e0e0e0',
          }}
          cursor={{ stroke: '#00d4ff', strokeWidth: 2 }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="forecasted_power"
          stroke="#00d4ff"
          strokeWidth={2.5}
          dot={{ fill: '#00d4ff', r: 4 }}
          activeDot={{ r: 6 }}
          name="Forecasted Power"
        />
        <Line
          type="monotone"
          dataKey="actual_power"
          stroke="#fbbf24"
          strokeWidth={2.5}
          dot={{ fill: '#fbbf24', r: 4 }}
          activeDot={{ r: 6 }}
          name="Actual Power"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
