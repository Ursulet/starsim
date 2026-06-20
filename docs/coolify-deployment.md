# Coolify Deployment Notes

## Services

- Next.js app
- PostgreSQL database

## Required environment variables

Copy values from `.env.example` and replace with production secrets.

Minimum production variables:

- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_TRUST_HOST=true`
- `NEXT_PUBLIC_SITE_URL`
- `SEED_ADMIN_EMAIL`
- `SEED_ADMIN_PASSWORD`
- `SEED_ADMIN_NAME`

## Build command

`pnpm install --frozen-lockfile && pnpm build`

The repository also includes `nixpacks.toml`, which pins the deployment runtime to Node 20 and installs pnpm 10.18.3 with npm to avoid Corepack signature issues.

## Start command

`pnpm start`

## Production migration command

`pnpm prisma:deploy`

Run this as a pre-deploy command or one-off command after the PostgreSQL service is attached.

## First admin

Set `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, `SEED_ADMIN_NAME`, then run once:

`pnpm db:seed`

## Notes

- Use a strong `AUTH_SECRET`.
- Use PostgreSQL backups in Coolify.
- Never expose `DATABASE_URL` publicly.
- Map `/public/uploads` to a persistent volume before enabling real uploads.
- The repository intentionally excludes prompt/work files and keeps only deployable app assets.
