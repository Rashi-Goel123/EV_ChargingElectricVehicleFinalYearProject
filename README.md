⚡ EV Charging Optimization Dashboard

A full-stack machine learning project that optimizes Electric Vehicle (EV) charging using predictive modeling and provides a dynamic dashboard for visualization.

🚀 Project Overview

This project focuses on optimizing EV charging behavior using Machine Learning techniques. It predicts charging duration and power demand and visualizes results through an interactive dashboard.

The system integrates:

📊 Machine Learning models (LSTM, Random Forest, SVR, Ensemble)
⚙️ Flask backend API
🎨 React-based dynamic frontend dashboard
🧠 Machine Learning Models Used
🔹 LSTM (Long Short-Term Memory)
🔹 Random Forest
🔹 Support Vector Regression (SVR)
🔹 Ensemble Model

📌 Final selected model: LSTM

📊 Final Output Metrics
Metric	Value
MAE	0.41
RMSE	0.72
SMAPE	5.01%
✨ Features
📁 Upload CSV dataset dynamically
📈 Forecast EV charging demand
📊 Model comparison visualization
⚡ Real-time dashboard updates
🔍 Dataset preview and analysis
🎯 Optimized charging decision (Charge Now / Delay Charging)
🏗️ Tech Stack
Frontend
React.js
Tailwind CSS
Recharts
Backend
Flask (Python)
Pandas, NumPy
Machine Learning
Scikit-learn
TensorFlow / Keras
📂 Project Structure
EV_ChargingElectricVehicleFinalYearProject/

├── EV_Project/
│   ├── app.py
│   ├── output.json
│   ├── dataset.csv
│   └── notebook.ipynb
│
├── ev-dashboard/
│   ├── src/
│   ├── components/
│   ├── package.json
│
├── README.md
▶️ How to Run the Project
🔹 Backend (Flask)
cd EV_Project
python app.py

Server runs on:

http://127.0.0.1:5000
🔹 Frontend (React)
cd ev-dashboard
npm install
npm start
🔗 API Endpoint
GET  /data   → Fetch default dataset
POST /data   → Upload CSV & get predictions

