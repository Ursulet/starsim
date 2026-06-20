import { prisma } from "@/lib/prisma";

export async function getContactSettings() {
  try {
    return await prisma.contactSettings.findUnique({ where: { id: "default" } });
  } catch {
    return {
      email: "contact@starsim.ro",
      phone: "+40 723 123 456",
      address: "Bucuresti, Romania",
      city: "Bucuresti",
      introText: "Scrie-ne pentru programe, evenimente, voluntariat sau parteneriate.",
      schedule: "Luni - Vineri, 10:00 - 18:00",
      footerDescription: "Asociatie dedicata promovarii astronomiei, educatiei stiintifice si inspirarii copiilor sa viseze mai departe.",
      footerCopyright: "De la o stea, la un vis. Toate drepturile rezervate.",
      mapUrl: null,
      facebookUrl: null,
      instagramUrl: null,
      youtubeUrl: null,
      tiktokUrl: null,
      linkedinUrl: null
    };
  }
}

export async function getDonationSettings() {
  try {
    return await prisma.donationSettings.findUnique({ where: { id: "default" } });
  } catch {
    return {
      title: "Sustine educatia prin astronomie",
      description: "Donatiile ajuta la finantarea atelierelor, materialelor si evenimentelor pentru copii.",
      bankAccount: "RO00 BANK 0000 0000 0000 0000",
      bankName: "Banca Exemplu",
      beneficiaryName: "Asociatia Star Sim",
      fiscalCode: "00000000",
      recommendedAmounts: [
        { amount: 50, label: "Materiale pentru atelier", impact: "Ajuta la pregatirea materialelor educationale." },
        { amount: 150, label: "O grupa de copii", impact: "Sustine participarea unei grupe la o activitate Star Sim." },
        { amount: 500, label: "O seara de observatii", impact: "Contribuie la organizarea unei seri astronomice." }
      ]
    };
  }
}
