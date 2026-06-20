# Prompt 07 — Public SEO Metadata, Sitemap, Robots and Structured Data

You are implementing public SEO rendering for Star Sim.

Required files:
- src/lib/seo.ts
- src/lib/schema.ts
- src/app/sitemap.ts
- src/app/robots.ts
- generateMetadata functions for:
  homepage
  programe index
  programe detail
  evenimente index
  evenimente detail
  galerie index
  galerie detail
  articole index
  articole detail
  doneaza
  contact
  despre
  implica-te/parteneriate if available
- src/components/seo/JsonLd.tsx
- src/components/public/BreadcrumbJsonLd.tsx if useful

SEO goals:
Star Sim must rank for Romanian intent queries around:
- astronomie pentru copii
- ateliere astronomie copii
- observații astronomice
- evenimente astronomie
- educație STEM copii
- ONG educație copii
- caravana stelelor
- activități educaționale copii

Metadata rules:
For each public page, implement:
- title
- description
- canonical URL
- robots
- Open Graph
- Twitter card if suitable
- OG image fallback from SiteSettings
- noindex for drafts/private routes
- published/updated time for articles/events where applicable

Fallback hierarchy:
For dynamic pages:
- metaTitle fallback to page/entity title
- metaDescription fallback to excerpt/shortDescription
- ogTitle fallback to metaTitle/title
- ogDescription fallback to metaDescription
- ogImage fallback to hero/main image, then site default OG image
- canonical fallback to absolute route URL

Use environment:
- NEXT_PUBLIC_SITE_URL
Do not hardcode production domain except as fallback comment.

Structured data:
Homepage:
- Organization JSON-LD
- WebSite JSON-LD

Articles:
- Article or BlogPosting JSON-LD:
  headline
  description
  image
  author
  publisher
  datePublished
  dateModified
  mainEntityOfPage

Events:
- Event JSON-LD:
  name
  description
  image
  startDate
  endDate if available
  eventStatus
  eventAttendanceMode
  location
  organizer

Breadcrumbs:
- Add BreadcrumbList JSON-LD for detail pages:
  Programe > Program
  Evenimente > Event
  Galerie > Album
  Articole > Article

Sitemap:
- Include static public routes.
- Include published programs.
- Include published events.
- Include published gallery albums.
- Include published articles.
- Exclude admin and drafts.
- Set lastModified where available.
- Set changeFrequency and priority reasonably:
  homepage high
  articles/events/programs medium
  legal lower

Robots:
- Allow public.
- Disallow /admin
- Disallow private/API routes if suitable.
- Link sitemap.

SEO UI:
- Do not add visible clutter to public pages.
- SEO work must be invisible except breadcrumbs and content quality.

Do not include tests.
