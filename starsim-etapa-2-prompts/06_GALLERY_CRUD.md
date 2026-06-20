# Prompt 06 — Gallery CRUD

You are a senior Next.js full-stack engineer.

## Objective

Implement album-based gallery management for Star Sim.

Do not implement tests.

## Admin routes

Create/refine:

```txt
src/app/admin/gallery/page.tsx
src/app/admin/gallery/new/page.tsx
src/app/admin/gallery/[id]/edit/page.tsx
```

## Public routes

Create/refine:

```txt
src/app/galerie/page.tsx
src/app/galerie/[slug]/page.tsx
```

## Admin album fields

```txt
title
slug
description
content JSON optional
coverImageId
programId optional
eventId optional
status
featuredOnHome
sortOrder
publishedAt
SEO fields
```

## Album images

On edit page, add “Imagini” section:

- add images from Media Library
- upload image and attach
- reorder images
- edit per-image:
  - alt
  - caption
  - sortOrder
- remove image from album without deleting MediaAsset by default
- optional destructive action: delete media entirely only from Media page

## Admin list

- title: “Galerie”
- description: “Administrează albumele foto Star Sim.”
- create button: “Adaugă album”
- columns:
  - cover
  - title
  - images count
  - associated event/program
  - status
  - homepage
  - updatedAt
  - actions
- filters:
  - search
  - status
  - program
  - event

## Public /galerie

Requirements:

- premium white/navy/gold visual style
- show only published albums
- grid of album cards:
  - cover image
  - title
  - description
  - image count
  - related event/program label when available
- keep page elegant and light, not cluttered

## Public /galerie/[slug]

Requirements:

- show only published album
- hero with title, description, cover
- image grid/masonry-like layout using CSS grid
- clicking image opens lightbox modal
- lightbox:
  - next/previous
  - caption
  - accessible close button
- no heavy third-party gallery package unless already installed and lightweight

## Accessibility

- every image requires alt
- if image-specific alt is missing, use MediaAsset alt
- if still missing, fallback to album title
- lightbox must support keyboard close via Escape
- next/previous buttons must be focusable

## Homepage

Do not add gallery to homepage for this stage unless current design already has it. The supplied mockup does not include a gallery section on homepage. Keep it on `/galerie`.

## Deliverables

- Gallery album CRUD
- image attachment/reordering
- public gallery list/detail
- lightbox
- no tests
