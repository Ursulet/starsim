# Prompt 02 — Public Layout, Header, Footer and Mobile Navigation

You are implementing the public layout for Star Sim.

Required files:
- src/app/(public)/layout.tsx if route groups are already used, otherwise integrate into src/app/layout.tsx safely
- src/components/layout/PublicHeader.tsx
- src/components/layout/PublicFooter.tsx
- src/components/layout/MobileNav.tsx
- src/components/layout/PublicShell.tsx
- src/lib/navigation.ts

Do not break /admin routes.

Routing architecture:
Use a route group if suitable:
- src/app/(public)/page.tsx
- src/app/(public)/programe/page.tsx
- src/app/(public)/programe/[slug]/page.tsx
- etc.
Keep admin routes isolated:
- src/app/admin/...

Header requirements:
- Sticky top header.
- White background.
- Subtle border-bottom #E7E0D2 and/or shadow.
- Desktop height approx 82–88px.
- Left: Star Sim logo.
- Navigation:
  Acasă
  Despre
  Programe
  Evenimente
  Galerie
  Articole
  Implică-te
  Contact
- Right CTA: "Donează" with heart icon or subtle symbol.
- Active route indicator: small gold underline/dot.
- CTA styling:
  background #061B3D
  text white
  hover gold accent
- Header must feel like the mockup, not SaaS dashboard.

Mobile header:
- Logo left.
- Donation CTA visible if space allows.
- Hamburger opens mobile panel/drawer.
- Mobile nav links large enough to tap.
- Include social/contact mini row in drawer.
- Body scroll locking if drawer is open.
- ESC closes menu if easy to implement.
- Focus states visible.

Footer requirements:
- Dark navy background #061B3D.
- Four columns:
  1. Logo + short Star Sim description.
  2. Contact.
  3. Navigare rapidă.
  4. Newsletter + social links.
- Newsletter form should call the public newsletter server action/API route if it exists; otherwise create it in Stage 3 prompt 06.
- Legal bottom bar:
  © current year Star Sim – De la o stea, la un vis. Toate drepturile rezervate.
  Politica de confidențialitate
  Termeni și condiții
- Footer should not be oversized.
- Use white text with muted light text, gold accents.

Layout requirements:
- Main content starts under sticky header correctly.
- Public shell supports breadcrumbs where needed.
- Admin layout remains separate.

Do not include tests.
