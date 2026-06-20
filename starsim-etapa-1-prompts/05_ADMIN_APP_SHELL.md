# Prompt 05 — Admin App Shell & Navigation

Build the protected admin shell for Star Sim.

## Goal

Create a clean admin layout that will support all future CMS modules.

This is not the public website design. It is a professional internal admin panel.

## Protected admin layout

Implement:

```txt
src/app/(admin-protected)/admin/layout.tsx
```

Requirements:

- call `requireAdminUser()`
- render `AdminShell`
- include sidebar and top header
- responsive behavior:
  - desktop: fixed sidebar, content area
  - mobile: collapsible navigation or simple top navigation drawer
- use neutral admin background `#F8FAFC`

## Components

Implement:

```txt
src/components/admin/AdminShell.tsx
src/components/admin/AdminSidebar.tsx
src/components/admin/AdminHeader.tsx
src/components/admin/AdminStatCard.tsx
src/components/admin/ModulePlaceholder.tsx
src/components/admin/StatusBadge.tsx
```

## Navigation config

Create `src/lib/admin/navigation.ts`.

Navigation items:

```ts
[
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Programe", href: "/admin/programe", icon: "Rocket" },
  { label: "Evenimente", href: "/admin/evenimente", icon: "CalendarDays" },
  { label: "Galerie", href: "/admin/galerie", icon: "Images" },
  { label: "Articole", href: "/admin/articole", icon: "FileText" },
  { label: "Pagini", href: "/admin/pagini", icon: "PanelsTopLeft" },
  { label: "Donează", href: "/admin/doneaza", icon: "HeartHandshake" },
  { label: "Contact", href: "/admin/contact", icon: "Mail" },
  { label: "Newsletter", href: "/admin/newsletter", icon: "Send" },
  { label: "Parteneri", href: "/admin/parteneri", icon: "Handshake" },
  { label: "Testimoniale", href: "/admin/testimoniale", icon: "Quote" },
  { label: "Media Library", href: "/admin/media", icon: "Image" },
  { label: "SEO Center", href: "/admin/seo", icon: "Search" },
  { label: "Utilizatori", href: "/admin/utilizatori", icon: "Users", adminOnly: true },
  { label: "Setări site", href: "/admin/setari", icon: "Settings", adminOnly: true },
  { label: "Audit Log", href: "/admin/audit-log", icon: "ShieldCheck", adminOnly: true }
]
```

Use `lucide-react` icons.

Hide `adminOnly` items from non-ADMIN users.

## AdminShell visual requirements

Desktop:

- sidebar width: `280px`
- sidebar background: `#061B3D`
- sidebar text: white with muted opacity
- active item:
  - background: rgba gold/white subtle
  - left gold border or gold dot
  - text white
- brand at top:
  - `Star Sim`
  - small subtitle `Admin CMS`
- bottom user area:
  - name
  - role badge
  - logout button

Main:

- top header height: about `72px`
- header white, border bottom
- show current page title
- show quick action placeholder button: `Creează`
- content padding: `p-6 lg:p-8`

## Dashboard page

Implement:

```txt
src/app/(admin-protected)/admin/page.tsx
```

Content:

- title: `Dashboard`
- subtitle: `Privire de ansamblu asupra platformei Star Sim.`
- stat cards for:
  - Programe
  - Evenimente
  - Articole
  - Mesaje contact
  - Abonați newsletter
  - Imagini media

Use Prisma counts if schema exists. If database is not available at runtime, fail gracefully with zeros or a clear admin message.

Add a section called `Priorități etapă curentă` with static cards:

- Configurează conținutul
- Pregătește SEO
- Publică primele evenimente

## Module placeholder component

`ModulePlaceholder` should accept:

```ts
title
description
primaryActionLabel
primaryActionHref
items?: string[]
```

Use it for all module pages in the next prompt.

## Accessibility

- navigation links must be semantic anchors
- active state must not rely on color alone
- buttons must have visible labels
- logout must be accessible

## Completion criteria

Authenticated admin users see a polished internal admin shell with sidebar, header, dashboard and role-aware navigation.
