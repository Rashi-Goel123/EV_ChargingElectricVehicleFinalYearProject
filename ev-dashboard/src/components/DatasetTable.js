import React from 'react';

const DatasetTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-gray-400">No dataset preview.</div>;
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-slate-700 to-slate-800 border-b border-slate-600">
            {columns.map((col) => (
              <th
                key={col}
                className="px-6 py-4 text-left font-semibold text-cyan-400"
              >
                {col.replace(/_/g, ' ').toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors duration-200"
            >
              {columns.map((col) => (
                <td key={col} className="px-6 py-4 text-gray-300">
                  {typeof row[col] === 'number' ? row[col].toFixed(2) : row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DatasetTable;
