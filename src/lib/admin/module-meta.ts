export const adminModules = {
  programe: {
    title: "Programe",
    description: "Administreaza programele Star Sim afisate pe site: ateliere, caravane, observatii astronomice si educatie STEM.",
    primaryActionLabel: "Adauga program",
    primaryActionHref: "/admin/programe/new",
    items: ["titlu, slug si descriere scurta", "continut editorial", "imagine principala si icon", "afisare pe homepage", "SEO per program"]
  },
  evenimente: {
    title: "Evenimente",
    description: "Creeaza si publica evenimente, date, locatii, inscrieri si detalii pentru participanti.",
    primaryActionLabel: "Adauga eveniment",
    primaryActionHref: "/admin/evenimente/new",
    items: ["data, ora, locatie", "status si publicare", "inscrieri participanti", "afisare pe homepage", "Schema Event pentru SEO"]
  },
  galerie: {
    title: "Galerie",
    description: "Organizeaza fotografiile in albume, cu cover, descriere si alt text pentru imagini.",
    primaryActionLabel: "Adauga album",
    primaryActionHref: "/admin/galerie/new",
    items: ["albume foto", "imagini multiple", "alt text obligatoriu", "asociere cu evenimente/programe", "SEO pentru albume"]
  },
  articole: {
    title: "Articole",
    description: "Publica articole educationale si noutati cu editor WYSIWYG si SEO avansat.",
    primaryActionLabel: "Adauga articol",
    primaryActionHref: "/admin/articole/new",
    items: ["titlu, slug, excerpt", "WYSIWYG/Tiptap JSON", "categorii si tag-uri", "focus keyword", "FAQ si articole similare"]
  },
  pagini: {
    title: "Pagini",
    description: "Editeaza paginile statice si semi-structurate: Despre, Implica-te, Parteneriate, Politici si Termeni.",
    primaryActionLabel: "Adauga pagina",
    primaryActionHref: "/admin/pagini/new",
    items: ["continut editorial", "template per pagina", "status publicare", "SEO per pagina"]
  },
  doneaza: {
    title: "Doneaza",
    description: "Administreaza continutul paginii de donatii, datele bancare, sumele recomandate si mesajele de impact.",
    primaryActionLabel: "Editeaza pagina Doneaza",
    primaryActionHref: "/admin/doneaza",
    items: ["IBAN, banca, titular, CUI", "sume recomandate", "mesaje de impact", "FAQ donatii", "SEO donatii"]
  },
  contact: {
    title: "Contact",
    description: "Gestioneaza datele publice de contact si mesajele primite prin formular.",
    primaryActionLabel: "Vezi mesajele",
    primaryActionHref: "/admin/contact/messages",
    items: ["email, telefon, adresa", "link harta", "social links", "mesaje si status intern", "note interne"]
  },
  newsletter: {
    title: "Newsletter",
    description: "Administreaza abonatii si sursele de inscriere la newsletter.",
    primaryActionLabel: "Vezi abonatii",
    primaryActionHref: "/admin/newsletter",
    items: ["abonati activi", "dezabonati", "sursa abonare", "export viitor"]
  },
  parteneri: {
    title: "Parteneri",
    description: "Gestioneaza logo-uri, descrieri si linkuri pentru partenerii Star Sim.",
    primaryActionLabel: "Adauga partener",
    primaryActionHref: "/admin/parteneri/new",
    items: ["logo partener", "website", "tip parteneriat", "afisare pe homepage", "ordine afisare"]
  },
  testimoniale: {
    title: "Testimoniale",
    description: "Publica citate si recomandari de la profesori, parinti, parteneri si participanti.",
    primaryActionLabel: "Adauga testimonial",
    primaryActionHref: "/admin/testimoniale/new",
    items: ["citat", "autor", "rol/organizatie", "imagine optionala", "afisare pe homepage"]
  },
  media: {
    title: "Media Library",
    description: "Biblioteca centrala pentru imagini folosite in programe, evenimente, articole si galerie.",
    primaryActionLabel: "Incarca media",
    primaryActionHref: "/admin/media",
    items: ["imagini", "alt text", "caption", "foldere", "reutilizare in continut"]
  },
  seo: {
    title: "SEO Center",
    description: "Monitorizeaza si optimizeaza metadatele, imaginile, slug-urile si indexarea continutului.",
    primaryActionLabel: "Analizeaza SEO",
    primaryActionHref: "/admin/seo",
    items: ["meta title lipsa", "descrieri lipsa", "imagini fara alt", "redirect-uri 301", "preview Google/Open Graph"]
  },
  utilizatori: {
    title: "Utilizatori",
    description: "Gestioneaza utilizatorii admin, editorii si rolurile interne.",
    primaryActionLabel: "Adauga utilizator",
    primaryActionHref: "/admin/utilizatori/new",
    items: ["roluri ADMIN/EDITOR/VOLUNTEER", "status activ/dezactivat", "securitate cont", "audit actiuni"]
  },
  setari: {
    title: "Setari site",
    description: "Configureaza identitatea site-ului, navigatia, datele generale si integrarile viitoare.",
    primaryActionLabel: "Editeaza setarile",
    primaryActionHref: "/admin/setari",
    items: ["identitate Star Sim", "social links", "navigatie", "setari SEO globale", "integrari viitoare"]
  },
  "audit-log": {
    title: "Audit Log",
    description: "Urmareste actiunile importante din admin pentru trasabilitate si securitate.",
    primaryActionLabel: "Vezi loguri",
    primaryActionHref: "/admin/audit-log",
    items: ["actiuni utilizatori", "entitate modificata", "data si autor", "metadata tehnica"]
  }
} as const;
