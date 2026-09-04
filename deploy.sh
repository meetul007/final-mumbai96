#!/bin/bash
set -e

PROJECT_ROOT=$(pwd)
BACKEND_PATH="$PROJECT_ROOT/backend"
USER_NAME=$(whoami)

echo "🚀 Starting Backend Deployment..."

# ==========================================
# Install Required System Packages
# ==========================================

echo "🔹 Installing system dependencies..."

sudo dnf install -y nginx git gcc python3 python3-pip python3-virtualenv

# ==========================================
# Backend Setup
# ==========================================

echo "🔹 Setting up Backend..."

cd $BACKEND_PATH

# Create virtual environment if missing
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
pip install gunicorn
deactivate

# ==========================================
# Create systemd service (if not exists)
# ==========================================

if [ ! -f "/etc/systemd/system/mumbai96-backend.service" ]; then

    echo "🔹 Creating backend systemd service..."

    sudo tee /etc/systemd/system/mumbai96-backend.service > /dev/null <<EOF
[Unit]
Description=Mumbai96 Backend API
After=network.target

[Service]
User=$USER_NAME
WorkingDirectory=$BACKEND_PATH
Environment="PATH=$BACKEND_PATH/venv/bin"
ExecStart=$BACKEND_PATH/venv/bin/gunicorn -w 4 -b 127.0.0.1:5002 app:app
Restart=always

[Install]
WantedBy=multi-user.target
EOF

    sudo systemctl daemon-reload
    sudo systemctl enable mumbai96-backend
fi

sudo systemctl restart mumbai96-backend

echo "✅ Backend running on 127.0.0.1:5002"

# ==========================================
# Ask Domain or IP
# ==========================================

echo ""
read -p "🌐 Enter your Domain OR Public IP for API: " SERVER_NAME

if [ -z "$SERVER_NAME" ]; then
  echo "❌ Domain/IP is required"
  exit 1
fi

# ==========================================
# Nginx Configuration (API Only)
# ==========================================

echo "🔹 Configuring Nginx for API..."

sudo tee /etc/nginx/conf.d/mumbai96-api.conf > /dev/null <<EOF
server {
    listen 80;
    server_name $SERVER_NAME;

    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:5002;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
EOF

# Allow nginx proxy via SELinux
sudo setsebool -P httpd_can_network_connect 1 || true

sudo nginx -t
sudo systemctl enable nginx
sudo systemctl restart nginx

echo ""
echo "🎉 BACKEND DEPLOYMENT COMPLETE"
echo "----------------------------------------"
echo "API URL → http://$SERVER_NAME"
echo "Internal → http://127.0.0.1:5002"
echo "----------------------------------------"