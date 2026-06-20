# Prompt 11 — Etapa 2 Final Hardening

You are a senior full-stack engineer preparing Etapa 2 for handoff.

## Objective

Clean up, harden and document the Etapa 2 CMS/admin implementation.

Do not implement tests.

## Required cleanup

- remove unused imports
- remove duplicate mock data where DB content is now used
- centralize repeated Prisma queries
- centralize date formatting helpers
- ensure all admin forms use shared components
- ensure all mutations validate server-side
- ensure all protected admin routes enforce auth/RBAC
- ensure no public route leaks draft content
- ensure all destructive actions require confirmation
- ensure all upload paths are safe
- ensure all public images have alt fallback
- ensure SEO metadata uses central helper

## Environment variables

Update `.env.example` with only relevant variables:

```txt
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
NEXT_PUBLIC_SITE_URL=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=
```

If project uses another auth secret name from Etapa 1, keep that name and do not duplicate.

## Coolify notes

Add or update:

```txt
docs/deployment-coolify.md
```

Include:

- required environment variables
- PostgreSQL service requirement
- migration command
- build command
- start command
- note about persistent volume for `/public/uploads`
- backup recommendation for PostgreSQL
- warning not to commit `.env`

Keep documentation practical and short.

## Admin navigation

Ensure sidebar contains:

```txt
Dashboard
Programe
Evenimente
Galerie
Articole
Media Library
Donează
Contact
Mesaje
SEO Center
Setări
```

Only show items the current role can access.

## Empty states

Every admin list page must have a clean empty state:

- clear message
- primary action button
- no broken tables

## Error states

Use clear admin-friendly errors:

- upload failed
- slug already exists
- unauthorized
- validation failed
- entity not found

Do not expose internal stack traces in UI.

## No testing instruction

Do not create tests.
Do not add test scripts.
Do not install testing dependencies.
Leave validation and verification to the project owner.

## Final handoff summary

At the end, provide a concise implementation summary:

- modules completed
- files created/changed
- migrations created
- env vars required
- manual steps required in Coolify
- known limitations
