# Prompt 07 — Articles + WYSIWYG

You are a senior Next.js CMS engineer.

## Objective

Implement the articles/blog module with a serious WYSIWYG editing experience and SEO support.

Do not implement tests.

## WYSIWYG choice

Use Tiptap for the editor.

Install necessary packages only if not present:

```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-image @tiptap/extension-placeholder @tiptap/extension-table @tiptap/extension-table-row @tiptap/extension-table-cell @tiptap/extension-table-header
```

Optional extensions are acceptable if needed, but do not bloat the project.

## Important Next.js rule

The editor component must be a Client Component:

```tsx
"use client";
```

Do not render the editable Tiptap editor on the server.

Store content as JSON in PostgreSQL through Prisma `Json`.

Do not store raw HTML as the source of truth.

## Required components

Create/refine:

```txt
src/components/admin/RichTextEditor.tsx
src/components/admin/RichTextToolbar.tsx
src/components/admin/RichTextRenderer.tsx
src/lib/rich-text/empty-document.ts
src/lib/rich-text/extract-text.ts
```

`RichTextRenderer` may be shared publicly, but must be safe and design-consistent.

## Editor capabilities

Must support:

- paragraph
- H2
- H3
- bold
- italic
- bullet list
- ordered list
- blockquote
- link
- image insertion by MediaAsset
- table
- horizontal rule
- callout block if feasible
- CTA box if feasible

If callout/CTA require too much custom Tiptap work, create them as structured article blocks later. For this phase, support at least blockquote and link/image/table cleanly.

## Admin routes

Create/refine:

```txt
src/app/admin/articles/page.tsx
src/app/admin/articles/new/page.tsx
src/app/admin/articles/[id]/edit/page.tsx
```

## Public routes

Create/refine:

```txt
src/app/blog/page.tsx
src/app/blog/[slug]/page.tsx
```

## Article fields

```txt
title
slug
excerpt
content JSON
authorName
category
tags
heroImageId
status
featuredOnHome
publishedAt
focusKeyword
SEO fields
```

## Admin articles list

- title: “Articole”
- description: “Publică noutăți, ghiduri educaționale și articole SEO.”
- create button: “Adaugă articol”
- columns:
  - title
  - category
  - status
  - publishedAt
  - updatedAt
  - actions
- filters:
  - search
  - status
  - category
  - tag

## Article editor page UX

Use tabs:

1. Conținut
2. Media
3. SEO
4. Setări

Conținut tab:

- title
- slug
- excerpt
- RichTextEditor

Media tab:

- hero image via ImagePicker

SEO tab:

- focusKeyword
- SeoFields
- SeoPreview

Setări tab:

- authorName
- category
- tags
- status
- featuredOnHome
- publishedAt

## SEO helper behavior

Create helper that extracts plain text from Tiptap JSON:

```ts
extractPlainTextFromTiptapJson(content: unknown): string
```

Use it to:

- generate fallback meta description from excerpt/content
- calculate basic content word count in admin
- show a simple content quality hint:
  - missing H2
  - short article
  - missing focus keyword
  - missing image alt

These are hints only, not blockers.

## Public /blog

Requirements:

- show only published articles
- sort by publishedAt desc
- grid/list layout premium but not too decorative
- category filters if categories exist
- article card:
  - image
  - category
  - title
  - excerpt
  - published date
  - “Citește articolul →”

## Public /blog/[slug]

Requirements:

- published articles only
- notFound for drafts
- hero:
  - category
  - title
  - excerpt
  - author/date
  - image
- rich text content:
  - readable width: max 760px
  - high line-height
  - headings elegant
  - links navy/gold
  - tables responsive
- sidebar or end section:
  - related articles based on category/tags
  - CTA “Susține educația prin astronomie”

## Media inside article

When inserting an image:

- choose from Media Library
- insert with URL and alt
- ensure public rendering uses alt
- avoid allowing arbitrary external images in this phase unless explicitly configured

## Deliverables

- Article CRUD
- Tiptap WYSIWYG
- RichTextRenderer
- public blog list/detail
- basic SEO/content hints
- no tests
