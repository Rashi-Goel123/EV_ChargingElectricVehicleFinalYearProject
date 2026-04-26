import React, { useState } from 'react';
import axios from 'axios';

const PredictionForm = ({ selectedModel }) => {
  const [formData, setFormData] = useState({
    temperature: 30,
    aqi: 150,
    humidity: 60,
    time: '12:00'
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePredict = async () => {
    setLoading(true);
    setError('');
    setPrediction(null);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        ...formData,
        model: selectedModel
      });

      setPrediction(response.data);
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getDecisionColor = (decision) => {
    switch (decision) {
      case 'Charge Now': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'Delay Charging': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'Optimal Charging': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <span className="text-cyan-400">🎯</span>
        <h3 className="text-lg font-semibold text-white">Real-time Prediction</h3>
      </div>

      {/* Input Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Temperature */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Temperature (°C)
          </label>
          <input
            type="range"
            min="15"
            max="45"
            value={formData.temperature}
            onChange={(e) => handleInputChange('temperature', parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>15°C</span>
            <span className="text-cyan-400 font-medium">{formData.temperature}°C</span>
            <span>45°C</span>
          </div>
        </div>

        {/* AQI */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Air Quality Index
          </label>
          <input
            type="range"
            min="50"
            max="300"
            value={formData.aqi}
            onChange={(e) => handleInputChange('aqi', parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>50</span>
            <span className="text-cyan-400 font-medium">{formData.aqi}</span>
            <span>300</span>
          </div>
        </div>

        {/* Humidity */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Humidity (%)
          </label>
          <input
            type="range"
            min="20"
            max="90"
            value={formData.humidity}
            onChange={(e) => handleInputChange('humidity', parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>20%</span>
            <span className="text-cyan-400 font-medium">{formData.humidity}%</span>
            <span>90%</span>
          </div>
        </div>

        {/* Time */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Time
          </label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => handleInputChange('time', e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Predict Button */}
      <div className="flex justify-center">
        <button
          onClick={handlePredict}
          disabled={loading || !selectedModel}
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Predicting...</span>
            </>
          ) : (
            <>
              <span>🔮</span>
              <span>Get Prediction</span>
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <span className="text-red-400">⚠️</span>
            <span className="text-red-300">{error}</span>
          </div>
        </div>
      )}

      {/* Prediction Result */}
      {prediction && (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-6">
          <div className="text-center mb-6">
            <h4 className="text-xl font-bold text-white mb-2">Prediction Result</h4>
            <div className="text-3xl font-bold text-cyan-400">
              {prediction.prediction} kW
            </div>
            <div className="text-sm text-gray-400">Power Demand</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-lg font-semibold text-white">{selectedModel}</div>
              <div className="text-sm text-gray-400">Model Used</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-green-400">{(prediction.confidence * 100).toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Confidence</div>
            </div>
            <div className={`text-center px-3 py-2 rounded-lg border ${getDecisionColor(prediction.decision)}`}>
              <div className="text-sm font-medium">{prediction.decision}</div>
            </div>
          </div>

          {/* Parameters Used */}
          <div className="border-t border-slate-700 pt-4">
            <h5 className="text-sm font-medium text-gray-300 mb-3">Parameters Used:</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Temperature:</span>
                <span className="text-white ml-1">{prediction.parameters.temperature}°C</span>
              </div>
              <div>
                <span className="text-gray-500">AQI:</span>
                <span className="text-white ml-1">{prediction.parameters.aqi}</span>
              </div>
              <div>
                <span className="text-gray-500">Humidity:</span>
                <span className="text-white ml-1">{prediction.parameters.humidity}%</span>
              </div>
              <div>
                <span className="text-gray-500">Time:</span>
                <span className="text-white ml-1">{prediction.parameters.time}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;