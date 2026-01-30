#!/bin/bash

echo "=== Shutting down Investing Platform Production Environment ==="

# Read PIDs from file if available
if [ -f .production_pids ]; then
    echo "Found PID file, stopping processes..."
    PIDS=$(cat .production_pids)
    for PID in $PIDS; do
        if ps -p $PID > /dev/null; then
            echo "Stopping process $PID..."
            kill $PID
            # Wait a moment to see if it shuts down cleanly
            sleep 1
            if ps -p $PID > /dev/null; then
                echo "Process $PID did not stop gracefully, forcing..."
                kill -9 $PID 2>/dev/null || true
            fi
        else
            echo "Process $PID is not running"
        fi
    done
    rm .production_pids
    echo "PID file removed"
else
    # Otherwise, try to find and kill by process name
    echo "No PID file found, stopping processes by name..."
    
    # Count processes before killing
    NODE_COUNT=$(pgrep -f "node production_server.js" | wc -l)
    APP_COUNT=$(pgrep -f "python3 app.py" | wc -l)
    API_COUNT=$(pgrep -f "python3 api_server.py" | wc -l)
    NEWS_COUNT=$(pgrep -f "python3 news_server.py" | wc -l)

    echo "Found processes: $NODE_COUNT Node.js, $APP_COUNT Flask, $API_COUNT API, $NEWS_COUNT News"

    # Kill processes
    pkill -f "node production_server.js" 2>/dev/null || echo "No Node.js production server running"
    pkill -f "python3 app.py" 2>/dev/null || echo "No Flask app.py server running"
    pkill -f "python3 api_server.py" 2>/dev/null || echo "No Python API server running"
    pkill -f "python3 news_server.py" 2>/dev/null || echo "No Python News server running"
fi

# Verify all processes are stopped
NODE_RUNNING=$(pgrep -f "node production_server.js" | wc -l)
APP_RUNNING=$(pgrep -f "python3 app.py" | wc -l)
API_RUNNING=$(pgrep -f "python3 api_server.py" | wc -l)
NEWS_RUNNING=$(pgrep -f "python3 news_server.py" | wc -l)

if [ $NODE_RUNNING -gt 0 ] || [ $APP_RUNNING -gt 0 ] || [ $API_RUNNING -gt 0 ] || [ $NEWS_RUNNING -gt 0 ]; then
    echo "Warning: Some processes are still running:"
    [ $NODE_RUNNING -gt 0 ] && echo "- Node.js production server: $NODE_RUNNING instance(s)"
    [ $APP_RUNNING -gt 0 ] && echo "- Flask app.py server: $APP_RUNNING instance(s)"
    [ $API_RUNNING -gt 0 ] && echo "- Python API server: $API_RUNNING instance(s)"
    [ $NEWS_RUNNING -gt 0 ] && echo "- Python News server: $NEWS_RUNNING instance(s)"
    echo "You may need to manually kill these processes"
else
    echo "All production services successfully stopped"
fi

# Check for any lingering node or python processes that might be related
echo "Checking for any remaining related processes..."
ps aux | grep -E "node.*server|python3.*server" | grep -v grep

echo "Shutdown complete" 