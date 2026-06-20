# Prompt 04 — Programs CRUD

You are a senior Next.js full-stack engineer.

## Objective

Implement admin CRUD and public dynamic pages for Star Sim programs.

Do not implement tests.

## Admin routes

Create/refine:

```txt
src/app/admin/programs/page.tsx
src/app/admin/programs/new/page.tsx
src/app/admin/programs/[id]/edit/page.tsx
```

## Public routes

Create/refine:

```txt
src/app/programe/page.tsx
src/app/programe/[slug]/page.tsx
```

## Fields

Admin form must support:

```txt
title
slug
excerpt
content JSON via WYSIWYG or rich text JSON field
icon
category
ctaLabel
ctaHref
heroImageId
status
featuredOnHome
sortOrder
publishedAt
SEO fields
```

For `content`, reuse the rich text editor if already available. If WYSIWYG is implemented later in prompt 07, create a simple JSON-compatible textarea placeholder now and refactor after prompt 07. Do not block this module.

## List page

Admin programs list:

- title: “Programe”
- description: “Administrează programele și proiectele educaționale Star Sim.”
- create button: “Adaugă program”
- table columns:
  - title
  - status
  - homepage
  - sortOrder
  - updatedAt
  - actions
- filters:
  - search
  - status
  - featuredOnHome
- actions:
  - edit
  - duplicate
  - publish/unpublish
  - archive

## Create/edit behavior

- slug auto-generated from title but editable
- slug uniqueness enforced
- publish action sets `status=PUBLISHED` and `publishedAt` if empty
- unpublish sets `status=DRAFT`, does not erase `publishedAt`
- archive sets `status=ARCHIVED`
- image chosen through `ImagePicker`
- SEO tab uses `SeoFields`
- create AuditLog entry if AuditLog exists

## Public /programe page

Requirements:

- follow Star Sim visual style from mockup
- show only `status=PUBLISHED`
- grid of program cards
- sort by `sortOrder asc`, then `createdAt desc`
- use heroImage if present, fallback static image if missing
- card structure follows mockup:
  - image top
  - icon badge overlapping image
  - title
  - excerpt
  - “Află mai multe →”

## Public /programe/[slug]

Requirements:

- show only published program
- if missing or draft, return notFound()
- hero section:
  - title
  - excerpt
  - image
  - CTA button
- content section renders JSON rich text
- related events for this program, if any
- related gallery albums, if any
- final CTA:
  - “Vrei să aducem astronomia în comunitatea ta?”
  - buttons: “Contactează-ne” and “Susține asociația”

## Homepage binding

Do not rewrite homepage design.

Where homepage has the four program cards from mockup, replace static data with:

```ts
where: {
  status: "PUBLISHED",
  featuredOnHome: true
}
orderBy: [
  { sortOrder: "asc" },
  { createdAt: "desc" }
]
take: 4
```

If fewer than 4 exist, render available cards only without breaking layout.

## Validation

Use Zod:

- title required, min 3
- slug required
- excerpt required, max 240
- status enum
- sortOrder number
- ctaHref optional but must be valid internal path or full URL
- SEO fields optional with character warnings

## Deliverables

- complete Programs CRUD
- public programs list/detail
- homepage dynamic programs
- no tests
