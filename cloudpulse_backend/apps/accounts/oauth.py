import secrets
from urllib.parse import urlencode

import requests
from django.conf import settings
from django.http import HttpResponseRedirect
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from apps.accounts.models import User

GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"

GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize"
GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token"
GITHUB_USER_URL = "https://api.github.com/user"
GITHUB_EMAILS_URL = "https://api.github.com/user/emails"

REQUEST_TIMEOUT = 10


def _login_redirect(user) -> HttpResponseRedirect:
    """Issue CloudPulse JWTs for the given user and hand them to the frontend
    via a URL fragment (never sent to any server, browser-only) rather than a
    query string, so the tokens never end up in request logs."""
    refresh = RefreshToken.for_user(user)
    return HttpResponseRedirect(
        f"{settings.FRONTEND_URL}/auth/callback#access={refresh.access_token}&refresh={refresh}"
    )


def _error_redirect(error: str) -> HttpResponseRedirect:
    return HttpResponseRedirect(f"{settings.FRONTEND_URL}/login?oauth_error={error}")


def _get_or_create_user(email: str, full_name: str) -> User:
    email = email.strip().lower()
    user = User.objects.filter(email__iexact=email).first()
    if user is not None:
        return user

    user = User(email=email, full_name=full_name[:150])
    user.set_unusable_password()
    user.save()
    return user


class GoogleLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        state = secrets.token_urlsafe(24)
        redirect_uri = request.build_absolute_uri("/api/auth/google/callback/")
        params = {
            "client_id": settings.GOOGLE_CLIENT_ID,
            "redirect_uri": redirect_uri,
            "response_type": "code",
            "scope": "openid email profile",
            "state": state,
            "prompt": "select_account",
        }
        response = HttpResponseRedirect(f"{GOOGLE_AUTH_URL}?{urlencode(params)}")
        response.set_cookie(
            "oauth_state_google", state, max_age=600, httponly=True, samesite="Lax"
        )
        return response


class GoogleCallbackView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        if request.GET.get("error"):
            return _error_redirect("access_denied")

        code = request.GET.get("code")
        state = request.GET.get("state")
        cookie_state = request.COOKIES.get("oauth_state_google")
        if not code or not state or state != cookie_state:
            return _error_redirect("invalid_state")

        redirect_uri = request.build_absolute_uri("/api/auth/google/callback/")
        token_response = requests.post(
            GOOGLE_TOKEN_URL,
            data={
                "client_id": settings.GOOGLE_CLIENT_ID,
                "client_secret": settings.GOOGLE_CLIENT_SECRET,
                "code": code,
                "grant_type": "authorization_code",
                "redirect_uri": redirect_uri,
            },
            timeout=REQUEST_TIMEOUT,
        )
        if not token_response.ok:
            return _error_redirect("token_exchange_failed")
        access_token = token_response.json().get("access_token")

        profile_response = requests.get(
            GOOGLE_USERINFO_URL,
            headers={"Authorization": f"Bearer {access_token}"},
            timeout=REQUEST_TIMEOUT,
        )
        if not profile_response.ok:
            return _error_redirect("profile_fetch_failed")
        profile = profile_response.json()
        email = profile.get("email")
        if not email:
            return _error_redirect("no_email")

        user = _get_or_create_user(email, profile.get("name", ""))
        response = _login_redirect(user)
        response.delete_cookie("oauth_state_google")
        return response


class GitHubLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        state = secrets.token_urlsafe(24)
        redirect_uri = request.build_absolute_uri("/api/auth/github/callback/")
        params = {
            "client_id": settings.GITHUB_CLIENT_ID,
            "redirect_uri": redirect_uri,
            "scope": "read:user user:email",
            "state": state,
        }
        response = HttpResponseRedirect(f"{GITHUB_AUTH_URL}?{urlencode(params)}")
        response.set_cookie(
            "oauth_state_github", state, max_age=600, httponly=True, samesite="Lax"
        )
        return response


class GitHubCallbackView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        if request.GET.get("error"):
            return _error_redirect("access_denied")

        code = request.GET.get("code")
        state = request.GET.get("state")
        cookie_state = request.COOKIES.get("oauth_state_github")
        if not code or not state or state != cookie_state:
            return _error_redirect("invalid_state")

        redirect_uri = request.build_absolute_uri("/api/auth/github/callback/")
        token_response = requests.post(
            GITHUB_TOKEN_URL,
            data={
                "client_id": settings.GITHUB_CLIENT_ID,
                "client_secret": settings.GITHUB_CLIENT_SECRET,
                "code": code,
                "redirect_uri": redirect_uri,
            },
            headers={"Accept": "application/json"},
            timeout=REQUEST_TIMEOUT,
        )
        if not token_response.ok:
            return _error_redirect("token_exchange_failed")
        access_token = token_response.json().get("access_token")
        if not access_token:
            return _error_redirect("token_exchange_failed")

        auth_headers = {
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/json",
            "User-Agent": "CloudPulse",
        }
        profile_response = requests.get(GITHUB_USER_URL, headers=auth_headers, timeout=REQUEST_TIMEOUT)
        if not profile_response.ok:
            return _error_redirect("profile_fetch_failed")
        profile = profile_response.json()

        email = profile.get("email")
        if not email:
            emails_response = requests.get(
                GITHUB_EMAILS_URL, headers=auth_headers, timeout=REQUEST_TIMEOUT
            )
            if emails_response.ok:
                candidates = emails_response.json()
                primary = next((e for e in candidates if e.get("primary") and e.get("verified")), None)
                verified = next((e for e in candidates if e.get("verified")), None)
                chosen = primary or verified
                email = chosen["email"] if chosen else None

        if not email:
            return _error_redirect("no_email")

        full_name = profile.get("name") or profile.get("login") or ""
        user = _get_or_create_user(email, full_name)
        response = _login_redirect(user)
        response.delete_cookie("oauth_state_github")
        return response
