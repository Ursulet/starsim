export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  listItems?: string[];
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
  provider: string;
  purpose: string;
  category: "Strict necesar" | "Funcțional" | "Analiză / Statistică" | "Marketing";
  duration: string;
  domain: string;
  type: "Cookie" | "Web Storage (localStorage)";
};

export const REAL_COOKIES_INVENTORY: CookieInventoryItem[] = [
  {
    name: "starsim-cookie-consent",
    provider: "starsim.ro",
    purpose: "Stochează opțiunea și starea de consimțământ a vizitatorului privind utilizarea cookie-urilor.",
    category: "Strict necesar",
    duration: "Persistent (până la ștergerea datelor din browser)",
    domain: "starsim.ro (Local)",
    type: "Web Storage (localStorage)"
  },
  {
    name: "authjs.session-token / __Secure-authjs.session-token",
    provider: "starsim.ro (NextAuth)",
    purpose: "Asigură menținerea sesiunii criptate și securizate de autentificare pentru utilizatorii autorizați (administratori/editori).",
    category: "Strict necesar",
    duration: "24 ore / durata sesiunii active",
    domain: "starsim.ro (First-party, HTTPOnly)",
    type: "Cookie"
  },
  {
    name: "authjs.csrf-token / __Host-authjs.csrf-token",
    provider: "starsim.ro (NextAuth)",
    purpose: "Protejează formularele de logare împotriva atacurilor de tip Cross-Site Request Forgery (CSRF).",
    category: "Strict necesar",
    duration: "Sesiune",
    domain: "starsim.ro (First-party, HTTPOnly)",
    type: "Cookie"
  },
  {
    name: "authjs.callback-url",
    provider: "starsim.ro (NextAuth)",
    purpose: "Memorează URL-ul de redirecționare dorit după finalizarea cu succes a procesului de autentificare.",
    category: "Funcțional",
    duration: "Sesiune",
    domain: "starsim.ro (First-party)",
    type: "Cookie"
  }
];

