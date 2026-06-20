# Prompt 05 — Public Articles, Blog and WYSIWYG Rendering

You are implementing the public articles/blog system.

Required files:
- src/app/(public)/articole/page.tsx
- src/app/(public)/articole/[slug]/page.tsx
- src/app/(public)/categorii/[slug]/page.tsx if article categories exist
- src/app/(public)/tag/[slug]/page.tsx if tags exist
- src/lib/queries/articles.ts
- src/components/public/ArticleCard.tsx
- src/components/public/ArticleHeader.tsx
- src/components/public/ArticleContent.tsx
- src/components/public/ArticleSidebar.tsx
- src/components/ui/RichTextRenderer.tsx if not already completed
- src/components/public/FAQBlock.tsx if WYSIWYG supports FAQ

Article index:
- Title: "Articole și resurse"
- Intro:
  "Descoperă povești, ghiduri și resurse despre astronomie, educație STEM și curiozitatea care aprinde visuri."
- Render published articles only.
- Layout:
  featured article at top if featured field exists
  grid/list of articles
  category filter if categories exist
- Article card:
  image
  category
  title
  excerpt
  published date
  reading time if easy to calculate
  link "Citește articolul →"
- Keep premium editorial look, not news portal clutter.

Article detail:
- Fetch published article by slug.
- Use notFound() if missing.
- Header:
  category
  title
  excerpt
  author
  published date
  updated date if relevant
  hero image
- Body:
  render Tiptap content with RichTextRenderer.
  Use a controlled prose style:
    max-width around 760px for reading
    navy headings
    muted body
    gold accents for links
    blockquotes with gold border
    images rounded-2xl
- Sidebar or bottom area:
  related articles
  categories/tags
  donation/partner CTA
- End CTA:
  "Susține educația prin astronomie" -> /doneaza

RichTextRenderer:
- Must support:
  paragraph
  heading h2/h3/h4
  bullet/ordered lists
  bold/italic
  links
  blockquote
  image with caption if available
  callout
  CTA block
  FAQ block
  table if already supported by editor
  horizontal rule
- Do not use dangerouslySetInnerHTML unless content is sanitized and no JSON renderer exists.
- External links:
  target="_blank"
  rel="noopener noreferrer"
- Internal links:
  normal Next Link if possible.
- Add anchor IDs to H2/H3 if possible for future table of contents.

SEO content behavior:
- Article detail must expose enough data for generateMetadata in later prompt or implement it here if architecture is ready.
- Respect article SEO fields:
  metaTitle
  metaDescription
  ogTitle
  ogDescription
  ogImage
  canonicalUrl
  robotsIndex
  robotsFollow
- Article excerpts should be fallback for missing meta description.

Editorial conversion:
- Do not make articles only informational.
- Add subtle CTA block after article:
  donation / volunteer / partner, depending article category if available.
- CTA must not feel aggressive.

Do not include tests.
