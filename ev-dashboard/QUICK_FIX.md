# 🔧 QUICK FIX - API Connection Issue

## Problem
React shows: "Failed to fetch data from API. Make sure Flask server is running."

## Solution (3 Steps)

### ✅ STEP 1: Install CORS Package
```bash
pip install flask-cors
```

### ✅ STEP 2: Update Flask app.py

Open `EV_Project/app.py` and add these lines at the TOP:

```python
from flask_cors import CORS
```

Then find where you create your Flask app (usually `app = Flask(__name__)`) and add:

```python
CORS(app)
```

**Complete example:**
```python
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Add this line

@app.route('/data', methods=['GET', 'OPTIONS'])
def get_data():
    return jsonify({
        "best_model": "LSTM",
        "summary": {"mae": 0.47, "rmse": 0.72, "smape": 5.01},
        "lstm_forecast": [...],
        "model_comparison": {...},
        "dataset": []
    })

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
```

### ✅ STEP 3: Restart Everything

**Terminal 1 - Flask:**
```bash
cd EV_Project
python app.py
```

**Terminal 2 - React (NEW TERMINAL):**
```bash
cd ev-dashboard
npm start
```

**Browser:**
```
http://localhost:3000
```

---

## ✅ Verify It Works

1. ✅ Flask running: `http://127.0.0.1:5000/data` (should show JSON)
2. ✅ React running: `http://localhost:3000` (should show dashboard with data)
3. ✅ No red error box = SUCCESS! 🎉

---

## 🆘 Still Not Working?

### Check 1: Flask CORS Installed?
```bash
pip list | grep flask-cors
```
If not listed, run: `pip install flask-cors`

### Check 2: CORS Added to Flask?
Open `EV_Project/app.py` and verify you see:
```python
from flask_cors import CORS
CORS(app)
```

### Check 3: Flask Running Correctly?
Check console output shows:
```
 * Running on http://127.0.0.1:5000
 * WARNING: This is a development server.
```

### Check 4: React Seeing the Error?
1. Open http://localhost:3000
2. Press F12 (Developer Tools)
3. Go to Console tab
4. Look for error details
5. Go to Network tab
6. Check if request to `/data` shows status 200

---

## 📋 Complete CORS Example for app.py

```python
from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
# ... your other imports

app = Flask(__name__)

# ENABLE CORS - ADD THIS LINE
CORS(app)

# Your existing routes and code here...

@app.route('/data', methods=['GET', 'OPTIONS'])
def get_data():
    """Return data for React dashboard"""
    
    # Your model predictions and data
    data = {
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
            },
            # ... more data
        ],
        "model_comparison": {
            "LSTM": {"mae": 0.47, "rmse": 0.72, "smape": 5.01},
            "Linear Regression": {"mae": 0.86, "rmse": 1.08, "smape": 40.24}
        },
        "dataset": [
            {"time": "09:00", "power": 450.2},
            # ... more data
        ]
    }
    
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
```

---

## ✅ After These Steps:

✅ React connects to Flask
✅ Dashboard shows all data
✅ Charts display correctly
✅ Tables populate with data
✅ No red error messages

**You're done! Dashboard is working!** 🎉

---

## 🚀 Done!

Your dashboard should now be live with data:
- Metric cards showing MAE, RMSE, SMAPE, Best Model
- Line chart showing forecasts
- Bar chart showing model comparison
- Tables showing predictions and dataset

Enjoy your premium dashboard! 🎊
