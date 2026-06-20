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

The repository includes `nixpacks.toml`, which Coolify/Nixpacks should use automatically:

- Node 20
- install: `npx -y pnpm@10.18.3 install --frozen-lockfile --prod=false`
- build: `npm run build`
- start: `npm run start:prod`

This avoids Corepack and pnpm PATH issues in Nixpacks layers.

## Start command

`npm run start:prod`

## Production migration command

`pnpm prisma:deploy`

`start:prod` already runs migrations before starting the app. You can still run this as a one-off command if needed.

## First admin

Set `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, `SEED_ADMIN_NAME`. Production start runs the seed automatically.

Manual seed command, if needed:

`pnpm db:seed`

## Notes

- Use a strong `AUTH_SECRET`.
- Use PostgreSQL backups in Coolify.
- Never expose `DATABASE_URL` publicly.
- Map `/public/uploads` to a persistent volume before enabling real uploads.
- The repository intentionally excludes prompt/work files and keeps only deployable app assets.
