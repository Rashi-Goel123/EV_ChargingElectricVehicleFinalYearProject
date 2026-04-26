#!/usr/bin/env powershell
# Quick Start Script for PV-EV Charging Optimization Dashboard

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PV-EV Charging Optimization Dashboard" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Flask is running
Write-Host "Checking if Flask API is running..." -ForegroundColor Yellow

try {
    $response = Invoke-WebRequest -Uri 'http://127.0.0.1:5000/data' -ErrorAction Stop
    Write-Host "✓ Flask API is running!" -ForegroundColor Green
}
catch {
    Write-Host "✗ Flask API is NOT running at http://127.0.0.1:5000/data" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please start the Flask app first:" -ForegroundColor Yellow
    Write-Host "  cd ..\EV_Project" -ForegroundColor Gray
    Write-Host "  python app.py" -ForegroundColor Gray
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting React Dashboard..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Dashboard will open at: http://localhost:3000" -ForegroundColor Green
Write-Host ""

npm start
