from flask import Blueprint
from app.business.api import (
    create_business,
    update_business,
    get_business
)

business_bp = Blueprint("business", __name__, url_prefix="/api/business")

business_bp.add_url_rule(
    "/businesses",
    view_func=create_business,
    methods=["POST"]
)

business_bp.add_url_rule(
    "/businesses/<int:business_id>",
    view_func=update_business,
    methods=["PUT"]
)

business_bp.add_url_rule(
    "/businesses/<int:business_id>",
    view_func=get_business,
    methods=["GET"]
)