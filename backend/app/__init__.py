from datetime import datetime

from flask import Flask
from flask_cors import CORS
from app.extensions import db, migrate, jwt, csrf
from app.admin.views import admin_bp
from app.business.routes import business_bp
from app.public.routes import public_bp
from app.utils.env_loader import load_env_from_yaml
from app.private.api import owner_bp
from app.auth.api import auth_bp

load_env_from_yaml("env.yml")


def create_app():
    from app.config import Config

    app = Flask(__name__, static_folder="../static", static_url_path="/static")
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(public_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(business_bp)
    app.register_blueprint(owner_bp)
    app.register_blueprint(auth_bp)

    jwt.init_app(app)
    csrf.init_app(app)

    csrf.exempt(public_bp)
    csrf.exempt(business_bp)
    csrf.exempt(owner_bp)
    csrf.exempt(auth_bp)

    CORS(
        app,
        resources={
            r"/owner/*": {"origins": app.config["CORS_OWNER_DOMAINS"]},
            r"/auth/*": {"origins": app.config["CORS_AUTH_DOMAINS"]},
            r"/api/*": {"origins": app.config["CORS_AUTH_DOMAINS"]}
        },
        supports_credentials=True,
        origins="*"
    )

    @app.context_processor
    def inject_globals():
        return {
            "current_year": datetime.utcnow().year
        }

    return app
