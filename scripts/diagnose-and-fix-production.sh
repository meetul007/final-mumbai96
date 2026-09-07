#!/bin/bash
# Emergency production fix for mojibake / broken 75 location pages.
# Run this directly on the GCP server (34.100.237.13) via SSH.
set -e

PROJECT=/home/bpl_borivali/mumbai96
OUT=/home/bpl_borivali/mumbai96-static-locations/pages

echo "=== 1) Sync repo to latest fixed source ==="
cd "$PROJECT"
git fetch origin
git reset --hard origin/main

echo ""
echo "=== 2) Confirm the source file is now correct (should print <!DOCTYPE html>) ==="
head -c 40 "$PROJECT/ui/src/data/location/75 locations pages/north/mira-road-east.html"; echo

echo ""
echo "=== 3) Regenerate all 75 static pages from the fixed source ==="
node "$PROJECT/regenerate-static-pages.js"

echo ""
echo "=== 4) Confirm the served file is now correct ==="
head -c 40 "$OUT/mira-road-east.html"; echo

echo ""
echo "=== 5) Force charset utf-8 in nginx (global + site config) ==="
sudo grep -q "charset utf-8;" /etc/nginx/nginx.conf || sudo sed -i '/http {/a \    charset utf-8;' /etc/nginx/nginx.conf
sudo grep -q "charset utf-8;" /etc/nginx/sites-enabled/app.conf || sudo sed -i '0,/server {/s//server {\n    charset utf-8;/' /etc/nginx/sites-enabled/app.conf

sudo nginx -t
sudo systemctl reload nginx

echo ""
echo "=== 6) Verify live response ==="
curl -sI http://127.0.0.1/mira-road-east | grep -i "content-type"
curl -s http://127.0.0.1/mira-road-east | head -c 60; echo
