import { prisma } from "@/lib/prisma";

export async function getContactSettings() {
  const fallback = {
    email: "contact@starsim.ro",
    phone: "+40 730 991 523",
    address: "Str. Viceamiral Ioan Murgescu 56, Constanța, România",
    city: "Constanța",
    introText: "Scrie-ne pentru programe, evenimente, voluntariat sau parteneriate.",
    schedule: "Luni - Vineri, 10:00 - 18:00",
    footerDescription: "Asociație dedicată promovării astronomiei, educației științifice și inspirării copiilor să viseze mai departe.",
    footerCopyright: "De la o stea, la un vis. Toate drepturile rezervate.",
    mapUrl: null,
    facebookUrl: null,
    instagramUrl: null,
    youtubeUrl: null,
    tiktokUrl: null,
    linkedinUrl: null
  };

  try {
    const settings = await prisma.contactSettings.findUnique({ where: { id: "default" } });
    return settings || fallback;
  } catch {
    return fallback;
  }
}

export async function getDonationSettings() {
  const fallback = {
    id: "default",
    title: "Susține educația prin astronomie",
    description: "Donațiile ajută la finanțarea atelierelor, materialelor și evenimentelor pentru copii.",
    bankAccount: "RO00 BANK 0000 0000 0000 0000",
    bankName: "Banca Transilvania",
    beneficiaryName: "Asociația Star Sim",
    fiscalCode: "00000000",
    recommendedAmounts: [
      {
        id: "card-1",
        title: "Materiale pentru ateliere",
        label: "Materiale pentru ateliere",
        amount: 50,
        currency: "lei",
        badge: "Popular",
        imageUrl: null,
        imageAlt: "Materiale ateliere",
        content: "Ajută la pregătirea materialelor educaționale și kiturilor de astronomie pentru elevi.",
        impact: "Ajută la pregătirea materialelor educaționale.",
        buttonText: "Donează 50 lei",
        buttonUrl: "#cont-bancar",
        isActive: true
      },
      {
        id: "card-2",
        title: "O grupă de copii la observator",
        label: "O grupă de copii la observator",
        amount: 150,
        currency: "lei",
        badge: "Impact direct",
        imageUrl: null,
        imageAlt: "Grupă copii",
        content: "Susține participarea completă a unei grupe la o activitate ghidată Star Sim.",
        impact: "Susține participarea unei grupe la o activitate Star Sim.",
        buttonText: "Donează 150 lei",
        buttonUrl: "#cont-bancar",
        isActive: true
      },
      {
        id: "card-3",
        title: "O seară de observații astronomice",
        label: "O seară de observații astronomice",
        amount: 500,
        currency: "lei",
        badge: "Susținător Star",
        imageUrl: null,
        imageAlt: "Observații astronomice",
        content: "Contribuie la logistica telescoapelor și organizarea unei nopți deschise sub stele.",
        impact: "Contribuie la organizarea unei seri astronomice.",
        buttonText: "Donează 500 lei",
        buttonUrl: "#cont-bancar",
        isActive: true
      }
    ],
    organizationDetails: {
      beneficiaryName: "Asociația Star Sim",
      fiscalCode: "55521510",
      headquarters: "Constanța",
      address: "Str. Viceamiral Ioan Murgescu 56, Constanța, România",
      regNumber: "",
      bankAccount: "RO00 BANK 0000 0000 0000 0000",
      bankName: "Banca Transilvania",
      secondaryIban: "",
      paymentReference: "Donație – Asociația Star Sim",
      email: "contact@starsim.ro",
      phone: "+40 730 991 523"
    }
  };

  try {
    const settings = await prisma.donationSettings.findUnique({ where: { id: "default" } });
    if (settings) {
      const contentObj = (settings.content && typeof settings.content === "object" ? settings.content : {}) as Record<string, any>;
      const rawOrg = contentObj.organizationDetails || {};

      const organizationDetails = {
        beneficiaryName: String(rawOrg.beneficiaryName || settings.beneficiaryName || fallback.organizationDetails.beneficiaryName).trim(),
        fiscalCode: String(rawOrg.fiscalCode || settings.fiscalCode || fallback.organizationDetails.fiscalCode).trim(),
        headquarters: String(rawOrg.headquarters || fallback.organizationDetails.headquarters).trim(),
        address: String(rawOrg.address || fallback.organizationDetails.address).trim(),
        regNumber: String(rawOrg.regNumber || "").trim(),
        bankAccount: String(rawOrg.bankAccount || settings.bankAccount || fallback.organizationDetails.bankAccount).trim(),
        bankName: String(rawOrg.bankName || settings.bankName || fallback.organizationDetails.bankName).trim(),
        secondaryIban: String(rawOrg.secondaryIban || "").trim(),
        paymentReference: String(rawOrg.paymentReference || fallback.organizationDetails.paymentReference).trim(),
        email: String(rawOrg.email || fallback.organizationDetails.email).trim(),
        phone: String(rawOrg.phone || "").trim()
      };

      const recommendedAmounts =
        !settings.recommendedAmounts || (Array.isArray(settings.recommendedAmounts) && settings.recommendedAmounts.length === 0)
          ? fallback.recommendedAmounts
          : settings.recommendedAmounts;

      return {
        ...settings,
        organizationDetails,
        recommendedAmounts
      };
    }
    return fallback;
  } catch {
    return fallback;
  }
}

