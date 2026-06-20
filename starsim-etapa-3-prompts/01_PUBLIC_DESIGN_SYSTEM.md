# Prompt 01 — Public Design System and Global Styling

You are implementing the public Star Sim design system.

Goal:
Create a coherent premium design foundation matching the mockup and usable across all public pages.

Required files:
- src/app/globals.css
- src/lib/design-tokens.ts
- src/components/ui/Container.tsx
- src/components/ui/SectionHeading.tsx
- src/components/ui/PublicButton.tsx
- src/components/ui/Badge.tsx
- src/components/ui/Breadcrumbs.tsx
- src/components/ui/EmptyState.tsx
- src/components/ui/RichTextRenderer.tsx
- src/components/ui/StarField.tsx or similar subtle decorative component

Tailwind/global requirements:
- Use CSS variables for colors.
- Add base body styling:
  background #FFFFFF
  text #10213F
  font-smoothing antialiased
- Add selection styling with navy/gold.
- Define reusable utility classes for:
  .section-padding
  .premium-card
  .gold-gradient
  .navy-gradient
  .focus-ring
  .text-balance if supported
- No aggressive global animations.

Container:
- max-width 1180px or 1200px
- horizontal padding:
  mobile px-5
  tablet px-6
  desktop px-8
- centered

SectionHeading:
Props:
- eyebrow?: string
- title: string
- subtitle?: string
- align?: "left" | "center"
- className?: string
Visual:
- optional small gold decorative star/line
- title uses heading font
- subtitle muted
- center alignment for homepage sections

PublicButton:
Variants:
- primary: navy background, white text, gold hover accent
- gold: gold background, navy text
- outline: transparent/white border, navy or white context-aware
- ghost: text link style
Sizes:
- sm, md, lg
Requirements:
- accessible focus
- no layout jump on hover
- supports href and button behavior
- rounded-full or rounded-xl depending context; homepage CTA should match mockup with rounded-full

Badge:
Variants:
- gold
- navy
- light
- status
Use for dates, categories, tags.

RichTextRenderer:
Input:
- Tiptap JSON/content structure used by the CMS
Output:
- Styled article content using premium prose rules.
- Render H2/H3, paragraphs, lists, blockquote, image, callout, CTA block, FAQ block, table if supported.
- Do not render unsafe HTML directly.
- If project currently stores HTML, sanitize before rendering and add a TODO comment to migrate to JSON.

StarField:
- Lightweight decorative component.
- CSS-only or SVG.
- Used in hero/dark CTA areas.
- Must not reduce performance.
- Must respect prefers-reduced-motion.

Do not include tests.
