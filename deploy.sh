#!/usr/bin/env bash
set -e

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$REPO_DIR"

echo "[deploy] start $(date)"

# demo: chỉ ghi file
echo "deploy ok $(date)" >> deploy.log

echo "[deploy] done"