# Prompt 07 — Admin Module Placeholder Pages & Handoff

Create placeholder pages for all admin modules so the project owner has a complete CMS map before CRUD work begins.

## Goal

Every admin module route must exist and communicate what will be managed there.

No full CRUD in this phase.

## Placeholder pages to implement

Create/update:

```txt
src/app/(admin-protected)/admin/programe/page.tsx
src/app/(admin-protected)/admin/evenimente/page.tsx
src/app/(admin-protected)/admin/galerie/page.tsx
src/app/(admin-protected)/admin/articole/page.tsx
src/app/(admin-protected)/admin/pagini/page.tsx
src/app/(admin-protected)/admin/doneaza/page.tsx
src/app/(admin-protected)/admin/contact/page.tsx
src/app/(admin-protected)/admin/newsletter/page.tsx
src/app/(admin-protected)/admin/parteneri/page.tsx
src/app/(admin-protected)/admin/testimoniale/page.tsx
src/app/(admin-protected)/admin/media/page.tsx
src/app/(admin-protected)/admin/seo/page.tsx
src/app/(admin-protected)/admin/utilizatori/page.tsx
src/app/(admin-protected)/admin/setari/page.tsx
src/app/(admin-protected)/admin/audit-log/page.tsx
```

Use `ModulePlaceholder` for each.

## Content requirements per page

### Programe

Title: `Programe`
Description: `Administrează programele Star Sim afișate pe site: ateliere, caravane, observații astronomice și educație STEM.`
Primary action: `Adaugă program`

Items:

- titlu, slug și descriere scurtă
- conținut lung WYSIWYG în etapa următoare
- imagine principală și icon
- afișare pe homepage
- SEO per program

### Evenimente

Title: `Evenimente`
Description: `Creează și publică evenimente, date, locații, înscrieri și detalii pentru participanți.`
Primary action: `Adaugă eveniment`

Items:

- dată, oră, locație
- status: ciornă, publicat, anulat, finalizat
- înscrieri participanți
- afișare pe homepage
- Schema Event pentru SEO în etapa următoare

### Galerie

Title: `Galerie`
Description: `Organizează fotografiile în albume, cu cover, descriere și alt text pentru imagini.`
Primary action: `Adaugă album`

Items:

- albume foto
- imagini multiple
- alt text obligatoriu
- asociere opțională cu evenimente/programe
- SEO pentru albume

### Articole

Title: `Articole`
Description: `Publică articole educaționale și noutăți cu editor WYSIWYG și SEO avansat.`
Primary action: `Adaugă articol`

Items:

- titlu, slug, excerpt
- WYSIWYG/Tiptap JSON în etapa următoare
- categorii și tag-uri
- focus keyword
- FAQ blocks și related articles

### Pagini

Title: `Pagini`
Description: `Editează paginile statice și semi-structurate: Despre, Implică-te, Parteneriate, Politici și Termeni.`
Primary action: `Adaugă pagină`

Items:

- conținut editorial
- template per pagină
- status publicare
- SEO per pagină

### Donează

Title: `Donează`
Description: `Administrează conținutul paginii de donații, datele bancare, sumele recomandate și mesajele de impact.`
Primary action: `Editează pagina Donează`

Items:

- IBAN, bancă, titular, CUI
- sume recomandate
- mesaje de impact
- FAQ donații
- SEO donații

### Contact

Title: `Contact`
Description: `Gestionează datele publice de contact și mesajele primite prin formular.`
Primary action: `Vezi mesajele`

Items:

- email, telefon, adresă
- link hartă
- social links
- mesaje contact și status intern
- note interne

### Newsletter

Title: `Newsletter`
Description: `Administrează abonații și sursele de înscriere la newsletter.`
Primary action: `Vezi abonații`

Items:

- abonați activi
- dezabonați
- sursă abonare
- export în etapă viitoare

### Parteneri

Title: `Parteneri`
Description: `Gestionează logo-uri, descrieri și linkuri pentru partenerii Star Sim.`
Primary action: `Adaugă partener`

Items:

- logo partener
- website
- tip parteneriat
- afișare pe homepage
- ordine afișare

### Testimoniale

Title: `Testimoniale`
Description: `Publică citate și recomandări de la profesori, părinți, parteneri și participanți.`
Primary action: `Adaugă testimonial`

Items:

- citat
- autor
- rol/organizație
- imagine opțională
- afișare pe homepage

### Media Library

Title: `Media Library`
Description: `Biblioteca centrală pentru imagini folosite în programe, evenimente, articole și galerie.`
Primary action: `Încarcă media`

Items:

- imagini
- alt text
- caption
- foldere
- reutilizare în conținut

### SEO Center

Title: `SEO Center`
Description: `Monitorizează și optimizează metadatele, imaginile, slug-urile și indexarea conținutului.`
Primary action: `Analizează SEO`

Items:

- pagini fără meta title
- descrieri lipsă
- imagini fără alt text
- slug-uri duplicate
- redirect-uri 301
- preview Google/Open Graph în etapă viitoare

### Utilizatori

Title: `Utilizatori`
Description: `Gestionează utilizatorii admin, editorii și rolurile interne.`
Primary action: `Adaugă utilizator`

Items:

- roluri ADMIN/EDITOR/VOLUNTEER
- status activ/dezactivat
- securitate cont
- audit acțiuni

Access: ADMIN only.

### Setări site

Title: `Setări site`
Description: `Configurează identitatea site-ului, navigația, datele generale și integrările viitoare.`
Primary action: `Editează setările`

Items:

- identitate Star Sim
- social links
- navigație
- setări SEO globale
- integrări viitoare

Access: ADMIN only.

### Audit Log

Title: `Audit Log`
Description: `Urmărește acțiunile importante din admin pentru trasabilitate și securitate.`
Primary action: `Vezi loguri`

Items:

- acțiuni utilizatori
- entitate modificată
- dată și autor
- metadata tehnică

Access: ADMIN only.

## Access control

For ADMIN-only pages:

- if user is not ADMIN, show a clean forbidden state or redirect to `/admin`
- do not expose admin-only actions to EDITOR

## Handoff document

Create:

```txt
docs/etapa-1-handoff.md
```

Include:

```md
# Etapa 1 Handoff — Star Sim

## Implemented

- Next.js project foundation
- Tailwind and base UI components
- Prisma PostgreSQL setup
- CMS schema
- Seed admin
- Auth and protected admin routes
- RBAC helpers
- Admin shell
- Module placeholder pages
- CMS utilities

## Not implemented yet

- public homepage after mockup
- full CRUD modules
- WYSIWYG editor
- media upload
- SEO Center analysis logic
- donation payment integration
- contact form public submission
- newsletter email sending
- sitemap/robots automation

## Next recommended phase

Etapa 2 should implement full CRUD for:

1. Programs
2. Events
3. Media Library minimal upload
4. Articles with WYSIWYG foundation

## Important

No testing framework was configured in this phase.
```

## Completion criteria

All admin module routes exist, display clean placeholder content, respect role visibility, and the project is ready for Etapa 2 CRUD prompts.
