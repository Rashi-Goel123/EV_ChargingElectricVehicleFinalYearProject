import React from 'react';

const ErrorAlert = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-2 border-red-500/50 rounded-2xl p-8 max-w-md w-full">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            <span className="text-4xl">⚠️</span>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-red-400">Error</h3>
          </div>
        </div>
        <p className="text-red-300 mb-6">{message}</p>
        <button
          onClick={onRetry}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorAlert;
