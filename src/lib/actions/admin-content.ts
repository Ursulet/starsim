"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { AdminContentType } from "@/lib/admin/content";
import { adminContentModules } from "@/lib/admin/content";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import { hashPassword } from "@/server/auth/password";
import { requireAdminUser, requireRole } from "@/server/auth/session";

function str(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function nullable(formData: FormData, key: string) {
  return str(formData, key) || null;
}

function intValue(formData: FormData, key: string, fallback = 0) {
  const value = Number(str(formData, key));
  return Number.isFinite(value) ? value : fallback;
}

function optionalInt(formData: FormData, key: string) {
  const raw = str(formData, key);
  if (!raw) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

function boolValue(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function dateValue(formData: FormData, key: string, fallback?: Date) {
  const raw = str(formData, key);
  if (!raw) return fallback || null;
  const value = new Date(raw);
  return Number.isNaN(value.getTime()) ? fallback || null : value;
}

function textToTiptap(text?: string) {
  const paragraphs = (text || "")
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    type: "doc",
    content: paragraphs.length
      ? paragraphs.map((paragraph) => ({
          type: "paragraph",
          content: [{ type: "text", text: paragraph }]
        }))
      : [{ type: "paragraph" }]
  };
}

function publishDate(status: string) {
  return status === "PUBLISHED" ? new Date() : null;
}

function typedModule(formData: FormData): AdminContentType {
  const type = str(formData, "type") as AdminContentType;
  if (!adminContentModules[type]) throw new Error("Modul admin invalid.");
  return type;
}

function contentSlug(formData: FormData, fallback: string) {
  return slugify(str(formData, "slug") || fallback);
}

async function requireAccess(type: AdminContentType) {
  if (type === "utilizatori") {
    await requireRole(["ADMIN"]);
    return;
  }

  await requireAdminUser();
}

function redirectTo(type: AdminContentType) {
  const config = adminContentModules[type];
  revalidatePath(config.basePath);
  if (config.publicBasePath) revalidatePath(config.publicBasePath);
  revalidatePath("/");
  redirect(config.basePath);
}

export async function createAdminContentAction(formData: FormData) {
  const type = typedModule(formData);
  await requireAccess(type);

  switch (type) {
    case "programe": {
      const status = str(formData, "status") || "DRAFT";
      await prisma.program.create({
        data: {
          title: str(formData, "title"),
          slug: contentSlug(formData, str(formData, "title")),
          excerpt: str(formData, "excerpt"),
          content: textToTiptap(str(formData, "body")),
          category: nullable(formData, "category"),
          icon: nullable(formData, "icon"),
          ctaLabel: nullable(formData, "ctaLabel"),
          ctaHref: nullable(formData, "ctaHref"),
          status: status as any,
          featuredOnHome: boolValue(formData, "featuredOnHome"),
          sortOrder: intValue(formData, "sortOrder"),
          publishedAt: publishDate(status),
          metaTitle: nullable(formData, "metaTitle"),
          metaDescription: nullable(formData, "metaDescription")
        }
      });
      break;
    }
    case "evenimente": {
      const status = str(formData, "status") || "DRAFT";
      await prisma.event.create({
        data: {
          title: str(formData, "title"),
          slug: contentSlug(formData, str(formData, "title")),
          excerpt: str(formData, "excerpt"),
          content: textToTiptap(str(formData, "body")),
          startsAt: dateValue(formData, "startsAt", new Date()) || new Date(),
          endsAt: dateValue(formData, "endsAt"),
          locationName: str(formData, "locationName") || "Locație Star Sim",
          address: nullable(formData, "address"),
          city: nullable(formData, "city"),
          mapUrl: nullable(formData, "mapUrl"),
          maxParticipants: optionalInt(formData, "maxParticipants"),
          registrationEnabled: boolValue(formData, "registrationEnabled"),
          registrationUrl: nullable(formData, "registrationUrl"),
          status: status as any,
          featuredOnHome: boolValue(formData, "featuredOnHome"),
          sortOrder: intValue(formData, "sortOrder"),
          publishedAt: publishDate(status),
          metaTitle: nullable(formData, "metaTitle"),
          metaDescription: nullable(formData, "metaDescription")
        }
      });
      break;
    }
    case "galerie": {
      const status = str(formData, "status") || "DRAFT";
      await prisma.galleryAlbum.create({
        data: {
          title: str(formData, "title"),
          slug: contentSlug(formData, str(formData, "title")),
          description: nullable(formData, "description"),
          content: textToTiptap(str(formData, "body")),
          status: status as any,
          featuredOnHome: boolValue(formData, "featuredOnHome"),
          sortOrder: intValue(formData, "sortOrder"),
          publishedAt: publishDate(status),
          metaTitle: nullable(formData, "metaTitle"),
          metaDescription: nullable(formData, "metaDescription")
        }
      });
      break;
    }
    case "articole": {
      const status = str(formData, "status") || "DRAFT";
      await prisma.article.create({
        data: {
          title: str(formData, "title"),
          slug: contentSlug(formData, str(formData, "title")),
          excerpt: str(formData, "excerpt"),
          content: textToTiptap(str(formData, "body")),
          authorName: nullable(formData, "authorName"),
          category: nullable(formData, "category"),
          tags: str(formData, "tags").split(",").map((item) => item.trim()).filter(Boolean),
          status: status as any,
          featuredOnHome: boolValue(formData, "featuredOnHome"),
          publishedAt: publishDate(status),
          focusKeyword: nullable(formData, "focusKeyword"),
          metaTitle: nullable(formData, "metaTitle"),
          metaDescription: nullable(formData, "metaDescription")
        }
      });
      break;
    }
    case "parteneri": {
      await prisma.partner.create({
        data: {
          name: str(formData, "name"),
          slug: contentSlug(formData, str(formData, "name")),
          description: nullable(formData, "description"),
          website: nullable(formData, "website"),
          type: nullable(formData, "type"),
          status: (str(formData, "status") || "DRAFT") as any,
          featuredOnHome: boolValue(formData, "featuredOnHome"),
          sortOrder: intValue(formData, "sortOrder")
        }
      });
      break;
    }
    case "testimoniale": {
      await prisma.testimonial.create({
        data: {
          quote: str(formData, "quote"),
          authorName: str(formData, "authorName"),
          authorRole: nullable(formData, "authorRole"),
          organization: nullable(formData, "organization"),
          status: (str(formData, "status") || "DRAFT") as any,
          featuredOnHome: boolValue(formData, "featuredOnHome"),
          sortOrder: intValue(formData, "sortOrder")
        }
      });
      break;
    }
    case "media": {
      await prisma.mediaAsset.create({
        data: {
          filename: str(formData, "filename"),
          url: str(formData, "url"),
          mimeType: str(formData, "mimeType") || "image/jpeg",
          type: (str(formData, "type") || "IMAGE") as any,
          alt: nullable(formData, "alt"),
          caption: nullable(formData, "caption"),
          credit: nullable(formData, "credit"),
          folder: nullable(formData, "folder"),
          size: intValue(formData, "size"),
          width: optionalInt(formData, "width"),
          height: optionalInt(formData, "height")
        }
      });
      break;
    }
    case "utilizatori": {
      const password = str(formData, "password");
      if (password.length < 8) throw new Error("Parola trebuie să aibă minim 8 caractere.");
      await prisma.user.create({
        data: {
          name: str(formData, "name"),
          email: str(formData, "email").toLowerCase(),
          passwordHash: await hashPassword(password),
          role: (str(formData, "role") || "EDITOR") as any,
          status: (str(formData, "status") || "ACTIVE") as any
        }
      });
      break;
    }
  }

  redirectTo(type);
}

export async function updateAdminContentAction(formData: FormData) {
  const type = typedModule(formData);
  await requireAccess(type);
  const id = str(formData, "id");
  if (!id) throw new Error("Element lipsă.");

  switch (type) {
    case "programe": {
      const status = str(formData, "status") || "DRAFT";
      await prisma.program.update({
        where: { id },
        data: {
          title: str(formData, "title"),
          slug: contentSlug(formData, str(formData, "title")),
          excerpt: str(formData, "excerpt"),
          content: textToTiptap(str(formData, "body")),
          category: nullable(formData, "category"),
          icon: nullable(formData, "icon"),
          ctaLabel: nullable(formData, "ctaLabel"),
          ctaHref: nullable(formData, "ctaHref"),
          status: status as any,
          featuredOnHome: boolValue(formData, "featuredOnHome"),
          sortOrder: intValue(formData, "sortOrder"),
          publishedAt: publishDate(status),
          metaTitle: nullable(formData, "metaTitle"),
          metaDescription: nullable(formData, "metaDescription")
        }
      });
      break;
    }
    case "evenimente": {
      const status = str(formData, "status") || "DRAFT";
      await prisma.event.update({
        where: { id },
        data: {
          title: str(formData, "title"),
          slug: contentSlug(formData, str(formData, "title")),
          excerpt: str(formData, "excerpt"),
          content: textToTiptap(str(formData, "body")),
          startsAt: dateValue(formData, "startsAt", new Date()) || new Date(),
          endsAt: dateValue(formData, "endsAt"),
          locationName: str(formData, "locationName") || "Locație Star Sim",
          address: nullable(formData, "address"),
          city: nullable(formData, "city"),
          mapUrl: nullable(formData, "mapUrl"),
          maxParticipants: optionalInt(formData, "maxParticipants"),
          registrationEnabled: boolValue(formData, "registrationEnabled"),
          registrationUrl: nullable(formData, "registrationUrl"),
          status: status as any,
          featuredOnHome: boolValue(formData, "featuredOnHome"),
          sortOrder: intValue(formData, "sortOrder"),
          publishedAt: publishDate(status),
          metaTitle: nullable(formData, "metaTitle"),
          metaDescription: nullable(formData, "metaDescription")
        }
      });
      break;
    }
    case "galerie": {
      const status = str(formData, "status") || "DRAFT";
      await prisma.galleryAlbum.update({
        where: { id },
        data: {
          title: str(formData, "title"),
          slug: contentSlug(formData, str(formData, "title")),
          description: nullable(formData, "description"),
          content: textToTiptap(str(formData, "body")),
          status: status as any,
          featuredOnHome: boolValue(formData, "featuredOnHome"),
          sortOrder: intValue(formData, "sortOrder"),
          publishedAt: publishDate(status),
          metaTitle: nullable(formData, "metaTitle"),
          metaDescription: nullable(formData, "metaDescription")
        }
      });
      break;
    }
    case "articole": {
      const status = str(formData, "status") || "DRAFT";
      await prisma.article.update({
        where: { id },
        data: {
          title: str(formData, "title"),
          slug: contentSlug(formData, str(formData, "title")),
          excerpt: str(formData, "excerpt"),
          content: textToTiptap(str(formData, "body")),
          authorName: nullable(formData, "authorName"),
          category: nullable(formData, "category"),
          tags: str(formData, "tags").split(",").map((item) => item.trim()).filter(Boolean),
          status: status as any,
          featuredOnHome: boolValue(formData, "featuredOnHome"),
          publishedAt: publishDate(status),
          focusKeyword: nullable(formData, "focusKeyword"),
          metaTitle: nullable(formData, "metaTitle"),
          metaDescription: nullable(formData, "metaDescription")
        }
      });
      break;
    }
    case "parteneri": {
      await prisma.partner.update({
        where: { id },
        data: {
          name: str(formData, "name"),
          slug: contentSlug(formData, str(formData, "name")),
          description: nullable(formData, "description"),
          website: nullable(formData, "website"),
          type: nullable(formData, "type"),
          status: (str(formData, "status") || "DRAFT") as any,
          featuredOnHome: boolValue(formData, "featuredOnHome"),
          sortOrder: intValue(formData, "sortOrder")
        }
      });
      break;
    }
    case "testimoniale": {
      await prisma.testimonial.update({
        where: { id },
        data: {
          quote: str(formData, "quote"),
          authorName: str(formData, "authorName"),
          authorRole: nullable(formData, "authorRole"),
          organization: nullable(formData, "organization"),
          status: (str(formData, "status") || "DRAFT") as any,
          featuredOnHome: boolValue(formData, "featuredOnHome"),
          sortOrder: intValue(formData, "sortOrder")
        }
      });
      break;
    }
    case "media": {
      await prisma.mediaAsset.update({
        where: { id },
        data: {
          filename: str(formData, "filename"),
          url: str(formData, "url"),
          mimeType: str(formData, "mimeType") || "image/jpeg",
          type: (str(formData, "type") || "IMAGE") as any,
          alt: nullable(formData, "alt"),
          caption: nullable(formData, "caption"),
          credit: nullable(formData, "credit"),
          folder: nullable(formData, "folder"),
          size: intValue(formData, "size"),
          width: optionalInt(formData, "width"),
          height: optionalInt(formData, "height")
        }
      });
      break;
    }
    case "utilizatori": {
      const password = str(formData, "password");
      await prisma.user.update({
        where: { id },
        data: {
          name: str(formData, "name"),
          email: str(formData, "email").toLowerCase(),
          ...(password ? { passwordHash: await hashPassword(password) } : {}),
          role: (str(formData, "role") || "EDITOR") as any,
          status: (str(formData, "status") || "ACTIVE") as any
        }
      });
      break;
    }
  }

  redirectTo(type);
}
