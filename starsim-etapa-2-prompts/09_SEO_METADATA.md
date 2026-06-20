# Prompt 09 — SEO Metadata System

You are a senior Next.js SEO engineer.

## Objective

Implement robust SEO metadata for Star Sim public pages and CMS entities.

Do not implement tests.

## Scope

Apply SEO to:

- homepage
- programe
- programe/[slug]
- evenimente
- evenimente/[slug]
- galerie
- galerie/[slug]
- blog
- blog/[slug]
- doneaza
- contact

## Helper files

Create/refine:

```txt
src/lib/seo/metadata.ts
src/lib/seo/json-ld.ts
src/lib/seo/defaults.ts
src/components/admin/SeoFields.tsx
src/components/admin/SeoPreview.tsx
```

## Default SEO config

Create default values:

```ts
export const siteSeoDefaults = {
  siteName: "Star Sim",
  titleTemplate: "%s | Star Sim",
  defaultTitle: "Star Sim — De la o stea, la un vis",
  defaultDescription:
    "Star Sim aduce astronomia mai aproape de copii și comunități prin ateliere, observații astronomice și programe educaționale STEM.",
  locale: "ro_RO",
};
```

## Metadata builder

Implement helper:

```ts
type SeoInput = {
  title?: string | null;
  description?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImageUrl?: string | null;
  canonicalUrl?: string | null;
  robotsIndex?: boolean | null;
  robotsFollow?: boolean | null;
  path?: string;
};

export function buildMetadata(input: SeoInput): Metadata
```

Rules:

- metaTitle overrides title
- metaDescription overrides description
- OG falls back to meta values
- robots reflect booleans
- canonical URL included when available
- no raw URLs hardcoded in many places; derive base from environment:
  `NEXT_PUBLIC_SITE_URL`

## generateMetadata

For every dynamic public detail page, implement:

```ts
export async function generateMetadata({ params }): Promise<Metadata>
```

Use Prisma to fetch only required fields.

If entity is not published, use notFound behavior in page and safe noindex where needed.

## JSON-LD

Create components/helpers for:

### Organization

Use on global layout or homepage:

```ts
{
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "Star Sim",
  "url": siteUrl,
  "logo": logoUrl,
  "sameAs": socialLinks
}
```

### Article

On blog detail:

```ts
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.excerpt,
  "image": imageUrl,
  "datePublished": article.publishedAt,
  "dateModified": article.updatedAt,
  "author": {
    "@type": "Person",
    "name": article.authorName || "Star Sim"
  }
}
```

### Event

On event detail:

```ts
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": event.title,
  "description": event.excerpt,
  "startDate": event.startsAt,
  "endDate": event.endsAt,
  "eventStatus": derivedStatus,
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": event.locationName,
    "address": event.address
  }
}
```

## Admin SEO Center

Create/refine:

```txt
src/app/admin/seo/page.tsx
```

Display grouped panels:

- Pages/entities missing meta title
- Pages/entities missing meta description
- Images missing alt text
- Articles missing focus keyword
- Published entities with no OG image
- Drafts ready for review, based on complete content but not published

This page is a dashboard only. It links to edit pages. Do not build complex automated scoring.

## Sitemap and robots

Create/refine:

```txt
src/app/sitemap.ts
src/app/robots.ts
```

Sitemap includes only published:

- static routes
- programs
- events
- gallery albums
- articles

Robots:

- allow public site
- disallow `/admin`
- use `NEXT_PUBLIC_SITE_URL` for sitemap URL

## Deliverables

- central metadata builder
- generateMetadata on public routes
- JSON-LD helpers
- SEO Center dashboard
- sitemap.ts
- robots.ts
- no tests
