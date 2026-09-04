#!/bin/bash

set -e

# -------------------------------
# Validate argument
# -------------------------------

if [ -z "$1" ]; then
  echo "❌ Usage: ./install.sh your-domain.com"
  echo "   OR   ./install.sh 123.45.67.89"
  exit 1
fi

SERVER_NAME=$1
PROJECT_ROOT=$(pwd)
BACKEND_PATH="$PROJECT_ROOT/backend"
FRONTEND_PATH="$PROJECT_ROOT/frontend"

echo "🚀 Installing for: $SERVER_NAME"
echo "📁 Project root: $PROJECT_ROOT"

# -------------------------------
# System update
# -------------------------------

sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx python3 python3-venv python3-pip

# -------------------------------
# Install Node 20 (if not installed)
# -------------------------------

if ! command -v node &> /dev/null
then
  echo "🔹 Installing Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt install -y nodejs
fi

# -------------------------------
# Install PM2
# -------------------------------

sudo npm install -g pm2

# -------------------------------
# Backend setup
# -------------------------------

echo "🔹 Setting up backend..."

cd $BACKEND_PATH

if [ ! -d "venv" ]; then
  python3 -m venv venv
fi

source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
deactivate

# -------------------------------
# Create systemd service
# -------------------------------

echo "🔹 Creating backend service..."

sudo tee /etc/systemd/system/mumbai96-backend.service > /dev/null <<EOF
[Unit]
Description=Mumbai96 Backend
After=network.target

[Service]
User=$(whoami)
WorkingDirectory=$BACKEND_PATH
ExecStart=$BACKEND_PATH/venv/bin/gunicorn -w 4 -b 127.0.0.1:5002 app:app
Restart=always

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable mumbai96-backend
sudo systemctl restart mumbai96-backend

# -------------------------------
# Frontend setup
# -------------------------------

echo "🔹 Setting up frontend..."

cd $FRONTEND_PATH
npm install
npm run build

pm2 start npm --name "mumbai96-frontend" -- start
pm2 save
pm2 startup

# -------------------------------
# Nginx configuration
# -------------------------------

echo "🔹 Configuring Nginx..."

sudo tee /etc/nginx/sites-available/mumbai96 > /dev/null <<EOF
server {
    listen 80;
    server_name $SERVER_NAME;

    location /api {
        proxy_pass http://127.0.0.1:5002;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/mumbai96 /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx

echo "✅ Installation Complete for $SERVER_NAME"