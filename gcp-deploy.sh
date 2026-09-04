#!/bin/bash

# Don't use set -e because systemctl is-active returns non-zero when service is starting
# We handle errors explicitly instead
set -uo pipefail

PROJECT_ROOT=$(pwd)
BACKEND_PATH="$PROJECT_ROOT/backend"
FRONTEND_PATH="$PROJECT_ROOT/ui"
USER_NAME=$(whoami)
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
LOG_FILE="/tmp/mumbai96-deploy-$(date '+%Y%m%d-%H%M%S').log"
BACKEND_SERVICE="mumbai96-backend"
FRONTEND_SERVICE="mumbai96-frontend"
BACKEND_PORT=5002
FRONTEND_PORT=3000

DEPLOY_BACKEND=false
DEPLOY_FRONTEND=false
SHOW_STATUS=false
SHOW_HELP=false

# Flags
while [[ $# -gt 0 ]]; do
    case $1 in
        --backend)   DEPLOY_BACKEND=true; shift ;;
        --frontend)  DEPLOY_FRONTEND=true; shift ;;
        --status)    SHOW_STATUS=true; shift ;;
        --help)      SHOW_HELP=true; shift ;;
        --all)       DEPLOY_BACKEND=true; DEPLOY_FRONTEND=true; shift ;;
        *) echo "⚠️  Unknown option: $1. Use --help for usage."; exit 1 ;;
    esac
done

# If no flags provided, deploy everything
if ! $SHOW_STATUS && ! $SHOW_HELP; then
    if ! $DEPLOY_BACKEND && ! $DEPLOY_FRONTEND; then
        DEPLOY_BACKEND=true
        DEPLOY_FRONTEND=true
    fi
fi

# ===================================================================
# Colors & Helpers
# ===================================================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() {
    echo -e "$1" | tee -a "$LOG_FILE"
}

log_success() {
    log "${GREEN}$1${NC}"
}

log_warning() {
    log "${YELLOW}WARNING: $1${NC}"
}

log_error() {
    log "${RED}ERROR: $1${NC}"
}

log_info() {
    log "${BLUE}$1${NC}"
}

check_command() {
    if command -v $1 &> /dev/null; then
        return 0
    else
        return 1
    fi
}

check_service() {
    local status
    status=$(sudo systemctl is-active "$1" 2>/dev/null || true)
    if [ "$status" = "active" ]; then
        return 0
    else
        return 1
    fi
}

wait_for_service() {
    local service=$1
    local max_retries=15
    local retry_delay=2
    local i=0

    while [ $i -lt $max_retries ]; do
        if check_service "$service"; then
            return 0
        fi
        i=$((i + 1))
        sleep $retry_delay
    done
    return 1
}

# ===================================================================
# Help
# ===================================================================

if $SHOW_HELP; then
    cat <<'EOF'
Mumbai96 Full Stack Deployment Script

Usage:
  ./gcp-deploy.sh [options]

Options:
  --backend     Deploy backend (Flask) only
  --frontend    Deploy frontend (Next.js) only
  --all         Deploy both backend and frontend (default)
  --status      Show current service status without deploying
  --help        Show this help message

Examples:
  ./gcp-deploy.sh                 # Deploy everything
  ./gcp-deploy.sh --backend       # Backend only
  ./gcp-deploy.sh --frontend      # Frontend only
  ./gcp-deploy.sh --status        # Check services

Requirements:
  - sudo access
  - git installed and configured
  - Python 3 + venv (for backend)
  - Node.js 20+ (for frontend)
  - Systemd (for service management)

Logs:
  Deployment logs are saved to /tmp/mumbai96-deploy-*.log
EOF
    exit 0
fi

# ===================================================================
# Status Check
# ===================================================================

if $SHOW_STATUS; then
    log ""
    log "=========================================="
    log "📊 Mumbai96 Service Status"
    log "=========================================="
    log ""

    if check_service $BACKEND_SERVICE; then
        log_success "✅ Backend ($BACKEND_SERVICE) is running on port $BACKEND_PORT"
    else
        log_error "❌ Backend ($BACKEND_SERVICE) is not running"
    fi

    if check_service $FRONTEND_SERVICE; then
        log_success "✅ Frontend ($FRONTEND_SERVICE) is running on port $FRONTEND_PORT"
    else
        log_error "❌ Frontend ($FRONTEND_SERVICE) is not running"
    fi

    log ""

    if check_service $BACKEND_SERVICE; then
        log_info "Backend PID: $(sudo systemctl show --property=MainPID --value $BACKEND_SERVICE)"
        log_info "Backend Uptime: $(sudo systemctl show --property=ActiveEnterTimestamp --value $BACKEND_SERVICE)"
    fi

    if check_service $FRONTEND_SERVICE; then
        log_info "Frontend PID: $(sudo systemctl show --property=MainPID --value $FRONTEND_SERVICE)"
        log_info "Frontend Uptime: $(sudo systemctl show --property=ActiveEnterTimestamp --value $FRONTEND_SERVICE)"
    fi

    log ""
    log "=========================================="
    exit 0
