import React from "react";
export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-cyan-500"></div>
        <div className="absolute inset-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute inset-4 bg-slate-900 rounded-full"></div>
        <div className="absolute inset-4 flex items-center justify-center">
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
        </div>
      </div>
      <h2 className="text-xl font-semibold text-white mb-2 mt-6">Loading Dashboard</h2>
      <p className="text-gray-400">Fetching data from API...</p>
    </div>
  );
}
