#!/usr/bin/env bash
# filepath: /var/lib/ci/Vcoch27/ci-demo/deploy.sh
set -e

cd "$(dirname "$0")"

# ✅ Pull code mới từ GitHub trước khi deploy
echo "[deploy.sh] Pulling latest code from GitHub..."
git fetch origin
git reset --hard origin/main  # hoặc origin/<branch>

# Tạo package-lock.json nếu chưa có
[ -f package-lock.json ] || npm install

# Install deps
echo "[deploy.sh] Installing dependencies..."
npm ci || npm install

# Restart PM2
echo "[deploy.sh] Restarting PM2..."
pm2 restart ci-demo || pm2 start src/server.js --name ci-demo --watch=false
pm2 save

echo "[deploy.sh] Deploy completed successfully!"
