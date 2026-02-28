#!/bin/bash

echo "Iniciando backend (porta 3001)..."
cd "$(dirname "$0")/server" && node index.js &
PID_BACK=$!

echo "Iniciando frontend (porta 4201)..."
cd "$(dirname "$0")/frontend" && npx ng serve --port 4201 --open &
PID_FRONT=$!

echo ""
echo "Backend:  http://localhost:3001"
echo "Frontend: http://localhost:4201"
echo ""
echo "Pressione Ctrl+C para parar tudo."

trap "kill $PID_BACK $PID_FRONT 2>/dev/null; exit" INT TERM
wait
