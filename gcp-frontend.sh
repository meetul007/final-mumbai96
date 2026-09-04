#!/bin/bash
set -e

PROJECT_ROOT=$(pwd)
FRONTEND_PATH="$PROJECT_ROOT/ui"
USER_NAME=$(whoami)
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo ""
echo "=========================================="
echo "🚀 Mumbai96 Frontend Deployment"
echo "📅 $TIMESTAMP"
echo "=========================================="
echo ""

# ==========================================
# Step 1: Git Pull
# ==========================================

echo "📦 Pulling latest changes..."
cd $PROJECT_ROOT
git fetch origin
git pull origin main

echo "✅ Git pull completed"
echo ""

# ==========================================
# Step 2: Install System Dependencies
# ==========================================

echo "🔹 Checking system dependencies..."
sudo apt update -y > /dev/null 2>&1

if ! command -v node &> /dev/null; then
    echo "🔹 Installing Node.js 22..."
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - > /dev/null 2>&1
    sudo apt install -y nodejs > /dev/null 2>&1
else
    echo "✅ Node.js already installed ($(node -v))"
fi

if ! command -v npm &> /dev/null; then
    echo "🔹 Installing npm..."
    sudo apt install -y npm > /dev/null 2>&1
else
    echo "✅ npm already installed ($(npm -v))"
fi

echo ""

# ==========================================
# Step 3: Install Frontend Dependencies
# ==========================================

cd $FRONTEND_PATH

echo "🔹 Installing npm dependencies..."
if [ -d "node_modules" ]; then
    npm install --quiet
else
    npm install
fi

echo "✅ npm dependencies installed"
echo ""

# ==========================================
# Step 4: Build Next.js
# ==========================================

echo "🔹 Building Next.js application..."
npm run build

echo "✅ Build completed"
echo ""

# ==========================================
# Step 5: Create / Update systemd Service
# ==========================================

echo "🔹 Configuring frontend systemd service..."

sudo tee /etc/systemd/system/mumbai96-frontend.service > /dev/null <<EOF
[Unit]
Description=Mumbai96 Next.js Frontend
After=network.target

[Service]
User=$USER_NAME
WorkingDirectory=$FRONTEND_PATH
Environment=PORT=3000
Environment=NODE_ENV=production
Environment=PATH=/usr/bin
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable mumbai96-frontend
sudo systemctl restart mumbai96-frontend

echo "✅ Frontend service restarted"
echo ""

# ==========================================
# Step 6: Verify Service Status
# ==========================================

echo "🔹 Verifying frontend service..."
sleep 2

if sudo systemctl is-active --quiet mumbai96-frontend; then
    echo "✅ Frontend is running"
else
    echo "❌ Frontend failed to start. Check logs:"
    echo "   sudo journalctl -u mumbai96-frontend --no-pager -n 20"
fi

echo ""
echo "=========================================="
echo "🎉 Frontend Deployment Complete"
echo "📍 URL → http://127.0.0.1:3000"
echo "📝 Logs → sudo journalctl -u mumbai96-frontend -f"
echo "=========================================="
echo ""
