import { prisma } from "@/lib/prisma";

export const fallbackPrograms = [
  { id: "1", title: "Ateliere pentru copii", slug: "ateliere-pentru-copii", excerpt: "Invatam prin joc, experimente si povesti despre stele.", icon: "graduation", heroImage: null },
  { id: "2", title: "Caravana Stelelor", slug: "caravana-stelelor", excerpt: "Aducem astronomia in scoli si comunitati din toata tara.", icon: "bus", heroImage: null },
  { id: "3", title: "Observatii astronomice", slug: "observatii-astronomice", excerpt: "Seri magice sub cerul liber, deschise tuturor.", icon: "telescope", heroImage: null },
  { id: "4", title: "Educatie STEM", slug: "educatie-stem", excerpt: "Proiecte care dezvolta gandirea stiintifica si creativitatea.", icon: "atom", heroImage: null }
];

export const fallbackEvents = [
  { id: "1", title: "Noapte de observatii la Padurea Baneasa", slug: "noapte-observatii-padurea-baneasa", excerpt: "O seara pentru familii sub cerul instelat.", startsAt: new Date(`${new Date().getFullYear() + 1}-05-24T21:00:00+03:00`), locationName: "Padurea Baneasa, Bucuresti", heroImage: null },
  { id: "2", title: "Atelier: Sistemul Solar pentru copii", slug: "atelier-sistemul-solar-copii", excerpt: "O calatorie ghidata printre planete.", startsAt: new Date(`${new Date().getFullYear() + 1}-06-07T11:00:00+03:00`), locationName: "Biblioteca Metropolitana", heroImage: null },
  { id: "3", title: "Caravana Stelelor - Iasi", slug: "caravana-stelelor-iasi", excerpt: "Telescopul ajunge in comunitate.", startsAt: new Date(`${new Date().getFullYear() + 1}-06-21T18:00:00+03:00`), locationName: "Colegiul National Iasi", heroImage: null },
  { id: "4", title: "Noapte de observatii la munte", slug: "noapte-observatii-la-munte", excerpt: "Cer limpede, povesti si constelatii.", startsAt: new Date(`${new Date().getFullYear() + 1}-06-28T21:30:00+03:00`), locationName: "Cabana Piatra Arsa", heroImage: null }
];

export async function getHomepagePrograms() {
  try {
    const items = await prisma.program.findMany({
      where: { status: "PUBLISHED", featuredOnHome: true },
      include: { heroImage: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: 4
    });
    return items.length ? items : fallbackPrograms;
  } catch {
    return fallbackPrograms;
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
    if (featured.length >= 4) return featured;
    const more = await prisma.event.findMany({
      where: { status: "PUBLISHED", startsAt: { gte: new Date() }, id: { notIn: featured.map((item) => item.id) } },
      include: { heroImage: true },
      orderBy: { startsAt: "asc" },
      take: 4 - featured.length
    });
    return [...featured, ...more].length ? [...featured, ...more] : fallbackEvents;
  } catch {
    return fallbackEvents;
  }
}
