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

Build command:

```bash
pnpm install --frozen-lockfile && pnpm build
```

Start command:

```bash
pnpm start
```

The included `nixpacks.toml` uses `npx pnpm@10.18.3` during deploy so Coolify does not depend on Corepack.

Migration command:

```bash
pnpm prisma:deploy
```
