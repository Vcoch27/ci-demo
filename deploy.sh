#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

# cài deps nếu có
[ -f package.json ] && npm ci || true

# start / restart bằng pm2
pm2 restart ci-demo || pm2 start src/server.js --name ci-demo --watch=false
pm2 save
