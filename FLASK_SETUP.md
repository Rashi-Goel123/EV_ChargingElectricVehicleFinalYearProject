# 🚀 FLASK API - COMPLETE SETUP GUIDE

## ✅ What I Fixed

1. ✅ **Added CORS** to your Flask app
2. ✅ **Installed flask-cors** package
3. ✅ **Set explicit host/port** (127.0.0.1:5000)
4. ✅ **Created test_api.py** for verification

---

## 🔧 STEP 1: Verify Your Updated app.py

Your `EV_Project/app.py` now has:

```python
from flask import Flask, jsonify
from flask_cors import CORS  # ← NEW
import json

app = Flask(__name__)
CORS(app)  # ← NEW - Enable CORS for React

@app.route('/data', methods=['GET', 'OPTIONS'])  # ← UPDATED
def get_data():
    try:
        with open("output.json", "r") as f:
            data = json.load(f)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "output.json not found. Run notebook first."})

@app.route('/')
def home():
    return "✅ PV-EV API is running"

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)  # ← UPDATED with explicit host/port
```

---

## 📋 STEP 2: Quick Test (Optional)

To verify Flask works without using your output.json:

```bash
cd EV_Project
python test_api.py
```

This runs dummy data so you can test immediately without needing output.json.

---

## 🚀 STEP 3: Run Your Real App

```bash
cd EV_Project
python app.py
```

Expected output:
```
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
```

---

## ✅ STEP 4: Verify API Returns Data

Open browser and visit:
```
http://127.0.0.1:5000/data
```

You should see **JSON data** displayed (or error if output.json missing).

---

## 🎯 STEP 5: Refresh React Dashboard

Open http://localhost:3000 in browser

You should see:
- ✅ Dashboard loads (no error box)
- ✅ Metric cards display
- ✅ Charts show data
- ✅ Tables populate

---

## 🧪 Troubleshooting

### Issue: "Port 5000 already in use"
**Solution**: Kill existing Flask process
```bash
# PowerShell
Get-Process python | Stop-Process -Force
# Then restart: python app.py
```

### Issue: "No output.json found"
**Solution**: Either
- Run the Jupyter notebook to generate output.json, OR
- Use test_api.py to test with dummy data

### Issue: Still seeing error in React
**Solution**: 
1. Hard refresh React (Ctrl+Shift+R)
2. Check browser Console (F12) for detailed error
3. Verify Flask is running on :5000

---

## 📊 Expected output.json Format

Your Flask app reads from `output.json`. It should have this structure:

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

## ✨ Files Modified

| File | Change |
|------|--------|
| `EV_Project/app.py` | Added CORS, explicit host/port |
| Installed | `flask-cors` package |
| Created | `EV_Project/test_api.py` |

---

## 🎉 You're All Set!

Now run:
```bash
# Terminal 1
cd EV_Project
python app.py

# Terminal 2 (new terminal)
cd ev-dashboard
npm start

# Browser
http://localhost:3000
```

Dashboard should work perfectly! 🚀
