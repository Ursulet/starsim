# Prompt 02 — Environment, PostgreSQL & Coolify Readiness

Configure the project for PostgreSQL, Prisma and Coolify deployment readiness.

## Environment files

Create:

```txt
.env.example
```

Do not commit real secrets.

The `.env.example` must include:

```bash
# App
NODE_ENV="development"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Database
DATABASE_URL="postgresql://starsim:starsim_password@localhost:5432/starsim?schema=public"

# Auth
AUTH_SECRET="replace-with-a-long-random-secret"
AUTH_TRUST_HOST="true"

# Seed admin
SEED_ADMIN_EMAIL="admin@starsim.ro"
SEED_ADMIN_PASSWORD="change-this-password"
SEED_ADMIN_NAME="Star Sim Admin"

# Upload limits, future media library
MAX_UPLOAD_MB="10"
```

If `.env` exists locally, do not overwrite it without asking.

## Environment validation

Create `src/lib/env.ts`.

Requirements:

- Use Zod.
- Validate server environment variables.
- Export `env`.
- Do not expose secrets to client components.
- Validate:
  - `DATABASE_URL`
  - `AUTH_SECRET`
  - `NEXT_PUBLIC_SITE_URL`
  - `SEED_ADMIN_EMAIL`
  - `SEED_ADMIN_PASSWORD`
  - `SEED_ADMIN_NAME`
  - `MAX_UPLOAD_MB`

Example shape:

```ts
const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  AUTH_SECRET: z.string().min(32),
  AUTH_TRUST_HOST: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  SEED_ADMIN_EMAIL: z.string().email(),
  SEED_ADMIN_PASSWORD: z.string().min(12),
  SEED_ADMIN_NAME: z.string().min(2),
  MAX_UPLOAD_MB: z.coerce.number().min(1).max(50).default(10),
});
```

## Prisma initialization

Run:

```bash
pnpm prisma init
```

Ensure `prisma/schema.prisma` uses:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

## Prisma client singleton

Create `src/lib/prisma.ts`.

Requirements:

- Use a global singleton in development.
- Export `prisma`.
- Avoid multiple PrismaClient instances during hot reload.

## Package scripts

Update `package.json` scripts:

```json
{
  "dev": "next dev",
  "build": "prisma generate && next build",
  "start": "next start",
  "lint": "next lint",
  "prisma:generate": "prisma generate",
  "prisma:migrate": "prisma migrate dev",
  "prisma:deploy": "prisma migrate deploy",
  "prisma:studio": "prisma studio",
  "db:seed": "tsx prisma/seed.ts"
}
```

If `tsx` is not installed, install it as a dev dependency:

```bash
pnpm add -D tsx
```

Do not install test tooling.

## Coolify deployment notes

Create `docs/coolify-deployment.md`.

Document these requirements:

```md
# Coolify Deployment Notes

## Services

- Next.js app
- PostgreSQL database

## Required environment variables

Copy values from `.env.example` and replace with production secrets.

## Build command

pnpm install --frozen-lockfile && pnpm build

## Start command

pnpm start

## Production migration command

pnpm prisma:deploy

## First admin

Set:

- SEED_ADMIN_EMAIL
- SEED_ADMIN_PASSWORD
- SEED_ADMIN_NAME

Then run seed once:

pnpm db:seed

## Notes

- Use a strong AUTH_SECRET.
- Use PostgreSQL backups in Coolify.
- Never expose DATABASE_URL publicly.
- Keep AUTH_TRUST_HOST=true behind Coolify/reverse proxy.
```

## Completion criteria

The project must be ready to connect to PostgreSQL locally or from Coolify, with safe environment handling and Prisma client setup.
