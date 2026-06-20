export type AdminContentType =
  | "programe"
  | "evenimente"
  | "galerie"
  | "articole"
  | "parteneri"
  | "testimoniale"
  | "media"
  | "utilizatori";

export type AdminField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "datetime" | "checkbox" | "select" | "password";
  required?: boolean;
  options?: { label: string; value: string }[];
  rows?: number;
  placeholder?: string;
  help?: string;
};

const publishStatusOptions = [
  { label: "Ciornă", value: "DRAFT" },
  { label: "Publicat", value: "PUBLISHED" },
  { label: "Arhivat", value: "ARCHIVED" }
];

const eventStatusOptions = [
  { label: "Ciornă", value: "DRAFT" },
  { label: "Publicat", value: "PUBLISHED" },
  { label: "Anulat", value: "CANCELLED" },
  { label: "Finalizat", value: "COMPLETED" }
];

export const adminContentModules: Record<
  AdminContentType,
  {
    title: string;
    description: string;
    basePath: string;
    publicBasePath?: string;
    newLabel: string;
    fields: AdminField[];
  }
> = {
  programe: {
    title: "Programe",
    description: "Creează și editează programele publice afișate pe site și pe prima pagină.",
    basePath: "/admin/programe",
    publicBasePath: "/programe",
    newLabel: "Adaugă program",
    fields: [
      { name: "title", label: "Titlu", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", placeholder: "se generează din titlu dacă îl lași gol" },
      { name: "excerpt", label: "Descriere scurtă", type: "textarea", required: true, rows: 3 },
      { name: "body", label: "Conținut", type: "textarea", rows: 8 },
      { name: "category", label: "Categorie", type: "text" },
      { name: "icon", label: "Icon", type: "text", placeholder: "graduation, telescope, bus, atom" },
      { name: "ctaLabel", label: "Text buton", type: "text" },
      { name: "ctaHref", label: "Link buton", type: "text" },
      { name: "status", label: "Status", type: "select", options: publishStatusOptions },
      { name: "featuredOnHome", label: "Afișează pe prima pagina", type: "checkbox" },
      { name: "sortOrder", label: "Ordine", type: "number" },
      { name: "metaTitle", label: "Meta title", type: "text" },
      { name: "metaDescription", label: "Meta description", type: "textarea", rows: 3 }
    ]
  },
  evenimente: {
    title: "Evenimente",
    description: "Creează evenimente, date, locații și linkuri de înscriere.",
    basePath: "/admin/evenimente",
    publicBasePath: "/evenimente",
    newLabel: "Adaugă eveniment",
    fields: [
      { name: "title", label: "Titlu", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "excerpt", label: "Descriere scurtă", type: "textarea", required: true, rows: 3 },
      { name: "body", label: "Conținut", type: "textarea", rows: 8 },
      { name: "startsAt", label: "Incepe la", type: "datetime", required: true },
      { name: "endsAt", label: "Se termina la", type: "datetime" },
      { name: "locationName", label: "Locație", type: "text", required: true },
      { name: "address", label: "Adresă", type: "text" },
      { name: "city", label: "Oraș", type: "text" },
      { name: "mapUrl", label: "Link harta", type: "text" },
      { name: "maxParticipants", label: "Număr maxim participanți", type: "number" },
      { name: "registrationEnabled", label: "Înscrieri active", type: "checkbox" },
      { name: "registrationUrl", label: "Link înscriere", type: "text" },
      { name: "status", label: "Status", type: "select", options: eventStatusOptions },
      { name: "featuredOnHome", label: "Afișează pe prima pagina", type: "checkbox" },
      { name: "sortOrder", label: "Ordine", type: "number" },
      { name: "metaTitle", label: "Meta title", type: "text" },
      { name: "metaDescription", label: "Meta description", type: "textarea", rows: 3 }
    ]
  },
  galerie: {
    title: "Galerie",
    description: "Creează albume foto publice. Imaginile pot fi atașate ulterior din media library.",
    basePath: "/admin/galerie",
    publicBasePath: "/galerie",
    newLabel: "Adaugă album",
    fields: [
      { name: "title", label: "Titlu", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "description", label: "Descriere", type: "textarea", rows: 4 },
      { name: "body", label: "Conținut", type: "textarea", rows: 8 },
      { name: "status", label: "Status", type: "select", options: publishStatusOptions },
      { name: "featuredOnHome", label: "Afișează pe prima pagina", type: "checkbox" },
      { name: "sortOrder", label: "Ordine", type: "number" },
      { name: "metaTitle", label: "Meta title", type: "text" },
      { name: "metaDescription", label: "Meta description", type: "textarea", rows: 3 }
    ]
  },
  articole: {
    title: "Articole",
    description: "Publică articole și noutăți educaționale.",
    basePath: "/admin/articole",
    publicBasePath: "/articole",
    newLabel: "Adaugă articol",
    fields: [
      { name: "title", label: "Titlu", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "excerpt", label: "Descriere scurtă", type: "textarea", required: true, rows: 3 },
      { name: "body", label: "Conținut", type: "textarea", rows: 10 },
      { name: "authorName", label: "Autor", type: "text" },
      { name: "category", label: "Categorie", type: "text" },
      { name: "tags", label: "Tag-uri", type: "text", placeholder: "astronomie, copii, educație" },
      { name: "status", label: "Status", type: "select", options: publishStatusOptions },
      { name: "featuredOnHome", label: "Afișează pe prima pagina", type: "checkbox" },
      { name: "focusKeyword", label: "Focus keyword", type: "text" },
      { name: "metaTitle", label: "Meta title", type: "text" },
      { name: "metaDescription", label: "Meta description", type: "textarea", rows: 3 }
    ]
  },
  parteneri: {
    title: "Parteneri",
    description: "Gestionează partenerii și sponsorii Star Sim.",
    basePath: "/admin/parteneri",
    newLabel: "Adaugă partener",
    fields: [
      { name: "name", label: "Nume", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "description", label: "Descriere", type: "textarea", rows: 4 },
      { name: "website", label: "Website", type: "text" },
      { name: "type", label: "Tip parteneriat", type: "text" },
      { name: "status", label: "Status", type: "select", options: publishStatusOptions },
      { name: "featuredOnHome", label: "Afișează pe prima pagina", type: "checkbox" },
      { name: "sortOrder", label: "Ordine", type: "number" }
    ]
  },
  testimoniale: {
    title: "Testimoniale",
    description: "Publică recomandări de la profesori, părinți, parteneri sau participanți.",
    basePath: "/admin/testimoniale",
    newLabel: "Adaugă testimonial",
    fields: [
      { name: "quote", label: "Citat", type: "textarea", required: true, rows: 5 },
      { name: "authorName", label: "Autor", type: "text", required: true },
      { name: "authorRole", label: "Rol autor", type: "text" },
      { name: "organization", label: "Organizatie", type: "text" },
      { name: "status", label: "Status", type: "select", options: publishStatusOptions },
      { name: "featuredOnHome", label: "Afișează pe prima pagina", type: "checkbox" },
      { name: "sortOrder", label: "Ordine", type: "number" }
    ]
  },
  media: {
    title: "Media Library",
    description: "Adaugă manual asset-uri media prin URL. Upload-ul fizic poate fi conectat ulterior la volum persistent.",
    basePath: "/admin/media",
    newLabel: "Adaugă media",
    fields: [
      { name: "filename", label: "Nume fișier", type: "text", required: true },
      { name: "url", label: "URL", type: "text", required: true },
      { name: "mimeType", label: "MIME type", type: "text", required: true, placeholder: "image/jpeg" },
      { name: "type", label: "Tip", type: "select", options: [{ label: "Imagine", value: "IMAGE" }, { label: "Video", value: "VIDEO" }, { label: "Document", value: "DOCUMENT" }] },
      { name: "alt", label: "Alt text", type: "text" },
      { name: "caption", label: "Caption", type: "text" },
      { name: "credit", label: "Credit", type: "text" },
      { name: "folder", label: "Folder", type: "text" },
      { name: "size", label: "Dimensiune bytes", type: "number" },
      { name: "width", label: "Lățime", type: "number" },
      { name: "height", label: "Înălțime", type: "number" }
    ]
  },
  utilizatori: {
    title: "Utilizatori",
    description: "Gestionează conturile care pot intra în admin.",
    basePath: "/admin/utilizatori",
    newLabel: "Adaugă utilizator",
    fields: [
      { name: "name", label: "Nume", type: "text", required: true },
      { name: "email", label: "Email", type: "text", required: true },
      { name: "password", label: "Parolă", type: "password", help: "La editare, lasă gol dacă nu vrei să schimbi parola." },
      { name: "role", label: "Rol", type: "select", options: [{ label: "Admin", value: "ADMIN" }, { label: "Editor", value: "EDITOR" }, { label: "Voluntar", value: "VOLUNTEER" }] },
      { name: "status", label: "Status", type: "select", options: [{ label: "Activ", value: "ACTIVE" }, { label: "Dezactivat", value: "DISABLED" }] }
    ]
  }
};
