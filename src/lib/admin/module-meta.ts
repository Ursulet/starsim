export const adminModules = {
  programe: {
    title: "Programe",
    description: "Administrează programele Star Sim afișate pe site: ateliere, caravane, observații astronomice și educație STEM.",
    primaryActionLabel: "Adaugă program",
    primaryActionHref: "/admin/programe/new",
    items: ["titlu, slug și descriere scurtă", "conținut editorial", "imagine principală și icon", "afișare pe homepage", "SEO per program"]
  },
  evenimente: {
    title: "Evenimente",
    description: "Creează și publică evenimente, date, locații, înscrieri și detalii pentru participanți.",
    primaryActionLabel: "Adaugă eveniment",
    primaryActionHref: "/admin/evenimente/new",
    items: ["dată, oră, locație", "status și publicare", "înscrieri participanți", "afișare pe homepage", "Schema Event pentru SEO"]
  },
  galerie: {
    title: "Galerie",
    description: "Organizează fotografiile în albume, cu cover, descriere și alt text pentru imagini.",
    primaryActionLabel: "Adaugă album",
    primaryActionHref: "/admin/galerie/new",
    items: ["albume foto", "imagini multiple", "alt text obligatoriu", "asociere cu evenimente/programe", "SEO pentru albume"]
  },
  articole: {
    title: "Articole",
    description: "Publică articole educaționale și noutăți cu editor WYSIWYG și SEO avansat.",
    primaryActionLabel: "Adaugă articol",
    primaryActionHref: "/admin/articole/new",
    items: ["titlu, slug, excerpt", "WYSIWYG/Tiptap JSON", "categorii și tag-uri", "focus keyword", "FAQ și articole similare"]
  },
  pagini: {
    title: "Pagini",
    description: "Editează paginile statice și semi-structurate: Despre, Implică-te, Parteneriate, Politici și Termeni.",
    primaryActionLabel: "Adaugă pagina",
    primaryActionHref: "/admin/pagini/new",
    items: ["conținut editorial", "template per pagină", "status publicare", "SEO per pagina"]
  },
  doneaza: {
    title: "Donează",
    description: "Administrează conținutul paginii de donații, datele bancare, sumele recomandate și mesajele de impact.",
    primaryActionLabel: "Editează pagina Donează",
    primaryActionHref: "/admin/doneaza",
    items: ["IBAN, bancă, titular, CUI", "sume recomandate", "mesaje de impact", "FAQ donații", "SEO donații"]
  },
  contact: {
    title: "Contact",
    description: "Gestionează datele publice de contact și mesajele primite prin formular.",
    primaryActionLabel: "Vezi mesajele",
    primaryActionHref: "/admin/contact/messages",
    items: ["email, telefon, adresă", "link hartă", "social links", "mesaje și status intern", "note interne"]
  },
  newsletter: {
    title: "Newsletter",
    description: "Administrează abonații și sursele de înscriere la newsletter.",
    primaryActionLabel: "Vezi abonații",
    primaryActionHref: "/admin/newsletter",
    items: ["abonați activi", "dezabonați", "sursă abonare", "export viitor"]
  },
  parteneri: {
    title: "Parteneri",
    description: "Gestionează logo-uri, descrieri și linkuri pentru partenerii Star Sim.",
    primaryActionLabel: "Adaugă partener",
    primaryActionHref: "/admin/parteneri/new",
    items: ["logo partener", "website", "tip parteneriat", "afișare pe homepage", "ordine afișare"]
  },
  testimoniale: {
    title: "Testimoniale",
    description: "Publică citate și recomandări de la profesori, părinți, parteneri și participanți.",
    primaryActionLabel: "Adaugă testimonial",
    primaryActionHref: "/admin/testimoniale/new",
    items: ["citat", "autor", "rol/organizație", "imagine opțională", "afișare pe homepage"]
  },
  media: {
    title: "Media Library",
    description: "Biblioteca centrală pentru imagini folosite în programe, evenimente, articole și galerie.",
    primaryActionLabel: "Incarca media",
    primaryActionHref: "/admin/media",
    items: ["imagini", "alt text", "caption", "foldere", "reutilizare în conținut"]
  },
  seo: {
    title: "SEO Center",
    description: "Monitorizează și optimizează metadatele, imaginile, slug-urile și indexarea conținutului.",
    primaryActionLabel: "Analizeaza SEO",
    primaryActionHref: "/admin/seo",
    items: ["meta title lipsă", "descrieri lipsă", "imagini fără alt", "redirect-uri 301", "preview Google/Open Graph"]
  },
  utilizatori: {
    title: "Utilizatori",
    description: "Gestionează utilizatorii admin, editorii și rolurile interne.",
    primaryActionLabel: "Adaugă utilizator",
    primaryActionHref: "/admin/utilizatori/new",
    items: ["roluri ADMIN/EDITOR/VOLUNTEER", "status activ/dezactivat", "securitate cont", "audit acțiuni"]
  },
  setari: {
    title: "Setări site",
    description: "Configurează identitatea site-ului, navigația, datele generale și integrările viitoare.",
    primaryActionLabel: "Editează setarile",
    primaryActionHref: "/admin/setari",
    items: ["identitate Star Sim", "social links", "navigatie", "setari SEO globale", "integrari viitoare"]
  },
  "audit-log": {
    title: "Audit Log",
    description: "Urmărește acțiunile importante din admin pentru trasabilitate și securitate.",
    primaryActionLabel: "Vezi loguri",
    primaryActionHref: "/admin/audit-log",
    items: ["acțiuni utilizatori", "entitate modificată", "dată și autor", "metadata tehnică"]
  }
} as const;