export const legalPageDefaults: LegalPageDefinition[] = [
  {
    key: "privacy-policy",
    slug: "politica-de-confidentialitate",
    title: "Politica de confidențialitate",
    navLabel: "Confidențialitate",
    excerpt: "Informații detaliate privind modul în care Asociația Star Sim prelucrează și protejează datele cu caracter personal, în conformitate cu Regulamentul (UE) 2016/679 (GDPR).",
    lastUpdated: "Septembrie 2026",
    sections: [
      {
        id: "operator",
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
          "Prezenta politică explică ce date cu caracter personal putem prelucra, în ce scopuri, pe ce temeiuri juridice, cui le putem divulga, cât timp le păstrăm și ce drepturi au persoanele vizate.",
          "Politica se aplică vizitatorilor site-ului, persoanelor care ne contactează, se abonează la comunicări, se înscriu la activități, participă la programe, donează, sponsorizează, colaborează sau se oferă voluntari, în măsura în care datele sunt colectate prin sau în legătură cu starsim.ro."
        ]
      },
      {
        id: "categorii-date",
        title: "3. Categoriile de date pe care le putem prelucra",
        paragraphs: [
          "În funcție de interacțiunea cu asociația noastră, colectăm și prelucrăm următoarele categorii de date:"
        ],
        listItems: [
          "Date de identificare și contact: nume, prenume, adresă de e-mail, număr de telefon;",
          "Date furnizate prin formulare: subiectul solicitării, mesajul și orice alte informații pe care persoana alege să ni le transmită;",
          "Date privind înscrierea și participarea la programe, ateliere, evenimente sau activități de voluntariat;",
          "Date privind reprezentantul legal al unui minor, atunci când sunt necesare pentru înscriere, consimțământ, comunicare sau siguranță;",
          "Date aferente donațiilor și sponsorizărilor, în măsura în care rezultă din documentele bancare, contractuale ori financiar-contabile (nu solicităm și nu stocăm date complete ale cardurilor bancare prin site);",
          "Imagini, voce și materiale foto-video realizate în cadrul activităților, numai în condițiile politicii dedicate și ale temeiului juridic aplicabil;",
          "Date tehnice și de securitate: adresă IP, informații despre browser și dispozitiv, data și ora accesării, loguri tehnice, evenimente de securitate;",
          "Preferințe privind cookie-urile și, dacă sunt implementate, date de analiză sau măsurare a traficului, în condițiile Politicii de cookies."
        ]
      },
      {
        id: "temeiuri-juridice",
        title: "4. Scopurile și temeiurile juridice",
        paragraphs: [
          "Prelucrăm date numai atunci când există un scop determinat și un temei juridic valabil conform Regulamentului (UE) 2016/679 (GDPR):",
          "• Răspuns la solicitări și comunicare: pentru a răspunde mesajelor, întrebărilor și cererilor primite. Temei: demersuri la solicitarea persoanei, executarea unui raport contractual sau interesul legitim de a gestiona comunicarea asociației.",
          "• Înscriere și organizare de activități: pentru administrarea participării la programe, ateliere, evenimente și activități. Temei: executarea unui contract/demersuri precontractuale, interes legitim și, când este necesar, consimțământ.",
          "• Newsletter și comunicări educaționale: pentru transmiterea de noutăți, invitații și informații despre proiecte. Temei: consimțământul persoanei, care poate fi retras oricând.",
          "• Donații, sponsorizări și relația cu partenerii: pentru evidență, confirmare, comunicare, executarea contractelor și îndeplinirea obligațiilor financiar-contabile. Temei: executarea contractului, obligație legală și, după caz, interes legitim.",
          "• Siguranță și funcționare tehnică: pentru protejarea site-ului, prevenirea abuzului, diagnosticarea erorilor și administrarea infrastructurii. Temei: interesul legitim al Asociației de a asigura securitatea și funcționarea serviciilor sale.",
          "• Fotografii și materiale video: pentru documentarea, raportarea și comunicarea activităților, în condițiile Politicii privind fotografiile și materialele video. Pentru materiale promoționale cu persoane identificabile și, în special, pentru minori, se utilizează consimțământul explicit."
        ]
      },
      {
        id: "date-minori",
        title: "5. Date privind minorii",
        paragraphs: [
          "Star Sim desfășoară activități educaționale în care participă copii și adolescenți. Colectăm numai datele necesare organizării, comunicării și siguranței activității. Atunci când natura prelucrării o impune, solicitările și acordurile sunt gestionate prin părinte sau reprezentant legal.",
          "Participarea la o activitate educațională și acordul privind utilizarea imaginii nu sunt tratate ca un singur consimțământ obligatoriu. Refuzul utilizării imaginii, atunci când aceasta se bazează pe consimțământ, nu împiedică participarea copilului la activitate."
        ]
      },
      {
        id: "destinatari",
        title: "6. Destinatarii datelor și furnizorii",
        paragraphs: [
          "Accesul la date este limitat strict la persoanele autorizate din cadrul asociației care au nevoie de acestea pentru îndeplinirea atribuțiilor. În funcție de serviciile utilizate, datele pot fi prelucrate de furnizori tehnici de încredere:",
          "• Furnizorul de găzduire și administrare tehnică a infrastructurii web;",
          "• Furnizorul serviciilor de e-mail și comunicare securizată;",
          "• Furnizorul serviciului de newsletter, dacă este utilizat;",
          "• Instituții de credit și procesatori bancari, pentru confirmarea transferurilor de donații sau sponsorizări;",
          "• Contabil, auditor sau consultanți juridici, în limitele strict necesare îndeplinirii obligațiilor legale;",
          "• Autorități și instituții publice, numai atunci când divulgarea este expres impusă de legislația în vigoare."
        ]
      },
      {
        id: "transferuri-internationale",
        title: "7. Transferuri în afara Spațiului Economic European (SEE)",
        paragraphs: [
          "Datele cu caracter personal sunt stocate pe servere localizate în Uniunea Europeană. Dacă un furnizor implicat în funcționarea site-ului prelucrează date în afara SEE, Asociația va utiliza garanțiile legale adecvate prevăzute de GDPR, cum ar fi decizii de adecvare ale Comisiei Europene sau clauze contractuale standard (SCC)."
        ]
      },
      {
        id: "perioada-pastrare",
        title: "8. Perioade de păstrare",
        paragraphs: [
          "Nu păstrăm datele mai mult decât este necesar scopului prelucrării:",
          "• Solicitări generale de contact: până la 24 de luni de la soluționare;",
          "• Newsletter: până la retragerea consimțământului prin linkul de dezabonare;",
          "• Înscrieri la ateliere și evenimente: pe durata desfășurării activității și perioada necesară raportării educaționale;",
          "• Documente financiar-contabile și contracte de sponsorizare: potrivit termenelor legale de arhivare fiscală (5 sau 10 ani, conform legii);",
          "• Loguri tehnice și de securitate: proporțional cu necesitățile de securitate tehnică."
        ]
      },
      {
        id: "drepturi",
        title: "9. Drepturile persoanelor vizate",
        paragraphs: [
          "Conform GDPR, beneficiați de dreptul de acces la date, rectificare, ștergere («dreptul de a fi uitat»), restricționare a prelucrării, portabilitate, opoziție și dreptul de a nu face obiectul unei decizii automate.",
          "Vă puteți retrage consimțământul în orice moment, fără a afecta legalitatea prelucrării efectuate anterior retragerii.",
          "Pentru exercitarea acestor drepturi, ne puteți contacta la contact@starsim.ro. De asemenea, aveți dreptul de a depune plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP) – www.dataprotection.ro."
        ]
      },
      {
        id: "profilare",
        title: "10. Decizii automate și profilare",
        paragraphs: [
          "Asociația Star Sim nu utilizează prin intermediul starsim.ro procese decizionale exclusiv automatizate și nu realizează profilări care să producă efecte juridice asupra dumneavoastră."
        ]
      },
      {
        id: "securitate",
        title: "11. Securitatea datelor",
        paragraphs: [
          "Implementăm măsuri tehnice și organizatorice proporționale (criptare HTTPS/TLS, acces securizat prin roluri, hashing pentru parole, limitare de acces) pentru a preveni accesul neautorizat, pierderea sau divulgarea datelor."
        ]
      },
      {
        id: "cadru-juridic",
        title: "12. Cadru juridic aplicabil",
        paragraphs: [
          "Prezenta politică este guvernată de Regulamentul (UE) 2016/679 (GDPR), Legea nr. 190/2018 privind măsuri de punere în aplicare a GDPR și Legea nr. 506/2004 privind comunicațiile electronice."
        ]
      }
    ]
  },
  {
    key: "cookies-policy",
    slug: "cookies",
    title: "Politica de cookies",
    navLabel: "Cookies",
    excerpt: "Transparență completă privind cookie-urile și tehnologiile de stocare utilizate pe starsim.ro, durata lor de viață și modul în care vă puteți gestiona preferințele.",
    lastUpdated: "Septembrie 2026",
    sections: [
      {
        id: "scop",
        title: "1. Scop",
        paragraphs: [
          "Prezenta politică explică utilizarea cookie-urilor și a tehnologiilor similare (local storage) pe starsim.ro. Ea trebuie citită împreună cu Politica de confidențialitate.",
          "Configurația publicată pe acest site reflectă cu exactitate inventarul tehnic real al cookie-urilor care rulează efectiv pe platformă."
        ]
      },
      {
        id: "ce-sunt",
        title: "2. Ce sunt cookie-urile și tehnologiile similare",
        paragraphs: [
          "Cookie-urile sunt fișiere text de mici dimensiuni stocate pe dispozitivul dumneavoastră (calculator, telefon, tabletă) atunci când navigați pe un site web.",
          "Tehnologiile similare includ Web Storage (localStorage și sessionStorage), care permit memorarea unor preferințe de navigare direct în browserul dumneavoastră, fără a transmite automat aceste date către server la fiecare cerere HTTP."
        ]
      },
      {
        id: "categorii",
        title: "3. Categorii de cookie-uri",
        paragraphs: [
          "• Strict necesare: Asigură funcționarea de bază a site-ului, securitatea formularelor, menținerea sesiunii securizate de administrare și memorarea opțiunii de consimțământ. Acestea nu pot fi dezactivate fără a împiedica funcționarea site-ului și sunt exceptate legal de la obligația consimțământului prealabil.",
          "• Funcționale: Memorează preferințe specifice ale utilizatorului pentru o experiență mai facilă (ex: redirecționare după logare).",
          "• Analiză / Statistică: Ajută la înțelegerea modului în care este utilizat site-ul în mod agregat și anonim. Dacă sunt implementate, necesită consimțământul prealabil.",
          "• Marketing și publicitate: Utilizate pentru măsurarea campaniilor sau personalizare publicitară. Necesită consimțământul explicit al utilizatorului."
        ]
      },
      {
        id: "consimtamant",
        title: "4. Consimțământ și control",
        paragraphs: [
          "La prima accesare a site-ului, vi se prezintă un banner de informare și consimțământ.",
          "Pentru orice cookie sau tehnologie care nu este strict necesară, aceasta nu este încărcată înainte ca utilizatorul să își exprime opțiunea. Opțiunile nu sunt prebifate.",
          "Puteți oricând să vă revizuiți sau să vă modificați preferințele de consimțământ direct din panoul de mai jos sau prin setările browserului dumneavoastră."
        ]
      },
      {
        id: "terti",
        title: "5. Cookie-uri ale terților și servicii externe",
        paragraphs: [
          "Site-ul starsim.ro este conceput cu respect maxim pentru viața privată. La data prezentei politici, site-ul NU integrează scripturi terțe invazive, pixeli publicitari (Meta Pixel, TikTok Pixel) sau servicii de urmărire comportamentală (Google Analytics, reCAPTCHA terț).",
          "Fonturile utilizate sunt optimizate și servite local sau prin infrastructura Next.js cu protecție a intimității."
        ]
      },
      {
        id: "tabel-cookies",
        title: "6. Tabelul tehnic al cookie-urilor utilizate pe starsim.ro",
        paragraphs: [
          "Următorul tabel prezintă inventarul tehnic real și verificat al fișierelor și identificatorilor utilizați pe starsim.ro:"
        ]
      },
      {
        id: "setari-browser",
        title: "7. Setările browserului",
        paragraphs: [
          "Puteți controla, bloca sau șterge cookie-urile direct din setările browserului dumneavoastră:",
          "• Google Chrome: Setări > Confidențialitate și securitate > Module cookie și alte date privind site-urile;",
          "• Mozilla Firefox: Opțiuni > Confidențialitate și securitate > Cookie-uri și date de site;",
          "• Apple Safari: Preferințe > Confidențialitate > Gestionare date site web;",
          "• Microsoft Edge: Setări > Cookie-uri și permisiuni de site.",
          "Blocarea tuturor cookie-urilor, inclusiv a celor strict necesare, poate conduce la imposibilitatea autentificării în conturile de administrare."
        ]
      },
      {
        id: "actualizari",
        title: "8. Actualizări ale politicii",
        paragraphs: [
          "Prezenta politică va fi actualizată prompt ori de câte ori sunt adăugate, eliminate sau modificate servicii tehnice care implică stocare de date pe terminalul utilizatorului.",
          "Cadru juridic: Legea nr. 506/2004 privind comunicațiile electronice (art. 4 alin. 5-6) și Regulamentul (UE) 2016/679 (GDPR)."
        ]
      }
    ]
  },
  {
    key: "terms",
    slug: "termeni-si-conditii",
    title: "Termeni și condiții de utilizare",
    navLabel: "Termeni și condiții",
    excerpt: "Regulile generale și condițiile legale aplicabile vizitării și utilizării site-ului starsim.ro, precum și participării la activitățile Asociației Star Sim.",
    lastUpdated: "Septembrie 2026",
    sections: [
      {
        id: "despre-site",
        title: "1. Despre site și asociație",
        paragraphs: [
          "Site-ul starsim.ro este proprietatea și este administrat de Asociația Star Sim, persoană juridică română fără scop patrimonial, având CIF 55521510, cu sediul în Str. Viceamiral Ioan Murgescu 56, Constanța, România.",
          "Reprezentant legal: Gîrdeanu Ștefan - Victor (Președinte).",
          "Prin accesarea și utilizarea site-ului, vizitatorul confirmă că a luat cunoștință de prezentele condiții și le acceptă integral."
        ]
      },
      {
        id: "scop-site",
        title: "2. Scopul site-ului",
        paragraphs: [
          "starsim.ro prezintă activitatea asociației, programele educaționale STEM și de astronomie, atelierele pentru copii și tineri, evenimentele publice sub cerul liber, oportunitățile de implicare, voluntariat, donații și parteneriate de sponsorizare conforme statutului organizației."
        ]
      },
      {
        id: "informatii-publicate",
        title: "3. Informațiile publicate",
        paragraphs: [
          "Depunem toate eforturile rezonabile pentru ca informațiile prezentate pe site să fie corecte și actualizate. Totuși, detaliile privind evenimentele, datele, orele, locațiile, capacitatea sau partenerii pot suferi modificări operaționale.",
          "Publicarea unui eveniment nu constituie o garanție absolută a desfășurării acestuia în forma inițial anunțată."
        ]
      },
      {
        id: "activitati-astronomice",
        title: "4. Activități astronomice și evenimente în aer liber",
        paragraphs: [
          "Observațiile astronomice și activitățile nocturne în aer liber depind esențial de condiții obiective care nu pot fi controlate de organizator: vreme, plafon de nori, precipitații, transparență atmosferică, siguranță locală și stabilitate a echipamentelor optice.",
          "Asociația își rezervă dreptul de a modifica, amâna, reloca sau anula o activitate astronomică atunci când condițiile meteo sau de siguranță nu permit o desfășurare adecvată a acesteia."
        ]
      },
      {
        id: "inscriere-participare",
        title: "5. Înscriere și participare",
        paragraphs: [
          "Participarea la anumite ateliere poate necesita înscriere prealabilă, confirmarea locului sau acordul privind regulile specifice ale evenimentului.",
          "Pentru minori, înscrierea și participarea se fac cu implicarea și acordul părintelui sau reprezentantului legal."
        ]
      },
      {
        id: "conduita",
        title: "6. Conduita utilizatorilor",
        paragraphs: [
          "Este strict interzisă utilizarea site-ului pentru transmiterea de conținut ilegal, defăimător, abuziv, discriminatoriu, sau care poate periclita securitatea platformei.",
          "Nu sunt permise încercările de acces neautorizat, scanarea de vulnerabilități, atacurile cibernetice sau perturbarea funcționării infrastructurii tehnice."
        ]
      },
      {
        id: "proprietate-intelectuala",
        title: "7. Proprietate intelectuală",
        paragraphs: [
          "Textele, materialele educaționale, identitatea vizuală, siglele, fotografiile și elementele grafice publicate pe starsim.ro sunt protejate de legislația privind drepturile de autor și aparțin Asociației Star Sim sau partenerilor săi.",
          "Reproducerea sau utilizarea în scopuri comerciale fără acordul scris prealabil al asociației este strict interzisă."
        ]
      },
      {
        id: "linkuri-servicii-externe",
        title: "8. Linkuri și servicii externe",
        paragraphs: [
          "Site-ul poate conține linkuri către pagini web operate de terți (parteneri, instituții, surse educaționale). Asociația nu controlează conținutul sau politicile acelor site-uri și nu își asumă răspunderea pentru acestea."
        ]
      },
      {
        id: "donatii-sponsorizari",
        title: "9. Donații și sponsorizări",
        paragraphs: [
          "Contribuțiile financiare sunt guvernate de Politica privind donațiile și sponsorizările. Sponsorizările din partea persoanelor juridice se realizează pe baza contractelor scrise de sponsorizare, în condițiile Legii nr. 32/1994 și ale Codului Fiscal."
        ]
      },
      {
        id: "limitare-raspundere",
        title: "10. Limitarea răspunderii",
        paragraphs: [
          "Materialele informative sunt puse la dispoziție cu bună-credință. Asociația nu răspunde pentru eventuale daune indirecte rezultate din indisponibilități tehnice temporare ale site-ului, erori neintenționate sau modificări de program dictate de forță majoră ori condiții meteorologice."
        ]
      },
      {
        id: "lege-contact",
        title: "11. Legea aplicabilă și contact",
        paragraphs: [
          "Prezentele condiții sunt guvernate de legislația română în vigoare. Pentru orice întrebare sau sesizare legată de site sau activitățile noastre, ne puteți contacta la contact@starsim.ro sau la telefon +40 730 991 523."
        ]
      }
    ]
  },
  {
    key: "donations-sponsorships-policy",
    slug: "politica-donatii-sponsorizari",
    title: "Politica privind donațiile și sponsorizările",
    navLabel: "Donații și sponsorizări",
    excerpt: "Cadrul de transparență, regulile financiare și facilitățile fiscale aplicabile donațiilor individuale și sponsorizărilor corporative către Asociația Star Sim.",
    lastUpdated: "Septembrie 2026",
    sections: [
      {
        id: "scop",
        title: "1. Scop",
        paragraphs: [
          "Asociația Star Sim primește donații, sponsorizări și alte forme legale de sprijin financiar sau material pentru realizarea scopului său statutar: promovarea astronomiei, a educației STEM și a științei în rândul copiilor și tinerilor.",
          "Prezenta politică stabilește regulile aplicabile contribuțiilor inițiate sau prezentate prin starsim.ro."
        ]
      },
      {
        id: "donatii-individuale",
        title: "2. Donații individuale",
        paragraphs: [
          "Donațiile reprezintă contribuții voluntare și nerambursabile, efectuate fără a pretinde o contraprestație sau un serviciu în schimb.",
          "Exemplele de sume și impact prezentate pe pagina de donații (ex: 50 lei pentru kituri de atelier, 150 lei pentru o grupă de copii, 500 lei pentru logistica unei seri de observații) au caracter orientativ și ilustrativ, fondurile fiind utilizate flexibil conform priorităților proiectelor educaționale."
        ]
      },
      {
        id: "utilizare-fonduri",
        title: "3. Utilizarea fondurilor",
        paragraphs: [
          "Fondurile colectate sunt alocate exclusiv pentru activitățile, proiectele, echipamentele optice și logistica necesară îndeplinirii misiunii asociației, cu respectarea strictă a statutului nonprofit, a bugetelor aprobate și a legislației financiar-contabile."
        ]
      },
      {
        id: "transfer-bancar",
        title: "4. Donații prin transfer bancar",
        paragraphs: [
          "Pentru transferurile bancare directe, donatorii trebuie să folosească datele bancare oficiale afișate pe pagina /doneaza:",
          "• Beneficiar: Asociația Star Sim",
          "• CIF: 55521510, Sediu: Str. Viceamiral Ioan Murgescu 56, Constanța",
          "• Detalii plată recomandate: Donație – Asociația Star Sim (sau mențiunea specifică a atelierului/cauzei dorite).",
          "Donatorul este responsabil pentru corectitudinea datelor introduse în ordinul de plată din aplicația de internet banking."
        ]
      },
      {
        id: "plati-card",
        title: "5. Donații cu cardul (implementare viitoare)",
        paragraphs: [
          "Dacă asociația va introduce plăți online prin card bancar, acestea vor fi procesate exclusiv printr-un procesator de plăți autorizat și securizat (3D Secure). Asociația nu va stoca pe propriile servere datele complete ale cardurilor bancare."
        ]
      },
      {
        id: "sponsorizari",
        title: "6. Sponsorizări corporative (pentru companii)",
        paragraphs: [
          "Sponsorizarea din partea persoanelor juridice se realizează în baza unui contract scris de sponsorizare, încheiat în conformitate cu Legea nr. 32/1994.",
          "Contractul stipulează în mod clar obiectul, valoarea, durata, drepturile și obligațiile fiecărei părți. Sponsorizarea nu constituie prestare de servicii de publicitate comercială."
        ]
      },
      {
        id: "facilitati-fiscale",
        title: "7. Facilități fiscale pentru sponsori (Codul Fiscal)",
        paragraphs: [
          "Conform Codului Fiscal (art. 25 alin. 4 lit. i), companiile plătitoare de impozit pe profit pot deduce cheltuielile cu sponsorizarea din impozitul pe profit datorat către stat, în limita valorii minime dintre:",
          "• 0,75% din cifra de afaceri a companiei;",
          "• 20% din impozitul pe profit datorat.",
          "Pentru a beneficia de facilitatea fiscală de deducere, entitatea beneficiară (asociația) trebuie să fie înscrisă în Registrul entităților/unităților de cult pentru care se acordă deduceri fiscale administrat de ANAF la data încheierii contractului de sponsorizare.",
          "Fiecare sponsor trebuie să verifice aplicabilitatea concretă a facilităților fiscale împreună cu propriul departament contabil sau consultant fiscal. Informațiile publicate pe site au rol informativ și nu constituie consultanță fiscală."
        ]
      },
      {
        id: "confirmari-documente",
        title: "8. Confirmări și documente justificative",
        paragraphs: [
          "La cerere, Asociația Star Sim pune la dispoziția donatorilor și sponsorilor documentele justificative necesare evidenței contabile: contracte de sponsorizare semnate, extrase, adeverințe de confirmare a primirii sumelor și rapoarte privind destinația fondurilor."
        ]
      },
      {
        id: "rambursari",
        title: "9. Rambursări și plăți eronate",
        paragraphs: [
          "Donațiile benevole nu reprezintă achiziții de bunuri și nu fac obiectul unui drept general de retur comercial. Dacă o sumă a fost virată din eroare (ex: virament duplicat, sumă tastată greșit), vă rugăm să ne contactați de urgență la contact@starsim.ro cu dovada ordinului de plată. Solicitarea va fi analizată cu celeritate în vederea restituirii sumelor eronate."
        ]
      },
      {
        id: "integritate",
        title: "10. Integritate și prevenirea spălării banilor",
        paragraphs: [
          "Asociația își rezervă dreptul de a refuza sau returna orice contribuție în cazul în care există suspiciuni privind proveniența ilicită a fondurilor sau dacă acceptarea ar crea un conflict cu misiunea educațională și etică a organizației."
        ]
      }
    ]
  },
  {
    key: "photo-video-policy",
    slug: "foto-video",
    title: "Politica privind fotografiile, înregistrările video și dreptul la imagine",
    navLabel: "Foto-video și drept la imagine",
    excerpt: "Principiile și garanțiile privind respectarea demnității, vieții private și dreptului la propria imagine în cadrul evenimentelor și atelierelor Star Sim.",
    lastUpdated: "Septembrie 2026",
    sections: [
      {
        id: "scop",
        title: "1. Scop și angajament",
        paragraphs: [
          "Asociația Star Sim documentează proiectele, taberele, serile de observații astronomice și atelierele practice prin fotografii și clipuri video, în scopul promovării educației și informării comunității.",
          "Prezenta politică stabilește normele de conduită și protecție a imaginii participanților, acordând prioritate absolută siguranței și demnității copiilor și adolescenților."
        ]
      },
      {
        id: "principii",
        title: "2. Principii fundamentale",
        paragraphs: [
          "• Respectarea vieții private și a demnității fiecărei persoane;",
          "• Informarea prealabilă a participanților privind realizarea de cadre foto/video în cadrul evenimentului;",
          "• Utilizarea exclusivă a materialelor adecvate scopului educațional și informativ;",
          "• Minimizarea detaliilor care ar putea permite identificarea inutilă a minorilor;",
          "• Interzicerea strictă a oricăror imagini compromițătoare, jenante, vulnerabile sau lipsite de respect."
        ]
      },
      {
        id: "adulti",
        title: "3. Participanți adulți",
        paragraphs: [
          "Pentru adulți, captarea și utilizarea imaginilor în contextul unor evenimente publice se realizează în baza interesului legitim al asociației de a documenta evenimentele sale sau pe bază de consimțământ expres, în funcție de caracterul deschis al manifestării."
        ]
      },
      {
        id: "minori",
        title: "4. Protecția specifică a minorilor",
        paragraphs: [
          "În cazul minorilor ușor identificabili, materialele destinate comunicării publice pe internet (website, social media) sunt utilizate exclusiv pe baza acordului informat al părintelui sau reprezentantului legal.",
          "Acordul foto-video este complet separat de dreptul de participare la atelier. Refuzul unui părinte de a-și da acordul pentru fotografii NU împiedică în niciun caz copilul să participe la atelierul de astronomie."
        ]
      },
      {
        id: "identificare",
        title: "5. Limitarea identificării publice",
        paragraphs: [
          "Asociația Star Sim nu publică niciodată numele complet al copiilor alături de fotografiile lor, nici adresa, școala, clasa sau datele de contact personale ale acestora."
        ]
      },
      {
        id: "canale",
        title: "6. Canale de utilizare a materialelor",
        paragraphs: [
          "Materialele pot fi publicate pe site-ul starsim.ro, pe paginile oficiale de comunicare ale asociației din rețelele sociale (Facebook, Instagram, YouTube), în rapoarte de activitate către parteneri sau în materiale de prezentare educațională."
        ]
      },
      {
        id: "retragere-acord",
        title: "7. Retragerea acordului și solicitări de ștergere",
        paragraphs: [
          "Orice părinte sau participant își poate retrage oricând acordul pentru imagini viitoare. La primirea unei cereri justificate la contact@starsim.ro, asociația va elimina prompt fotografiile sau secvențele video din canalele online pe care le deține sub control direct."
        ]
      },
      {
        id: "contact",
        title: "8. Contact pentru dreptul la imagine",
        paragraphs: [
          "Pentru orice solicitare, sesizare sau clarificare privind fotografiile și clipurile video realizate de asociație: contact@starsim.ro."
        ]
      }
    ]
  },
  {
    key: "safeguarding-policy",
    slug: "protectia-copiilor",
    title: "Politica de protecție a copiilor și adolescenților (Safeguarding)",
    navLabel: "Protecția copiilor",
    excerpt: "Codul etic, măsurile de siguranță și procedurile de safeguarding aplicate de echipa Star Sim în toate activitățile educaționale desfășurate cu minori.",
    lastUpdated: "Septembrie 2026",
    sections: [
      {
        id: "angajament",
        title: "1. Angajamentul Star Sim",
        paragraphs: [
          "Asociația Star Sim este dedicată oferirii unui mediu educațional sigur, protectiv, incluziv și stimulant pentru toți copiii și adolescenții care participă la proiectele noastre.",
          "Siguranța, bunăstarea și integritatea fizică și emoțională a minorilor prevalează întotdeauna asupra oricăror considerente de organizare, promovare sau eficiență operațională."
        ]
      },
      {
        id: "aplicabilitate",
        title: "2. Cui se aplică politica",
        paragraphs: [
          "Prezenta politică este obligatorie pentru toți membrii asociației, voluntarii, instructorii, lectorii, colaboratorii tehnici și persoanele care intră în contact cu minorii în cadrul programelor organizate de Star Sim."
        ]
      },
      {
        id: "reguli-conduita",
        title: "3. Principii de conduită obligatorii",
        paragraphs: [
          "• Comunicare întotdeauna respectuoasă, caldă și încurajatoare, fără țipete, limbaj discriminatoriu, umilitor sau inadecvat vârstei;",
          "• Evitarea strictă a oricărui contact fizic nepotrivit sau intruziv;",
          "• Evitarea situațiilor izolate unu-la-unu cu un minor într-un spațiu închis, în afara vizibilității altor adulți sau colegi de echipă;",
          "• Interzicerea absolută a solicitării de secrete personale sau contactării minorilor pe canale private de social media fără acordul și cunoștința părinților;",
          "• Interzicerea consumului de alcool, fumatului sau substanțelor interzise în preajma activităților desfășurate cu copiii."
        ]
      },
      {
        id: "activitati-nocturne",
        title: "4. Măsuri speciale pentru observațiile astronomice nocturne",
        paragraphs: [
          "Întrucât astronomia presupune observații nocturne sub cerul liber sau în parcuri/zone periurbane, echipa acordă o atenție sporită:",
          "• Punctelor de întâlnire bine iluminate și clar marcate;",
          "• Preluării și predării copiilor exclusiv către părinți sau reprezentanți legali autorizați;",
          "• Raportului adecvat de supraveghere adulți/copii și echipării cu truse de prim-ajutor;",
          "• Monitorizării atente a condițiilor de temperatură și confort termic pe timp de noapte."
        ]
      },
      {
        id: "semnalare",
        title: "5. Procedura de semnalare a neregulilor",
        paragraphs: [
          "Orice suspiciune, comportament neadecvat, incident sau îngrijorare privind siguranța unui minor este tratată cu maximă gravitate și confidențialitate.",
          "Sesizările pot fi transmise direct conducerii asociației la contact@starsim.ro sau la telefon +40 730 991 523. În cazurile în care există suspiciuni de abuz sau pericol iminent, vor fi sesizate imediat organele de stat competente (Poliție, DGASPC, Telefonul Copilului 119)."
        ]
      },
      {
        id: "sanctiuni",
        title: "6. Măsuri și sancțiuni",
        paragraphs: [
          "Încălcarea regulilor de safeguarding atrage încetarea imediată a colaborării sau calității de voluntar, interdicția de participare la activități viitoare și sesizarea autorităților legale competente."
        ]
      },
      {
        id: "contact",
        title: "7. Contact safeguarding",
        paragraphs: [
          "Pentru orice întrebare sau semnalare legată de siguranța copiilor în cadrul activităților Star Sim: contact@starsim.ro."
        ]
      }
    ]
  },
  {
    key: "transparency-policy",
    slug: "transparenta",
    title: "Transparență și date legale",
    navLabel: "Transparență",
    excerpt: "Datele de identificare juridică și fiscală ale Asociației Star Sim, principiile de guvernanță nonprofit și bune practici de raportare publică.",
    lastUpdated: "Septembrie 2026",
    sections: [
      {
        id: "scop",
        title: "1. Notă de transparență",
        paragraphs: [
          "Asociația Star Sim activează ca o organizație nonprofit deschisă, dedicată dezvoltării comunitare prin știință și educație.",
          "Prezenta pagină oferă donatorilor, sponsorilor, școlilor partenere și autorităților toate informațiile oficiale de identificare legală și fiscală necesare verificării activității noastre."
        ]
      },
      {
        id: "date-identificare",
        title: "2. Date oficiale de identificare",
        paragraphs: [
          "• Denumire oficială: Asociația Star Sim",
          "• Formă juridică: Persoană juridică română fără scop patrimonial (Asociație nonprofit)",
          "• Cod de Identificare Fiscală (CIF): 55521510",
          "• Sediul social: Str. Viceamiral Ioan Murgescu 56, Constanța, România",
          "• Reprezentant legal: Gîrdeanu Ștefan - Victor, Președinte",
          "• E-mail oficial: contact@starsim.ro",
          "• Telefon oficial: +40 730 991 523"
        ]
      },
      {
        id: "conturi-bancare",
        title: "3. Conturi bancare pentru donații și sponsorizări",
        paragraphs: [
          "Pentru securitatea donatorilor și prevenirea tentativelor de fraudă, datele bancare complete și codurile IBAN (RON / Valută) sunt publicate și actualizate exclusiv pe pagina oficială de transfer bancar a site-ului:",
          "Accesați secțiunea dedicată la adresa: starsim.ro/doneaza#cont-bancar."
        ]
      },
      {
        id: "principii-guvernanta",
        title: "4. Principii de guvernanță și integritate financiară",
        paragraphs: [
          "• Resursele financiare atrase sunt direcționate integral către susținerea atelierelor de astronomie, kiturilor educaționale pentru elevi și logisticii de observare;",
          "• Situațiile financiare sunt întocmite periodic de experți contabili autorizați, conform reglementărilor fiscale în vigoare pentru asociații și fundații;",
          "• Asociația respectă confidențialitatea datelor personale ale donatorilor și nu publică niciodată CNP-uri, semnături, extrase private sau copii ale actelor de identitate."
        ]
      },
      {
        id: "parteneriate-sponsorizari",
        title: "5. Parteneriate instituționale și sponsorizări",
        paragraphs: [
          "Colaborăm deschis cu școli, licee, universități, observatoare astronomice, autorități locale și companii responsabile social.",
          "Pentru solicitări de parteneriat, încheierea contractelor de sponsorizare sau vizualizarea rapoartelor de activitate, vă rugăm să ne contactați direct la contact@starsim.ro."
        ]
      }
    ]
  }
];

