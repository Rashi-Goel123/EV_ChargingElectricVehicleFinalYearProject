import React, { useState, useEffect } from "react";
import axios from "axios";
import StatCard from "./components/StatCard";
import ForecastTable from "./components/ForecastTable";
import BarChartComponent from "./components/BarChartComponent";
import DatasetTable from "./components/DatasetTable";
import LoadingSpinner from "./components/LoadingSpinner";
import LineChartComponent from "./components/LineChartComponent";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);

  // ✅ AUTO LOAD DEFAULT DATA
  useEffect(() => {
    fetchDefaultData();
  }, []);

  const fetchDefaultData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://ev-2ynv.onrender.com/data");
      setData(res.data);
      console.log("✅ Default data loaded");
    } catch (err) {
      console.log("❌ Backend not ready");
    } finally {
      setLoading(false);
    }
  };

  // 📂 FILE SELECT
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    console.log("📂 File selected:", selected);
  };

  // 🚀 RUN MODEL (UPLOAD CSV)
  const handleRunModel = async () => {
    if (!file) {
      alert("⚠️ Please select file first");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", file);

      console.log("🚀 Uploading CSV...");

      const res = await axios.post(
        "https://ev-2ynv.onrender.com/data",
        formData
      );

      console.log("✅ Response:", res.data);

      // 🔥 FORCE UI UPDATE
      setData(null);
      setTimeout(() => {
        setData(res.data);
      }, 100);

      alert("✅ New dataset loaded!");

    } catch (err) {
      console.error(err);
      setError("❌ Upload failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 ALWAYS SHOW LATEST DATASET
  const datasetToShow = data?.uploaded_preview || data?.dataset;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          ⚡ EV Charging Dashboard
        </h1>

        {/* FILE UPLOAD */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 mb-8">
          <h2 className="text-xl text-cyan-400 mb-4">Upload Dataset</h2>

          <div className="flex gap-4 items-center">
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button
              onClick={handleRunModel}
              className="px-6 py-2 bg-cyan-500 rounded-lg hover:bg-cyan-600"
            >
              Run Model
            </button>
          </div>

          <p className="text-gray-400 mt-2">
            📂 {file ? file.name : "Default Dataset Loaded"}
          </p>
        </div>

        {/* LOADING */}
        {loading && <LoadingSpinner />}

        {/* ERROR */}
        {error && <p className="text-red-400">{error}</p>}

        {/* MAIN UI */}
        {data && (
          <div className="space-y-8">

            {/* KPI */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="MAE" value={data?.summary?.mae || "-"} color="from-green-500 to-emerald-500" />
              <StatCard title="RMSE" value={data?.summary?.rmse || "-"} color="from-orange-500 to-red-500" />
              <StatCard title="SMAPE" value={data?.summary?.smape || "-"} color="from-purple-500 to-pink-500" />
            </div>

            {/* GRAPH */}
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <h2 className="text-xl text-cyan-400 mb-4">📈 Power Forecast</h2>
              <LineChartComponent data={data?.graph_data} />
            </div>

            {/* MODEL COMPARISON */}
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <h2 className="text-xl text-cyan-400 mb-4">📊 Model Comparison</h2>
              <BarChartComponent data={data?.model_comparison} />
            </div>

            {/* FORECAST */}
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <h2 className="text-xl text-cyan-400 mb-4">🔮 Forecast</h2>
              <ForecastTable data={data?.lstm_forecast} />
            </div>

            {/* DATASET */}
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <h2 className="text-xl text-cyan-400 mb-4">📁 Dataset Preview</h2>

              <p className="text-gray-400 mb-3">
                Showing: {file ? file.name : "Default Dataset"}
              </p>

              <DatasetTable data={datasetToShow} />
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;