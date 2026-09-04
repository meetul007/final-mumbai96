from app.extensions import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash


class AdminUser(db.Model):
    __tablename__ = "admin_users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    is_active = db.Column(db.Boolean, default=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class AdminAuditLog(db.Model):
    __tablename__ = "admin_audit_logs"

    id = db.Column(db.Integer, primary_key=True)

    admin_id = db.Column(db.Integer, nullable=False)
    action = db.Column(db.String(50), nullable=False)
    entity = db.Column(db.String(50), nullable=False)
    entity_id = db.Column(db.Integer, nullable=True)

    old_data = db.Column(db.JSON)
    new_data = db.Column(db.JSON)

    ip_address = db.Column(db.String(45))
    user_agent = db.Column(db.Text)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)