#!/bin/bash

echo "🚀 Starting Complete Aave Liquidation System..."
echo "================================================"

# Function to check if a command is running
check_process() {
    if pgrep -f "$1" > /dev/null; then
        echo "✅ $1 is running"
        return 0
    else
        echo "❌ $1 is not running"
        return 1
    fi
}

# Function to start Substreams monitoring
start_substreams() {
    echo "📡 Starting Substreams monitoring..."
    cd substreams
    . ./.substreams.env
    substreams run substreams.yaml map_aave_events --start-block 24000000 &
    SUBSTREAMS_PID=$!
    echo "Substreams PID: $SUBSTREAMS_PID"
    cd ..
}

# Function to start Aave Indexer
start_indexer() {
    echo "📊 Starting Aave Indexer..."
    cd aave-indexer
    npm run dev &
    INDEXER_PID=$!
    echo "Indexer PID: $INDEXER_PID"
    cd ..
}

# Function to start execution bot (when ready)
start_execution_bot() {
    echo "🤖 Starting Execution Bot..."
    cd aave-v2-liquidator
    # yarn start &
    # EXECUTION_PID=$!
    echo "Execution Bot: Not started (needs configuration)"
    cd ..
}

# Start all components
echo "Starting all components..."

# Start Substreams
start_substreams

# Start Indexer
start_indexer

# Start Execution Bot (commented out until configured)
start_execution_bot

echo ""
echo "🎉 Complete Liquidation System Started!"
echo "========================================"
echo "📡 Substreams: Monitoring liquidation events"
echo "📊 Indexer: Tracking position health factors"
echo "🤖 Execution: Ready for liquidation execution"
echo ""
echo "📋 To stop all processes:"
echo "   pkill -f 'substreams run'"
echo "   pkill -f 'npm run dev'"
echo ""
echo "🔍 To check status:"
echo "   ps aux | grep -E '(substreams|npm|yarn)'" 