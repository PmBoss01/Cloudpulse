from .base import *  # noqa: F401,F403
from .base import env

DEBUG = True
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",  # noqa: F405
    }
}

CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS", default=["http://localhost:3000"])

# If EMAIL_HOST is set in .env, send real emails via SMTP even in dev (handy
# for testing password resets end-to-end). Otherwise fall back to printing
# emails to the runserver console — no credentials needed.
EMAIL_BACKEND = (
    "django.core.mail.backends.smtp.EmailBackend"
    if EMAIL_HOST  # noqa: F405
    else "django.core.mail.backends.console.EmailBackend"
)
