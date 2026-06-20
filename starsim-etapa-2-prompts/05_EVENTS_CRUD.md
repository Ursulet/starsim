# Prompt 05 — Events CRUD

You are a senior Next.js full-stack engineer.

## Objective

Implement admin CRUD and public dynamic pages for Star Sim events.

Do not implement tests.

## Admin routes

Create/refine:

```txt
src/app/admin/events/page.tsx
src/app/admin/events/new/page.tsx
src/app/admin/events/[id]/edit/page.tsx
```

## Public routes

Create/refine:

```txt
src/app/evenimente/page.tsx
src/app/evenimente/[slug]/page.tsx
```

## Fields

Admin form must support:

```txt
title
slug
excerpt
content JSON
startsAt
endsAt
locationName
address
city
mapUrl
maxParticipants
registrationUrl
registrationEnabled
heroImageId
programId
status
featuredOnHome
sortOrder
publishedAt
SEO fields
```

## Admin list

- title: “Evenimente”
- description: “Administrează calendarul evenimentelor Star Sim.”
- create button: “Adaugă eveniment”
- columns:
  - title
  - startsAt
  - location
  - status
  - homepage
  - updatedAt
  - actions
- filters:
  - search
  - status
  - upcoming/past
  - city
  - program

## Create/edit behavior

- slug generated from title
- publish sets `status=PUBLISHED` and `publishedAt` if empty
- if event date has passed, admin may manually set COMPLETED
- cancelled events remain visible only if status is PUBLISHED? No. Use status CANCELLED and public detail can show cancellation banner if directly accessed by slug. Lists should exclude CANCELLED unless future UX explicitly needs it.
- image selected through ImagePicker
- program relation optional
- registrationUrl only shown publicly if registrationEnabled is true

## Public /evenimente page

Requirements:

- public visual style must respect mockup
- show only upcoming published events by default
- include simple filters:
  - lună
  - oraș
  - program, if programs exist
- card structure:
  - image top
  - date badge top-left:
    - day large
    - month short uppercase Romanian
  - title
  - date/time row
  - location row
  - “Detalii eveniment →”

## Public /evenimente/[slug]

Requirements:

- published event only
- show notFound for drafts/archived
- if cancelled, show clear premium cancellation banner
- hero:
  - title
  - date/time
  - location
  - image
- content rich text
- map link if provided
- registration CTA:
  - if registrationEnabled and registrationUrl, button “Înscrie-te la eveniment”
  - otherwise “Contactează-ne pentru detalii”
- related program card if linked
- related gallery album if event completed and album exists

## Homepage binding

Replace static event cards with database query:

```ts
where: {
  status: "PUBLISHED",
  featuredOnHome: true,
  startsAt: { gte: new Date() }
}
orderBy: [
  { sortOrder: "asc" },
  { startsAt: "asc" }
]
take: 4
```

If fewer than 4 featured events exist, fallback to next upcoming published events.

## Romanian date formatting

Create helper:

```ts
formatRomanianDateBadge(date: Date): { day: string; month: string }
formatRomanianDateTime(date: Date): string
```

Month labels:

```txt
IAN, FEB, MAR, APR, MAI, IUN, IUL, AUG, SEP, OCT, NOI, DEC
```

## SEO / Structured data

Prepare event data for JSON-LD in detail page:

- name
- description
- startDate
- endDate when available
- location
- image when available
- eventStatus based on status

Actual centralized SEO implementation can be finalized in Prompt 09.

## Deliverables

- complete Events CRUD
- public events list/detail
- homepage dynamic events
- date helpers
- no tests
