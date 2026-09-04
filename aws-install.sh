#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "❌ Usage: ./install.sh your-domain.com OR your-ip"
  exit 1
fi

SERVER_NAME=$1
PROJECT_ROOT=$(pwd)
BACKEND_PATH="$PROJECT_ROOT/backend"

echo "🚀 Installing for: $SERVER_NAME"

# ----------------------------
# Ask setup type
# ----------------------------
read -p "Setup for (1) Domain or (2) Public IP? Enter 1 or 2: " SETUP_TYPE

if [ "$SETUP_TYPE" = "2" ]; then
  SERVER_NAME="_"
  echo "⚡ Configuring for IP based access"
else
  echo "🌍 Configuring for domain: $SERVER_NAME"
fi

# ----------------------------
# Ask Configuration
# ----------------------------

read -p "Environment (development/production): " APP_ENV
read -p "Frontend URL (example: http://localhost:4000/auth): " FRONTEND_URL

read -p "Database Name: " DB_NAME
read -p "Database User: " DB_USER
read -s -p "Database Password: " DB_PASS
echo ""

read -p "Admin Name: " ADMIN_NAME
read -s -p "Admin Password: " ADMIN_PASS
echo ""

read -p "Mail Username (email): " MAIL_USER
read -s -p "Mail Password (app password recommended): " MAIL_PASS
echo ""

read -p "Mail Default Sender Name: " MAIL_SENDER

APP_SECRET=$(openssl rand -hex 32)
JWT_SECRET=$(openssl rand -hex 32)

# ----------------------------
# Install Packages (only if missing)
# ----------------------------

sudo dnf update -y

if ! command -v psql &> /dev/null
then
  echo "📦 Installing PostgreSQL..."
  sudo dnf install -y postgresql15 postgresql15-server
else
  echo "✅ PostgreSQL already installed"
fi

sudo dnf install -y git nginx python3 python3-pip python3-virtualenv gcc

# ----------------------------
# Initialize PostgreSQL (if needed)
# ----------------------------

echo "🔎 Checking PostgreSQL initialization..."

if sudo test -f /var/lib/pgsql/data/PG_VERSION; then
    echo "✅ PostgreSQL already initialized"
else
    echo "🔹 Initializing PostgreSQL database cluster..."
    sudo postgresql-setup initdb
fi

sudo systemctl enable postgresql
sudo systemctl start postgresql

# ----------------------------
# Create DB User (if not exists)
# ----------------------------

USER_EXISTS=$(sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='$DB_USER'")

if [ "$USER_EXISTS" != "1" ]; then
  sudo -u postgres psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';"
  echo "✅ Database user created"
else
  echo "⚠️ Database user already exists"
fi

# ----------------------------
# Create Database (if not exists)
# ----------------------------

DB_EXISTS=$(sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'")

if [ "$DB_EXISTS" != "1" ]; then
  sudo -u postgres psql -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"
  echo "✅ Database created"
else
  echo "⚠️ Database already exists"
fi

# ----------------------------
# Create env.yml
# ----------------------------

cat > $BACKEND_PATH/env.yml <<EOF
app:
  ENV: $APP_ENV
  SECRET_KEY: "$APP_SECRET"
  DEBUG: $( [ "$APP_ENV" = "production" ] && echo "false" || echo "true" )

database:
  URL: "postgresql://$DB_USER:$DB_PASS@localhost:5432/$DB_NAME"

jwt:
  SECRET_KEY: "$JWT_SECRET"

admin_user:
  NAME: "$ADMIN_NAME"
  PASSWORD: "$ADMIN_PASS"

mail:
  SERVER: "smtp.gmail.com"
  PORT: 587
  USE_TLS: true
  USERNAME: "$MAIL_USER"
  PASSWORD: "$MAIL_PASS"
  DEFAULT_SENDER: "$MAIL_SENDER"

frontend:
  URL: "$FRONTEND_URL"
EOF

echo "✅ env.yml created successfully"
echo "🎉 Setup completed safely"

# ----------------------------
# Install Nginx (if not installed)
# ----------------------------

if ! command -v nginx &> /dev/null
then
  echo "📦 Installing Nginx..."
  sudo dnf install -y nginx
else
  echo "✅ Nginx already installed"
fi

# ----------------------------
# Allow Nginx to proxy (SELinux)
# ----------------------------
sudo setsebool -P httpd_can_network_connect 1 || true

# ----------------------------
# Create Nginx Config
# ----------------------------

echo "🔹 Configuring Nginx..."

sudo tee /etc/nginx/conf.d/mumbai96.conf > /dev/null <<EOF
server {
    listen 80;
    server_name $SERVER_NAME;

    client_max_body_size 20M;

    location /api {
        proxy_pass http://127.0.0.1:5002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
EOF

# ----------------------------
# Test & Restart Nginx
# ----------------------------

sudo nginx -t
sudo systemctl enable nginx
sudo systemctl restart nginx

echo "✅ Nginx configured successfully"