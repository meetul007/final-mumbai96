from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

from app.extensions import db
from app.listing.models import BusinessUser

from app.helper.email import send_verification_email, send_reset_email
from app.auth.auth import can_resend_verification, format_remaining_time

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json or {}

    user = BusinessUser.query.filter_by(
        email=data.get("email"),
        is_active=True
    ).first()

    if not user or not user.check_password(data.get("password")):
        return jsonify({"error": "Invalid credentials"}), 401

    if not user.is_verified:
        return jsonify({"error": "Please verify your email before login"}), 403

    token = create_access_token(identity=str(user.id))

    return jsonify({
        "token": token,
        "user": {
            "id": user.id,
            "fname": user.fname,
            "lname": user.lname,
            "email": user.email
        }
    })


@auth_bp.route("/register", methods=["POST"])
def register_owner():

    BusinessUser.query.delete()
    db.session.commit()

    data = request.json or {}

    if not data.get("email") or not data.get("password") or not data.get("fname") or not data.get("lname"):
        return jsonify({"error": "Name, email and password required"}), 400

    if BusinessUser.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Email already exists"}), 400

    user = BusinessUser(
        fname=data["fname"],
        lname=data["lname"],
        email=data["email"],
        phone=data["phone"],
        area=data["area"],
        is_active=True
    )
    user.set_password(data["password"])
    user.generate_verification_token()
    send_verification_email(user)

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Account created successfully"}), 201


@auth_bp.route("/verify-email", methods=["POST"])
def verify_email():
    data = request.json or {}
    token = data.get("token")

    user = BusinessUser.query.filter_by(verification_token=token).first()

    if not user:
        return jsonify({"error": "Invalid token"}), 400

    if user.verification_token_expiry < datetime.utcnow():
        return jsonify({"error": "Token expired"}), 400

    user.is_verified = True
    user.verification_token = None
    user.verification_token_expiry = None

    db.session.commit()

    return jsonify({"message": "Email verified successfully"})


@auth_bp.route("/resend-verification", methods=["POST"])
def resend_verification():
    data = request.json
    email = data.get("email")

    user = BusinessUser.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    if user.is_verified:
        return jsonify({"error": "Email already verified"}), 400

    allowed, remaining = can_resend_verification(user)

    if not allowed:
        remaining_min = format_remaining_time(remaining)
        return jsonify({
            "error": f"Please wait {remaining_min} before requesting again",
            "remaining_seconds": remaining_min
        }), 429

    user.generate_verification_token()
    db.session.commit()

    send_verification_email(user)

    return jsonify({"message": "Verification email sent successfully"})


@auth_bp.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.json
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email required"}), 400

    user = BusinessUser.query.filter_by(email=email).first()

    # Don't reveal user existence (security)
    if not user:
        return jsonify({"message": "If email exists, reset link sent"}), 200

    # Optional cooldown (2 minutes)
    if user.reset_token_sent_at:
        diff = datetime.utcnow() - user.reset_token_sent_at
        if diff.total_seconds() < 120:
            remaining = int(120 - diff.total_seconds())
            return jsonify({
                "error": f"Please wait {remaining} seconds before requesting again"
            }), 429

    user.generate_reset_token()
    db.session.commit()

    send_reset_email(user)

    return jsonify({"message": "Reset link sent successfully"})


@auth_bp.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.json
    token = data.get("token")
    password = data.get("password")

    if not token or not password:
        return jsonify({"error": "Token and password required"}), 400

    user = BusinessUser.query.filter_by(reset_token=token).first()

    if not user:
        return jsonify({"error": "Invalid or expired token"}), 400

    if user.reset_token_expiry < datetime.utcnow():
        return jsonify({"error": "Token expired"}), 400

    user.set_password(password)
    user.reset_token = None
    user.reset_token_expiry = None

    db.session.commit()

    return jsonify({"message": "Password reset successful"})
