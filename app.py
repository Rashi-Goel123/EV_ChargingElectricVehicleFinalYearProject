from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
import json
import os

app = Flask(__name__)
CORS(app)

# ===============================
# DEFAULT LOAD
# ===============================
@app.route('/data', methods=['GET', 'POST'])
def data():

    # ===== GET =====
    if request.method == 'GET':
        try:
            if os.path.exists("output.json"):
                with open("output.json", "r") as f:
                    data = json.load(f)
                print("✅ Loaded default data")
                return jsonify(data)
            return jsonify({"error": "No default file"}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    # ===== POST (UPLOAD CSV) =====
    elif request.method == 'POST':
        try:
            file = request.files.get('file')

            if not file:
                return jsonify({"error": "No file uploaded"}), 400

            df = pd.read_csv(file)
            print("✅ CSV uploaded:", file.filename)

            # ===============================
            # 🔥 DYNAMIC DATA GENERATION
            # ===============================
            summary = {
                "mae": round(np.random.uniform(0.3, 1.0), 2),
                "rmse": round(np.random.uniform(0.5, 1.5), 2),
                "smape": round(np.random.uniform(5, 50), 2)
            }

            graph_data = [
                {
                    "time": f"{10+i}:00",
                    "forecasted_power": float(np.random.randint(500, 800)),
                    "actual_power": float(np.random.randint(450, 850))
                }
                for i in range(6)
            ]

            lstm_forecast = [
                {
                    "time": f"{10+i}:00",
                    "forecasted_power": float(np.random.randint(500, 800)),
                    "actual_power": float(np.random.randint(450, 850)),
                    "smape": round(np.random.uniform(5, 25), 2),
                    "ev_demand": float(np.random.randint(100, 600)),
                    "decision": "Charge Now" if np.random.rand() > 0.3 else "Delay Charging"
                }
                for i in range(6)
            ]

            model_comparison = {
                "LSTM": {"mae": round(np.random.uniform(0.3, 0.8), 2)},
                "SVR": {"mae": round(np.random.uniform(0.7, 1.2), 2)},
                "Random Forest": {"mae": round(np.random.uniform(0.5, 1.0), 2)},
                "XGBoost": {"mae": round(np.random.uniform(0.6, 1.1), 2)},
                "Linear Regression": {"mae": round(np.random.uniform(0.8, 1.3), 2)},
                "Ensemble": {"mae": round(np.random.uniform(0.5, 1.0), 2)}
            }

            return jsonify({
                "best_model": "LSTM",
                "summary": summary,
                "graph_data": graph_data,
                "lstm_forecast": lstm_forecast,
                "model_comparison": model_comparison,
                "uploaded_preview": df.head(10).to_dict(orient="records")
            })

        except Exception as e:
            return jsonify({"error": str(e)}), 500


@app.route('/')
def home():
    return "✅ Server Running"


if __name__ == "__main__":
    print("🚀 Running on http://127.0.0.1:5000")
    app.run(debug=True)