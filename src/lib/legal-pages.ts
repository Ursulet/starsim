export const legalPageDefaults = [
  {
    key: "privacy-policy",
    slug: "politica-de-confidentialitate",
    title: "Politica de confidențialitate",
    excerpt: "Informații despre modul în care Star Sim colectează, folosește și protejează datele personale.",
    body: [
      "Star Sim respectă confidențialitatea vizitatorilor, participanților și partenerilor săi. Colectăm doar datele necesare pentru a răspunde solicitărilor, pentru înscrieri la activități și pentru comunicări legate de programele asociației.",
      "Datele transmise prin formularele site-ului pot include nume, adresă de email, telefon, tipul solicitării și mesajul trimis. Aceste date sunt folosite exclusiv pentru comunicarea cu persoana care ne-a contactat și pentru administrarea activităților Star Sim.",
      "Nu vindem și nu închiriem date personale. Accesul la date este limitat la persoanele autorizate din echipa Star Sim și la furnizorii tehnici necesari funcționării site-ului.",
      "Pentru solicitări privind datele personale, ne poți contacta la adresa publicată pe pagina de contact."
    ]
  },
  {
    key: "cookies-policy",
    slug: "cookies",
    title: "Politica de cookies",
    excerpt: "Explicăm ce sunt cookie-urile și cum sunt folosite pe site-ul Star Sim.",
    body: [
      "Cookie-urile sunt fișiere mici salvate în browser pentru a ajuta site-ul să funcționeze corect și pentru a reține anumite preferințe.",
      "Site-ul Star Sim folosește cookie-uri necesare pentru funcționalități de bază, precum păstrarea preferințelor privind consimțământul pentru cookies.",
      "Dacă în viitor vor fi adăugate instrumente de analiză sau marketing, acestea vor fi folosite doar cu informare clară și, unde este necesar, cu acordul vizitatorului.",
      "Poți șterge sau bloca cookie-urile din setările browserului tău."
    ]
  },
  {
    key: "terms",
    slug: "termeni-si-conditii",
    title: "Termeni și condiții",
    excerpt: "Reguli generale pentru folosirea site-ului Star Sim și a conținutului publicat.",
    body: [
      "Prin utilizarea acestui site, accepți să folosești conținutul Star Sim într-un mod responsabil și legal.",
      "Informațiile publicate pe site au scop educațional și informativ. Ne străduim să păstrăm conținutul actualizat, dar pot exista modificări ale programelor, evenimentelor sau datelor de contact.",
      "Textele, imaginile, identitatea vizuală și materialele publicate aparțin Star Sim sau partenerilor săi și nu pot fi reutilizate fără acord, cu excepția cazurilor permise de lege.",
      "Star Sim își rezervă dreptul de a actualiza acești termeni atunci când site-ul sau activitățile se modifică."
    ]
  }
] as const;

export function legalBodyToTiptap(body: readonly string[]) {
  return {
    type: "doc",
    content: body.map((paragraph) => ({
      type: "paragraph",
      content: [{ type: "text", text: paragraph }]
    }))
  };
}