fi

# ===================================================================
# Pre-flight Checks
# ===================================================================

log ""
log "=========================================="
log "🚀 Mumbai96 Full Stack Deployment"
log "📅 $TIMESTAMP"
log "👤 User: $USER_NAME"
log "📁 Project: $PROJECT_ROOT"
log "📝 Log: $LOG_FILE"
log "=========================================="
log ""

# Check sudo
if ! sudo -n true 2>/dev/null; then
    log_warning "sudo may prompt for password during deployment"
fi

# Check git
if ! check_command git; then
    log_error "git is not installed. Install with: sudo apt install -y git"
    exit 1
fi

# Check if inside a git repo
if ! git rev-parse --is-inside-work-tree &>/dev/null; then
    log_error "Not inside a git repository. Run this script from the project root."
    exit 1
fi

# Check if backend directory exists
if [ ! -d "$BACKEND_PATH" ]; then
    log_error "Backend directory not found at: $BACKEND_PATH"
    exit 1
fi

# Check if frontend directory exists
if [ ! -d "$FRONTEND_PATH" ]; then
    log_error "Frontend directory not found at: $FRONTEND_PATH"
    exit 1
fi

# Check required files
if [ "$DEPLOY_BACKEND" = true ] && [ ! -f "$BACKEND_PATH/requirements.txt" ]; then
    log_error "requirements.txt not found in backend directory"
    exit 1
fi

if [ "$DEPLOY_FRONTEND" = true ] && [ ! -f "$FRONTEND_PATH/package.json" ]; then
    log_error "package.json not found in frontend directory"
    exit 1
fi

# Check for uncommitted changes
UNCOMMITTED=$(git status --porcelain 2>/dev/null | wc -l)
if [ "$UNCOMMITTED" -gt 0 ]; then
    log_warning "You have $UNCOMMITTED uncommitted file(s). Consider committing before deploying."
    read -p "Continue anyway? (y/N): " confirm
    if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
        log "Deployment cancelled."
        exit 0
    fi
fi

# ===================================================================
# Step 1: Git Pull
# ===================================================================

log_info "📦 Pulling latest changes from origin/main..."
cd $PROJECT_ROOT

BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
    log_warning "Current branch is '$BRANCH', not 'main'. Pulling from origin/main anyway."
fi

if git fetch origin 2>&1 | tee -a "$LOG_FILE"; then
    log_success "✅ Git fetch completed"
else
    log_error "❌ Git fetch failed. Check network connection."
    exit 1
fi

BEFORE_COMMIT=$(git rev-parse HEAD)

if git pull origin main 2>&1 | tee -a "$LOG_FILE"; then
    AFTER_COMMIT=$(git rev-parse HEAD)

    if [ "$BEFORE_COMMIT" = "$AFTER_COMMIT" ]; then
        log_info "ℹ️  Already up to date. No new commits."
    else
        COMMITS=$(git log $BEFORE_COMMIT..$AFTER_COMMIT --oneline 2>/dev/null | wc -l)
        log_success "✅ Pulled $COMMITS new commit(s)"
    fi
else
    log_error "❌ Git pull failed. Resolve conflicts and try again."
    exit 1
fi

log ""

# ===================================================================
# Step 2: Install System Dependencies
# ===================================================================

log_info "🔹 Checking system dependencies..."

sudo apt update -y > /dev/null 2>&1 || log_warning "apt update encountered warnings"

BACKEND_PKGS="python3 python3-pip python3-venv git build-essential libpq-dev nginx"
FRONTEND_PKGS="curl"

PKGS_TO_INSTALL=""

for pkg in $BACKEND_PKGS $FRONTEND_PKGS; do
    if dpkg -s $pkg 2>/dev/null | grep -q "Status: install ok installed"; then
        log "  ✅ $pkg"
    else
        PKGS_TO_INSTALL="$PKGS_TO_INSTALL $pkg"
    fi
done

if [ -n "$PKGS_TO_INSTALL" ]; then
    log_warning "Missing packages: $PKGS_TO_INSTALL"
    log_info "Installing missing packages..."
    if sudo apt install -y $PKGS_TO_INSTALL > /dev/null 2>&1; then
        log_success "✅ System packages installed"
    else
        log_error "❌ Failed to install system packages"
        exit 1
    fi
