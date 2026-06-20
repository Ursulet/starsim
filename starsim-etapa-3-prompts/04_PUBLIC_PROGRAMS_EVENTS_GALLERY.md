# Prompt 04 — Public Programs, Events and Gallery Pages

You are implementing public dynamic listing/detail pages for Programs, Events and Gallery.

Required files:
- src/app/(public)/programe/page.tsx
- src/app/(public)/programe/[slug]/page.tsx
- src/app/(public)/evenimente/page.tsx
- src/app/(public)/evenimente/[slug]/page.tsx
- src/app/(public)/galerie/page.tsx
- src/app/(public)/galerie/[slug]/page.tsx
- src/lib/queries/programs.ts
- src/lib/queries/events.ts
- src/lib/queries/gallery.ts
- src/components/public/PageHero.tsx
- src/components/public/ProgramDetail.tsx
- src/components/public/EventDetail.tsx
- src/components/public/GalleryGrid.tsx
- src/components/public/ImageLightbox.tsx if simple and lightweight

General visual:
- Maintain Star Sim premium mockup style.
- Page hero: white/ivory section with navy heading, gold eyebrow and optional background decorative stars.
- Use large whitespace.
- Use card grids matching homepage visual language.

Programs index:
- Title: "Programele și proiectele noastre"
- Intro explaining astronomy education and community impact.
- Render all published programs.
- Filters if categories exist:
  all / copii / comunitate / observații / STEM etc.
- Program card same style as homepage but allowed slightly wider.
- CTA band at bottom:
  "Vrei să aducem astronomia în școala sau comunitatea ta?"
  buttons: "Contactează-ne" and "Devino partener"

Program detail:
- Fetch by slug, published only.
- If not found, use notFound().
- Hero:
  title
  excerpt
  image
  CTA: "Solicită acest program" -> /contact?subiect=program&program=<slug>
- Content:
  WYSIWYG long description via RichTextRenderer.
  impact/benefits list if fields exist.
  related events/programs if available.
- Add final CTA:
  "Hai să ducem stelele mai aproape de copii."

Events index:
- Title: "Evenimente"
- Tabs or filters:
  Următoare
  Trecute
- Render upcoming events first.
- Past events should be available but visually quieter.
- Cards use date badge.
- Each card links to detail.

Event detail:
- Fetch by slug, published only.
- Show:
  title
  date/time
  location
  address
  image
  description WYSIWYG
  map link if available
  registration CTA if registrationActive
- CTA:
  "Înscrie-te la eveniment" opens/links to public registration form/section.
- If event is completed, replace CTA with:
  "Vezi galeria evenimentului" if album exists.
- Add structured data hook for Event JSON-LD, but actual SEO implementation can be finalized in Prompt 07.

Gallery index:
- Title: "Momente sub același cer"
- Render published albums.
- Album card:
  cover image
  title
  short description
  image count
  associated event/program if exists
- Use masonry only if simple and stable; otherwise use clean grid.
- No overly complex JS dependencies.

Gallery detail:
- Fetch album by slug.
- Show title, description, cover, image grid.
- Each image must use alt text.
- Lightbox optional only if lightweight.
- If no alt exists, use album title + image order as fallback and leave admin alt-text warning for SEO Center later.
- Include related program/event links if exists.

Data rules:
- All public queries must filter status = published/visible.
- Do not show drafts.
- Order by displayOrder where available, otherwise createdAt desc.
- Use cache/revalidation strategy consistent with project. Prefer server components for data fetching.

Do not include tests.