export function getLegalFallback(slug: string): {
  title: string;
  slug: string;
  excerpt: string;
  content: unknown;
  metaTitle: string;
  metaDescription: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
} | null {
  const pageDef =
    legalPageDefaults.find((p) => p.slug === slug || p.key === slug) ||
    (slug === "donatii-si-sponsorizari" ? legalPageDefaults.find((p) => p.key === "donations-sponsorships-policy") : null);

  if (!pageDef) return null;

  return {
    title: pageDef.title,
    slug: pageDef.slug,
    excerpt: pageDef.excerpt,
    content: legalDefinitionToTiptap(pageDef),
    metaTitle: `${pageDef.title} | Asociația Star Sim`,
    metaDescription: pageDef.excerpt,
    robotsIndex: true,
    robotsFollow: true
  };
}

export function legalDefinitionToTiptap(page: LegalPageDefinition) {
  const contentNodes: any[] = [];

  for (const section of page.sections) {
    contentNodes.push({
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: section.title }]
    });

    for (const para of section.paragraphs) {
      contentNodes.push({
        type: "paragraph",
        content: [{ type: "text", text: para }]
      });
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

export function legalBodyToTiptap(body: readonly string[]) {
  return {
    type: "doc",
    content: body.map((paragraph) => ({
      type: "paragraph",
      content: [{ type: "text", text: paragraph }]
    }))
  };
}
