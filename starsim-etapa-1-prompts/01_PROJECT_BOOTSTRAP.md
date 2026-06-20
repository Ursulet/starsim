# Prompt 01 — Empty Project Bootstrap

You are starting from an empty folder.

Create the initial Next.js project foundation for Star Sim.

## Required stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- `src/` directory
- import alias `@/*`
- package manager: `pnpm`

## Bootstrap command

Initialize the project in the current empty folder using a clean Next.js setup.

Use options equivalent to:

```bash
pnpm create next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

If the interactive installer asks questions, choose:

- TypeScript: yes
- ESLint: yes
- Tailwind CSS: yes
- `src/` directory: yes
- App Router: yes
- Turbopack: project owner may decide; do not make the app depend on Turbopack-specific behavior
- import alias: `@/*`

## Required dependencies

Install these runtime dependencies:

```bash
pnpm add @prisma/client zod bcryptjs lucide-react clsx tailwind-merge next-auth
```

Install Prisma as development dependency:

```bash
pnpm add -D prisma
```

Do not install testing dependencies.

## File structure to create

Create or prepare this structure:

```txt
src/
  app/
    (public)/
      layout.tsx
      page.tsx

    (admin-public)/
      admin/
        login/
          page.tsx

    (admin-protected)/
      admin/
        layout.tsx
        page.tsx
        programe/
          page.tsx
        evenimente/
          page.tsx
        galerie/
          page.tsx
        articole/
          page.tsx
        pagini/
          page.tsx
        doneaza/
          page.tsx
        contact/
          page.tsx
        newsletter/
          page.tsx
        parteneri/
          page.tsx
        testimoniale/
          page.tsx
        media/
          page.tsx
        seo/
          page.tsx
        utilizatori/
          page.tsx
        setari/
          page.tsx
        audit-log/
          page.tsx

    api/
      auth/
        [...nextauth]/
          route.ts

    globals.css
    layout.tsx

  components/
    admin/
      AdminHeader.tsx
      AdminSidebar.tsx
      AdminShell.tsx
      AdminStatCard.tsx
      ModulePlaceholder.tsx
      StatusBadge.tsx

    ui/
      Button.tsx
      Input.tsx
      Textarea.tsx
      Label.tsx
      Card.tsx

  lib/
    auth.ts
    prisma.ts
    env.ts
    utils.ts
    slug.ts
    seo.ts
    audit.ts

    admin/
      navigation.ts
      permissions.ts
      module-meta.ts

  server/
    auth/
      password.ts
      session.ts

  styles/
    admin.css

prisma/
  schema.prisma
  seed.ts
```

## Root layout

Update `src/app/layout.tsx`:

- load Inter from `next/font/google`
- set Romanian language: `<html lang="ro">`
- define default metadata:
  - title: `Star Sim`
  - description: `De la o stea, la un vis.`
- import `globals.css`

Do not build the final public homepage in this phase.

For `src/app/(public)/page.tsx`, create a simple placeholder page:

- Star Sim title
- text: `Platforma Star Sim este în pregătire.`
- link/button to `/admin/login`

## Global CSS

In `globals.css`, define base CSS variables:

```css
:root {
  --starsim-navy: #061B3D;
  --starsim-navy-2: #082756;
  --starsim-gold: #D89B32;
  --starsim-gold-soft: #F2C46D;
  --starsim-ink: #10213F;
  --starsim-muted: #64748B;
  --starsim-bg: #F8FAFC;
  --starsim-border: #E2E8F0;
}
```

Keep Tailwind base imports intact.

## Tailwind utility helper

Create `src/lib/utils.ts` with a `cn()` helper based on `clsx` and `tailwind-merge`.

## UI components

Create minimal but reusable components:

- `Button`
- `Input`
- `Textarea`
- `Label`
- `Card`

They must be simple, Tailwind-based and admin-ready. Do not use shadcn generator in this phase.

## Completion criteria

The app must run locally with a placeholder public page and an empty admin route structure prepared for later prompts.
