# Star Sim

Next.js + Prisma CMS and public website for Star Sim.

## Local Setup

```bash
pnpm install
pnpm prisma:generate
pnpm dev
```

For database-backed admin/content:

```bash
pnpm prisma:migrate
pnpm db:seed
```

## Coolify

Use the settings in [docs/coolify-deployment.md](docs/coolify-deployment.md).

Runtime:

- Node 20 LTS
- pnpm 10.18.3
- PostgreSQL 16 recommended

Nixpacks install/build/start are configured in `nixpacks.toml`.

Build command:

```bash
pnpm install --frozen-lockfile && pnpm build
```

Start command:

```bash
pnpm start
```

The included `nixpacks.toml` uses `npx -y pnpm@10.18.3` only for install, then `npm run build` and `npm run start:prod`.

Production start applies migrations and seeds the first admin before starting Next.js:

```bash
prisma migrate deploy && tsx prisma/seed.ts && next start
```

Migration command:

```bash
pnpm prisma:deploy
```
