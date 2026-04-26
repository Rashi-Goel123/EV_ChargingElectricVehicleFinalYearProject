import React from 'react';

const badge = (decision) =>
  decision === "Charge"
    ? "bg-green-600/20 text-green-400 border border-green-500/30"
    : "bg-red-600/20 text-red-400 border border-red-500/30";

export default function ForecastTable({ data }) {
  if (!data?.length) return <div className="text-gray-400">No forecast data.</div>;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-slate-800">
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Forecasted Power</th>
            <th className="px-4 py-2">Actual Power</th>
            <th className="px-4 py-2">SMAPE</th>
            <th className="px-4 py-2">EV Demand</th>
            <th className="px-4 py-2">Decision</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-slate-800/50">
              <td className="px-4 py-2">{row.time}</td>
              <td className="px-4 py-2">{row.forecasted_power}</td>
              <td className="px-4 py-2">{row.actual_power}</td>
              <td className="px-4 py-2">{row.smape}</td>
              <td className="px-4 py-2">{row.ev_demand}</td>
              <td className="px-4 py-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge(row.decision)}`}>
                  {row.decision}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

