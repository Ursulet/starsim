# Star Sim — Etapa 2 Prompts

## Scop Etapa 2

Etapa 2 transformă fundația din Etapa 1 într-un CMS administrabil real pentru Star Sim:

- CRUD complet pentru Programe
- CRUD complet pentru Evenimente
- Media Library pentru imagini
- Galerie pe albume
- Articole cu WYSIWYG
- Setări Donează
- Setări Contact + mesaje primite
- SEO fields + preview + metadata dinamic
- Legare controlată a homepage-ului la date reale din PostgreSQL

## Presupunere

Etapa 1 este deja implementată:

- Next.js App Router + TypeScript + Tailwind
- Prisma + PostgreSQL
- Admin auth + RBAC
- Layout admin
- Modele de bază sau placeholder pentru CMS
- Coolify-ready environment

Dacă ceva lipsește din Etapa 1, Developer Agent trebuie să completeze strict ce e necesar pentru Etapa 2, fără să rescrie inutil proiectul.

## Reguli importante

1. Nu adăuga teste unitare, teste e2e, Vitest, Jest, Playwright sau Cypress.
2. Nu schimba direcția vizuală publică din mockup.
3. Nu transforma homepage-ul într-un WYSIWYG liber.
4. Folosește câmpuri structurate pentru homepage, programe, evenimente, galerie, donații și contact.
5. Folosește WYSIWYG doar pentru articole și descrieri lungi.
6. Toate formularele admin trebuie validate server-side.
7. Toate paginile publice trebuie să afișeze doar conținut publicat.
8. Toate imaginile publice trebuie să aibă `alt`.
9. Nu folosi date hardcodate în frontend public acolo unde există model CMS.
10. Lucrează incremental: un modul complet funcțional înainte de următorul.

## Ordine recomandată

1. `01_SHARED_ADMIN_PATTERNS.md`
2. `02_PRISMA_REFINEMENT.md`
3. `03_MEDIA_LIBRARY.md`
4. `04_PROGRAMS_CRUD.md`
5. `05_EVENTS_CRUD.md`
6. `06_GALLERY_CRUD.md`
7. `07_ARTICLES_WYSIWYG.md`
8. `08_DONATION_CONTACT_ADMIN.md`
9. `09_SEO_METADATA.md`
10. `10_PUBLIC_DYNAMIC_BINDING.md`
11. `11_FINAL_HARDENING_NO_TESTS.md`
