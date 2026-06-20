# Prompt 00 — Global Context & Non-Negotiable Rules

You are the Developer Agent for the Star Sim project.

## Project identity

Star Sim is a Romanian astronomy-focused NGO website and CMS platform. The public website must later follow a premium white/navy/gold astronomy mockup with children, stars, telescopes, emotional education messaging and a donation/partnership funnel.

This phase is **Etapa 1** and starts from an empty project.

## Approved stack

Use:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Coolify-ready deployment structure
- Custom admin panel
- Custom CMS foundation

Do not use Vue, Vite-only, Nuxt, Laravel, WordPress, Strapi, Directus, Payload CMS, Sanity, Supabase Auth, Firebase, or a hosted CMS.

## Strategic architecture

Build the project as a custom CMS, not as a static landing page.

The public website will later be rendered from structured content models:

- Programs
- Events
- Gallery albums
- Articles
- Pages
- Donation settings
- Contact settings
- Partners
- Testimonials
- SEO metadata
- Media assets

Important rule:

- Use structured fields for cards, homepage sections, events, programs, donation/contact data.
- Use WYSIWYG/Tiptap JSON only for long editorial content later.
- Do not store the whole homepage as one WYSIWYG blob.

## Visual and UX direction for admin

The admin panel should be clean, restrained and professional.

Admin UI style:

- background: `#F8FAFC`
- sidebar navy: `#061B3D`
- active item: `#D89B32`
- text: `#10213F`
- muted text: `#64748B`
- cards: white, rounded `rounded-2xl`, border `border-slate-200`, subtle shadow
- buttons: navy primary, gold accent only for important actions

Do not overdesign admin. It must be fast, clear and practical.

## Security baseline

Implement security-minded defaults:

- no public registration
- first admin created only by seed script from environment variables
- passwords hashed with bcrypt
- protected `/admin` routes
- role-based access control
- server-side validation with Zod
- audit log model and helper
- no secrets committed
- no hardcoded credentials
- no unsafe HTML rendering in this phase

## Testing boundary

Do not add testing frameworks or testing prompt work in this phase.

Do not install or configure:

- Jest
- Vitest
- Playwright
- Cypress
- Testing Library

The project owner will handle testing separately.

## Code quality expectations

Use:

- readable TypeScript
- strict server/client boundaries
- `src/` directory
- reusable components
- semantic naming
- Prisma client singleton
- environment validation
- route groups for public/admin separation
- server actions only where appropriate
- no duplicated navigation/module definitions

## Phase 1 deliverable

By the end of Etapa 1, the project must have:

- runnable Next.js app
- Prisma schema and migration-ready setup
- seeded admin user
- working `/admin/login`
- protected admin dashboard
- admin sidebar and module placeholder pages
- CMS data models in Prisma
- foundational utilities for permissions, slugging, SEO defaults and audit logging
- Coolify-ready environment documentation

Do not implement full CRUD yet unless explicitly requested in a later stage.
