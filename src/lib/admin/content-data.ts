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
  thumbnailUrl?: string | null;
  mimeType?: string | null;
  size?: number | null;
};

export type AdminMediaOption = {
  id: string;
  url: string;
  filename: string;
  alt: string | null;
  mimeType: string;
};

export async function getAdminMediaOptions(): Promise<AdminMediaOption[]> {
  try {
    return await prisma.mediaAsset.findMany({
      where: { type: "IMAGE" },
      orderBy: { updatedAt: "desc" },
      take: 80,
      select: { id: true, url: true, filename: true, alt: true, mimeType: true }
    });
  } catch {
    return [];
  }
}

export async function getAdminContentList(type: AdminContentType): Promise<AdminContentListItem[]> {
  try {
    switch (type) {
      case "programe": {
        const items = await prisma.program.findMany({ include: { heroImage: true }, orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }] });
        return items.map((item) => ({ id: item.id, title: item.title, subtitle: item.excerpt, slug: item.slug, status: item.status, featuredOnHome: item.featuredOnHome, updatedAt: item.updatedAt, thumbnailUrl: item.heroImage?.url }));
      }
      case "evenimente": {
        const items = await prisma.event.findMany({ include: { heroImage: true }, orderBy: [{ startsAt: "desc" }] });
        return items.map((item) => ({ id: item.id, title: item.title, subtitle: item.locationName, slug: item.slug, status: item.status, featuredOnHome: item.featuredOnHome, updatedAt: item.updatedAt, thumbnailUrl: item.heroImage?.url }));
      }
      case "galerie": {
        const items = await prisma.galleryAlbum.findMany({ include: { coverImage: true }, orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }] });
        return items.map((item) => ({ id: item.id, title: item.title, subtitle: item.description, slug: item.slug, status: item.status, featuredOnHome: item.featuredOnHome, updatedAt: item.updatedAt, thumbnailUrl: item.coverImage?.url }));
      }
      case "articole": {
        const items = await prisma.article.findMany({ include: { heroImage: true }, orderBy: [{ updatedAt: "desc" }] });
        return items.map((item) => ({ id: item.id, title: item.title, subtitle: item.excerpt, slug: item.slug, status: item.status, featuredOnHome: item.featuredOnHome, updatedAt: item.updatedAt, thumbnailUrl: item.heroImage?.url }));
      }
      case "parteneri": {
        const items = await prisma.partner.findMany({ include: { logo: true }, orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }] });
        return items.map((item) => ({ id: item.id, title: item.name, subtitle: item.website, slug: item.slug, status: item.status, featuredOnHome: item.featuredOnHome, updatedAt: item.updatedAt, thumbnailUrl: item.logo?.url }));
      }
      case "testimoniale": {
        const items = await prisma.testimonial.findMany({ include: { image: true }, orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }] });
        return items.map((item) => ({ id: item.id, title: item.authorName, subtitle: item.quote, status: item.status, featuredOnHome: item.featuredOnHome, updatedAt: item.updatedAt, thumbnailUrl: item.image?.url }));
      }
      case "media": {
        const items = await prisma.mediaAsset.findMany({ orderBy: { updatedAt: "desc" } });
        return items.map((item) => ({ id: item.id, title: item.originalName || item.filename, subtitle: item.caption || item.alt || item.url, status: item.type, updatedAt: item.updatedAt, thumbnailUrl: item.type === "IMAGE" ? item.url : null, mimeType: item.mimeType, size: item.size }));
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
      return prisma.program.findUnique({ where: { id }, include: { heroImage: true } });
    case "evenimente":
      return prisma.event.findUnique({ where: { id }, include: { heroImage: true } });
    case "galerie":
      return prisma.galleryAlbum.findUnique({ where: { id }, include: { coverImage: true } });
    case "articole":
      return prisma.article.findUnique({ where: { id }, include: { heroImage: true } });
    case "parteneri":
      return prisma.partner.findUnique({ where: { id }, include: { logo: true } });
    case "testimoniale":
      return prisma.testimonial.findUnique({ where: { id }, include: { image: true } });
    case "media":
      return prisma.mediaAsset.findUnique({ where: { id } });
    case "utilizatori":
      return prisma.user.findUnique({ where: { id } });
  }
}