else
    log_success "✅ All system packages are installed"
fi

log ""

# ===================================================================
# Step 3: Backend Deployment
# ===================================================================

if [ "$DEPLOY_BACKEND" = true ]; then
    log "=========================================="
    log "🐍 Backend Deployment"
    log "=========================================="
    log ""

    cd $BACKEND_PATH

    # --- Virtual Environment ---
    log_info "🔹 Setting up Python virtual environment..."

    if [ ! -d "venv" ]; then
        if python3 -m venv venv 2>&1 | tee -a "$LOG_FILE"; then
            log_success "✅ Virtual environment created"
        else
            log_error "❌ Failed to create virtual environment"
            exit 1
        fi
    else
        log_info "✅ Virtual environment exists"
    fi

    # --- Python Dependencies ---
    log_info "🔹 Installing Python dependencies..."
    source venv/bin/activate

    if pip install --upgrade pip -q 2>&1 | tee -a "$LOG_FILE"; then
        log "  ✅ pip upgraded"
    else
        log_warning "⚠️ pip upgrade had warnings (continuing)"
    fi

    if pip install -r requirements.txt -q 2>&1 | tee -a "$LOG_FILE"; then
        log "  ✅ requirements.txt installed"
    else
        log_error "❌ Failed to install Python dependencies"
        deactivate
        exit 1
    fi

    if pip install gunicorn -q 2>&1 | tee -a "$LOG_FILE"; then
        log "  ✅ gunicorn installed"
    else
        log_error "❌ Failed to install gunicorn"
        deactivate
        exit 1
    fi

    log_success "✅ Python dependencies installed"
    log ""

    # --- Database Migrations ---
    log_info "🔹 Running database migrations..."

    export FLASK_APP=app.run

    if check_command flask; then
        if flask db upgrade 2>&1 | tee -a "$LOG_FILE"; then
            log_success "✅ Database migrations applied"
        else
            log_warning "⚠️ Migration had issues (may be no pending migrations)"
        fi
    else
        log_warning "⚠️ Flask CLI not found in PATH, skipping migrations"
    fi

    deactivate
    log ""

    # --- Env File Check ---
    if [ ! -f "$BACKEND_PATH/env.yml" ]; then
        log_warning "⚠️ env.yml not found at $BACKEND_PATH/env.yml"
        log_warning "Backend may fail to start without proper configuration."
        log_warning "Create env.yml with your database and app settings."
    else
        log "  ✅ env.yml found"
    fi

    # --- systemd Service ---
    log_info "🔹 Configuring backend systemd service..."

    sudo tee /etc/systemd/system/$BACKEND_SERVICE.service > /dev/null <<EOF
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

    if sudo systemctl daemon-reload 2>&1 | tee -a "$LOG_FILE" && \
       sudo systemctl enable $BACKEND_SERVICE 2>&1 | tee -a "$LOG_FILE" && \
       sudo systemctl restart $BACKEND_SERVICE 2>&1 | tee -a "$LOG_FILE"; then
        log_success "✅ Backend service configured and restarted"
    else
        log_error "❌ Failed to configure/restart backend service"
    fi

    log ""

    # --- Verify Backend ---
    log_info "🔹 Verifying backend service..."

    if wait_for_service $BACKEND_SERVICE; then
        log_success "✅ Backend is running on 127.0.0.1:$BACKEND_PORT"
    else
        # Final check with detailed status
        local_status=$(sudo systemctl is-active $BACKEND_SERVICE 2>/dev/null || true)
        if [ "$local_status" = "activating" ]; then
            log_warning "⚠️ Backend is still starting (state: activating)"
            log_info "It should be ready within a few seconds. Check with:"
        elif [ "$local_status" = "active" ]; then
            log_success "✅ Backend is running on 127.0.0.1:$BACKEND_PORT"
        else
            log_error "❌ Backend failed to start (state: $local_status)"
        fi
        log_info "   sudo journalctl -u $BACKEND_SERVICE --no-pager -n 30"
    fi

    # --- Port Check ---
    if command -v lsof &> /dev/null && sudo lsof -Pi :$BACKEND_PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
        log_success "✅ Port $BACKEND_PORT is listening"
    elif command -v ss &> /dev/null && sudo ss -tlnp | grep -q ":$BACKEND_PORT"; then
        log_success "✅ Port $BACKEND_PORT is listening"
    else
        log_warning "⚠️ Port $BACKEND_PORT not yet detected (service may still be initializing)"
    fi

    log ""
