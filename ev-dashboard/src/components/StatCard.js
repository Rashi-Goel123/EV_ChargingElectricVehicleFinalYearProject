import React from "react";
const StatCard = ({ title, value, subtitle, icon, color }) => (
  <div className={`glass neon-glow p-6 rounded-xl shadow-lg bg-gradient-to-br ${color} to-80%`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl md:text-4xl font-bold text-white">{value}</h3>
        {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
      </div>
      <span className="text-3xl">{icon}</span>
    </div>
    <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${color} mt-4`}></div>
  </div>
);

export default StatCard;
