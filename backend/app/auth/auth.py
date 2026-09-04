from datetime import datetime, timedelta

RESEND_COOLDOWN_SECONDS = 60*15


def format_remaining_time(seconds):
    seconds = int(seconds)

    if seconds < 60:
        return f"{seconds} seconds"

    minutes = seconds // 60
    if minutes < 60:
        return f"{minutes} minute{'s' if minutes > 1 else ''}"

    hours = minutes // 60
    return f"{hours} hour{'s' if hours > 1 else ''}"


def can_resend_verification(user):
    if not user.verification_token_sent_at:
        return True, 0

    next_allowed = user.verification_token_sent_at + timedelta(seconds=RESEND_COOLDOWN_SECONDS)

    if datetime.utcnow() < next_allowed:
        remaining = int((next_allowed - datetime.utcnow()).total_seconds())
        return False, remaining

    return True, 0
