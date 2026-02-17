#!/bin/bash
# Hair's K3 Martial Arts - Local Development Server
# Runs a simple HTTP server for local testing

PORT=${1:-8080}
echo "============================================"
echo "  Hair's K3 Martial Arts - Local Server"
echo "============================================"
echo ""
echo "Starting server at: http://localhost:${PORT}"
echo "Press Ctrl+C to stop"
echo ""

# Use Python 3 http.server (available on macOS by default)
cd "$(dirname "$0")"
python3 -m http.server "$PORT"
