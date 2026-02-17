#!/bin/bash
# Hair's K3 Martial Arts - Docker Local Development Server
# Runs the static site in an Nginx Docker container

CONTAINER_NAME="hairsk3martialarts"
PORT=${1:-8080}
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "============================================"
echo "  Hair's K3 Martial Arts - Docker Server"
echo "============================================"
echo ""

# Stop and remove existing container if running
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "Stopping existing container..."
    docker stop "$CONTAINER_NAME" 2>/dev/null
    docker rm "$CONTAINER_NAME" 2>/dev/null
fi

echo "Starting Nginx container..."
echo "  URL: http://localhost:${PORT}"
echo "  Source: ${PROJECT_DIR}"
echo ""
echo "Press Ctrl+C to stop, then run:"
echo "  docker stop ${CONTAINER_NAME} && docker rm ${CONTAINER_NAME}"
echo ""

docker run \
    --name "$CONTAINER_NAME" \
    -p "${PORT}:80" \
    -v "${PROJECT_DIR}:/usr/share/nginx/html:ro" \
    nginx:alpine
