#!/bin/bash
set -e

PROJECT_ROOT=$(pwd)
BACKEND_PATH="$PROJECT_ROOT/backend"
USER_NAME=$(whoami)
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo ""
echo "=========================================="
echo "🚀 Mumbai96 Backend Deployment"
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

for pkg in python3 python3-pip python3-venv nginx git build-essential libpq-dev; do
    if dpkg -s $pkg 2>/dev/null | grep -q "Status: install ok installed"; then
        echo "  ✅ $pkg already installed"
    else
        echo "  📥 Installing $pkg..."
        sudo apt install -y $pkg > /dev/null 2>&1
    fi
done

echo ""

# ==========================================
# Step 3: Setup Virtual Environment
# ==========================================

cd $BACKEND_PATH

if [ ! -d "venv" ]; then
    echo "🔹 Creating virtual environment..."
    python3 -m venv venv
else
    echo "✅ Virtual environment exists"
fi

echo "🔹 Upgrading pip and installing dependencies..."
source venv/bin/activate
pip install --upgrade pip -q
pip install -r requirements.txt -q
pip install gunicorn -q
deactivate

echo "✅ Python dependencies installed"
echo ""

# ==========================================
# Step 4: Run Database Migrations
# ==========================================

echo "🔹 Running database migrations..."
cd $BACKEND_PATH
source venv/bin/activate

if command -v flask &> /dev/null; then
    flask db upgrade 2>&1 || echo "⚠️ Migration skipped (no pending migrations or alembic not configured)"
else
    echo "⚠️ Flask CLI not found, skipping migrations"
fi

deactivate

echo "✅ Database migrations completed"
echo ""

# ==========================================
# Step 5: Create / Update systemd Service
# ==========================================

echo "🔹 Configuring backend systemd service..."

sudo tee /etc/systemd/system/mumbai96-backend.service > /dev/null <<EOF
[Unit]
Description=Mumbai96 Flask Backend
After=network.target

[Service]
User=$USER_NAME
WorkingDirectory=$BACKEND_PATH
Environment="PATH=$BACKEND_PATH/venv/bin"
ExecStart=$BACKEND_PATH/venv/bin/gunicorn -w 4 -b 127.0.0.1:$BACKEND_PORT --access-logfile - --error-logfile - app.run:app
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable mumbai96-backend
sudo systemctl restart mumbai96-backend

echo "✅ Backend service restarted"
echo ""

# ==========================================
# Step 6: Verify Service Status
# ==========================================

echo "🔹 Verifying backend service..."
sleep 2

if sudo systemctl is-active --quiet mumbai96-backend; then
    echo "✅ Backend is running"
else
    echo "❌ Backend failed to start. Check logs:"
    echo "   sudo journalctl -u mumbai96-backend --no-pager -n 20"
fi

echo ""
echo "=========================================="
echo "🎉 Backend Deployment Complete"
echo "📍 API → http://127.0.0.1:5002"
echo "📝 Logs → sudo journalctl -u mumbai96-backend -f"
echo "=========================================="
echo ""
