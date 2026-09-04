from flask import request, session
from app.extensions import db
from app.admin.models import AdminAuditLog


def log_admin_action(
    action,
    entity,
    entity_id=None,
    old_data=None,
    new_data=None
):
    log = AdminAuditLog(
        admin_id=session.get("admin_id"),
        action=action,
        entity=entity,
        entity_id=entity_id,
        old_data=old_data,
        new_data=new_data,
        ip_address=request.remote_addr,
        user_agent=request.headers.get("User-Agent")
    )
    db.session.add(log)
