# Prompt 03 — Homepage Mockup Fidelity with Dynamic CMS Data

You are building the public homepage. The design must match the supplied mockup as closely as possible.

Required files:
- src/app/(public)/page.tsx or src/app/page.tsx depending project structure
- src/components/home/HeroSection.tsx
- src/components/home/MissionSection.tsx
- src/components/home/ProgramsSection.tsx
- src/components/home/EventsSection.tsx
- src/components/home/ContributionSection.tsx
- src/components/cards/MissionCard.tsx
- src/components/cards/ProgramCard.tsx
- src/components/cards/EventCard.tsx
- src/components/cards/ContributionCard.tsx
- src/lib/queries/home.ts

Homepage order:
1. PublicHeader from layout
2. HeroSection
3. MissionSection
4. ProgramsSection
5. EventsSection
6. ContributionSection
7. PublicFooter from layout

Do not add Gallery or Contact sections to the homepage.
Do not add "latest articles" to homepage unless explicitly approved later.
This phase must preserve homepage clarity.

Data source:
Create queries in src/lib/queries/home.ts:
- getHomepagePrograms()
  returns published programs where showOnHomepage = true, ordered by displayOrder ascending, limit 4.
- getHomepageEvents()
  returns published upcoming events where showOnHomepage = true, ordered by startsAt ascending, limit 4.
- getDonationSettings()
  returns active donation content/settings.
- getSiteSettings()
  returns logo, contact, social, etc.
Use Prisma.
Add safe fallbacks only to prevent development crash.

HeroSection:
- Visual direction:
  left text, right/behind cinematic astronomy image with children/telescope/stars.
- Text:
  Brand/title: "Star Sim"
  Tagline: "De la o stea, la un vis"
  Paragraph:
  "Aducem astronomia mai aproape de copii și comunități, pentru a transforma curiozitatea de azi în visurile de mâine."
- CTA:
  "Descoperă programele" -> /programe
  "Susține asociația" -> /doneaza
- Add left-to-right white gradient overlay if using background image.
- Add subtle gold decorative stars.
- Add curved/wave bottom transition matching mockup.
- Desktop min-height approx 620px.
- Mobile: text first, image remains atmospheric, no text over unreadable image.

MissionSection:
- Title: "Misiunea noastră"
- Subtitle: "Inspirăm curiozitatea. Împărtășim cunoașterea. Construim visuri."
- Three fixed mission cards:
  1. Educație
  2. Nopți de observații
  3. Comunitate
- Use icons in circular navy/gold containers.
- Grid 3 columns desktop, 1 column mobile.
- Cards white, border #E7E0D2, rounded-2xl, soft shadow.

ProgramsSection:
- Title: "Programele și proiectele noastre"
- Render dynamic programs from CMS.
- If fewer than 4, show available only; do not invent content in production.
- Card:
  image top
  overlapping icon
  title
  excerpt
  link "Află mai multe →"
- Desktop 4 columns, tablet 2, mobile 1.
- Hover:
  card translateY(-4px)
  shadow stronger
  image scale 1.04
- Use next/image.

EventsSection:
- Title: "Următoarele evenimente"
- Render dynamic upcoming events.
- Card:
  image top
  date badge with day/month
  title
  date/time row
  location row
  link "Detalii eveniment →"
- Add centered CTA: "Vezi toate evenimentele →" -> /evenimente.
- If no events, show elegant empty state:
  "Pregătim următoarele evenimente sub cerul înstelat."
  CTA: "Urmărește-ne pentru noutăți"
- Keep empty state premium.

ContributionSection:
- Dark navy #061B3D with subtle star field.
- Title: "Fiecare gest contează"
- Subtitle: "Împreună putem duce astronomia mai departe."
- Three cards:
  Susține-ne -> /doneaza
  Fii voluntar -> /implica-te
  Parteneriate -> /parteneriate or /implica-te#parteneriate if no route exists
- Card layout follows mockup.
- CTA copy can come from DonationSettings if implemented, but layout remains fixed.

Performance:
- Above-the-fold hero image priority.
- Use responsive image sizes.
- Avoid layout shift.

Animations:
- Subtle fade-up section entrance.
- Button hover glow.
- Respect prefers-reduced-motion.
- Do not add heavy animation libraries unless already present.

Do not include tests.
