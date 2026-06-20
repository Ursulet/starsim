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
  { label: "Ciorna", value: "DRAFT" },
  { label: "Publicat", value: "PUBLISHED" },
  { label: "Arhivat", value: "ARCHIVED" }
];

const eventStatusOptions = [
  { label: "Ciorna", value: "DRAFT" },
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
    description: "Creeaza si editeaza programele publice afisate pe site si pe prima pagina.",
    basePath: "/admin/programe",
    publicBasePath: "/programe",
    newLabel: "Adauga program",
    fields: [
      { name: "title", label: "Titlu", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", placeholder: "se genereaza din titlu daca il lasi gol" },
      { name: "excerpt", label: "Descriere scurta", type: "textarea", required: true, rows: 3 },
      { name: "body", label: "Continut", type: "textarea", rows: 8 },
      { name: "category", label: "Categorie", type: "text" },
      { name: "icon", label: "Icon", type: "text", placeholder: "graduation, telescope, bus, atom" },
      { name: "ctaLabel", label: "Text buton", type: "text" },
      { name: "ctaHref", label: "Link buton", type: "text" },
      { name: "status", label: "Status", type: "select", options: publishStatusOptions },
      { name: "featuredOnHome", label: "Afiseaza pe prima pagina", type: "checkbox" },
      { name: "sortOrder", label: "Ordine", type: "number" },
      { name: "metaTitle", label: "Meta title", type: "text" },
      { name: "metaDescription", label: "Meta description", type: "textarea", rows: 3 }
    ]
  },
  evenimente: {
    title: "Evenimente",
    description: "Creeaza evenimente, date, locatii si linkuri de inscriere.",
    basePath: "/admin/evenimente",
    publicBasePath: "/evenimente",
    newLabel: "Adauga eveniment",
    fields: [
      { name: "title", label: "Titlu", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "excerpt", label: "Descriere scurta", type: "textarea", required: true, rows: 3 },
      { name: "body", label: "Continut", type: "textarea", rows: 8 },
      { name: "startsAt", label: "Incepe la", type: "datetime", required: true },
      { name: "endsAt", label: "Se termina la", type: "datetime" },
      { name: "locationName", label: "Locatie", type: "text", required: true },
      { name: "address", label: "Adresa", type: "text" },
      { name: "city", label: "Oras", type: "text" },
      { name: "mapUrl", label: "Link harta", type: "text" },
      { name: "maxParticipants", label: "Numar maxim participanti", type: "number" },
      { name: "registrationEnabled", label: "Inscrieri active", type: "checkbox" },
      { name: "registrationUrl", label: "Link inscriere", type: "text" },
      { name: "status", label: "Status", type: "select", options: eventStatusOptions },
      { name: "featuredOnHome", label: "Afiseaza pe prima pagina", type: "checkbox" },
      { name: "sortOrder", label: "Ordine", type: "number" },
      { name: "metaTitle", label: "Meta title", type: "text" },
      { name: "metaDescription", label: "Meta description", type: "textarea", rows: 3 }
    ]
  },
  galerie: {
    title: "Galerie",
    description: "Creeaza albume foto publice. Imaginile pot fi atasate ulterior din media library.",
    basePath: "/admin/galerie",
    publicBasePath: "/galerie",
    newLabel: "Adauga album",
    fields: [
      { name: "title", label: "Titlu", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "description", label: "Descriere", type: "textarea", rows: 4 },
      { name: "body", label: "Continut", type: "textarea", rows: 8 },
      { name: "status", label: "Status", type: "select", options: publishStatusOptions },
      { name: "featuredOnHome", label: "Afiseaza pe prima pagina", type: "checkbox" },
      { name: "sortOrder", label: "Ordine", type: "number" },
      { name: "metaTitle", label: "Meta title", type: "text" },
      { name: "metaDescription", label: "Meta description", type: "textarea", rows: 3 }
    ]
  },
  articole: {
    title: "Articole",
    description: "Publica articole si noutati educationale.",
    basePath: "/admin/articole",
    publicBasePath: "/articole",
    newLabel: "Adauga articol",
    fields: [
      { name: "title", label: "Titlu", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "excerpt", label: "Descriere scurta", type: "textarea", required: true, rows: 3 },
      { name: "body", label: "Continut", type: "textarea", rows: 10 },
      { name: "authorName", label: "Autor", type: "text" },
      { name: "category", label: "Categorie", type: "text" },
      { name: "tags", label: "Tag-uri", type: "text", placeholder: "astronomie, copii, educatie" },
      { name: "status", label: "Status", type: "select", options: publishStatusOptions },
      { name: "featuredOnHome", label: "Afiseaza pe prima pagina", type: "checkbox" },
      { name: "focusKeyword", label: "Focus keyword", type: "text" },
      { name: "metaTitle", label: "Meta title", type: "text" },
      { name: "metaDescription", label: "Meta description", type: "textarea", rows: 3 }
    ]
  },
  parteneri: {
    title: "Parteneri",
    description: "Gestioneaza partenerii si sponsorii Star Sim.",
    basePath: "/admin/parteneri",
    newLabel: "Adauga partener",
    fields: [
      { name: "name", label: "Nume", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "description", label: "Descriere", type: "textarea", rows: 4 },
      { name: "website", label: "Website", type: "text" },
      { name: "type", label: "Tip parteneriat", type: "text" },
      { name: "status", label: "Status", type: "select", options: publishStatusOptions },
      { name: "featuredOnHome", label: "Afiseaza pe prima pagina", type: "checkbox" },
      { name: "sortOrder", label: "Ordine", type: "number" }
    ]
  },
  testimoniale: {
    title: "Testimoniale",
    description: "Publica recomandari de la profesori, parinti, parteneri sau participanti.",
    basePath: "/admin/testimoniale",
    newLabel: "Adauga testimonial",
    fields: [
      { name: "quote", label: "Citat", type: "textarea", required: true, rows: 5 },
      { name: "authorName", label: "Autor", type: "text", required: true },
      { name: "authorRole", label: "Rol autor", type: "text" },
      { name: "organization", label: "Organizatie", type: "text" },
      { name: "status", label: "Status", type: "select", options: publishStatusOptions },
      { name: "featuredOnHome", label: "Afiseaza pe prima pagina", type: "checkbox" },
      { name: "sortOrder", label: "Ordine", type: "number" }
    ]
  },
  media: {
    title: "Media Library",
    description: "Adauga manual asset-uri media prin URL. Upload-ul fizic poate fi conectat ulterior la volum persistent.",
    basePath: "/admin/media",
    newLabel: "Adauga media",
    fields: [
      { name: "filename", label: "Nume fisier", type: "text", required: true },
      { name: "url", label: "URL", type: "text", required: true },
      { name: "mimeType", label: "MIME type", type: "text", required: true, placeholder: "image/jpeg" },
      { name: "type", label: "Tip", type: "select", options: [{ label: "Imagine", value: "IMAGE" }, { label: "Video", value: "VIDEO" }, { label: "Document", value: "DOCUMENT" }] },
      { name: "alt", label: "Alt text", type: "text" },
      { name: "caption", label: "Caption", type: "text" },
      { name: "credit", label: "Credit", type: "text" },
      { name: "folder", label: "Folder", type: "text" },
      { name: "size", label: "Dimensiune bytes", type: "number" },
      { name: "width", label: "Latime", type: "number" },
      { name: "height", label: "Inaltime", type: "number" }
    ]
  },
  utilizatori: {
    title: "Utilizatori",
    description: "Gestioneaza conturile care pot intra in admin.",
    basePath: "/admin/utilizatori",
    newLabel: "Adauga utilizator",
    fields: [
      { name: "name", label: "Nume", type: "text", required: true },
      { name: "email", label: "Email", type: "text", required: true },
      { name: "password", label: "Parola", type: "password", help: "La editare, lasa gol daca nu vrei sa schimbi parola." },
      { name: "role", label: "Rol", type: "select", options: [{ label: "Admin", value: "ADMIN" }, { label: "Editor", value: "EDITOR" }, { label: "Voluntar", value: "VOLUNTEER" }] },
      { name: "status", label: "Status", type: "select", options: [{ label: "Activ", value: "ACTIVE" }, { label: "Dezactivat", value: "DISABLED" }] }
    ]
  }
};
