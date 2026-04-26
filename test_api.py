"""
QUICK TEST - Run this to verify Flask works correctly
Save as: test_api.py in EV_Project folder
Then run: python test_api.py
"""

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Dummy data for testing
@app.route('/data', methods=['GET', 'OPTIONS'])
def get_data():
    test_data = {
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
            {
                "time": "11:00",
                "forecasted_power": 545.23,
                "actual_power": 468.50,
                "ev_demand": 595.80,
                "decision": "Charge"
            },
            {
                "time": "12:00",
                "forecasted_power": 612.40,
                "actual_power": 535.90,
                "ev_demand": 650.20,
                "decision": "Charge"
            }
        ],
        "model_comparison": {
            "LSTM": {"mae": 0.47, "rmse": 0.72, "smape": 5.01},
            "Linear Regression": {"mae": 0.86, "rmse": 1.08, "smape": 40.24}
        },
        "dataset": [
            {"time": "09:00", "power": 450.2, "temperature": 28.5},
            {"time": "09:15", "power": 465.8, "temperature": 29.1},
            {"time": "09:30", "power": 512.3, "temperature": 29.8}
        ]
    }
    return jsonify(test_data)

@app.route('/')
def home():
    return "✅ Flask API is running correctly on http://127.0.0.1:5000"

if __name__ == '__main__':
    print("🚀 Starting Flask API...")
    print("📍 Server running on: http://127.0.0.1:5000")
    print("📊 API endpoint: http://127.0.0.1:5000/data")
    print("⏹️  Press Ctrl+C to stop")
    app.run(debug=True, host='127.0.0.1', port=5000)
