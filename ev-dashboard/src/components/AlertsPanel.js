import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAlerts();
    // Refresh alerts every 30 seconds
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:5000/alerts');
      setAlerts(response.data.alerts);
      setError('');
    } catch (err) {
      setError('Failed to load alerts');
      console.error('Alerts fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return {
        bg: 'bg-red-500/10',
        border: 'border-red-500/20',
        text: 'text-red-400',
        icon: '🚨'
      };
      case 'medium': return {
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/20',
        text: 'text-orange-400',
        icon: '⚠️'
      };
      case 'low': return {
        bg: 'bg-green-500/10',
        border: 'border-green-500/20',
        text: 'text-green-400',
        icon: 'ℹ️'
      };
      default: return {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        text: 'text-blue-400',
        icon: '📢'
      };
    }
  };

  const getTypeColor = (type) => {
    if (type.includes('High')) return 'text-red-400';
    if (type.includes('Low')) return 'text-green-400';
    return 'text-blue-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-cyan-400">🚨</span>
          <h3 className="text-lg font-semibold text-white">Smart Alerts</h3>
        </div>
        <button
          onClick={fetchAlerts}
          disabled={loading}
          className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm transition-colors flex items-center space-x-1"
        >
          <span>🔄</span>
          <span>Refresh</span>
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="text-gray-400 mt-2">Checking for alerts...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <span className="text-red-400">⚠️</span>
            <span className="text-red-300">{error}</span>
          </div>
        </div>
      )}

      {/* Alerts List */}
      {!loading && !error && (
        <div className="space-y-3">
          {alerts.length === 0 ? (
            <div className="bg-slate-800/50 rounded-lg p-8 text-center border border-slate-700 border-dashed">
              <div className="text-4xl mb-4">✅</div>
              <p className="text-gray-400">No active alerts</p>
              <p className="text-sm text-gray-500 mt-1">All systems operating normally</p>
            </div>
          ) : (
            alerts.map((alert, index) => {
              const severity = getSeverityColor(alert.severity);
              return (
                <div
                  key={index}
                  className={`${severity.bg} border ${severity.border} rounded-lg p-4 transition-all duration-200 hover:scale-[1.02]`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-xl">{severity.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`font-medium ${getTypeColor(alert.type)}`}>
                          {alert.type}
                        </span>
                        <span className="text-sm text-gray-400">{alert.time}</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{alert.message}</p>
                      {alert.power_demand && (
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">Power Demand:</span>
                          <span className="text-sm font-medium text-cyan-400">
                            {alert.power_demand} kW
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Alert Summary */}
      {alerts.length > 0 && (
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Alert Summary</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-red-400">
                {alerts.filter(a => a.severity === 'high').length}
              </div>
              <div className="text-xs text-gray-400">High Priority</div>
            </div>
            <div>
              <div className="text-lg font-bold text-orange-400">
                {alerts.filter(a => a.severity === 'medium').length}
              </div>
              <div className="text-xs text-gray-400">Medium Priority</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-400">
                {alerts.filter(a => a.severity === 'low').length}
              </div>
              <div className="text-xs text-gray-400">Low Priority</div>
            </div>
          </div>
        </div>
      )}

      {/* Auto-refresh indicator */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          Auto-refreshing every 30 seconds • Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default AlertsPanel;