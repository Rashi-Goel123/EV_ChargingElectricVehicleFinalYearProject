# Flask CORS Configuration Helper
# Add this to your Flask app.py file

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app, resources={r"/data": {"origins": "*"}})

# Alternative: Enable CORS for all routes globally
# CORS(app)

@app.route('/data', methods=['GET', 'OPTIONS'])
def get_data():
    """Return ML model data for dashboard"""
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
            "LSTM": {
                "mae": 0.47,
                "rmse": 0.72,
                "smape": 5.01
            },
            "Linear Regression": {
                "mae": 0.86,
                "rmse": 1.08,
                "smape": 40.24
            },
            "Random Forest": {
                "mae": 0.63,
                "rmse": 0.89,
                "smape": 12.45
            }
        },
        "dataset": [
            {"time": "09:00", "power": 450.2, "temperature": 28.5},
            {"time": "09:15", "power": 465.8, "temperature": 29.1},
            {"time": "09:30", "power": 512.3, "temperature": 29.8},
            {"time": "09:45", "power": 548.9, "temperature": 30.2},
            {"time": "10:00", "power": 529.17, "temperature": 30.5}
        ]
    }
    return jsonify(data)

if __name__ == '__main__':
    # Run Flask with CORS enabled
    app.run(debug=True, host='127.0.0.1', port=5000)