export type OrganizationSettings = {
  presidentName: string;
  presidentRole: string;
  presidentImageUrl?: string | null;
  presidentBio?: string | null;
  vicePresidentName: string;
  vicePresidentRole: string;
  vicePresidentImageUrl?: string | null;
  vicePresidentBio?: string | null;
  officialEmail: string;
  phone1: string;
  phone2: string;
  headquarters: string;
  cui: string;
  address?: string;
  regNumber?: string;
};

export const defaultOrganizationSettings: OrganizationSettings = {
  presidentName: "Gîrdeanu Ștefan - Victor",
  presidentRole: "Președinte",
  presidentImageUrl: null,
  presidentBio: "Coordonează direcțiile strategice, inițiativele educaționale și parteneriatele instituționale ale asociației.",
  vicePresidentName: "Claudiu Simion",
  vicePresidentRole: "Vicepreședinte",
  vicePresidentImageUrl: null,
  vicePresidentBio: "Asigură organizarea atelierelor practice STEM, logistica evenimentelor de observare și legătura cu comunitatea.",
  officialEmail: "contact@starsim.ro",
  phone1: "+40 730 991 523",
  phone2: "",
  headquarters: "Constanța",
  cui: "55521510",
  address: "Str. Viceamiral Ioan Murgescu 56, Constanța, România",
  regNumber: ""
};

export async function getOrganizationSettings(): Promise<OrganizationSettings> {
  try {
    const item = await prisma.siteSettings.findUnique({
      where: { key: "organization" }
    });
    if (item?.value && typeof item.value === "object") {
      const val = item.value as Record<string, any>;
      return {
        presidentName: String(val.presidentName ?? defaultOrganizationSettings.presidentName).trim(),
        presidentRole: String(val.presidentRole ?? defaultOrganizationSettings.presidentRole).trim(),
        presidentImageUrl: val.presidentImageUrl ? String(val.presidentImageUrl).trim() : null,
        presidentBio: val.presidentBio !== undefined ? String(val.presidentBio).trim() : defaultOrganizationSettings.presidentBio,
        vicePresidentName: String(val.vicePresidentName ?? defaultOrganizationSettings.vicePresidentName).trim(),
        vicePresidentRole: String(val.vicePresidentRole ?? defaultOrganizationSettings.vicePresidentRole).trim(),
        vicePresidentImageUrl: val.vicePresidentImageUrl ? String(val.vicePresidentImageUrl).trim() : null,
        vicePresidentBio: val.vicePresidentBio !== undefined ? String(val.vicePresidentBio).trim() : defaultOrganizationSettings.vicePresidentBio,
        officialEmail: String(val.officialEmail ?? defaultOrganizationSettings.officialEmail).trim(),
        phone1: String(val.phone1 ?? defaultOrganizationSettings.phone1).trim(),
        phone2: String(val.phone2 ?? defaultOrganizationSettings.phone2).trim(),
        headquarters: String(val.headquarters ?? defaultOrganizationSettings.headquarters).trim(),
        cui: String(val.cui ?? defaultOrganizationSettings.cui).trim(),
        address: String(val.address ?? defaultOrganizationSettings.address).trim(),
        regNumber: String(val.regNumber ?? defaultOrganizationSettings.regNumber).trim()
      };
    }
    return defaultOrganizationSettings;
  } catch {
    return defaultOrganizationSettings;
  }
}
