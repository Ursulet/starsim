# Prompt 08 — Responsive Polish, Performance and Handoff

You are doing the Stage 3 final public UI polish and performance pass.

Goal:
Make the public website feel premium, fast and faithful to the mockup across desktop, tablet and mobile.

Scope:
- Public pages only.
- Do not break admin.
- Do not add tests.

Responsive checklist:
- Header:
  desktop nav clean
  tablet no overlap
  mobile drawer works
  donation CTA still accessible
- Hero:
  desktop cinematic composition
  mobile readable, not cramped
  no text over unreadable image
- Card grids:
  4 columns desktop where mockup requires
  2 columns tablet
  1 column mobile
- Footer:
  4 columns desktop
  2 columns tablet
  1 column mobile
- Forms:
  labels clear
  buttons full-width where useful on mobile
- Article content:
  readable line length
  images scale correctly
  tables scroll horizontally if needed

Visual polish:
- Make shadows subtle.
- Keep cards aligned and equal-height where needed.
- Use consistent border radius:
  cards rounded-2xl
  buttons rounded-full or rounded-xl according to context
- Use gold accents sparingly.
- No visual clutter.
- No random gradients beyond hero/dark CTA areas.
- Icons must be consistent.

Animation:
- Add subtle fade-up for section reveal if already implemented simply.
- Hover lift on cards.
- Image scale on card hover.
- Button hover glow/soft transition.
- Respect prefers-reduced-motion.
- Do not add heavy animation dependencies.

Performance:
- Use next/image everywhere.
- Priority only for hero image/logo if needed.
- Lazy load below-fold images.
- Correct sizes attribute.
- Avoid huge unoptimized images.
- Keep decorative stars CSS/SVG lightweight.
- Avoid client components unless interaction requires them.
- Keep public pages mostly server components.
- Use dynamic imports only where beneficial, such as lightbox/editor rendering.
- Avoid unnecessary API calls from client.

Accessibility:
- Semantic landmarks.
- One H1 per page.
- Correct heading hierarchy.
- Alt text for meaningful images.
- Empty alt for decorative assets.
- Keyboard-accessible nav/drawer/lightbox/forms.
- Visible focus states.
- Sufficient contrast.
- Forms have labels and error messages tied to fields.

Content integrity:
- Do not show drafts publicly.
- Do not show empty broken sections.
- If CMS content is missing:
  use elegant empty state
  or hide optional section
- Do not invent production content.

Final handoff:
Create or update a markdown file:
- docs/STAGE_3_PUBLIC_FRONTEND_HANDOFF.md

It must include:
- implemented public routes
- main components created
- data queries used
- required env variables
- CMS fields required for best visual output
- known optional improvements
- deployment notes for Coolify, but do not execute deployment

Do not include tests.
