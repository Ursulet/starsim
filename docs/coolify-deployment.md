# Coolify Deployment Notes

## Services

- Next.js app
- PostgreSQL database

## Recommended Builder

Use **Dockerfile** in Coolify.

The repository includes a production `Dockerfile` based on Node 20. It avoids the Nixpacks/Corepack/pnpm issues seen during earlier deploy attempts.

## Required Environment Variables

Copy values from `.env.example` and replace with production secrets.

Minimum production variables:

- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_TRUST_HOST=true`
- `NEXT_PUBLIC_SITE_URL`
- `SEED_ADMIN_EMAIL`
- `SEED_ADMIN_PASSWORD`
- `SEED_ADMIN_NAME`

## Build

Coolify should build from the repository `Dockerfile`.

No custom build command is required when using the Dockerfile builder.

## Start

The Dockerfile starts the app with:

```bash
npm run start
```

`start` runs:

1. `prisma migrate deploy`
2. `tsx prisma/seed.ts --production`
3. `next start`

The startup script retries migrations/seed while PostgreSQL is still becoming available.

If Coolify has a custom Start Command, leave it empty or set it to `npm run start`. Do not use `next start` directly, because that skips migrations and the admin tables will not be created.

## First Admin

Set `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, `SEED_ADMIN_NAME`.

The seed creates the admin if missing. It does not reset the password on every restart unless:

```env
SEED_ADMIN_FORCE_PASSWORD_UPDATE=true
```

## Notes

- Use PostgreSQL 16.
- Use a strong `AUTH_SECRET`.
- Use PostgreSQL backups in Coolify.
- Never expose `DATABASE_URL` publicly.
- Map `/public/uploads` to a persistent volume before enabling real uploads.
- The repository intentionally excludes prompt/work files and keeps only deployable app assets.
