import React, { useState, useRef } from 'react';
import Papa from 'papaparse';

const CSVUpload = ({ onDataLoaded, onClose }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.csv')) {
        setError('Please select a CSV file');
        return;
      }
      setFile(selectedFile);
      setError('');
      parseCSV(selectedFile);
    }
  };

  const parseCSV = (file) => {
    setLoading(true);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError('Error parsing CSV: ' + results.errors[0].message);
          setLoading(false);
          return;
        }

        setColumns(results.meta.fields || []);
        setPreview(results.data.slice(0, 5)); // Show first 5 rows
        setLoading(false);
      },
      error: (error) => {
        setError('Error reading file: ' + error.message);
        setLoading(false);
      }
    });
  };

  const handleUpload = () => {
    if (!file || preview.length === 0) {
      setError('Please select a valid CSV file');
      return;
    }

    // Parse full file for upload
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        onDataLoaded({
          filename: file.name,
          columns: results.meta.fields,
          data: results.data,
          totalRows: results.data.length
        });
        onClose();
      }
    });
  };

  const resetFile = () => {
    setFile(null);
    setPreview([]);
    setColumns([]);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <span>📁</span>
            <span>CSV File Upload</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* File Selection */}
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center hover:border-cyan-500 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
                id="csv-file"
              />
              <label htmlFor="csv-file" className="cursor-pointer">
                <div className="space-y-2">
                  <div className="text-4xl">📄</div>
                  <div className="text-lg font-medium text-gray-300">
                    {file ? file.name : 'Click to select CSV file'}
                  </div>
                  <div className="text-sm text-gray-500">
                    Supports CSV files with headers
                  </div>
                </div>
              </label>
            </div>

            {file && (
              <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-sm text-gray-300">{file.name}</span>
                  <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                </div>
                <button
                  onClick={resetFile}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <span className="text-red-400">⚠️</span>
                <span className="text-red-300 text-sm">{error}</span>
              </div>
            </div>
          )}

          {/* Preview */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto"></div>
              <p className="text-gray-400 mt-2">Parsing CSV file...</p>
            </div>
          )}

          {preview.length > 0 && !loading && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Data Preview</h3>
                <span className="text-sm text-gray-400">
                  {columns.length} columns • {preview.length} rows shown
                </span>
              </div>

              {/* Columns */}
              <div className="flex flex-wrap gap-2">
                {columns.map((col, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30"
                  >
                    {col}
                  </span>
                ))}
              </div>

              {/* Data Table */}
              <div className="bg-slate-900/50 rounded-lg border border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-800/50">
                      <tr>
                        {columns.map((col, index) => (
                          <th key={index} className="px-4 py-3 text-left text-gray-300 font-medium">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {preview.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-t border-slate-700/50 hover:bg-slate-800/30">
                          {columns.map((col, colIndex) => (
                            <td key={colIndex} className="px-4 py-3 text-gray-400">
                              {row[col] || '-'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || loading || preview.length === 0}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Upload & Analyze
          </button>
        </div>
      </div>
    </div>
  );
};

export default CSVUpload;