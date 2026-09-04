from flask import session, abort
from functools import wraps


def owner_login_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        if "owner_id" not in session:
            abort(401, "Authentication required")
        return fn(*args, **kwargs)
    return wrapper
