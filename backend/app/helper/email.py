import requests
from flask import render_template, current_app
from datetime import datetime
from app.extensions import db
from app.listing.models import EmailLog


def _log_email(to, subject, status, response_code=None, error_message=None):
    log = EmailLog(
        to_email=to,
        subject=subject,
        status=status,
        response_code=response_code,
        error_message=error_message,
    )
    db.session.add(log)
    db.session.commit()


def send_email(to, subject, template, **kwargs):
    api_key = current_app.config["BREVO_API_KEY"]
    from_email = current_app.config["BREVO_FROM_EMAIL"]
    from_name = current_app.config["BREVO_FROM_NAME"]

    html = render_template(template, **kwargs)

    payload = {
        "sender": {"name": from_name, "email": from_email},
        "to": [{"email": to}],
        "subject": subject,
        "htmlContent": html,
    }

    try:
        resp = requests.post(
            "https://api.brevo.com/v3/smtp/email",
            json=payload,
            headers={
                "api-key": api_key,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        )

        if resp.ok:
            _log_email(to, subject, "sent", response_code=resp.status_code)
        else:
            error_text = resp.text[:500]
            _log_email(to, subject, "failed", response_code=resp.status_code, error_message=error_text)
            current_app.logger.error("Brevo API error %s: %s", resp.status_code, error_text)
            raise RuntimeError(f"Brevo API error {resp.status_code}: {error_text}")

    except requests.RequestException as e:
        _log_email(to, subject, "failed", error_message=str(e)[:500])
        current_app.logger.error("Brevo request failed: %s", e)
        raise


def send_verification_email(user):
    verify_url = f"{current_app.config['FRONTEND_URL']}/verify-email?token={user.verification_token}"

    send_email(
        to=user.email,
        subject="Verify your email - Mumbai96",
        template="emails/verify_email.html",
        name=user.fname,
        verify_url=verify_url
    )


def send_reset_email(user):
    reset_url = f"{current_app.config['FRONTEND_URL']}/reset-password?token={user.reset_token}"

    send_email(
        to=user.email,
        subject="Reset your password - Mumbai96",
        template="emails/reset_password.html",
        name=user.fname,
        reset_url=reset_url,
        current_year=datetime.utcnow().year
    )
