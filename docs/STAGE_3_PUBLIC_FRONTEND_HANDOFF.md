# Stage 3 Public Frontend Handoff

## Implemented public routes

- `/`
- `/despre`
- `/programe`
- `/programe/[slug]`
- `/evenimente`
- `/evenimente/[slug]`
- `/galerie`
- `/galerie/[slug]`
- `/articole`
- `/articole/[slug]`
- `/doneaza`
- `/contact`
- `/implica-te`
- `/parteneriate`

## Main components

- Public header/footer
- Homepage hero, mission, programs, events and contribution sections
- Program, event and article cards
- Contact form with server action
- Rich text JSON renderer
- SEO JSON-LD helper

## Data

Public pages read from Prisma and use development fallbacks when PostgreSQL is unavailable.

## Required env

- `DATABASE_URL`
- `AUTH_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- seed admin variables

## Deployment notes

Run migrations, seed the first admin, configure a persistent upload volume, and keep `.env` out of git.
