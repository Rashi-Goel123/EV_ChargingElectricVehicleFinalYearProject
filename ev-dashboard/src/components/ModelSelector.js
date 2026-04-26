import React from 'react';

const ModelSelector = ({ selectedModel, onModelChange, models }) => {
  const modelInfo = {
    'LSTM': {
      description: 'Long Short-Term Memory - Best for time series forecasting',
      accuracy: 'High',
      speed: 'Medium',
      icon: '🧠'
    },
    'SVR': {
      description: 'Support Vector Regression - Good for non-linear relationships',
      accuracy: 'Medium',
      speed: 'Fast',
      icon: '📈'
    },
    'Random Forest': {
      description: 'Ensemble learning - Robust and handles missing data well',
      accuracy: 'High',
      speed: 'Medium',
      icon: '🌳'
    },
    'XGBoost': {
      description: 'Extreme Gradient Boosting - High performance ML algorithm',
      accuracy: 'Very High',
      speed: 'Fast',
      icon: '⚡'
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <span className="text-cyan-400">🤖</span>
        <h3 className="text-lg font-semibold text-white">Select ML Model</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {models.map((model) => (
          <div
            key={model}
            onClick={() => onModelChange(model)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              selectedModel === model
                ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
                : 'border-slate-600 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-700/50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="text-2xl">{modelInfo[model]?.icon || '📊'}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-white">{model}</h4>
                  {selectedModel === model && (
                    <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  {modelInfo[model]?.description || 'Advanced ML algorithm'}
                </p>
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500">Accuracy:</span>
                    <span className={`text-xs font-medium ${
                      modelInfo[model]?.accuracy === 'Very High' ? 'text-green-400' :
                      modelInfo[model]?.accuracy === 'High' ? 'text-blue-400' :
                      'text-yellow-400'
                    }`}>
                      {modelInfo[model]?.accuracy || 'Medium'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500">Speed:</span>
                    <span className={`text-xs font-medium ${
                      modelInfo[model]?.speed === 'Fast' ? 'text-green-400' :
                      modelInfo[model]?.speed === 'Medium' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {modelInfo[model]?.speed || 'Medium'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedModel && (
        <div className="mt-4 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-cyan-400">✓</span>
            <span className="text-white font-medium">Selected: {selectedModel}</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            {modelInfo[selectedModel]?.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default ModelSelector;