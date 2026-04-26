import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, ScatterChart, Scatter } from 'recharts';

const InteractiveCharts = ({ data, selectedModel }) => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('all');
  const [metric, setMetric] = useState('power');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data?.lstm_forecast) {
      filterData();
    }
  }, [data, timeRange, metric]);

  const filterData = () => {
    if (!data?.lstm_forecast) return;

    let filtered = [...data.lstm_forecast];

    // Apply time range filter
    if (timeRange !== 'all') {
      const hours = timeRange === 'morning' ? [6, 7, 8, 9, 10, 11] :
                   timeRange === 'afternoon' ? [12, 13, 14, 15, 16, 17] :
                   [18, 19, 20, 21, 22, 23]; // evening
      filtered = filtered.filter(item => {
        const hour = parseInt(item.time.split(':')[0]);
        return hours.includes(hour);
      });
    }

    // Apply metric transformation
    filtered = filtered.map(item => ({
      ...item,
      value: metric === 'power' ? item.forecasted_power :
             metric === 'demand' ? item.ev_demand :
             metric === 'difference' ? Math.abs(item.forecasted_power - item.actual_power) :
             item.forecasted_power
    }));

    setFilteredData(filtered);
  };

  const chartTypes = [
    { id: 'line', label: 'Line Chart', icon: '📈' },
    { id: 'area', label: 'Area Chart', icon: '📊' },
    { id: 'bar', label: 'Bar Chart', icon: '📊' },
    { id: 'scatter', label: 'Scatter Plot', icon: '📍' }
  ];

  const timeRanges = [
    { id: 'all', label: 'All Day' },
    { id: 'morning', label: 'Morning (6-11)' },
    { id: 'afternoon', label: 'Afternoon (12-17)' },
    { id: 'evening', label: 'Evening (18-23)' }
  ];

  const metrics = [
    { id: 'power', label: 'Forecasted Power', color: '#06B6D4' },
    { id: 'demand', label: 'EV Demand', color: '#8B5CF6' },
    { id: 'difference', label: 'Forecast Error', color: '#F59E0B' }
  ];

  const renderChart = () => {
    const commonProps = {
      data: filteredData,
      margin: { top: 20, right: 30, left: 20, bottom: 20 }
    };

    const selectedMetric = metrics.find(m => m.id === metric);

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} tick={{ fill: '#9CA3AF' }} />
            <YAxis stroke="#9CA3AF" fontSize={12} tick={{ fill: '#9CA3AF' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
              labelStyle={{ color: '#F9FAFB' }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={selectedMetric?.color || '#06B6D4'}
              strokeWidth={3}
              dot={{ fill: selectedMetric?.color || '#06B6D4', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: selectedMetric?.color || '#06B6D4', strokeWidth: 2 }}
            />
            {metric === 'power' && (
              <Line
                type="monotone"
                dataKey="actual_power"
                stroke="#EF4444"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 3 }}
              />
            )}
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} tick={{ fill: '#9CA3AF' }} />
            <YAxis stroke="#9CA3AF" fontSize={12} tick={{ fill: '#9CA3AF' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={selectedMetric?.color || '#06B6D4'}
              fill={`url(#color${metric})`}
              strokeWidth={2}
            />
            <defs>
              <linearGradient id={`color${metric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={selectedMetric?.color || '#06B6D4'} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={selectedMetric?.color || '#06B6D4'} stopOpacity={0}/>
              </linearGradient>
            </defs>
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} tick={{ fill: '#9CA3AF' }} />
            <YAxis stroke="#9CA3AF" fontSize={12} tick={{ fill: '#9CA3AF' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            <Bar
              dataKey="value"
              fill={selectedMetric?.color || '#06B6D4'}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );

      case 'scatter':
        return (
          <ScatterChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              type="number"
              dataKey="actual_power"
              name="Actual Power"
              stroke="#9CA3AF"
              fontSize={12}
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis
              type="number"
              dataKey="forecasted_power"
              name="Forecasted Power"
              stroke="#9CA3AF"
              fontSize={12}
              tick={{ fill: '#9CA3AF' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
              cursor={{ strokeDasharray: '3 3' }}
            />
            <Scatter
              dataKey="value"
              fill={selectedMetric?.color || '#06B6D4'}
              name={selectedMetric?.label || 'Value'}
            />
          </ScatterChart>
        );

      default:
        return null;
    }
  };

  if (!data?.lstm_forecast) {
    return (
      <div className="bg-slate-800/50 rounded-lg p-8 text-center border border-slate-700 border-dashed">
        <div className="text-4xl mb-4">📊</div>
        <p className="text-gray-400">Load data to view interactive charts</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <span className="text-cyan-400">📊</span>
        <h3 className="text-lg font-semibold text-white">Interactive Charts</h3>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Chart Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Chart Type</label>
          <div className="flex space-x-2">
            {chartTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setChartType(type.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  chartType === type.id
                    ? 'bg-cyan-500 text-white shadow-lg'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <span className="mr-1">{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Time Range */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Time Range</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          >
            {timeRanges.map((range) => (
              <option key={range.id} value={range.id}>{range.label}</option>
            ))}
          </select>
        </div>

        {/* Metric */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Metric</label>
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          >
            {metrics.map((m) => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
        <div className="mb-4">
          <h4 className="text-lg font-medium text-white">
            {metrics.find(m => m.id === metric)?.label || 'Chart'} - {timeRanges.find(r => r.id === timeRange)?.label || 'All Data'}
          </h4>
          <p className="text-sm text-gray-400">
            {filteredData.length} data points • Model: {selectedModel || 'Not selected'}
          </p>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>

        {/* Chart Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6 pt-4 border-t border-slate-700">
          <div className="text-center">
            <div className="text-lg font-bold text-cyan-400">
              {Math.max(...filteredData.map(d => d.value)).toFixed(1)}
            </div>
            <div className="text-xs text-gray-400">Peak Value</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">
              {(filteredData.reduce((sum, d) => sum + d.value, 0) / filteredData.length).toFixed(1)}
            </div>
            <div className="text-xs text-gray-400">Average</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-400">
              {Math.min(...filteredData.map(d => d.value)).toFixed(1)}
            </div>
            <div className="text-xs text-gray-400">Minimum</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-400">
              {filteredData.length}
            </div>
            <div className="text-xs text-gray-400">Data Points</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCharts;