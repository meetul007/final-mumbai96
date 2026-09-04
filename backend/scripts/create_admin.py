import os
from app import create_app
from app.extensions import db
from app.admin.models import AdminUser

app = create_app()

with app.app_context():
    print(os.getenv("ADMIN_USER_NAME"))
    admin = AdminUser(email=os.getenv("ADMIN_USER_NAME"))
    admin.set_password(os.getenv("ADMIN_USER_PASSWORD"))

    db.session.add(admin)
    db.session.commit()
    print("✅ Admin created")
