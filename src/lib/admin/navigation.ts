export const adminNavigation = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Programe", href: "/admin/programe", icon: "Rocket" },
  { label: "Evenimente", href: "/admin/evenimente", icon: "CalendarDays" },
  { label: "Galerie", href: "/admin/galerie", icon: "Images" },
  { label: "Articole", href: "/admin/articole", icon: "FileText" },
  { label: "Pagini", href: "/admin/pagini", icon: "PanelsTopLeft" },
  { label: "Media Library", href: "/admin/media", icon: "Image" },
  { label: "Doneaza", href: "/admin/doneaza", icon: "HeartHandshake" },
  { label: "Contact", href: "/admin/contact", icon: "Mail" },
  { label: "Mesaje", href: "/admin/contact/messages", icon: "Inbox" },
  { label: "Newsletter", href: "/admin/newsletter", icon: "Send" },
  { label: "Parteneri", href: "/admin/parteneri", icon: "Handshake" },
  { label: "Testimoniale", href: "/admin/testimoniale", icon: "Quote" },
  { label: "SEO Center", href: "/admin/seo", icon: "Search" },
  { label: "Utilizatori", href: "/admin/utilizatori", icon: "Users", adminOnly: true },
  { label: "Setari site", href: "/admin/setari", icon: "Settings", adminOnly: true },
  { label: "Audit Log", href: "/admin/audit-log", icon: "ShieldCheck", adminOnly: true }
] as const;
