import { prisma } from "@/lib/prisma";
import type { AdminContentType } from "@/lib/admin/content";

export type AdminContentListItem = {
  id: string;
  title: string;
  subtitle?: string | null;
  slug?: string | null;
  status?: string | null;
  featuredOnHome?: boolean | null;
  updatedAt?: Date | null;
};

export async function getAdminContentList(type: AdminContentType): Promise<AdminContentListItem[]> {
  try {
    switch (type) {
      case "programe": {
        const items = await prisma.program.findMany({ orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }] });
        return items.map((item) => ({ id: item.id, title: item.title, subtitle: item.excerpt, slug: item.slug, status: item.status, featuredOnHome: item.featuredOnHome, updatedAt: item.updatedAt }));
      }
      case "evenimente": {
        const items = await prisma.event.findMany({ orderBy: [{ startsAt: "desc" }] });
        return items.map((item) => ({ id: item.id, title: item.title, subtitle: item.locationName, slug: item.slug, status: item.status, featuredOnHome: item.featuredOnHome, updatedAt: item.updatedAt }));
      }
      case "galerie": {
        const items = await prisma.galleryAlbum.findMany({ orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }] });
        return items.map((item) => ({ id: item.id, title: item.title, subtitle: item.description, slug: item.slug, status: item.status, featuredOnHome: item.featuredOnHome, updatedAt: item.updatedAt }));
      }
      case "articole": {
        const items = await prisma.article.findMany({ orderBy: [{ updatedAt: "desc" }] });
        return items.map((item) => ({ id: item.id, title: item.title, subtitle: item.excerpt, slug: item.slug, status: item.status, featuredOnHome: item.featuredOnHome, updatedAt: item.updatedAt }));
      }
      case "parteneri": {
        const items = await prisma.partner.findMany({ orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }] });
        return items.map((item) => ({ id: item.id, title: item.name, subtitle: item.website, slug: item.slug, status: item.status, featuredOnHome: item.featuredOnHome, updatedAt: item.updatedAt }));
      }
      case "testimoniale": {
        const items = await prisma.testimonial.findMany({ orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }] });
        return items.map((item) => ({ id: item.id, title: item.authorName, subtitle: item.quote, status: item.status, featuredOnHome: item.featuredOnHome, updatedAt: item.updatedAt }));
      }
      case "media": {
        const items = await prisma.mediaAsset.findMany({ orderBy: { updatedAt: "desc" } });
        return items.map((item) => ({ id: item.id, title: item.filename, subtitle: item.url, status: item.type, updatedAt: item.updatedAt }));
      }
      case "utilizatori": {
        const items = await prisma.user.findMany({ orderBy: { updatedAt: "desc" } });
        return items.map((item) => ({ id: item.id, title: item.name, subtitle: item.email, status: `${item.role} / ${item.status}`, updatedAt: item.updatedAt }));
      }
    }
  } catch {
    return [];
  }
}

export async function getAdminContentItem(type: AdminContentType, id: string) {
  switch (type) {
    case "programe":
      return prisma.program.findUnique({ where: { id } });
    case "evenimente":
      return prisma.event.findUnique({ where: { id } });
    case "galerie":
      return prisma.galleryAlbum.findUnique({ where: { id } });
    case "articole":
      return prisma.article.findUnique({ where: { id } });
    case "parteneri":
      return prisma.partner.findUnique({ where: { id } });
    case "testimoniale":
      return prisma.testimonial.findUnique({ where: { id } });
    case "media":
      return prisma.mediaAsset.findUnique({ where: { id } });
    case "utilizatori":
      return prisma.user.findUnique({ where: { id } });
  }
}
