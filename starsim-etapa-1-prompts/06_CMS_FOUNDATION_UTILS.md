# Prompt 06 — CMS Foundation Utilities

Implement foundational CMS utilities and metadata helpers.

## Goal

Create the helper layer that future CRUD modules will use.

Do not implement full CRUD yet.

## Files to create

```txt
src/lib/slug.ts
src/lib/seo.ts
src/lib/admin/module-meta.ts
src/lib/admin/status.ts
src/lib/admin/forms.ts
src/lib/admin/safe-action.ts
```

## Slug utility

`src/lib/slug.ts`

Implement:

```ts
export function slugify(input: string): string
export function ensureLeadingSlash(path: string): string
export function normalizePath(path: string): string
```

Slug requirements:

- lowercase
- Romanian diacritics normalized:
  - ă/â -> a
  - î -> i
  - ș/ş -> s
  - ț/ţ -> t
- remove unsupported characters
- collapse multiple dashes
- trim dashes

Examples:

- `Noapte de observații la Pădurea Băneasa` -> `noapte-de-observatii-la-padurea-baneasa`
- `Atelier: Sistemul Solar pentru copii` -> `atelier-sistemul-solar-pentru-copii`

## SEO utility

`src/lib/seo.ts`

Implement helpers:

```ts
type SeoInput = {
  title?: string | null;
  description?: string | null;
  fallbackTitle: string;
  fallbackDescription?: string | null;
  imageUrl?: string | null;
  canonicalUrl?: string | null;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
};

export function buildMetadata(input: SeoInput): Metadata;
export function truncateMetaTitle(title: string): string;
export function truncateMetaDescription(description: string): string;
```

Rules:

- title target max around 60 characters
- description target max around 155-160 characters
- generate `robots` based on booleans
- include Open Graph where possible
- default site name: `Star Sim`
- no keyword stuffing

Do not implement sitemap yet.

## Module metadata

`src/lib/admin/module-meta.ts`

Create a central definition for all admin modules.

Each module should include:

```ts
key
label
href
description
entityName
primaryActionLabel
permissions
seoRelevant
```

Modules:

- dashboard
- programs
- events
- gallery
- articles
- pages
- donation
- contact
- newsletter
- partners
- testimonials
- media
- seo
- users
- settings
- audit

Use this metadata in placeholder pages and future CRUD.

## Status definitions

`src/lib/admin/status.ts`

Define display metadata for:

- PublishStatus: DRAFT, PUBLISHED, ARCHIVED
- EventStatus: DRAFT, PUBLISHED, CANCELLED, COMPLETED
- ContactMessageStatus
- NewsletterStatus
- UserStatus

Each status should map to:

```ts
label
tone: "neutral" | "success" | "warning" | "danger" | "info"
```

Use Romanian labels.

Examples:

- DRAFT -> `Ciornă`
- PUBLISHED -> `Publicat`
- ARCHIVED -> `Arhivat`
- CANCELLED -> `Anulat`
- COMPLETED -> `Finalizat`

## Form foundation

`src/lib/admin/forms.ts`

Create shared Zod snippets:

```ts
slugSchema
seoTitleSchema
seoDescriptionSchema
urlOptionalSchema
emailSchema
publishStatusSchema
eventStatusSchema
```

Rules:

- Slugs must be lowercase and URL-safe.
- SEO title max 70.
- SEO description max 170.
- Optional URLs allow empty string transformed to null.

Do not create complete form schemas for every entity yet.

## Safe action foundation

`src/lib/admin/safe-action.ts`

Create minimal helpers for server action responses:

```ts
export type ActionResult<T = unknown> =
  | { ok: true; data?: T; message?: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export function actionSuccess<T>(data?: T, message?: string): ActionResult<T>
export function actionError(error: string, fieldErrors?: Record<string, string[]>): ActionResult<never>
export function parseZodError(error: ZodError): Record<string, string[]>
```

This will be used in later CRUD prompts.

## Media utility placeholder

Do not implement real upload yet.

Create only basic constants for future upload limits:

```ts
export const ALLOWED_IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
export const DEFAULT_MAX_UPLOAD_MB = 10;
```

## Completion criteria

The app has reusable CMS utilities for slugging, SEO metadata, status labels, shared form validation and future server actions.
