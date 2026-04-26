# PV-EV Charging Optimization Dashboard

## 🚀 Premium React Dashboard for ML-Powered EV Charging Optimization

A modern, responsive dark-mode dashboard built with React, Tailwind CSS, and Recharts to visualize machine learning predictions for EV charging optimization.

---

## 📋 Features

✅ **Dark Theme** - Professional gradient dark UI  
✅ **Real-time Data** - Fetches from Flask API using Axios  
✅ **Interactive Charts** - Line and Bar charts with Recharts  
✅ **Performance Metrics** - MAE, RMSE, SMAPE cards  
✅ **Forecast Table** - Detailed LSTM predictions with decisions  
✅ **Dataset Preview** - First 5 rows of training data  
✅ **Responsive Design** - Works on desktop, tablet, mobile  
✅ **Loading & Error States** - Smooth UX with spinners and alerts  
✅ **Smooth Animations** - Hover effects and transitions  
✅ **Premium UI** - Startup-quality interface  

---

## 🛠 Setup Instructions

### Prerequisites
- Node.js (v14+)
- Flask API running at `http://127.0.0.1:5000/data`

### 1. Install Dependencies (Already Done)
```bash
cd ev-dashboard
npm install
```

### 2. Start Flask API (if not running)
```bash
cd EV_Project
python app.py
# API should be available at http://127.0.0.1:5000/data
```

### 3. Start React Dashboard
```bash
cd ev-dashboard
npm start
```

The dashboard will open at `http://localhost:3000`

---

## 📁 Project Structure

```
ev-dashboard/
├── src/
│   ├── components/
│   │   ├── StatCard.js           # Top metric cards
│   │   ├── LineChartComponent.js # Power forecasting chart
│   │   ├── BarChartComponent.js  # Model comparison
│   │   ├── ForecastTable.js      # LSTM predictions table
│   │   ├── DatasetTable.js       # Dataset preview
│   │   ├── LoadingSpinner.js     # Loading state
│   │   └── ErrorAlert.js         # Error handling
│   ├── App.js                    # Main dashboard component
│   ├── App.css                   # Empty (Tailwind)
│   ├── index.css                 # Global styles
│   └── index.js                  # Entry point
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 🎨 UI Components

### StatCard
- Displays key metrics
- Gradient backgrounds
- Hover scale effect
- Icons support

### LineChartComponent
- Shows Forecasted vs Actual Power
- Smooth animations
- Interactive tooltips
- Gradient effects

### BarChartComponent
- Model comparison (MAE)
- Rounded bars
- Responsive layout

### ForecastTable
- LSTM predictions
- Color-coded decisions
- Hover effects
- Responsive scrolling

### DatasetTable
- Dataset preview
- Dynamic columns
- Hover highlighting

---

## 🔌 API Integration

The dashboard expects the following API response:

```json
{
  "best_model": "LSTM",
  "summary": {
    "mae": 0.47,
    "rmse": 0.72,
    "smape": 5.01
  },
  "lstm_forecast": [
    {
      "time": "10:00",
      "forecasted_power": 529.17,
      "actual_power": 451.82,
      "ev_demand": 580.42,
      "decision": "Delay Charging"
    }
  ],
  "model_comparison": {
    "LSTM": {"mae": 0.47, "rmse": 0.72, "smape": 5.01},
    "Linear Regression": {"mae": 0.86, "rmse": 1.08, "smape": 40.24}
  },
  "dataset": []
}
```

---

## 🎯 Customization

### Change API URL
Edit `src/App.js` line 20:
```javascript
const response = await axios.get('http://YOUR_API_URL/data');
```

### Change Colors
Edit `src/index.css` for gradient background:
```css
background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 50%, #YOUR_COLOR3 100%);
```

Edit `tailwind.config.js` for theme colors.

### Add More Metrics
Duplicate StatCard in `src/App.js`:
```javascript
<StatCard
  title="Your Metric"
  value={data.your_metric}
  icon="📊"
  color="from-cyan-500 to-blue-500"
/>
```

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Deploy the 'build' folder to Netlify
```

---

## 🐛 Troubleshooting

### "Failed to fetch data from API"
- Ensure Flask server is running
- Check API URL in App.js
- Check CORS headers in Flask app

### Tailwind styles not loading
```bash
npm run build
npm start
```

### Port 3000 already in use
```bash
PORT=3001 npm start
```

---

## 📦 Dependencies

- **React 19** - UI framework
- **Tailwind CSS 4** - Styling
- **Recharts 3.8** - Charts
- **Axios** - API calls

---

## 📄 License

Final Year Project - PV-EV Charging Optimization

---

## 👨‍💻 Author

Built with ❤️ for ML-powered renewable energy optimization
