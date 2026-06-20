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
  heroIntro: "Aducem astronomia mai aproape de copii și comunități, pentru a transforma curiozitatea de azi în visurile de mâine.",
  heroImageUrl: "/images/mockup-site-asociatie.png",
  heroPrimaryLabel: "Descoperă programele",
  heroPrimaryHref: "/programe",
  heroSecondaryLabel: "Susține asociația",
  heroSecondaryHref: "/doneaza",
  missionTitle: "Misiunea noastră",
  missionSubtitle: "Inspirăm curiozitatea. Împărtășim cunoașterea. Construim visuri.",
  missionCards: [
    {
      icon: "education",
      title: "Educație",
      text: "Ateliere și activități interactive care aduc știința mai aproape de copii și tineri."
    },
    {
      icon: "telescope",
      title: "Nopți de observații",
      text: "Privim cerul împreună și descoperim minunile Universului prin lentile și povești."
    },
    {
      icon: "community",
      title: "Comunitate",
      text: "Construim o comunitate unită în jurul pasiunii pentru astronomie și educație."
    }
  ],
  programsTitle: "Programele și proiectele noastre",
  eventsTitle: "Următoarele evenimente",
  eventsEmptyTitle: "Pregătim următoarele evenimente sub cerul înstelat.",
  eventsEmptyDescription: "Urmărește-ne pentru noutăți și înscrieri.",
  eventsCtaLabel: "Vezi toate evenimentele",
  eventsCtaHref: "/evenimente",
  contributionTitle: "Fiecare gest contează",
  contributionSubtitle: "Împreună putem duce astronomia mai departe.",
  contributionCards: [
    {
      icon: "donation",
      title: "Susține-ne",
      text: "Donația ta ajută la finanțarea programelor noastre educaționale.",
      href: "/doneaza",
      action: "Donează acum"
    },
    {
      icon: "volunteer",
      title: "Fii voluntar",
      text: "Alătură-te echipei noastre și inspiră generațiile viitoare.",
      href: "/implica-te",
      action: "Află cum te poți implica"
    },
    {
      icon: "partnership",
      title: "Parteneriate",
      text: "Împreună cu partenerii noștri, construim proiecte de impact.",
      href: "/parteneriate",
      action: "Colaborează cu noi"
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
