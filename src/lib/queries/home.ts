import { defaultHomepageSettings, normalizeHomepageSettings } from "@/lib/homepage-settings";
import { prisma } from "@/lib/prisma";

export const fallbackPrograms = [
  { id: "1", title: "Ateliere pentru copii", slug: "ateliere-pentru-copii", excerpt: "Învățăm prin joc, experimente și povești despre stele.", icon: "graduation", heroImage: null },
  { id: "2", title: "Caravana Stelelor", slug: "caravana-stelelor", excerpt: "Aducem astronomia în școli și comunități din toată țara.", icon: "bus", heroImage: null },
  { id: "3", title: "Observații astronomice", slug: "observatii-astronomice", excerpt: "Seri magice sub cerul liber, deschise tuturor.", icon: "telescope", heroImage: null },
  { id: "4", title: "Educație STEM", slug: "educatie-stem", excerpt: "Proiecte care dezvoltă gândirea științifică și creativitatea.", icon: "atom", heroImage: null }
];

export const fallbackEvents = [
  { id: "1", title: "Noapte de observații la Pădurea Băneasa", slug: "noapte-observatii-padurea-baneasa", excerpt: "O seară pentru familii sub cerul înstelat.", startsAt: new Date(`${new Date().getFullYear() + 1}-05-24T21:00:00+03:00`), locationName: "Pădurea Băneasa, București", heroImage: null },
  { id: "2", title: "Atelier: Sistemul Solar pentru copii", slug: "atelier-sistemul-solar-copii", excerpt: "O călătorie ghidată printre planete.", startsAt: new Date(`${new Date().getFullYear() + 1}-06-07T11:00:00+03:00`), locationName: "Biblioteca Metropolitană", heroImage: null },
  { id: "3", title: "Caravana Stelelor - Iași", slug: "caravana-stelelor-iasi", excerpt: "Telescopul ajunge în comunitate.", startsAt: new Date(`${new Date().getFullYear() + 1}-06-21T18:00:00+03:00`), locationName: "Colegiul Național Iași", heroImage: null },
  { id: "4", title: "Noapte de observații la munte", slug: "noapte-observatii-la-munte", excerpt: "Cer limpede, povești și constelații.", startsAt: new Date(`${new Date().getFullYear() + 1}-06-28T21:30:00+03:00`), locationName: "Cabana Piatra Arsă", heroImage: null }
];

export async function getHomepagePrograms() {
  try {
    const items = await prisma.program.findMany({
      where: { status: "PUBLISHED", featuredOnHome: true },
      include: { heroImage: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: 4
    });
    const totalCount = await prisma.program.count();
    if (totalCount === 0) return fallbackPrograms;
    return items;
  } catch {
    return fallbackPrograms;
  }
}

export async function getHomepageSettings() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { key: "homepage" },
      select: { value: true }
    });

    return normalizeHomepageSettings(settings?.value);
  } catch {
    return defaultHomepageSettings;
  }
}

export async function getHomepageEvents() {
  try {
    const featured = await prisma.event.findMany({
      where: { status: "PUBLISHED", featuredOnHome: true, startsAt: { gte: new Date() } },
      include: { heroImage: true },
      orderBy: [{ sortOrder: "asc" }, { startsAt: "asc" }],
      take: 4
    });
    const totalCount = await prisma.event.count();
    if (totalCount === 0) return fallbackEvents;
    return featured;
  } catch {
    return fallbackEvents;
  }
}

export async function getHomepageGallery() {
  try {
    return await prisma.galleryAlbum.findMany({
      where: { status: "PUBLISHED", featuredOnHome: true },
      include: {
        coverImage: true,
        images: { select: { id: true } }
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: 3
    });
  } catch {
    return [];
  }
}

export async function getHomepageArticles() {
  try {
    return await prisma.article.findMany({
      where: { status: "PUBLISHED", featuredOnHome: true },
      include: { heroImage: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 3
    });
  } catch {
    return [];
  }
}

export async function getHomepageTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: { status: "PUBLISHED", featuredOnHome: true },
      include: { image: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: 3
    });
  } catch {
    return [];
  }
}

export async function getHomepagePartners() {
  try {
    return await prisma.partner.findMany({
      where: { status: "PUBLISHED", featuredOnHome: true },
      include: { logo: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
    });
  } catch {
    return [];
  }
}

