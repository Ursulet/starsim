# Prompt 01 — Shared Admin Patterns

You are a senior Next.js full-stack engineer working on the Star Sim ONG platform.

## Objective

Create the shared admin CRUD infrastructure used by all CMS modules in Etapa 2.

Do not implement tests.

## Context

The project uses:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Existing admin auth/RBAC from Etapa 1
- Existing admin layout from Etapa 1

If the exact paths from Etapa 1 differ, adapt without changing the architecture.

## Required admin UX pattern

All admin modules must share the same interaction model:

- Sidebar navigation already exists or must be extended.
- Main content uses a white/soft background.
- Tables are clean, compact and readable.
- Every list page has:
  - page title
  - short module description
  - primary create button
  - search input
  - status filter if relevant
  - table/card list
  - empty state
- Every create/edit page has:
  - clear title
  - back link
  - save draft / publish actions where relevant
  - destructive actions visually separated
  - form sections or tabs:
    - Conținut
    - Media
    - SEO
    - Setări
- Every public entity must have:
  - slug
  - status
  - createdAt
  - updatedAt
  - publishedAt where relevant
  - SEO fields

## Suggested file structure

Create or refine:

```txt
src/
  app/
    admin/
      layout.tsx
      page.tsx
      programs/
        page.tsx
        new/page.tsx
        [id]/edit/page.tsx
      events/
        page.tsx
        new/page.tsx
        [id]/edit/page.tsx
      gallery/
        page.tsx
        new/page.tsx
        [id]/edit/page.tsx
      articles/
        page.tsx
        new/page.tsx
        [id]/edit/page.tsx
      media/
        page.tsx
      donation/
        page.tsx
      contact/
        page.tsx
        messages/page.tsx
        messages/[id]/page.tsx
      seo/
        page.tsx

  components/
    admin/
      AdminPageHeader.tsx
      AdminTable.tsx
      AdminStatusBadge.tsx
      AdminEmptyState.tsx
      AdminFormShell.tsx
      AdminTabs.tsx
      AdminSubmitBar.tsx
      DeleteConfirmButton.tsx
      SlugField.tsx
      SeoFields.tsx
      SeoPreview.tsx
      ImagePicker.tsx
      StatusSelect.tsx
      RichTextEditor.tsx
      RichTextRenderer.tsx

  lib/
    admin/
      permissions.ts
      slug.ts
      pagination.ts
      form-state.ts
    validators/
      program.ts
      event.ts
      gallery.ts
      article.ts
      settings.ts
```

## Shared components

### AdminPageHeader

Props:

```ts
type AdminPageHeaderProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
};
```

Visual requirements:

- title: dark navy
- description: muted text
- action aligned right on desktop
- stacked layout on mobile

### AdminStatusBadge

Statuses:

```ts
DRAFT
PUBLISHED
ARCHIVED
CANCELLED
COMPLETED
```

Use distinct but subtle styles. No loud colors. Admin should remain premium and clean.

### AdminFormShell

Used for all edit/new forms.

Requirements:

- max width around 1100px
- white card
- subtle border
- rounded-2xl
- spacing consistent
- sticky submit bar on desktop if page is long

### SlugField

Requirements:

- accepts title source
- can auto-generate slug from title
- user can manually override slug
- must normalize Romanian diacritics:
  - ă/â -> a
  - î -> i
  - ș/ş -> s
  - ț/ţ -> t
- only lowercase letters, numbers and hyphens
- no duplicate slug within same entity type

Implement helper:

```ts
export function slugify(input: string): string
```

### SeoFields

Fields:

```ts
metaTitle
metaDescription
ogTitle
ogDescription
ogImageId
canonicalUrl
robotsIndex
robotsFollow
```

Show character hints:

- metaTitle ideal: 45–60 chars
- metaDescription ideal: 120–160 chars

Do not block saving if outside these ranges, only show gentle warning.

### SeoPreview

Create Google-style and social preview blocks.

No external API.

## Server action pattern

Use server actions or route handlers consistently. Prefer server actions for admin form mutations if the project already uses them.

Every mutation must:

- verify authenticated admin/editor
- validate input with Zod
- normalize slug
- write to Prisma
- create AuditLog entry if the model exists
- call `revalidatePath()` for affected public/admin paths
- redirect or return form state consistently

## Permissions

Use existing RBAC. If missing, define:

```ts
ADMIN: full access
EDITOR: content create/update/publish, no users/settings destructive operations
VOLUNTEER: read-only admin dashboard or limited future use
```

## No testing instruction

Do not create test files.
Do not install test frameworks.
Do not add test scripts.
