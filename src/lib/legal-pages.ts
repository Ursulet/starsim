export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "subheading"; text: string }
  | { type: "notice"; text: string };

export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  listItems?: string[];
  blocks?: LegalBlock[];
};

export type LegalPageDefinition = {
  key: string;
  slug: string;
  title: string;
  navLabel: string;
  excerpt: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export type CookieInventoryItem = {
  name: string;
  type: string;
  provider: string;
  purpose: string;
  category: string;
  duration: string;
  domain: string;
};

export const REAL_COOKIES_INVENTORY: CookieInventoryItem[] = [
  {
    name: "authjs.session-token / __Secure-authjs.session-token",
    type: "HTTP Cookie",
    provider: "starsim.ro (Intern)",
    purpose: "Autentificare securizată și menținere sesiune administrator (doar la autentificare în panoul de administrare).",
    category: "Strict necesar",
    duration: "Sesiune / 30 zile",
    domain: "starsim.ro"
  },
  {
    name: "authjs.csrf-token",
    type: "HTTP Cookie",
    provider: "starsim.ro (Intern)",
    purpose: "Protecție împotriva atacurilor de tip Cross-Site Request Forgery (CSRF).",
    category: "Strict necesar",
    duration: "Sesiune",
    domain: "starsim.ro"
  },
  {
    name: "authjs.callback-url",
    type: "HTTP Cookie",
    provider: "starsim.ro (Intern)",
    purpose: "Memorarea URL-ului de redirecționare după autentificare.",
    category: "Strict necesar",
    duration: "Sesiune",
    domain: "starsim.ro"
  },
  {
    name: "starsim_cookie_consent",
    type: "Local Storage / Cookie",
    provider: "starsim.ro (Intern)",
    purpose: "Memorarea opțiunilor și preferințelor de consimțământ exprimate de utilizator pentru cookie-uri.",
    category: "Funcțional / Necesare",
    duration: "12 luni",
    domain: "starsim.ro"
  }
];

export const legalPageDefaults: LegalPageDefinition[] = [
  {
    key: "privacy-policy",
    slug: "politica-de-confidentialitate",
    title: "Politica de confidențialitate",
    navLabel: "Confidențialitate",
    excerpt:
      "Prezenta politică explică ce date cu caracter personal putem prelucra, în ce scopuri, pe ce temeiuri juridice, cui le putem divulga, cât timp le păstrăm și ce drepturi au persoanele vizate.",
    lastUpdated: "Septembrie 2026",
    sections: [
      {
        id: "operatorul-datelor",
        title: "1. Operatorul datelor",
        paragraphs: [
          "Operatorul datelor cu caracter personal prelucrate prin intermediul site-ului starsim.ro și, după caz, în legătură cu activitățile prezentate pe site este Asociația Star Sim, persoană juridică fără scop patrimonial, CIF 55521510, cu sediul în Str. Viceamiral Ioan Murgescu 56, Constanța, România.",
          "Reprezentant legal: Gîrdeanu Ștefan - Victor (Președinte).",
          "Date de contact pentru aspecte privind protecția datelor: contact@starsim.ro; telefon: +40 730 991 523. Dacă Asociația va desemna un responsabil cu protecția datelor (DPO), datele acestuia vor fi publicate aici."
        ]
      },
      {
        id: "scopul-politicii",
        title: "2. Scopul politicii",
        paragraphs: [
          "Prezenta politică explică ce date cu caracter personal putem prelucra, în ce scopuri, pe ce temeiuri juridice, cui le putem divulga, cât timp le păstrăm și ce drepturi au persoanele vizate. Politica se aplică vizitatorilor site-ului, persoanelor care ne contactează, se abonează la comunicări, se înscriu la activități, participă la programe, donează, sponsorizează, colaborează sau se oferă voluntari, în măsura în care datele sunt colectate prin sau în legătură cu starsim.ro."
        ]
      },
      {
        id: "categorii-date",
        title: "3. Categoriile de date pe care le putem prelucra",
        listItems: [
          "date de identificare și contact: nume, prenume, adresă de e-mail, număr de telefon;",
          "date furnizate prin formulare: subiectul solicitării, mesajul și orice alte informații pe care persoana alege să ni le transmită;",
          "date privind înscrierea și participarea la programe, ateliere, evenimente sau activități de voluntariat;",
          "date privind reprezentantul legal al unui minor, atunci când sunt necesare pentru înscriere, consimțământ, comunicare sau siguranță;",
          "date aferente donațiilor și sponsorizărilor, în măsura în care rezultă din documentele bancare, contractuale ori financiar-contabile; nu solicităm și nu stocăm date complete ale cardurilor bancare prin site;",
          "imagini, voce și materiale foto-video realizate în cadrul activităților, numai în condițiile politicii dedicate și ale temeiului juridic aplicabil;",
          "date tehnice și de securitate: adresă IP, informații despre browser și dispozitiv, data și ora accesării, loguri tehnice, evenimente de securitate și informații similare generate de infrastructura site-ului;",
          "preferințe privind cookie-urile și, dacă sunt implementate, date de analiză sau măsurare a traficului, în condițiile Politicii de cookies."
        ]
      },
      {
        id: "scopuri-temeiuri",
        title: "4. Scopurile și temeiurile juridice",
        paragraphs: [
          "Prelucrăm date numai atunci când există un scop determinat și un temei juridic valabil. În funcție de situație, putem utiliza unul sau mai multe dintre temeiurile prevăzute de Regulamentul (UE) 2016/679 (GDPR)."
        ],
        listItems: [
          "Răspuns la solicitări și comunicare: pentru a răspunde mesajelor, întrebărilor și cererilor primite. Temei: demersuri la solicitarea persoanei, executarea unui raport contractual, după caz, sau interesul legitim de a gestiona comunicarea și relațiile Asociației.",
          "Înscriere și organizare de activități: pentru administrarea participării la programe, ateliere, evenimente și activități. Temei: executarea unui contract/demersuri precontractuale, interes legitim și, când este necesar, consimțământ.",
          "Newsletter și comunicări de tip marketing: pentru transmiterea de noutăți, invitații și informații despre proiecte. Temei: consimțământul persoanei, care poate fi retras oricând.",
          "Donații, sponsorizări și relația cu partenerii: pentru evidență, confirmare, comunicare, executarea contractelor și îndeplinirea obligațiilor financiar-contabile. Temei: executarea contractului, obligație legală și, după caz, interes legitim.",
          "Siguranță și funcționare tehnică: pentru protejarea site-ului, prevenirea abuzului, diagnosticarea erorilor și administrarea infrastructurii. Temei: interesul legitim al Asociației de a asigura securitatea și funcționarea serviciilor sale.",
          "Fotografii și materiale video: pentru documentarea, raportarea și comunicarea activităților, în condițiile Politicii privind fotografiile și materialele video. Temeiul va fi stabilit în funcție de context; pentru materiale promoționale cu persoane identificabile și, în special, pentru minori, se va utiliza consimțământul atunci când acesta este necesar."
        ]
      },
      {
        id: "date-minori",
        title: "5. Date privind minorii",
        paragraphs: [
          "Star Sim desfășoară activități educaționale în care pot participa copii și adolescenți. Colectăm numai datele necesare organizării, comunicării și siguranței activității. Atunci când natura prelucrării o impune, solicitările și acordurile vor fi gestionate prin părinte sau reprezentant legal.",
          "Participarea la o activitate și acordul privind utilizarea imaginii nu vor fi tratate ca un singur consimțământ obligatoriu. Refuzul utilizării imaginii, atunci când aceasta se bazează pe consimțământ, nu trebuie să împiedice în mod nejustificat participarea copilului la activitate."
        ]
      },
      {
        id: "destinatari-furnizori",
        title: "6. Destinatarii datelor și furnizorii",
        paragraphs: [
          "Accesul la date este limitat la persoanele care au nevoie de acestea pentru îndeplinirea atribuțiilor. În funcție de serviciile utilizate, datele pot fi prelucrate și de furnizori care acționează în numele Asociației sau ca operatori independenți:"
        ],
        listItems: [
          "furnizorul de găzduire și administrare tehnică a site-ului;",
          "furnizorul serviciilor de e-mail;",
          "furnizorul serviciului de newsletter, dacă este utilizat;",
          "furnizori de securitate, anti-spam, formulare, analiză a traficului sau alte servicii web, dacă sunt implementați;",
          "instituții de credit și procesatori de plăți, atunci când vor fi utilizate plăți online;",
          "contabil, auditor, consultanți juridici sau fiscali, în limitele necesare;",
          "autorități și instituții publice, atunci când divulgarea este impusă de lege."
        ]
      },
      {
        id: "transferuri-see",
        title: "7. Transferuri în afara SEE",
        paragraphs: [
          "Dacă un furnizor implicat în funcționarea site-ului sau a serviciilor online prelucrează date în afara Spațiului Economic European, Asociația va utiliza mecanismele legale aplicabile transferurilor internaționale, cum ar fi o decizie de adecvare, clauze contractuale standard ori alte garanții prevăzute de GDPR. Lista exactă a furnizorilor trebuie corelată cu configurația tehnică efectivă a site-ului."
        ]
      },
      {
        id: "perioade-pastrare",
        title: "8. Perioade de păstrare",
        paragraphs: [
          "Nu păstrăm datele mai mult decât este necesar. Perioada se stabilește în funcție de scop, obligațiile legale, necesitatea apărării drepturilor și durata relației cu persoana vizată. Orientativ:"
        ],
        listItems: [
          "solicitări generale de contact: de regulă până la 24 de luni de la soluționare, dacă nu există un motiv justificat pentru păstrare mai lungă;",
          "newsletter: până la retragerea consimțământului sau constatarea inactivității, conform procedurilor interne;",
          "date aferente înscrierilor și activităților: pe durata necesară organizării și ulterior, numai atât cât este justificat de obligații legale, raportare, evidență ori apărarea drepturilor;",
          "documente financiar-contabile și contractuale: potrivit termenelor prevăzute de legislația financiar-contabilă și fiscală aplicabilă;",
          "loguri tehnice și de securitate: pentru o perioadă proporțională cu scopul de securitate și administrare tehnică."
        ]
      },
      {
        id: "drepturi-persoane",
        title: "9. Drepturile persoanelor vizate",
        paragraphs: [
          "În condițiile prevăzute de GDPR, persoana vizată poate solicita accesul la date, rectificarea datelor inexacte, ștergerea, restricționarea prelucrării, portabilitatea datelor, se poate opune anumitor prelucrări și poate retrage consimțământul în orice moment, fără a afecta legalitatea prelucrării efectuate anterior retragerii.",
          "Solicitările pot fi transmise la contact@starsim.ro. Pentru protejarea datelor, putem solicita informații rezonabile pentru verificarea identității solicitantului. Persoana are, de asemenea, dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP) – www.dataprotection.ro."
        ]
      },
      {
        id: "decizii-automate",
        title: "10. Decizii automate și profilare",
        paragraphs: [
          "La data prezentei politici, Asociația nu utilizează prin starsim.ro procese decizionale exclusiv automatizate care să producă efecte juridice asupra persoanei sau să o afecteze în mod similar într-o măsură semnificativă. Dacă această situație se va modifica, politica va fi actualizată înainte de utilizarea noii funcționalități."
        ]
      },
      {
        id: "securitate-date",
        title: "11. Securitatea datelor",
        paragraphs: [
          "Aplicăm măsuri tehnice și organizatorice rezonabile, proporționale cu natura datelor și riscurile asociate, pentru a preveni accesul neautorizat, pierderea, alterarea sau divulgarea nejustificată. Nicio metodă de transmitere sau stocare electronică nu poate garanta securitate absolută."
        ]
      },
      {
        id: "actualizare-politica",
        title: "12. Actualizarea politicii",
        paragraphs: [
          "Prezenta politică poate fi actualizată pentru a reflecta modificări legislative, tehnice sau organizaționale. Versiunea publicată pe site va indica data ultimei actualizări. Modificările substanțiale vor fi evidențiate în mod adecvat."
        ]
      },
      {
        id: "cadru-juridic",
        title: "Cadru juridic principal avut în vedere",
        listItems: [
          "Regulamentul (UE) 2016/679 (GDPR), în special art. 5, 6, 12-14, 15-22 și 32;",
          "Legea nr. 190/2018 privind măsuri de punere în aplicare a GDPR;",
          "Legea nr. 506/2004, în măsura în care sunt utilizate cookie-uri ori tehnologii similare."
        ]
      }
    ]
  },
  {
    key: "cookie-policy",
    slug: "cookies",
    title: "Politica de cookies",
    navLabel: "Cookies",
    excerpt:
      "Prezenta politică explică utilizarea cookie-urilor și a tehnologiilor similare pe starsim.ro, categoriile active, duratele de stocare și controlul consimțământului.",
    lastUpdated: "Septembrie 2026",
    sections: [
      {
        id: "scop-cookies",
        title: "1. Scop",
        paragraphs: [
          "Prezenta politică explică utilizarea cookie-urilor și a tehnologiilor similare pe starsim.ro. Ea trebuie citită împreună cu Politica de confidențialitate. Configurația publicată trebuie să reflecte întotdeauna cookie-urile și scripturile care rulează efectiv pe site."
        ]
      },
      {
        id: "ce-sunt-cookie-urile",
        title: "2. Ce sunt cookie-urile",
        paragraphs: [
          "Cookie-urile sunt fișiere de dimensiuni mici sau informații stocate ori accesate pe dispozitivul utilizatorului atunci când acesta accesează un site. Tehnologii similare pot include local storage, pixeli, identificatori și alte mecanisme tehnice cu funcții comparabile."
        ]
      },
      {
        id: "categorii-cookies",
        title: "3. Categorii de cookie-uri",
        listItems: [
          "Strict necesare: asigură funcții esențiale ale site-ului, securitatea, menținerea sesiunii sau memorarea alegerilor privind consimțământul. Acestea pot fi utilizate fără consimțământ numai când sunt strict necesare furnizării serviciului solicitat de utilizator.",
          "Funcționale: rețin preferințe sau oferă funcții suplimentare. Dacă nu sunt strict necesare, se activează numai în condițiile legale aplicabile.",
          "Analiză/statistică: ajută la înțelegerea modului în care este utilizat site-ul. Dacă implică stocare/acces pe terminal și nu intră în excepția legală, se activează numai după consimțământ.",
          "Marketing: sunt utilizate pentru măsurarea campaniilor, personalizare publicitară sau remarketing. Se activează numai după consimțământ, dacă sunt implementate."
        ]
      },
      {
        id: "consimtamant-control",
        title: "4. Consimțământ și control",
        paragraphs: [
          "Pentru cookie-urile și tehnologiile care nu sunt strict necesare, acestea nu trebuie încărcate înainte ca utilizatorul să își exprime opțiunea. Bannerul de consimțământ trebuie să ofere, într-o manieră comparabilă și ușor accesibilă, opțiuni de acceptare și refuz pentru cookie-urile neesențiale și posibilitatea de configurare pe categorii.",
          "Consimțământul trebuie să fie liber exprimat, specific, informat și lipsit de ambiguitate. Categoriile neesențiale nu trebuie prebifate. Utilizatorul trebuie să poată retrage sau modifica alegerea la fel de ușor cum a exprimat-o."
        ]
      },
      {
        id: "terti-cookies",
        title: "5. Cookie-uri ale terților",
        paragraphs: [
          "Dacă starsim.ro integrează servicii externe - de exemplu YouTube, Google Maps, servicii anti-spam, platforme de analiză, social media, formulare sau procesatori de plăți - aceste servicii pot instala ori accesa propriile cookie-uri sau identificatori. Activarea lor trebuie configurată în funcție de categoria și scopul serviciului."
        ]
      },
      {
        id: "tabel-cookies",
        title: "6. Tabelul cookie-urilor utilizate pe starsim.ro",
        paragraphs: [
          "Configurația de mai jos reflectă tehnologiile și identificatorii de stocare efectiv utilizați pe site în prezent:"
        ]
      },
      {
        id: "setari-browser",
        title: "7. Setările browserului",
        paragraphs: [
          "Utilizatorul poate șterge sau bloca cookie-urile și din setările browserului. Blocarea cookie-urilor strict necesare poate afecta funcționarea anumitor componente ale site-ului."
        ],
        listItems: [
          "Google Chrome: Setări > Confidențialitate și securitate > Module cookie și alte date privind site-urile;",
          "Mozilla Firefox: Opțiuni > Confidențialitate și securitate > Cookie-uri și date de site;",
          "Apple Safari: Preferințe > Confidențialitate > Gestionare date site web;",
          "Microsoft Edge: Setări > Cookie-uri și permisiuni de site."
        ]
      },
      {
        id: "actualizari-cookies",
        title: "8. Actualizări",
        paragraphs: [
          "Politica va fi actualizată atunci când sunt adăugate, eliminate sau modificate servicii care folosesc cookie-uri ori tehnologii similare."
        ]
      },
      {
        id: "cadru-juridic-cookies",
        title: "Cadru juridic principal avut în vedere",
        listItems: [
          "Legea nr. 506/2004, art. 4 alin. (5) și (6), privind stocarea sau accesarea informațiilor de pe echipamentul terminal;",
          "Regulamentul (UE) 2016/679 (GDPR), atunci când identificatorii sau informațiile colectate constituie date cu caracter personal."
        ]
      }
    ]
  },
  {
    key: "terms-and-conditions",
    slug: "termeni-si-conditii",
    title: "Termeni și condiții de utilizare",
    navLabel: "Termeni și condiții",
    excerpt:
      "Condițiile generale aplicabile navigării pe starsim.ro și participării la activitățile, proiectele și evenimentele organizate de Asociația Star Sim.",
    lastUpdated: "Septembrie 2026",
    sections: [
      {
        id: "despre-site",
        title: "1. Despre site",
        paragraphs: [
          "Site-ul starsim.ro este administrat de Asociația Star Sim, persoană juridică fără scop patrimonial, CIF 55521510, cu sediul în Str. Viceamiral Ioan Murgescu 56, Constanța, România. Reprezentant legal: Gîrdeanu Ștefan - Victor (Președinte).",
          "Prin utilizarea site-ului, vizitatorul confirmă că a luat cunoștință de prezentele condiții."
        ]
      },
      {
        id: "scopul-site-ului",
        title: "2. Scopul site-ului",
        paragraphs: [
          "starsim.ro prezintă activitatea Asociației Star Sim, proiecte și programe educaționale, evenimente, materiale informative, oportunități de implicare, donații, sponsorizări, voluntariat și alte inițiative conforme scopului statutar al Asociației."
        ]
      },
      {
        id: "informatiile-publicate",
        title: "3. Informațiile publicate",
        paragraphs: [
          "Depunem eforturi rezonabile pentru ca informațiile publicate să fie corecte și actualizate. Totuși, datele privind evenimentele, programul, locația, capacitatea, echipamentele, partenerii și condițiile de participare se pot modifica.",
          "Publicarea unui eveniment nu constituie o garanție absolută că acesta se va desfășura în forma inițial anunțată."
        ]
      },
      {
        id: "activitati-astronomice",
        title: "4. Activități astronomice și evenimente",
        paragraphs: [
          "Observațiile astronomice și activitățile în aer liber depind de condiții care nu pot fi controlate integral de organizator, inclusiv vremea, nebulozitatea, vizibilitatea, poluarea luminoasă, condițiile locale de siguranță și funcționarea echipamentelor.",
          "Asociația poate modifica, amâna, muta sau anula o activitate atunci când desfășurarea ei nu este rezonabil posibilă sau sigură."
        ]
      },
      {
        id: "inscriere-participare",
        title: "5. Înscriere și participare",
        paragraphs: [
          "Unele activități pot necesita înscriere prealabilă, confirmarea locului, acordul privind regulile evenimentului sau, pentru minori, implicarea părintelui/reprezentantului legal.",
          "Condițiile specifice afișate pentru un eveniment fac parte din regulile aplicabile acelui eveniment."
        ]
      },
      {
        id: "conduita-utilizatorilor",
        title: "6. Conduita utilizatorilor",
        paragraphs: [
          "Este interzisă utilizarea site-ului pentru transmiterea de conținut ilegal, amenințător, fraudulos, abuziv, discriminatoriu, care încalcă drepturile altor persoane ori care poate afecta securitatea sau funcționarea site-ului.",
          "Nu este permisă încercarea de acces neautorizat, testarea abuzivă a securității, automatizarea agresivă sau perturbarea serviciilor."
        ]
      },
      {
        id: "proprietate-intelectuala",
        title: "7. Proprietate intelectuală",
        paragraphs: [
          "Textele, materialele educaționale, elementele grafice, fotografiile, materialele video, mărcile și celelalte elemente publicate pe site sunt protejate potrivit legislației aplicabile și aparțin Asociației Star Sim ori sunt utilizate în baza unui drept sau acord.",
          "Reproducerea ori utilizarea în scop comercial este permisă numai cu acordul titularului drepturilor, cu excepția utilizărilor permise de lege."
        ]
      },
      {
        id: "linkuri-externe",
        title: "8. Linkuri și servicii externe",
        paragraphs: [
          "Site-ul poate conține linkuri sau integrări către servicii administrate de terți. Asociația nu controlează politicile, securitatea sau conținutul acestor servicii și nu răspunde pentru modificările operate de furnizorii terți."
        ]
      },
      {
        id: "donatii-sponsorizari-tc",
        title: "9. Donații și sponsorizări",
        paragraphs: [
          "Donațiile și sponsorizările sunt supuse condițiilor publicate în Politica privind donațiile și sponsorizările și, pentru sponsorizări, contractului scris încheiat între părți.",
          "Facilitățile fiscale aparțin sponsorului și se aplică numai dacă sunt îndeplinite condițiile legale în vigoare."
        ]
      },
      {
        id: "limitare-raspundere",
        title: "10. Limitarea răspunderii",
        paragraphs: [
          "Site-ul și materialele informative sunt furnizate cu bună-credință. În limita permisă de lege, Asociația nu răspunde pentru prejudicii rezultate exclusiv din indisponibilități temporare, erori tehnice, modificări ale serviciilor terților sau utilizarea informațiilor într-un mod diferit de scopul pentru care au fost publicate. Prezenta clauză nu limitează răspunderea care nu poate fi exclusă prin lege."
        ]
      },
      {
        id: "protectia-datelor-tc",
        title: "11. Protecția datelor",
        paragraphs: [
          "Prelucrarea datelor cu caracter personal este descrisă în Politica de confidențialitate, iar utilizarea cookie-urilor în Politica de cookies."
        ]
      },
      {
        id: "lege-contact",
        title: "12. Legea aplicabilă și contact",
        paragraphs: [
          "Prezentele condiții sunt guvernate de legislația română și de normele europene direct aplicabile.",
          "Pentru întrebări privind site-ul sau activitățile noastre: contact@starsim.ro."
        ]
      },
      {
        id: "modificari-tc",
        title: "13. Modificări",
        paragraphs: [
          "Termenii pot fi actualizați pentru a reflecta modificări ale site-ului, activităților sau legislației. Versiunea în vigoare este cea publicată pe starsim.ro."
        ]
      }
    ]
  },
  {
    key: "donations-sponsorships-policy",
    slug: "politica-donatii-sponsorizari",
    title: "Politica privind donațiile și sponsorizările",
    navLabel: "Donații și sponsorizări",
    excerpt:
      "Regulile generale, datele contului bancar oficial, facilitățile fiscale și cadrul de integritate financiară pentru contribuțiile către Asociația Star Sim.",
    lastUpdated: "Septembrie 2026",
    sections: [
      {
        id: "scop-donatii",
        title: "1. Scop",
        paragraphs: [
          "Asociația Star Sim poate primi donații, sponsorizări și alte forme legale de sprijin pentru realizarea scopului și obiectivelor sale statutare.",
          "Prezenta politică explică regulile generale aplicabile contribuțiilor prezentate sau inițiate prin starsim.ro."
        ]
      },
      {
        id: "donatii-individuale",
        title: "2. Donații",
        paragraphs: [
          "Donațiile sunt contribuții voluntare acordate Asociației fără achiziționarea unui bun sau serviciu în schimb.",
          "Dacă site-ul prezintă exemple de sume și impact - de exemplu materiale pentru atelier, susținerea unei activități sau contribuția la dotarea unei școli - aceste exemple au caracter orientativ, cu excepția situației în care Asociația acceptă în mod expres o donație cu destinație determinată."
        ]
      },
      {
        id: "utilizare-fonduri",
        title: "3. Utilizarea fondurilor",
        paragraphs: [
          "Dacă nu este convenită și acceptată în mod expres o destinație specifică, fondurile pot fi utilizate pentru activitățile, proiectele și costurile eligibile ale Asociației, în acord cu statutul, bugetele aprobate, obligațiile legale și prioritățile operaționale.",
          "Aceasta permite Asociației să aloce resursele acolo unde sunt necesare pentru realizarea misiunii sale."
        ]
      },
      {
        id: "transfer-bancar",
        title: "4. Donații prin transfer bancar",
        paragraphs: [
          "Pentru transferurile bancare, donatorul utilizează contul bancar oficial al Asociației Star Sim:"
        ],
        listItems: [
          "Cont IBAN (RON): RO05 RNCB 0296 1871 7895 0001",
          "Banca: Banca Comercială Română (BCR)",
          "Titular cont / Beneficiar: Asociația Star Sim",
          "Cod de Identificare Fiscală (CIF): 55521510",
          "Sediu social: Str. Viceamiral Ioan Murgescu 56, Constanța, România",
          "Mențiune recomandată la plată: «Donație - Asociația Star Sim» (sau mențiunea specifică a proiectului dorit)."
        ],
        blocks: [
          {
            type: "paragraph",
            text: "Donatorul este responsabil pentru corectitudinea datelor introduse în ordinul de plată din aplicația bancară."
          }
        ]
      },
      {
        id: "plati-card",
        title: "5. Donații cu cardul - pentru implementarea viitoare",
        paragraphs: [
          "Dacă va fi introdusă plata cu cardul, aceasta va fi procesată de un prestator autorizat. Asociația nu va solicita și nu va stoca pe propriul site datele complete ale cardului, în măsura în care plata este procesată prin infrastructura prestatorului.",
          "Înainte de activarea funcției, această secțiune trebuie completată cu denumirea procesatorului, politica acestuia, moneda, eventualele comisioane, mecanismul de donații recurente și procedura de anulare, dacă este cazul."
        ]
      },
      {
        id: "sponsorizari",
        title: "6. Sponsorizări",
        paragraphs: [
          "Sponsorizarea se realizează în baza unui contract de sponsorizare în formă scrisă, care trebuie să prevadă obiectul, valoarea și durata sponsorizării, precum și drepturile și obligațiile părților.",
          "Sponsorizarea nu este echivalentă cu achiziția de publicitate, iar eventualele elemente de vizibilitate sau comunicare trebuie stabilite în limitele permise de lege și prin contract."
        ]
      },
      {
        id: "facilitati-fiscale",
        title: "7. Facilități fiscale pentru sponsori",
        paragraphs: [
          "Asociația poate informa publicul despre mecanismele fiscale existente, însă nu garantează tratamentul fiscal individual al unui sponsor.",
          "Pentru contribuabilii plătitori de impozit pe profit, Codul fiscal permite, în condițiile legii, scăderea sponsorizărilor din impozitul pe profit datorat în limita valorii minime dintre 0,75% din cifra de afaceri și 20% din impozitul pe profit datorat.",
          "Pentru sponsorizările către entități fără scop lucrativ, facilitatea fiscală este condiționată, între altele, de înscrierea beneficiarului în Registrul entităților/unităților de cult pentru care se acordă deduceri fiscale la data încheierii contractului.",
          "Regimul fiscal se poate modifica. Fiecare sponsor trebuie să verifice aplicabilitatea facilității împreună cu propriul contabil sau consultant fiscal. Textele de pe site nu constituie consultanță fiscală individuală."
        ]
      },
      {
        id: "confirmari-documente",
        title: "8. Confirmări și documente",
        paragraphs: [
          "La solicitare și în limitele legale, Asociația poate furniza informațiile necesare identificării beneficiarului și documentele aferente sponsorizării.",
          "Pentru donații, documentele disponibile depind de metoda de plată și de obligațiile financiar-contabile aplicabile."
        ]
      },
      {
        id: "rambursari",
        title: "9. Rambursări și plăți efectuate din eroare",
        paragraphs: [
          "O donație efectuată voluntar și corect nu este o plată pentru un produs și, în principiu, nu este supusă unui drept general de retur.",
          "Dacă o sumă a fost transferată din eroare, de două ori, într-un cuantum evident greșit sau există o suspiciune de fraudă, persoana trebuie să contacteze rapid Asociația la contact@starsim.ro. Cererea va fi analizată în funcție de circumstanțe, documentele bancare și legislația aplicabilă."
        ]
      },
      {
        id: "integritate",
        title: "10. Integritate",
        paragraphs: [
          "Asociația își rezervă dreptul de a refuza sau restitui o contribuție atunci când acceptarea acesteia ar încălca legea, statutul, politicile interne, ar crea un conflict grav cu misiunea Asociației ori ar exista suspiciuni rezonabile privind proveniența ilicită a fondurilor."
        ]
      },
      {
        id: "cadru-juridic-donatii",
        title: "Cadru juridic principal avut în vedere",
        listItems: [
          "Legea nr. 32/1994 privind sponsorizarea;",
          "Legea nr. 227/2015 privind Codul fiscal, inclusiv art. 25 alin. (4) lit. i), în forma aplicabilă;",
          "reglementările financiar-contabile și fiscale aplicabile asociațiilor și fundațiilor."
        ]
      }
    ]
  },
  {
    key: "photo-video-policy",
    slug: "foto-video",
    title: "Politica privind fotografiile, înregistrările video și dreptul la imagine",
    navLabel: "Foto-video și imagine",
    excerpt:
      "Principiile de utilizare responsabilă a materialelor foto-video realizate în cadrul activităților Star Sim, cu protecție specială pentru copii și adolescenți.",
    lastUpdated: "Septembrie 2026",
    sections: [
      {
        id: "scop-foto-video",
        title: "1. Scop",
        paragraphs: [
          "Asociația Star Sim poate documenta activitățile, evenimentele și proiectele sale prin fotografii, înregistrări video și audio.",
          "Prezenta politică stabilește principiile de utilizare responsabilă a acestor materiale, cu atenție specială pentru copii și adolescenți."
        ]
      },
      {
        id: "principii-foto-video",
        title: "2. Principii",
        listItems: [
          "respectarea demnității, vieții private și dreptului la propria imagine;",
          "informarea participanților, într-o manieră adecvată contextului, atunci când se realizează fotografii sau înregistrări;",
          "utilizarea numai a materialelor adecvate scopului educațional, informativ, de raportare sau promovare legitimă a activităților;",
          "minimizarea informațiilor care permit identificarea sau localizarea inutilă a unui copil;",
          "evitarea imaginilor care pot pune participantul într-o situație vulnerabilă, umilitoare, riscantă sau care poate afecta demnitatea sa."
        ]
      },
      {
        id: "adulti-foto-video",
        title: "3. Participanți adulți",
        paragraphs: [
          "Pentru adulți, temeiul juridic al utilizării imaginii se stabilește în funcție de context, scop, caracterul public sau privat al activității și natura materialului.",
          "Atunci când utilizarea se bazează pe consimțământ, acesta trebuie să fie informat, specific și revocabil pentru utilizările viitoare."
        ]
      },
      {
        id: "minori-foto-video",
        title: "4. Minori",
        paragraphs: [
          "Pentru materiale în care un minor este identificabil și care sunt destinate promovării publice, social media, materialelor de campanie sau altor utilizări care nu sunt strict necesare desfășurării activității, Asociația va utiliza o procedură de acord adecvată și, când este necesar, va solicita consimțământul părintelui sau reprezentantului legal.",
          "Acordul privind imaginea trebuie separat, pe cât posibil, de acordul de participare la activitate. Refuzul fotografierii sau publicării imaginii nu trebuie să conducă automat la excluderea copilului din activitate, dacă aceasta poate fi organizată rezonabil fără utilizarea imaginii sale."
        ]
      },
      {
        id: "publicare-identificare",
        title: "5. Publicare și identificare",
        paragraphs: [
          "În cazul minorilor, nu vom publica în mod obișnuit numele complet împreună cu fotografia, școala/clasa exactă, adresa, datele de contact sau alte informații care facilitează identificarea ori localizarea, dacă acestea nu sunt necesare și nu există un temei juridic corespunzător."
        ]
      },
      {
        id: "canale-utilizare",
        title: "6. Canale de utilizare",
        paragraphs: [
          "În funcție de acordul și temeiul aplicabil, materialele pot fi utilizate pe starsim.ro, paginile oficiale Star Sim din social media, materiale de prezentare, rapoarte de activitate, comunicate, materiale educaționale și documentația proiectelor.",
          "Utilizarea pentru campanii plătite sau alte scopuri distincte trebuie evaluată separat."
        ]
      },
      {
        id: "retragere-consimtamant",
        title: "7. Retragerea consimțământului și solicitări",
        paragraphs: [
          "Atunci când utilizarea se bazează pe consimțământ, acesta poate fi retras pentru utilizările viitoare. Retragerea nu afectează legalitatea utilizărilor anterioare retragerii și poate să nu permită retragerea completă a unor materiale deja tipărite ori preluate legitim de terți înainte de retragere.",
          "Asociația va depune eforturi rezonabile pentru eliminarea materialelor din canalele pe care le controlează, atunci când cererea este justificată."
        ]
      },
      {
        id: "contact-foto-video",
        title: "8. Contact",
        paragraphs: [
          "Solicitările privind fotografiile, materialele video sau dreptul la imagine pot fi transmise la contact@starsim.ro."
        ]
      },
      {
        id: "cadru-juridic-foto-video",
        title: "Cadru juridic principal avut în vedere",
        listItems: [
          "Regulamentul (UE) 2016/679 (GDPR), atunci când imaginea sau vocea constituie date cu caracter personal;",
          "Codul civil, inclusiv dispozițiile privind viața privată, demnitatea și dreptul la propria imagine (art. 71-75)."
        ]
      }
    ]
  },
  {
    key: "safeguarding-policy",
    slug: "protectia-copiilor",
    title: "Politica de protecție a copiilor și adolescenților (Safeguarding)",
    navLabel: "Protecția copiilor",
    excerpt:
      "Angajamentul ferm al Asociației Star Sim pentru un mediu sigur, respectuos, incluziv și adecvat vârstei în toate activitățile cu minori.",
    lastUpdated: "Septembrie 2026",
    sections: [
      {
        id: "angajament-safeguarding",
        title: "1. Angajamentul Star Sim",
        paragraphs: [
          "Asociația Star Sim urmărește ca activitățile destinate copiilor și adolescenților să se desfășoare într-un mediu sigur, respectuos, incluziv și adecvat vârstei.",
          "Protecția participantului prevalează asupra interesului de promovare, documentare sau eficiență operațională."
        ]
      },
      {
        id: "cui-se-aplica",
        title: "2. Cui se aplică",
        paragraphs: [
          "Politica se aplică, în măsura relevantă, membrilor Asociației, voluntarilor, angajaților, colaboratorilor și persoanelor care desfășoară activități în numele Star Sim sau au contact cu minori în cadrul programelor organizate ori coorganizate de Asociație."
        ]
      },
      {
        id: "principii-conduita",
        title: "3. Principii de conduită",
        listItems: [
          "comunicare respectuoasă, fără intimidare, umilire, discriminare, hărțuire sau limbaj sexualizat;",
          "evitarea contactului fizic nepotrivit și a situațiilor care pot fi interpretate rezonabil ca abuzive sau coercitive;",
          "evitarea, pe cât posibil, a situațiilor izolate unu-la-unu cu un minor în afara unui cadru vizibil și justificat de activitate;",
          "respectarea regulilor școlii, instituției partenere sau locației în care se desfășoară activitatea;",
          "protejarea datelor personale, imaginii și informațiilor despre participanți;",
          "interzicerea solicitării de secrete personale, a contactelor nepotrivite pe canale private și a relațiilor care depășesc cadrul educațional/profesional;",
          "interzicerea consumului de alcool sau substanțe care afectează capacitatea de supraveghere în timpul activităților cu minori."
        ]
      },
      {
        id: "supraveghere-organizare",
        title: "4. Supraveghere și organizare",
        paragraphs: [
          "Activitățile vor fi organizate cu un nivel de supraveghere adecvat vârstei, numărului de participanți, locației, orei și naturii activității.",
          "Pentru activități nocturne, în aer liber sau cu deplasare, organizatorii vor acorda atenție suplimentară accesului, iluminatului, punctelor de întâlnire, preluării minorilor, condițiilor meteo și situațiilor de urgență."
        ]
      },
      {
        id: "fotografiere-publicare",
        title: "5. Fotografiere și publicare",
        paragraphs: [
          "Fotografierea și publicarea imaginilor minorilor se fac potrivit Politicii privind fotografiile, înregistrările video și dreptul la imagine.",
          "Persoanele implicate în activități nu trebuie să publice pe conturile personale materiale cu minori obținute în cadrul programului fără autorizarea corespunzătoare."
        ]
      },
      {
        id: "semnalare-problema",
        title: "6. Semnalarea unei probleme",
        paragraphs: [
          "Orice suspiciune rezonabilă privind comportamente abuzive, hărțuire, risc pentru siguranța unui copil ori încălcarea gravă a acestei politici trebuie comunicată prompt conducerii Asociației.",
          "Dacă situația indică un pericol imediat sau o posibilă faptă penală, vor fi contactate instituțiile competente conform legii."
        ]
      },
      {
        id: "confidentialitate-safeguarding",
        title: "7. Confidențialitate și necesitatea de a ști",
        paragraphs: [
          "Sesizările privind siguranța unui minor se tratează cu discreție și se comunică numai persoanelor care trebuie să cunoască informațiile pentru protejarea participantului, analiza situației sau îndeplinirea obligațiilor legale.",
          "Confidențialitatea nu poate fi invocată pentru a împiedica raportarea către autorități atunci când legea o impune."
        ]
      },
      {
        id: "incalcare-politica",
        title: "8. Încălcarea politicii",
        paragraphs: [
          "Asociația poate limita sau suspenda accesul unei persoane la activități, poate înceta colaborarea și poate sesiza autoritățile competente atunci când există motive rezonabile legate de siguranța participanților sau încălcări grave ale regulilor.",
          "Măsurile se adoptă proporțional cu situația și cu respectarea legii."
        ]
      },
      {
        id: "contact-safeguarding",
        title: "9. Contact",
        paragraphs: [
          "Pentru sesizări sau întrebări privind protecția copiilor: contact@starsim.ro. Asociația poate desemna ulterior o persoană responsabilă de safeguarding, caz în care datele acesteia vor fi publicate în această secțiune."
        ]
      }
    ]
  },
  {
    key: "transparency-policy",
    slug: "transparenta",
    title: "Transparență și date legale",
    navLabel: "Transparență",
    excerpt:
      "Datele oficiale de identificare juridică și fiscală, contul bancar oficial și principiile de transparență ale Asociației Star Sim.",
    lastUpdated: "Septembrie 2026",
    sections: [
      {
        id: "scop-transparenta",
        title: "1. Scop",
        paragraphs: [
          "Această pagină este publicată în secțiunea «Transparență» și este utilă pentru donatori, sponsori, școli, instituții și parteneri.",
          "Ea oferă acces direct la datele de identificare și legale ale Asociației Star Sim și nu înlocuiește documentele oficiale ale organizației."
        ]
      },
      {
        id: "date-identificare-legale",
        title: "2. Date de identificare și date legale",
        listItems: [
          "Denumire: Asociația Star Sim;",
          "Formă juridică: Persoană juridică română fără scop patrimonial (Asociație);",
          "Cod de Identificare Fiscală (CIF): 55521510;",
          "Sediu social: Str. Viceamiral Ioan Murgescu 56, Constanța, România;",
          "E-mail de contact: contact@starsim.ro;",
          "Telefon: +40 730 991 523;",
          "Reprezentant legal: Gîrdeanu Ștefan - Victor (Președinte);"
        ]
      },
      {
        id: "conturi-bancare",
        title: "3. Cont bancar oficial pentru donații și sponsorizări",
        paragraphs: [
          "Pentru donații directe, sponsorizări corporative și contribuții financiare prin transfer bancar:"
        ],
        listItems: [
          "Cod IBAN (RON): RO05 RNCB 0296 1871 7895 0001",
          "Banca: Banca Comercială Română (BCR)",
          "Beneficiar: Asociația Star Sim",
          "Cod de Identificare Fiscală (CIF): 55521510",
          "Monedă: RON (Lei)",
          "Mențiune plată recomandată: «Donație - Asociația Star Sim» (sau mențiunea proiectului susținut)"
        ]
      },
      {
        id: "documente-transparenta",
        title: "4. Documente și informare publică",
        paragraphs: [
          "În conformitate cu statutul și legislația aplicabilă, Asociația pune la dispoziție următoarele categorii de documente și raportări:"
        ],
        listItems: [
          "statutul / actul constitutiv - disponibil la cerere sau publicat conform deciziei Asociației;",
          "rapoarte anuale de activitate ale asociației;",
          "situații financiare / raportări publice, în forma și măsura în care se asigură transparența activităților;",
          "principalii parteneri și sponsori, numai atunci când există dreptul de a le publica denumirea și/sau logo-ul."
        ]
      },
      {
        id: "protectie-date-confidentiale",
        title: "5. Protecția datelor confidențiale (Atenție)",
        paragraphs: [
          "Nu se publică CNP-uri, semnături, copii după acte de identitate, date bancare personale, adrese private care nu reprezintă sediul public al Asociației sau alte date care nu sunt necesare scopului de transparență."
        ]
      }
    ]
  }
];

const aliasMap: Record<string, string> = {
  "termeni": "termeni-si-conditii",
  "termeni-conditii": "termeni-si-conditii",
  "confidentialitate": "politica-de-confidentialitate",
  "politica-confidentialitate": "politica-de-confidentialitate",
  "privacy": "politica-de-confidentialitate",
  "politica-cookies": "cookies",
  "cookie": "cookies",
  "protectia-datelor": "politica-de-confidentialitate",
  "donatii": "politica-donatii-sponsorizari",
  "sponsorizari": "politica-donatii-sponsorizari",
  "donatii-si-sponsorizari": "politica-donatii-sponsorizari",
  "foto": "foto-video",
  "video": "foto-video",
  "politica-foto-video": "foto-video",
  "safeguarding": "protectia-copiilor",
  "protectie-copii": "protectia-copiilor"
};

export function getLegalPageDefinitionBySlug(slug: string): LegalPageDefinition | undefined {
  const canonicalSlug = aliasMap[slug] || slug;
  return legalPageDefaults.find((p) => p.slug === canonicalSlug || p.key === canonicalSlug);
}

export function legalDefinitionToTiptap(page: LegalPageDefinition) {
  const contentNodes: any[] = [];

  for (const section of page.sections) {
    if (section.title) {
      contentNodes.push({
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: section.title }]
      });
    }

    if (section.blocks && section.blocks.length > 0) {
      for (const block of section.blocks) {
        if (block.type === "paragraph" && block.text) {
          contentNodes.push({
            type: "paragraph",
            content: [{ type: "text", text: block.text }]
          });
        } else if (block.type === "subheading" && block.text) {
          contentNodes.push({
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: block.text }]
          });
        } else if (block.type === "list" && block.items && block.items.length > 0) {
          contentNodes.push({
            type: "bulletList",
            content: block.items.map((item) => ({
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: item }]
                }
              ]
            }))
          });
        } else if (block.type === "notice" && block.text) {
          contentNodes.push({
            type: "blockquote",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: block.text }]
              }
            ]
          });
        }
      }
    }

    if (section.paragraphs && section.paragraphs.length > 0) {
      for (const para of section.paragraphs) {
        contentNodes.push({
          type: "paragraph",
          content: [{ type: "text", text: para }]
        });
      }
    }

    if (section.listItems && section.listItems.length > 0) {
      contentNodes.push({
        type: "bulletList",
        content: section.listItems.map((item) => ({
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: item }]
            }
          ]
        }))
      });
    }
  }

  return {
    type: "doc",
    content: contentNodes
  };
}

export function getLegalFallback(slug: string) {
  const pageDef = getLegalPageDefinitionBySlug(slug);
  if (!pageDef) return null;

  return {
    title: pageDef.title,
    slug: pageDef.slug,
    excerpt: pageDef.excerpt,
    status: "PUBLISHED",
    content: legalDefinitionToTiptap(pageDef),
    metaTitle: `${pageDef.title} | Asociația Star Sim`,
    metaDescription: pageDef.excerpt,
    robotsIndex: true,
    robotsFollow: true
  };
}
