import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["/", "/despre", "/programe", "/evenimente", "/galerie", "/articole", "/doneaza", "/contact", "/implica-te", "/parteneriate"].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7
  }));
  try {
    const [programs, events, albums, articles] = await Promise.all([
      prisma.program.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
      prisma.event.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
      prisma.galleryAlbum.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
      prisma.article.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } })
    ]);
    return [
      ...staticRoutes,
      ...programs.map((item) => ({ url: absoluteUrl(`/programe/${item.slug}`), lastModified: item.updatedAt })),
      ...events.map((item) => ({ url: absoluteUrl(`/evenimente/${item.slug}`), lastModified: item.updatedAt })),
      ...albums.map((item) => ({ url: absoluteUrl(`/galerie/${item.slug}`), lastModified: item.updatedAt })),
      ...articles.map((item) => ({ url: absoluteUrl(`/articole/${item.slug}`), lastModified: item.updatedAt }))
    ];
  } catch {
    return staticRoutes;
  }
}
