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

Recommended builder: **Dockerfile**.

Runtime:

- Node 20 LTS
- pnpm 10.18.3 during image build
- PostgreSQL 16 recommended

The Dockerfile builds the app, prunes dev dependencies, then starts with:

```bash
npm run start
```

Production start applies migrations, seeds the first admin, and starts Next.js.
