@echo off
REM Quick Start Script for PV-EV Charging Optimization Dashboard

echo.
echo ========================================
echo PV-EV Charging Optimization Dashboard
echo ========================================
echo.

REM Check if Flask is running
echo Checking if Flask API is running...
powershell -Command "Try { $response = Invoke-WebRequest -Uri 'http://127.0.0.1:5000/data' -ErrorAction Stop; Write-Host 'Flask API is running!' -ForegroundColor Green } Catch { Write-Host 'Flask API is NOT running. Please start it first!' -ForegroundColor Red; exit 1 }"

if errorlevel 1 (
    echo.
    echo ERROR: Flask API is not running at http://127.0.0.1:5000/data
    echo.
    echo Please run the Flask app first:
    echo   cd ..\EV_Project
    echo   python app.py
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Starting React Dashboard...
echo ========================================
echo.

npm start

pause
