import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DatasetSelector = ({ onDatasetChange }) => {
  const [datasets, setDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState('');
  const [datasetData, setDatasetData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cityInfo = {
    'delhi': { name: 'Delhi', icon: '🏛️', description: 'Capital city with high EV adoption' },
    'agra': { name: 'Agra', icon: '🕌', description: 'Historical city with growing infrastructure' },
    'allahabad': { name: 'Allahabad', icon: '🌅', description: 'Industrial hub with moderate EV usage' },
    'gaya': { name: 'Gaya', icon: '🏞️', description: 'Cultural center with developing EV network' },
    'kolkata': { name: 'Kolkata', icon: '🌉', description: 'Metropolitan area with established charging' },
    'kerala': { name: 'Kerala', icon: '🌴', description: 'Southern state with green energy focus' },
    'synthetic': { name: 'Synthetic Data', icon: '🔬', description: 'Generated dataset for testing and validation' },
    'patterns': { name: 'EV Patterns', icon: '📊', description: 'Charging behavior analysis dataset' }
  };

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/datasets');
      setDatasets(response.data.datasets);
    } catch (err) {
      setError('Failed to load datasets');
      console.error('Dataset fetch error:', err);
    }
  };

  const loadDataset = async (city) => {
    setLoading(true);
    setError('');
    setDatasetData(null);

    try {
      const response = await axios.get(`http://127.0.0.1:5000/dataset/${city}`);
      setDatasetData(response.data);
      setSelectedDataset(city);
      onDatasetChange(response.data);
    } catch (err) {
      setError('Failed to load dataset');
      console.error('Dataset load error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <span className="text-cyan-400">📁</span>
        <h3 className="text-lg font-semibold text-white">Dataset Selection</h3>
      </div>

      {/* Dataset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {datasets.map((city) => (
          <div
            key={city}
            onClick={() => loadDataset(city)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              selectedDataset === city
                ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
                : 'border-slate-600 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-700/50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="text-2xl">{cityInfo[city]?.icon || '📊'}</div>
              <div className="flex-1">
                <h4 className="font-medium text-white">{cityInfo[city]?.name || city}</h4>
                <p className="text-sm text-gray-400 mt-1">
                  {cityInfo[city]?.description || 'EV charging dataset'}
                </p>
                {selectedDataset === city && (
                  <div className="mt-2 flex items-center space-x-1">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-cyan-400">Loaded</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="text-gray-400 mt-2">Loading dataset...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <span className="text-red-400">⚠️</span>
            <span className="text-red-300">{error}</span>
          </div>
        </div>
      )}

      {/* Dataset Preview */}
      {datasetData && !loading && (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-xl font-bold text-white">{cityInfo[datasetData.city]?.name || datasetData.city}</h4>
              <p className="text-gray-400">{datasetData.total_rows} total records</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Columns</div>
              <div className="text-lg font-semibold text-cyan-400">{datasetData.columns.length}</div>
            </div>
          </div>

          {/* Columns */}
          <div className="mb-4">
            <h5 className="text-sm font-medium text-gray-300 mb-2">Available Columns:</h5>
            <div className="flex flex-wrap gap-2">
              {datasetData.columns.map((col, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30"
                >
                  {col}
                </span>
              ))}
            </div>
          </div>

          {/* Data Preview Table */}
          <div className="bg-slate-900/50 rounded-lg border border-slate-700 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-700">
              <h5 className="text-sm font-medium text-gray-300">Data Preview (First 5 rows)</h5>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-800/50">
                  <tr>
                    {datasetData.columns.map((col, index) => (
                      <th key={index} className="px-4 py-3 text-left text-gray-300 font-medium">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {datasetData.data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-t border-slate-700/50 hover:bg-slate-800/30">
                      {datasetData.columns.map((col, colIndex) => (
                        <td key={colIndex} className="px-4 py-3 text-gray-400">
                          {typeof row[col] === 'number' ? row[col].toFixed(2) : row[col] || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dataset Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 bg-slate-800/50 rounded-lg">
              <div className="text-lg font-bold text-cyan-400">{datasetData.total_rows}</div>
              <div className="text-xs text-gray-400">Total Rows</div>
            </div>
            <div className="text-center p-3 bg-slate-800/50 rounded-lg">
              <div className="text-lg font-bold text-green-400">{datasetData.columns.length}</div>
              <div className="text-xs text-gray-400">Columns</div>
            </div>
            <div className="text-center p-3 bg-slate-800/50 rounded-lg">
              <div className="text-lg font-bold text-blue-400">
                {(datasetData.total_rows * datasetData.columns.length).toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">Data Points</div>
            </div>
            <div className="text-center p-3 bg-slate-800/50 rounded-lg">
              <div className="text-lg font-bold text-purple-400">CSV</div>
              <div className="text-xs text-gray-400">Format</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatasetSelector;