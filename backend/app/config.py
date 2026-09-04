import os


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "postgresql://mumbai96_user:Mumbai96FixedPass2026@localhost:5432/mumbai96"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "super-secret-admin-key")
    SECRET_KEY = os.getenv("APP_SECRET_KEY", "super-secret-admin-key")
    UPLOAD_FOLDER = "static/uploads"
    ALLOWED_IMAGE_EXTENSIONS = {"jpg", "jpeg", "png", "webp", "svg"}
    MAX_IMAGE_SIZE_MB = 1

    MIN_IMAGE_WIDTH = 600
    MIN_IMAGE_HEIGHT = 450

    BUSINESS_IMAGE_MAX_WIDTH = 1200
    BUSINESS_IMAGE_MAX_HEIGHT = 900

    THUMB_IMAGE_WIDTH = 400
    THUMB_IMAGE_HEIGHT = 300

    BUSINESS_IMAGE_QUALITY = 72
    THUMB_IMAGE_QUALITY = 60

    MAX_IMAGE_WIDTH = 3000
    MAX_IMAGE_HEIGHT = 3000

    IMAGE_OUTPUT_QUALITY = 72

    CELEBRITY_IMAGE_MAX_DIMENSION = 800
    CELEBRITY_IMAGE_QUALITY = 80

    BREVO_API_KEY = os.getenv("BREVO_API_KEY", "")
    BREVO_FROM_EMAIL = os.getenv("BREVO_FROM_EMAIL", "noreply@mumbai95.com")
    BREVO_FROM_NAME = os.getenv("BREVO_FROM_NAME", "Mumbai96")

    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:4000/auth")
    CORS_OWNER_DOMAINS = os.getenv("CORS_OWNER_DOMAINS").split(",") if os.getenv("CORS_OWNER_DOMAINS") else []
    CORS_AUTH_DOMAINS = os.getenv("CORS_AUTH_DOMAINS", "").split(",") if os.getenv("CORS_AUTH_DOMAINS") else []
