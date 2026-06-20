export type HomeMissionCard = {
  icon: "education" | "telescope" | "community";
  title: string;
  text: string;
};

export type HomeContributionCard = {
  icon: "donation" | "volunteer" | "partnership";
  title: string;
  text: string;
  href: string;
  action: string;
};

export type HomepageSettings = {
  heroIntro: string;
  heroImageUrl: string;
  heroPrimaryLabel: string;
  heroPrimaryHref: string;
  heroSecondaryLabel: string;
  heroSecondaryHref: string;
  missionTitle: string;
  missionSubtitle: string;
  missionCards: HomeMissionCard[];
  programsTitle: string;
  eventsTitle: string;
  eventsEmptyTitle: string;
  eventsEmptyDescription: string;
  eventsCtaLabel: string;
  eventsCtaHref: string;
  contributionTitle: string;
  contributionSubtitle: string;
  contributionCards: HomeContributionCard[];
};

export const defaultHomepageSettings: HomepageSettings = {
  heroIntro: "Aducem astronomia mai aproape de copii si comunitati, pentru a transforma curiozitatea de azi in visurile de maine.",
  heroImageUrl: "/images/mockup-site-asociatie.png",
  heroPrimaryLabel: "Descopera programele",
  heroPrimaryHref: "/programe",
  heroSecondaryLabel: "Sustine asociatia",
  heroSecondaryHref: "/doneaza",
  missionTitle: "Misiunea noastra",
  missionSubtitle: "Inspiram curiozitatea. Impartasim cunoasterea. Construim visuri.",
  missionCards: [
    {
      icon: "education",
      title: "Educatie",
      text: "Ateliere si activitati interactive care aduc stiinta mai aproape de copii si tineri."
    },
    {
      icon: "telescope",
      title: "Nopti de observatii",
      text: "Privim cerul impreuna si descoperim minunile Universului prin lentile si povesti."
    },
    {
      icon: "community",
      title: "Comunitate",
      text: "Construim o comunitate unita in jurul pasiunii pentru astronomie si educatie."
    }
  ],
  programsTitle: "Programele si proiectele noastre",
  eventsTitle: "Urmatoarele evenimente",
  eventsEmptyTitle: "Pregatim urmatoarele evenimente sub cerul instelat.",
  eventsEmptyDescription: "Urmareste-ne pentru noutati si inscrieri.",
  eventsCtaLabel: "Vezi toate evenimentele",
  eventsCtaHref: "/evenimente",
  contributionTitle: "Fiecare gest conteaza",
  contributionSubtitle: "Impreuna putem duce astronomia mai departe.",
  contributionCards: [
    {
      icon: "donation",
      title: "Sustine-ne",
      text: "Donatia ta ajuta la finantarea programelor noastre educationale.",
      href: "/doneaza",
      action: "Doneaza acum"
    },
    {
      icon: "volunteer",
      title: "Fii voluntar",
      text: "Alatura-te echipei noastre si inspira generatiile viitoare.",
      href: "/implica-te",
      action: "Afla cum te poti implica"
    },
    {
      icon: "partnership",
      title: "Parteneriate",
      text: "Impreuna cu partenerii nostri, construim proiecte de impact.",
      href: "/parteneriate",
      action: "Colaboreaza cu noi"
    }
  ]
};

function mergeArrayByDefault<T extends Record<string, unknown>>(value: unknown, fallback: T[]): T[] {
  if (!Array.isArray(value)) return fallback;

  return fallback.map((item, index) => ({
    ...item,
    ...(typeof value[index] === "object" && value[index] !== null ? value[index] : {})
  }));
}

export function normalizeHomepageSettings(value: unknown): HomepageSettings {
  const raw = typeof value === "object" && value !== null ? (value as Partial<HomepageSettings>) : {};

  return {
    ...defaultHomepageSettings,
    ...raw,
    missionCards: mergeArrayByDefault(raw.missionCards, defaultHomepageSettings.missionCards),
    contributionCards: mergeArrayByDefault(raw.contributionCards, defaultHomepageSettings.contributionCards)
  };
}
