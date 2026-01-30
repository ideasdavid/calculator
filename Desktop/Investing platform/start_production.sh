#!/bin/bash

# Exit on error
set -e

echo "=== Investing Platform Production Deployment ==="

# Stop any existing processes
echo "Stopping any existing processes..."
pkill -f "node production_server.js" 2>/dev/null || true
pkill -f "python3 app.py" 2>/dev/null || true
pkill -f "python3 api_server.py" 2>/dev/null || true
pkill -f "python3 news_server.py" 2>/dev/null || true

# Copy production environment
echo "Setting up production environment..."
cp .env.production .env

# Check if Python virtual environment exists
if [ ! -d ".venv" ]; then
    echo "Error: Python virtual environment not found."
    echo "Please create it using 'python3 -m venv .venv'"
    exit 1
fi

# Check if the client build directory exists
if [ ! -d "client/build" ]; then
    echo "Warning: React build folder not found. Building it now..."
    cd client && npm run build
    cd ..
fi

# Activate virtual environment and start Python servers
echo "Starting Flask API server (app.py)..."
source .venv/bin/activate
PORT=58932 python3 app.py > api_server.log 2>&1 &
API_PID=$!
echo "Flask API server started with PID $API_PID"

# Verify API server is running
sleep 3
if ! ps -p $API_PID > /dev/null; then
    echo "Warning: Flask API server may not have started properly."
    echo "Check api_server.log for errors:"
    tail -n 10 api_server.log
    echo "Using existing server if available..."
fi

echo "Starting News server..."
python3 news_server.py > news_server.log 2>&1 &
NEWS_PID=$!
echo "News server started with PID $NEWS_PID"

# Verify News server is running
sleep 3
if ! ps -p $NEWS_PID > /dev/null; then
    echo "Warning: News server may not have started properly."
    echo "Check news_server.log for errors:"
    tail -n 10 news_server.log
    echo "Using existing server if available..."
fi

# Start the production server
echo "Starting production Node.js server..."
NODE_ENV=production node production_server.js > production_server.log 2>&1 &
NODE_PID=$!
echo "Production server started with PID $NODE_PID"

# Write PIDs to a file for easy shutdown later
echo "$API_PID $NEWS_PID $NODE_PID" > .production_pids

# Verify production server is running
sleep 3
if ! ps -p $NODE_PID > /dev/null; then
    echo "Error: Production server failed to start."
    echo "Check production_server.log for errors:"
    tail -n 20 production_server.log
    echo "Please fix the errors and try again."
    exit 1
else
    echo "All services started successfully. Logs are available in *.log files"
    echo "To view logs in real-time, use: tail -f production_server.log"
    echo "To stop all services, run: ./stop_production.sh"
fi

# Test connections to verify services
echo "Testing connections to all services..."

# Test Node.js server
echo -n "Testing production server: "
if curl -s http://localhost:5001/api/test > /dev/null; then
    echo "OK"
else
    echo "Failed"
    echo "Check production_server.log for errors"
fi

# Test Python API server
echo -n "Testing API server: "
if curl -s http://localhost:58932/api/test > /dev/null; then
    echo "OK"
else
    echo "Failed (but this may be expected if it connects through the production server)"
fi

# Test News API server
echo -n "Testing News server: "
if curl -s http://localhost:59902/api/news > /dev/null; then
    echo "OK"
else
    echo "Failed (but this may be expected if it connects through the production server)"
fi

# Open the application in the default browser
echo "Opening application in browser..."
sleep 2
open http://localhost:5001

# List running processes
echo "Running processes:"
ps -p $API_PID -p $NEWS_PID -p $NODE_PID -o pid,command
echo ""
echo "Deployment complete! The application is now running at http://localhost:5001" 