@echo off
echo ======================================
echo 🚀 Starting Full Stack Setup
echo ======================================

echo 📦 Installing Backend Dependencies...
cd backend
call npm install
cd ..

echo 📦 Installing Frontend Dependencies...
cd frontend
call npm install --legacy-peer-deps
cd ..

echo ======================================
echo ⚡ Starting Services
echo ======================================

echo Starting Backend in new window...
start cmd /k "title Backend Service && cd backend && npm start"

echo Starting Frontend in new window...
start cmd /k "title Frontend Service && cd frontend && npm start"

echo ✅ Both services have been started!
echo Backend should run on: http://localhost:5000
echo Frontend should run on: http://localhost:3000
echo.
echo Close the newly opened command prompt windows to stop the services.
pause
