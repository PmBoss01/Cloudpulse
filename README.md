# CloudPulse

A single dashboard for cloud health, security, and cost — Azure-first, with AWS and GCP wired in as placeholder providers behind the same interface.

## Layout

This is a monorepo with two apps:

- **`cloudpulse_backend/`** — Django + Django REST Framework API. PostgreSQL (Postgres in prod, sqlite in dev), Redis + Celery for background scan jobs. See `cloudpulse_backend/apps/providers/` for the cloud-provider abstraction (`CloudProvider` interface, with Azure as the first real implementation and AWS/GCP as `NotImplementedProvider` stubs).
- **`cloudpulse_portal/`** — Next.js (App Router) + TypeScript + Tailwind + shadcn/ui frontend.

## Backend setup

```bash
cd cloudpulse_backend
python -m venv venv
./venv/Scripts/python.exe -m pip install -r requirements.txt
cp .env.example .env
./venv/Scripts/python.exe manage.py migrate
./venv/Scripts/python.exe manage.py runserver
```

## Frontend setup

```bash
cd cloudpulse_portal
npm install
cp .env.example .env.local
npm run dev
```

## Branching & CI

Work happens on `dev`; PRs into `main` trigger CI (`.github/workflows/ci.yml`), which runs formatting, linting, type-checking, and a build for both apps. The same push to `dev` triggers CI too, so issues surface before you even open the PR.

## Principle

The platform must work fully without AI. AI is an optional, separable layer on top (explaining findings, summarizing reports) — never load-bearing for core scans, scoring, or checks.
