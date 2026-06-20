# Prompt 10 — Public Dynamic Binding While Preserving Mockup

You are a senior Next.js frontend engineer and premium UI implementer.

## Objective

Connect the public Star Sim website to real CMS data without breaking the supplied mockup direction.

Do not implement tests.

## Critical rule

Do not redesign the homepage away from the mockup.

The homepage structure must remain:

```txt
Header
Hero
Misiunea noastră
Programele și proiectele noastre
Următoarele evenimente
Fiecare gest contează
Footer
```

Do not add gallery/contact/blog sections to homepage unless explicitly requested later.

## Dynamic bindings

### Programs section

Replace static cards with database content:

```ts
Program where status=PUBLISHED and featuredOnHome=true
order by sortOrder asc, createdAt desc
take 4
```

Card must preserve:

- image top
- circular icon badge
- title
- excerpt
- gold “Află mai multe →”

### Events section

Replace static cards with:

```ts
Event where status=PUBLISHED and startsAt >= now
prefer featuredOnHome=true
order by sortOrder asc, startsAt asc
take 4
```

If fewer than 4 featured events, fill with upcoming published events.

Card must preserve:

- image top
- date badge
- title
- date/time
- location
- “Detalii eveniment →”

### Contribution section

Use DonationSettings and ContactSettings where relevant:

- “Susține-ne” card links to `/doneaza`
- “Fii voluntar” links to `/implica-te`
- “Parteneriate” links to contact or future `/parteneriate`

Do not make contribution section WYSIWYG in this phase.

### Footer

Footer should pull from ContactSettings:

- email
- phone
- address/city
- social links
- newsletter form remains if module exists

## Fallbacks

If database has no records, homepage should not crash.

Fallback behavior:

- Programs: show no cards and a clean admin-friendly empty state only in development; on production render section with no broken layout.
- Events: show “Nu există evenimente programate momentan.” in a premium card.
- Images: use fallback static assets from `/public/images/fallbacks`.

## Performance

- server components for public pages where possible
- no unnecessary client components
- use `next/image`
- avoid fetching the same settings repeatedly; create small data access helpers

Create:

```txt
src/lib/public/home.ts
src/lib/public/programs.ts
src/lib/public/events.ts
src/lib/public/settings.ts
```

## Design fidelity

The public UI must preserve:

- Star Sim navy/gold/white palette
- premium whitespace
- rounded cards
- subtle shadows
- elegant headings
- astronomy details
- emotional but not childish tone
- CTA hierarchy:
  - donate/support remains visually important

## Admin preview links

On admin edit pages for published entities, add preview/open public page link:

- Program: `/programe/[slug]`
- Event: `/evenimente/[slug]`
- Gallery: `/galerie/[slug]`
- Article: `/blog/[slug]`

Draft preview is optional and not required in this phase.

## Deliverables

- homepage sections connected to Prisma
- public pages use dynamic content
- footer/contact settings connected
- fallback behavior
- no tests
