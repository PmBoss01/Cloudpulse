# CloudPulse Backend

Django + Django REST Framework API for CloudPulse. Handles auth, cloud account
connections, inventory scans, security checks, cost checks, and health scoring.
See `apps/providers/` for the cloud-provider abstraction (Azure is the first
real implementation; AWS and GCP are placeholder providers).

## Requirements

- Python 3.11+
- Redis (for Celery — required once background scan jobs are in use; not
  needed just to run the API and browse the admin)
- PostgreSQL (production only — dev uses sqlite automatically)

## Setup

Run these from the `cloudpulse_backend/` directory, in order.

**1. Create and activate a virtual environment**

```bash
python -m venv venv
# Windows
./venv/Scripts/activate
# macOS/Linux
source venv/bin/activate
```

**2. Install dependencies**

```bash
pip install -r requirements.txt
```

**3. Configure environment variables**

```bash
cp .env.example .env
```

Edit `.env` and fill in real values (Azure credentials, etc.) as they become
needed. Defaults are fine for local development.

**4. Apply database migrations**

```bash
python manage.py migrate
```

**5. Create an admin superuser**

```bash
python manage.py createsuperuser
```

You'll be prompted for a username, email, and password. This account logs
into the Django admin at `/admin/`.

**6. Run the dev server**

```bash
python manage.py runserver
```

The API is now available at `http://localhost:8000/`, and the admin at
`http://localhost:8000/admin/`.

## Everyday commands

```bash
# After changing any models.py
python manage.py makemigrations
python manage.py migrate

# Django shell
python manage.py shell

# Run tests
python manage.py test
```

## Project structure

```
config/settings/{base,dev,prod}.py   # environment-split settings
apps/
  accounts/          # auth, users, orgs, MFA
  cloud_accounts/    # linked cloud account connections
  providers/          # CloudProvider abstraction (base.py) + azure/, aws/, gcp/ adapters + registry.py
  inventory/          # resource inventory
  security/           # security findings/checks
  cost/               # cost optimization checks
  scoring/            # Cloud Health Score engine
  notifications/       # email/weekly reports
  billing/             # subscriptions
core/                 # shared utilities
```
