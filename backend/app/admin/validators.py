def require_fields(data, fields):
    errors = {}
    for field in fields:
        if not data.get(field):
            errors[field] = "This field is required"
    return errors