const romanianCopyPairs: Array<[string, string]> = [
  ["Aducem astronomia mai aproape de copii si comunitati, pentru a transforma curiozitatea de azi in visurile de maine.", "Aducem astronomia mai aproape de copii și comunități, pentru a transforma curiozitatea de azi în visurile de mâine."],
  ["Inspiram curiozitatea. Impartasim cunoasterea. Construim visuri.", "Inspirăm curiozitatea. Împărtășim cunoașterea. Construim visuri."],
  ["Misiunea noastra", "Misiunea noastră"],
  ["Ateliere si activitati interactive care aduc stiinta mai aproape de copii si tineri.", "Ateliere și activități interactive care aduc știința mai aproape de copii și tineri."],
  ["Nopti de observatii", "Nopți de observații"],
  ["Privim cerul impreuna si descoperim minunile Universului prin lentile si povesti.", "Privim cerul împreună și descoperim minunile Universului prin lentile și povești."],
  ["Construim o comunitate unita in jurul pasiunii pentru astronomie si educatie.", "Construim o comunitate unită în jurul pasiunii pentru astronomie și educație."],
  ["Programele si proiectele noastre", "Programele și proiectele noastre"],
  ["Urmatoarele evenimente", "Următoarele evenimente"],
  ["Pregatim urmatoarele evenimente sub cerul instelat.", "Pregătim următoarele evenimente sub cerul înstelat."],
  ["Urmareste-ne pentru noutati si inscrieri.", "Urmărește-ne pentru noutăți și înscrieri."],
  ["Fiecare gest conteaza", "Fiecare gest contează"],
  ["Impreuna putem duce astronomia mai departe.", "Împreună putem duce astronomia mai departe."],
  ["Sustine-ne", "Susține-ne"],
  ["Sustine asociatia", "Susține asociația"],
  ["Donatia ta ajuta la finantarea programelor noastre educationale.", "Donația ta ajută la finanțarea programelor noastre educaționale."],
  ["Alatura-te echipei noastre si inspira generatiile viitoare.", "Alătură-te echipei noastre și inspiră generațiile viitoare."],
  ["Afla cum te poti implica", "Află cum te poți implica"],
  ["Impreuna cu partenerii nostri, construim proiecte de impact.", "Împreună cu partenerii noștri, construim proiecte de impact."],
  ["Colaboreaza cu noi", "Colaborează cu noi"],
  ["Invatam prin joc, experimente si povesti despre stele.", "Învățăm prin joc, experimente și povești despre stele."],
  ["Aducem astronomia in scoli si comunitati din toata tara.", "Aducem astronomia în școli și comunități din toată țara."],
  ["Observatii astronomice", "Observații astronomice"],
  ["Educatie STEM", "Educație STEM"],
  ["Proiecte care dezvolta gandirea stiintifica si creativitatea.", "Proiecte care dezvoltă gândirea științifică și creativitatea."],
  ["Noapte de observatii la Padurea Baneasa", "Noapte de observații la Pădurea Băneasa"],
  ["Padurea Baneasa, Bucuresti", "Pădurea Băneasa, București"],
  ["Bucuresti, Romania", "București, România"],
  ["Bucuresti", "București"],
  ["Biblioteca Metropolitana", "Biblioteca Metropolitană"],
  ["Caravana Stelelor - Iasi", "Caravana Stelelor - Iași"],
  ["Colegiul National Iasi", "Colegiul Național Iași"],
  ["Noapte de observatii la munte", "Noapte de observații la munte"],
  ["Cabana Piatra Arsa", "Cabana Piatra Arsă"],
  ["O intalnire pentru copii si familii sub cerul instelat.", "O întâlnire pentru copii și familii sub cerul înstelat."],
  ["Ne bucuram de cer, intrebari curajoase si descoperiri ghidate de echipa Star Sim.", "Ne bucurăm de cer, întrebări curajoase și descoperiri ghidate de echipa Star Sim."],
  ["Sustine educatia prin astronomie", "Susține educația prin astronomie"],
  ["Donatiile ajuta la finantarea atelierelor, materialelor si evenimentelor pentru copii.", "Donațiile ajută la finanțarea atelierelor, materialelor și evenimentelor pentru copii."],
  ["Ajuta la pregatirea materialelor educationale.", "Ajută la pregătirea materialelor educaționale."],
  ["O grupa de copii", "O grupă de copii"],
  ["Sustine participarea unei grupe la o activitate Star Sim.", "Susține participarea unei grupe la o activitate Star Sim."],
  ["O seara de observatii", "O seară de observații"],
  ["Scrie-ne pentru programe, evenimente, voluntariat sau parteneriate.", "Scrie-ne pentru programe, evenimente, voluntariat sau parteneriate."],
  ["Asociatie dedicata promovarii astronomiei, educatiei stiintifice si inspirarii copiilor sa viseze mai departe.", "Asociație dedicată promovării astronomiei, educației științifice și inspirării copiilor să viseze mai departe."],
  ["Politica de confidentialitate", "Politica de confidențialitate"],
  ["Informatii despre modul in care Star Sim colecteaza, foloseste si protejeaza datele personale.", "Informații despre modul în care Star Sim colectează, folosește și protejează datele personale."],
  ["Star Sim respecta confidentialitatea vizitatorilor, participantilor si partenerilor sai. Colectam doar datele necesare pentru a raspunde solicitarilor, pentru inscrieri la activitati si pentru comunicari legate de programele asociatiei.", "Star Sim respectă confidențialitatea vizitatorilor, participanților și partenerilor săi. Colectăm doar datele necesare pentru a răspunde solicitărilor, pentru înscrieri la activități și pentru comunicări legate de programele asociației."],
  ["Datele transmise prin formularele site-ului pot include nume, adresa de email, telefon, tipul solicitarii si mesajul trimis. Aceste date sunt folosite exclusiv pentru comunicarea cu persoana care ne-a contactat si pentru administrarea activitatilor Star Sim.", "Datele transmise prin formularele site-ului pot include nume, adresă de email, telefon, tipul solicitării și mesajul trimis. Aceste date sunt folosite exclusiv pentru comunicarea cu persoana care ne-a contactat și pentru administrarea activităților Star Sim."],
  ["Nu vindem si nu inchiriem date personale. Accesul la date este limitat la persoanele autorizate din echipa Star Sim si la furnizorii tehnici necesari functionarii site-ului.", "Nu vindem și nu închiriem date personale. Accesul la date este limitat la persoanele autorizate din echipa Star Sim și la furnizorii tehnici necesari funcționării site-ului."],
  ["Pentru solicitari privind datele personale, ne poti contacta la adresa publicata pe pagina de contact.", "Pentru solicitări privind datele personale, ne poți contacta la adresa publicată pe pagina de contact."],
  ["Explicam ce sunt cookie-urile si cum sunt folosite pe site-ul Star Sim.", "Explicăm ce sunt cookie-urile și cum sunt folosite pe site-ul Star Sim."],
  ["Cookie-urile sunt fisiere mici salvate in browser pentru a ajuta site-ul sa functioneze corect si pentru a retine anumite preferinte.", "Cookie-urile sunt fișiere mici salvate în browser pentru a ajuta site-ul să funcționeze corect și pentru a reține anumite preferințe."],
  ["Site-ul Star Sim foloseste cookie-uri necesare pentru functionalitati de baza, precum pastrarea preferintelor privind consimtamantul pentru cookies.", "Site-ul Star Sim folosește cookie-uri necesare pentru funcționalități de bază, precum păstrarea preferințelor privind consimțământul pentru cookies."],
  ["Daca in viitor vor fi adaugate instrumente de analiza sau marketing, acestea vor fi folosite doar cu informare clara si, unde este necesar, cu acordul vizitatorului.", "Dacă în viitor vor fi adăugate instrumente de analiză sau marketing, acestea vor fi folosite doar cu informare clară și, unde este necesar, cu acordul vizitatorului."],
  ["Poti sterge sau bloca cookie-urile din setarile browserului tau.", "Poți șterge sau bloca cookie-urile din setările browserului tău."],
  ["Termeni si conditii", "Termeni și condiții"],
  ["Reguli generale pentru folosirea site-ului Star Sim si a continutului publicat.", "Reguli generale pentru folosirea site-ului Star Sim și a conținutului publicat."],
  ["Prin utilizarea acestui site, accepti sa folosesti continutul Star Sim intr-un mod responsabil si legal.", "Prin utilizarea acestui site, accepți să folosești conținutul Star Sim într-un mod responsabil și legal."],
  ["Informatiile publicate pe site au scop educational si informativ. Ne straduim sa pastram continutul actualizat, dar pot exista modificari ale programelor, evenimentelor sau datelor de contact.", "Informațiile publicate pe site au scop educațional și informativ. Ne străduim să păstrăm conținutul actualizat, dar pot exista modificări ale programelor, evenimentelor sau datelor de contact."],
  ["Textele, imaginile, identitatea vizuala si materialele publicate apartin Star Sim sau partenerilor sai si nu pot fi reutilizate fara acord, cu exceptia cazurilor permise de lege.", "Textele, imaginile, identitatea vizuală și materialele publicate aparțin Star Sim sau partenerilor săi și nu pot fi reutilizate fără acord, cu excepția cazurilor permise de lege."],
  ["Star Sim isi rezerva dreptul de a actualiza acesti termeni atunci cand site-ul sau activitatile se modifica.", "Star Sim își rezervă dreptul de a actualiza acești termeni atunci când site-ul sau activitățile se modifică."]
];

export function applyRomanianDiacritics(value: string) {
  return romanianCopyPairs.reduce((text, [from, to]) => text.replaceAll(from, to), value);
}

export function applyRomanianDiacriticsDeep<T>(value: T): T {
  if (typeof value === "string") return applyRomanianDiacritics(value) as T;
  if (Array.isArray(value)) return value.map((item) => applyRomanianDiacriticsDeep(item)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, applyRomanianDiacriticsDeep(item)])
    ) as T;
  }

  return value;
}
