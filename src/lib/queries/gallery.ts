import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

const fallbackAlbums = [
  { id: "g1", title: "Momente sub acelasi cer", slug: "momente-sub-acelasi-cer", description: "Fotografii din ateliere si seri de observatii.", coverImage: null, images: [] }
];

export async function getPublishedAlbums() {
  try {
    const items = await prisma.galleryAlbum.findMany({ where: { status: "PUBLISHED" }, include: { coverImage: true, images: { include: { media: true } } }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
    return items.length ? items : fallbackAlbums;
  } catch {
    return fallbackAlbums;
  }
}

export async function getAlbumBySlug(slug: string) {
  try {
    const item = await prisma.galleryAlbum.findFirst({ where: { slug, status: "PUBLISHED" }, include: { coverImage: true, images: { include: { media: true }, orderBy: { sortOrder: "asc" } }, program: true, event: true } });
    if (item) return item;
  } catch {}
  const fallback = fallbackAlbums.find((item) => item.slug === slug);
  if (!fallback) notFound();
  return fallback;
}