fi

# ===================================================================
# Step 4: Frontend Deployment
# ===================================================================

if [ "$DEPLOY_FRONTEND" = true ]; then
    log "=========================================="
    log "⚛️  Frontend Deployment"
    log "=========================================="
    log ""

    cd $FRONTEND_PATH

    # --- Node.js Check ---
    log_info "🔹 Checking Node.js installation..."

    NODE_VERSION=""
    if check_command node; then
        NODE_VERSION=$(node -v)
        MAJOR_VERSION=$(echo $NODE_VERSION | sed 's/v\([0-9]*\)\..*/\1/')

        if [ "$MAJOR_VERSION" -ge 18 ]; then
            log "  ✅ Node.js $NODE_VERSION installed"
        else
            log_warning "⚠️ Node.js $NODE_VERSION is too old (need 18+)"
            NODE_VERSION=""
        fi
    else
        log_warning "⚠️ Node.js not found"
    fi

    if [ -z "$NODE_VERSION" ]; then
        log_info "🔹 Installing Node.js 22..."
        if curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - > /dev/null 2>&1 && \
           sudo apt install -y nodejs > /dev/null 2>&1; then
            NODE_VERSION=$(node -v)
            log_success "✅ Node.js $NODE_VERSION installed"
        else
            log_error "❌ Failed to install Node.js"
            exit 1
        fi
    fi

    # --- npm Dependencies ---
    log_info "🔹 Installing npm dependencies..."

    if npm install 2>&1 | tee -a "$LOG_FILE"; then
        log_success "✅ npm dependencies installed"
    else
        log_error "❌ npm install failed"
        exit 1
    fi

    log ""

    # --- Env Check ---
    if [ ! -f "$FRONTEND_PATH/.env.local" ] && [ ! -f "$FRONTEND_PATH/.env" ]; then
        log_warning "⚠️ No .env.local or .env file found in frontend"
        log_warning "Ensure NEXT_PUBLIC_API_BASE_URL is set in your environment."
    else
        log "  ✅ Environment file found"
    fi

    # --- Build ---
    log_info "🔹 Building Next.js application..."

    if npm run build 2>&1 | tee -a "$LOG_FILE"; then
        log_success "✅ Build completed successfully"
    else
        log_error "❌ Build failed"
        log_info "Check the output above for error details."
        exit 1
    fi

    log ""

    # --- systemd Service ---
    log_info "🔹 Configuring frontend systemd service..."

    sudo tee /etc/systemd/system/$FRONTEND_SERVICE.service > /dev/null <<EOF
[Unit]
Description=Mumbai96 Next.js Frontend
After=network.target

[Service]
User=$USER_NAME
WorkingDirectory=$FRONTEND_PATH
Environment=PORT=$FRONTEND_PORT
Environment=NODE_ENV=production
Environment=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

    if sudo systemctl daemon-reload 2>&1 | tee -a "$LOG_FILE" && \
       sudo systemctl enable $FRONTEND_SERVICE 2>&1 | tee -a "$LOG_FILE" && \
       sudo systemctl restart $FRONTEND_SERVICE 2>&1 | tee -a "$LOG_FILE"; then
        log_success "✅ Frontend service configured and restarted"
    else
        log_error "❌ Failed to configure/restart frontend service"
    fi

    log ""

    # --- Verify Frontend ---
    log_info "🔹 Verifying frontend service..."

    if wait_for_service $FRONTEND_SERVICE; then
        log_success "✅ Frontend is running on 127.0.0.1:$FRONTEND_PORT"
    else
        # Final check with detailed status
        local_status=$(sudo systemctl is-active $FRONTEND_SERVICE 2>/dev/null || true)
        if [ "$local_status" = "activating" ]; then
            log_warning "⚠️ Frontend is still starting (state: activating)"
            log_info "Next.js can take longer to start. Check with:"
        elif [ "$local_status" = "active" ]; then
            log_success "✅ Frontend is running on 127.0.0.1:$FRONTEND_PORT"
        else
            log_error "❌ Frontend failed to start (state: $local_status)"
        fi
        log_info "   sudo journalctl -u $FRONTEND_SERVICE --no-pager -n 30"
    fi

    # --- Port Check ---
    if command -v lsof &> /dev/null && sudo lsof -Pi :$FRONTEND_PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
        log_success "✅ Port $FRONTEND_PORT is listening"
    elif command -v ss &> /dev/null && sudo ss -tlnp | grep -q ":$FRONTEND_PORT"; then
        log_success "✅ Port $FRONTEND_PORT is listening"
    else
        log_warning "⚠️ Port $FRONTEND_PORT not yet detected (Next.js may take longer to start)"
    fi

    log ""
