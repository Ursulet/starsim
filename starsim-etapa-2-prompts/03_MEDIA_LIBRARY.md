# Prompt 03 — Media Library

You are a senior Next.js engineer implementing a secure admin media library.

## Objective

Build the Star Sim Media Library used by programs, events, gallery albums, articles and SEO images.

Do not implement tests.

## Admin route

Create:

```txt
src/app/admin/media/page.tsx
```

Optional supporting route handler if needed:

```txt
src/app/api/admin/media/upload/route.ts
```

Prefer server actions if already used in the project.

## Storage strategy for this phase

Implement a local storage adapter suitable for Coolify deployment:

```txt
/public/uploads
```

Important:

- Use a clear abstraction so S3/MinIO can be added later.
- Document in code comments that `/public/uploads` must be mapped to a persistent volume in Coolify for production.
- Do not store uploaded binary files in PostgreSQL.

## Utility files

Create:

```txt
src/lib/media/storage.ts
src/lib/media/validation.ts
src/lib/media/metadata.ts
```

## Upload requirements

Allowed image MIME types:

```txt
image/jpeg
image/png
image/webp
image/avif
```

Disallow SVG upload in this phase.

Max file size:

```txt
5MB
```

Filename rules:

- generate safe unique filename
- never trust user filename
- preserve extension based on MIME type
- path format:
  `/uploads/yyyy/mm/generated-name.webp-or-original-extension`

DB record:

```ts
{
  type: "IMAGE",
  url,
  storageKey,
  filename,
  mimeType,
  size,
  width,
  height,
  alt,
  caption,
  credit
}
```

If extracting width/height requires an additional dependency, use a lightweight package or safe fallback. Do not break upload if dimensions cannot be extracted.

## Media admin UI

The page must include:

- page header: “Media Library”
- upload card
- grid of assets
- search by filename/alt/caption
- filter by type, even if only IMAGE is active
- edit asset modal/drawer:
  - alt
  - caption
  - credit
- delete button with confirmation

Visual style:

- consistent with admin shell
- rounded-2xl cards
- subtle border
- no loud colors

## ImagePicker component

Create:

```txt
src/components/admin/ImagePicker.tsx
```

Props:

```ts
type ImagePickerProps = {
  value?: string | null; // MediaAsset id
  onChange: (mediaId: string | null) => void;
  label?: string;
  description?: string;
};
```

Requirements:

- shows selected image preview
- can open media picker modal
- can clear selection
- can upload new image from inside picker or link to Media page
- returns MediaAsset id, not URL

## Security requirements

- upload only for authenticated ADMIN/EDITOR
- validate file size and MIME server-side
- normalize path
- prevent path traversal
- do not allow arbitrary file extensions
- do not expose local filesystem paths to client
- all image fields validated via Zod
- delete should remove DB record and attempt file deletion
- if physical deletion fails, report clear admin error or mark for manual cleanup

## Public rendering

Use `next/image` wherever possible for MediaAsset images.

Every component using an image must receive or derive alt text:

- entity title fallback is acceptable
- empty alt only for decorative images

## Deliverables

- media upload implementation
- MediaAsset CRUD for metadata
- image grid
- ImagePicker reusable component
- storage abstraction
- no tests
