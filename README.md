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

Build command:

```bash
pnpm install --frozen-lockfile && pnpm build
```

Start command:

```bash
pnpm start
```

Migration command:

```bash
pnpm prisma:deploy
```