fi

# ===================================================================
# Step 5: Nginx Configuration
# ===================================================================

if [ "$DEPLOY_BACKEND" = true ] || [ "$DEPLOY_FRONTEND" = true ]; then
    log "=========================================="
    log "🌐 Nginx Configuration"
    log "=========================================="
    log ""

    log_info "🔹 Configuring nginx..."

    # Remove default nginx site and old config to avoid port conflict
    if [ -f "/etc/nginx/sites-enabled/default" ]; then
        sudo rm -f /etc/nginx/sites-enabled/default
        log "  ✅ Removed default nginx site"
    fi
    if [ -f "/etc/nginx/sites-enabled/app.conf" ]; then
        sudo rm -f /etc/nginx/sites-enabled/app.conf
        log "  ✅ Removed old app.conf"
    fi

    sudo tee /etc/nginx/sites-enabled/app.conf > /dev/null <<'EOF'
server {

    listen 80;
    server_name _;

    client_max_body_size 50M;

    # =====================================
    # FLASK API
    # =====================================

    location /api/ {
        proxy_pass http://127.0.0.1:5002;

        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # =====================================
    # FLASK ADMIN
    # =====================================

    location /admin/ {
        proxy_pass http://127.0.0.1:5002;

        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # =====================================
    # STATIC FILES
    # =====================================

    location /static/ {
        proxy_pass http://127.0.0.1:5002;

        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # =====================================
    # NEXT.JS FRONTEND
    # =====================================

    location / {

        proxy_pass http://127.0.0.1:3000;

        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_set_header Host $host;

        proxy_cache_bypass $http_upgrade;

        proxy_set_header X-Real-IP $remote_addr;

        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
EOF

    # Allow nginx proxy via SELinux (if applicable)
    if command -v setsebool &> /dev/null; then
        sudo setsebool -P httpd_can_network_connect 1 2>/dev/null || true
    fi

    if sudo nginx -t 2>&1 | tee -a "$LOG_FILE"; then
        log_success "✅ Nginx configuration is valid"
    else
        log_error "❌ Nginx configuration test failed"
        exit 1
    fi

    if sudo systemctl enable nginx 2>&1 | tee -a "$LOG_FILE" && \
       sudo systemctl restart nginx 2>&1 | tee -a "$LOG_FILE"; then
        log_success "✅ Nginx is running on port 80"
    else
        log_error "❌ Failed to restart nginx"
    fi

    log ""
fi

# ===================================================================
# Final Summary
# ===================================================================

log "=========================================="
log "📋 Deployment Summary"
log "=========================================="
log ""

if [ "$DEPLOY_BACKEND" = true ]; then
    backend_status=$(sudo systemctl is-active $BACKEND_SERVICE 2>/dev/null || true)
    if [ "$backend_status" = "active" ]; then
        log_success "✅ Backend: RUNNING (127.0.0.1:$BACKEND_PORT)"
    elif [ "$backend_status" = "activating" ]; then
        log_warning "⚠️ Backend: STARTING (127.0.0.1:$BACKEND_PORT)"
    else
        log_error "❌ Backend: $backend_status - Check: sudo journalctl -u $BACKEND_SERVICE -n 50"
    fi
fi

if [ "$DEPLOY_FRONTEND" = true ]; then
    frontend_status=$(sudo systemctl is-active $FRONTEND_SERVICE 2>/dev/null || true)
    if [ "$frontend_status" = "active" ]; then
        log_success "✅ Frontend: RUNNING (127.0.0.1:$FRONTEND_PORT)"
    elif [ "$frontend_status" = "activating" ]; then
        log_warning "⚠️ Frontend: STARTING (127.0.0.1:$FRONTEND_PORT)"
    else
        log_error "❌ Frontend: $frontend_status - Check: sudo journalctl -u $FRONTEND_SERVICE -n 50"
    fi
fi


sudo systemctl restart $BACKEND_SERVICE
sudo systemctl restart $FRONTEND_SERVICE
sudo systemctl restart nginx

log ""
log "=========================================="
log "🎉 Deployment Complete"
log "📅 $TIMESTAMP"
log "📝 Full log: $LOG_FILE"
log ""
log "Useful Commands:"
log "  Status:   ./gcp-deploy.sh --status"
log "  Backend logs:  sudo journalctl -u $BACKEND_SERVICE -f"
log "  Frontend logs: sudo journalctl -u $FRONTEND_SERVICE -f"
log "=========================================="
log ""
