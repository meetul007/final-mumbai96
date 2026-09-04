from flask import request


def build_public_file_url(path: str | None):
    if not path:
        return None

    base = request.host_url.rstrip("/")  # remove trailing /
    return f"{base}/static/uploads/{path}"


def extract_social_links(form):
    socials = {}

    for key in ["facebook", "instagram", "linkedin", "youtube", "twitter"]:
        val = form.get(f"social_{key}", "").strip()
        if val:
            socials[key] = val

    return socials or None
