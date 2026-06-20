export const legalPageDefaults = [
  {
    key: "privacy-policy",
    slug: "politica-de-confidentialitate",
    title: "Politica de confidentialitate",
    excerpt: "Informatii despre modul in care Star Sim colecteaza, foloseste si protejeaza datele personale.",
    body: [
      "Star Sim respecta confidentialitatea vizitatorilor, participantilor si partenerilor sai. Colectam doar datele necesare pentru a raspunde solicitarilor, pentru inscrieri la activitati si pentru comunicari legate de programele asociatiei.",
      "Datele transmise prin formularele site-ului pot include nume, adresa de email, telefon, tipul solicitarii si mesajul trimis. Aceste date sunt folosite exclusiv pentru comunicarea cu persoana care ne-a contactat si pentru administrarea activitatilor Star Sim.",
      "Nu vindem si nu inchiriem date personale. Accesul la date este limitat la persoanele autorizate din echipa Star Sim si la furnizorii tehnici necesari functionarii site-ului.",
      "Pentru solicitari privind datele personale, ne poti contacta la adresa publicata pe pagina de contact."
    ]
  },
  {
    key: "cookies-policy",
    slug: "cookies",
    title: "Politica de cookies",
    excerpt: "Explicam ce sunt cookie-urile si cum sunt folosite pe site-ul Star Sim.",
    body: [
      "Cookie-urile sunt fisiere mici salvate in browser pentru a ajuta site-ul sa functioneze corect si pentru a retine anumite preferinte.",
      "Site-ul Star Sim foloseste cookie-uri necesare pentru functionalitati de baza, precum pastrarea preferintelor privind consimtamantul pentru cookies.",
      "Daca in viitor vor fi adaugate instrumente de analiza sau marketing, acestea vor fi folosite doar cu informare clara si, unde este necesar, cu acordul vizitatorului.",
      "Poti sterge sau bloca cookie-urile din setarile browserului tau."
    ]
  },
  {
    key: "terms",
    slug: "termeni-si-conditii",
    title: "Termeni si conditii",
    excerpt: "Reguli generale pentru folosirea site-ului Star Sim si a continutului publicat.",
    body: [
      "Prin utilizarea acestui site, accepti sa folosesti continutul Star Sim intr-un mod responsabil si legal.",
      "Informatiile publicate pe site au scop educational si informativ. Ne straduim sa pastram continutul actualizat, dar pot exista modificari ale programelor, evenimentelor sau datelor de contact.",
      "Textele, imaginile, identitatea vizuala si materialele publicate apartin Star Sim sau partenerilor sai si nu pot fi reutilizate fara acord, cu exceptia cazurilor permise de lege.",
      "Star Sim isi rezerva dreptul de a actualiza acesti termeni atunci cand site-ul sau activitatile se modifica."
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
