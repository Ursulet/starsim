# Coolify Deployment Notes

## Services

- Next.js app
- PostgreSQL database

## Required environment variables

Copy values from `.env.example` and replace with production secrets.

## Build command

`pnpm install --frozen-lockfile && pnpm build`

## Start command

`pnpm start`

## Production migration command

`pnpm prisma:deploy`

## First admin

Set `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, `SEED_ADMIN_NAME`, then run once:

`pnpm db:seed`

## Notes

- Use a strong `AUTH_SECRET`.
- Use PostgreSQL backups in Coolify.
- Never expose `DATABASE_URL` publicly.
- Map `/public/uploads` to a persistent volume before enabling real uploads.
