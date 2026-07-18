# CloudPulse Portal

Next.js (App Router) + TypeScript + Tailwind + shadcn/ui frontend for
CloudPulse.

## Requirements

- Node.js 20+
- The backend API running at `http://localhost:8000` (see
  `cloudpulse_backend/README.md`)

## Setup

Run these from the `cloudpulse_portal/` directory, in order.

**1. Install dependencies**

```bash
npm install
```

**2. Configure environment variables**

```bash
cp .env.example .env.local
```

Defaults point at the local backend (`http://localhost:8000/api`).

**3. Run the dev server**

```bash
npm run dev
```

The app is now available at `http://localhost:3000/`.

## Everyday commands

```bash
npm run dev            # dev server with hot reload
npm run build          # production build (also catches type errors)
npm run start          # run a production build locally
npm run lint           # eslint
npm run typecheck      # tsc --noEmit
npm run format         # prettier --write
npm run format:check   # prettier --check (used in CI)
```

These same checks (format, lint, typecheck, build) run in CI on every push to `dev` and every PR into `main`.

## Project structure

Everything UI-related lives under `components/` — pages in `app/` stay thin
and compose components, they don't hold large inline markup.

```
app/
  (auth)/{login,register}/          # unauthenticated routes
  (dashboard)/{dashboard,inventory,security,cost,settings}/  # authenticated routes
components/
  ui/          # shadcn/ui primitives (button, etc.)
  dashboard/   # dashboard-specific components
  shared/      # shared/cross-page components
lib/
  api/         # API client (client.ts) for talking to the Django backend
  utils.ts     # shadcn helper
types/         # shared TypeScript types
hooks/         # shared React hooks
```

## Adding shadcn components

```bash
npx shadcn@latest add <component-name>
```

New components land in `components/ui/`.
