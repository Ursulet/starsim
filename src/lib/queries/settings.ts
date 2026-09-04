import { prisma } from "@/lib/prisma";

export async function getContactSettings() {
  const fallback = {
    email: "contact@starsim.ro",
    phone: "+40 723 123 456",
    address: "București, România",
    city: "București",
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
    ]
  };

  try {
    const settings = await prisma.donationSettings.findUnique({ where: { id: "default" } });
    if (settings) {
      if (!settings.recommendedAmounts || (Array.isArray(settings.recommendedAmounts) && settings.recommendedAmounts.length === 0)) {
        return {
          ...settings,
          recommendedAmounts: fallback.recommendedAmounts
        };
      }
      return settings;
    }
    return fallback;
  } catch {
    return fallback;
  }
}
