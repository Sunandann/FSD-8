#!/bin/bash

echo "======================================"
echo "🚀 Starting Full Stack Setup"
echo "======================================"

echo "📦 Installing Backend Dependencies..."
cd backend
npm install
cd ..

echo "📦 Installing Frontend Dependencies..."
cd frontend
npm install --legacy-peer-deps
cd ..

echo "======================================"
echo "⚡ Starting Services"
echo "======================================"

# Start backend
cd backend
npm start &
BACKEND_PID=$!
cd ..

# Start frontend
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo "✅ Both services are running!"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both services."

# Cleanup function to kill background processes on exit
function cleanup {
  echo "🛑 Stopping services..."
  kill $BACKEND_PID
  kill $FRONTEND_PID
  exit
}

# Trap Ctrl+C (SIGINT) and call cleanup
trap cleanup EXIT INT TERM

# Keep script running
wait $BACKEND_PID $FRONTEND_PID
