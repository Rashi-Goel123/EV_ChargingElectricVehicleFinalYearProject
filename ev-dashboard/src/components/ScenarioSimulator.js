import React, { useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const ScenarioSimulator = ({ selectedModel }) => {
  const [scenarios, setScenarios] = useState([
    { name: 'Current Weather', temperature: 30, aqi: 150, humidity: 60 },
    { name: 'Hot Day', temperature: 40, aqi: 200, humidity: 70 },
    { name: 'Cold Day', temperature: 20, aqi: 80, humidity: 40 }
  ]);
  const [simulationResults, setSimulationResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedScenario, setSelectedScenario] = useState(0);

  const addScenario = () => {
    const newScenario = {
      name: `Scenario ${scenarios.length + 1}`,
      temperature: 30,
      aqi: 150,
      humidity: 60
    };
    setScenarios([...scenarios, newScenario]);
  };

  const updateScenario = (index, field, value) => {
    const updated = [...scenarios];
    updated[index][field] = value;
    setScenarios(updated);
  };

  const removeScenario = (index) => {
    if (scenarios.length > 1) {
      setScenarios(scenarios.filter((_, i) => i !== index));
      if (selectedScenario >= index && selectedScenario > 0) {
        setSelectedScenario(selectedScenario - 1);
      }
    }
  };

  const runSimulation = async () => {
    setLoading(true);
    setError('');
    setSimulationResults(null);

    try {
      const response = await axios.post('http://127.0.0.1:5000/simulate', {
        scenarios: scenarios,
        model: selectedModel
      });

      setSimulationResults(response.data.results);
    } catch (err) {
      setError('Simulation failed. Please try again.');
      console.error('Simulation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const exportResults = () => {
    if (!simulationResults) return;

    const csvData = [];
    simulationResults.forEach((result, scenarioIndex) => {
      result.predictions.forEach(pred => {
        csvData.push({
          scenario: result.scenario.name,
          time: pred.time,
          power: pred.power,
          decision: pred.decision
        });
      });
    });

    // Create and download CSV
    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scenario_simulation_results.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-cyan-400">⚡</span>
          <h3 className="text-lg font-semibold text-white">Scenario Simulator</h3>
        </div>
        <button
          onClick={addScenario}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
        >
          <span>+</span>
          <span>Add Scenario</span>
        </button>
      </div>

      {/* Scenarios Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-300">Configure Scenarios</h4>

          {scenarios.map((scenario, index) => (
            <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <input
                  type="text"
                  value={scenario.name}
                  onChange={(e) => updateScenario(index, 'name', e.target.value)}
                  className="bg-transparent text-white font-medium focus:outline-none border-b border-transparent focus:border-cyan-500"
                />
                {scenarios.length > 1 && (
                  <button
                    onClick={() => removeScenario(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Temperature: {scenario.temperature}°C</label>
                  <input
                    type="range"
                    min="15"
                    max="45"
                    value={scenario.temperature}
                    onChange={(e) => updateScenario(index, 'temperature', parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">AQI: {scenario.aqi}</label>
                  <input
                    type="range"
                    min="50"
                    max="300"
                    value={scenario.aqi}
                    onChange={(e) => updateScenario(index, 'aqi', parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Humidity: {scenario.humidity}%</label>
                  <input
                    type="range"
                    min="20"
                    max="90"
                    value={scenario.humidity}
                    onChange={(e) => updateScenario(index, 'humidity', parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Simulation Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-medium text-gray-300">Simulation Results</h4>
            {simulationResults && (
              <button
                onClick={exportResults}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm flex items-center space-x-1"
              >
                <span>📥</span>
                <span>Export CSV</span>
              </button>
            )}
          </div>

          {simulationResults ? (
            <div className="space-y-4">
              {/* Scenario Selector */}
              <div className="flex space-x-2 overflow-x-auto">
                {simulationResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedScenario(index)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                      selectedScenario === index
                        ? 'bg-cyan-500 text-white'
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    }`}
                  >
                    {result.scenario.name}
                  </button>
                ))}
              </div>

              {/* Selected Scenario Details */}
              {simulationResults[selectedScenario] && (
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-cyan-400">{simulationResults[selectedScenario].avg_power.toFixed(1)}</div>
                      <div className="text-xs text-gray-400">Avg Power (kW)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-400">{simulationResults[selectedScenario].peak_power.toFixed(1)}</div>
                      <div className="text-xs text-gray-400">Peak Power (kW)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">{simulationResults[selectedScenario].charging_hours}</div>
                      <div className="text-xs text-gray-400">Charge Hours</div>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={simulationResults[selectedScenario].predictions}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis
                          dataKey="time"
                          stroke="#9CA3AF"
                          fontSize={12}
                          tick={{ fill: '#9CA3AF' }}
                        />
                        <YAxis
                          stroke="#9CA3AF"
                          fontSize={12}
                          tick={{ fill: '#9CA3AF' }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#F9FAFB'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="power"
                          stroke="#06B6D4"
                          fill="url(#colorPower)"
                          strokeWidth={2}
                        />
                        <defs>
                          <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-800/50 rounded-lg p-8 text-center border border-slate-700 border-dashed">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-gray-400">Run simulation to see results</p>
            </div>
          )}
        </div>
      </div>

      {/* Run Simulation Button */}
      <div className="flex justify-center">
        <button
          onClick={runSimulation}
          disabled={loading || !selectedModel}
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Running Simulation...</span>
            </>
          ) : (
            <>
              <span>🚀</span>
              <span>Run Simulation</span>
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
    </div>
  );
};

export default ScenarioSimulator;