import { API_BASE_URL, apiFetch } from "@/lib/api/client";

export interface AuthUser {
  id: number;
  email: string;
  full_name: string;
  date_joined: string;
}

interface AuthResponse {
  access: string;
  refresh: string;
  user: AuthUser;
}

const ACCESS_TOKEN_KEY = "cloudpulse_access_token";
const REFRESH_TOKEN_KEY = "cloudpulse_refresh_token";

/**
 * "Keep me signed in" controls where tokens live: localStorage survives
 * closing the browser, sessionStorage is cleared when the tab/browser closes.
 */
export function storeTokens(access: string, refresh: string, remember = true) {
  const storage = remember ? localStorage : sessionStorage;
  const other = remember ? sessionStorage : localStorage;
  storage.setItem(ACCESS_TOKEN_KEY, access);
  storage.setItem(REFRESH_TOKEN_KEY, refresh);
  other.removeItem(ACCESS_TOKEN_KEY);
  other.removeItem(REFRESH_TOKEN_KEY);
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY) ?? sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
}

export async function registerUser(input: {
  full_name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const data = await apiFetch<AuthResponse>("/auth/register/", {
    method: "POST",
    body: JSON.stringify(input),
  });
  storeTokens(data.access, data.refresh);
  return data;
}

export async function loginUser(input: {
  email: string;
  password: string;
  remember?: boolean;
}): Promise<AuthResponse> {
  const data = await apiFetch<AuthResponse>("/auth/login/", {
    method: "POST",
    body: JSON.stringify({ email: input.email, password: input.password }),
  });
  storeTokens(data.access, data.refresh, input.remember ?? true);
  return data;
}

export async function fetchCurrentUser(): Promise<AuthUser> {
  const token = getAccessToken();
  return apiFetch<AuthUser>("/auth/me/", {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

export async function requestPasswordReset(email: string): Promise<{ detail: string }> {
  return apiFetch<{ detail: string }>("/auth/password-reset/", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function confirmPasswordReset(input: {
  uid: string;
  token: string;
  password: string;
}): Promise<{ detail: string }> {
  return apiFetch<{ detail: string }>("/auth/password-reset-confirm/", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

/**
 * Full-page navigations (not fetch calls) — the backend redirects the
 * browser on to Google/GitHub's own consent screen.
 */
export function googleLoginUrl(): string {
  return `${API_BASE_URL}/auth/google/login/`;
}

export function githubLoginUrl(): string {
  return `${API_BASE_URL}/auth/github/login/`;
}
