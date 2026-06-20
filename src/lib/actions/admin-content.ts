"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Prisma } from "@prisma/client";
import type { Session } from "next-auth";
import type { AdminContentType } from "@/lib/admin/content";
import { adminContentModules } from "@/lib/admin/content";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import { createMediaAssetFromUpload, deleteStoredUpload, saveUploadedFile, uploadedFileFromForm } from "@/lib/uploads";
import { hashPassword } from "@/server/auth/password";
import { requireRole } from "@/server/auth/session";

type AdminUser = Session["user"];

export type ActionState = { error: string } | null;

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
  if (type === "utilizatori") return requireRole(["ADMIN"]);
  return requireRole(["ADMIN", "EDITOR"]);
}

async function logAdminAction(
  user: AdminUser,
  action: string,
  entity: string,
  entityId?: string,
  metadata?: Prisma.InputJsonObject
) {
  try {
    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        action,
        entity,
        entityId,
        metadata
      }
    });
  } catch {}
}

function redirectTo(type: AdminContentType) {
  const config = adminContentModules[type];
  revalidatePath(config.basePath);
  if (config.publicBasePath) revalidatePath(config.publicBasePath);
  revalidatePath("/");
  redirect(config.basePath);
}

async function mediaIdFromForm(
  formData: FormData,
  fieldName: string,
  folder: AdminContentType,
  user: AdminUser,
  fallbackAlt: string
) {
  const file = uploadedFileFromForm(formData, `${fieldName}Upload`);
  if (file) {
    const asset = await createMediaAssetFromUpload({
      file,
      folder,
      uploadedById: user.id,
      alt: str(formData, `${fieldName}Alt`) || fallbackAlt
    });
    return asset.id;
  }

  return nullable(formData, fieldName);
}

async function assertSafeUserUpdate(id: string, user: AdminUser, nextRole: string, nextStatus: string) {
  const current = await prisma.user.findUnique({ where: { id }, select: { role: true, status: true } });
  if (!current) throw new Error("Utilizatorul lipsește.");

  if (id === user.id && (nextRole !== "ADMIN" || nextStatus !== "ACTIVE")) {
    throw new Error("Nu îți poți elimina propriul acces de administrator.");
  }

  if (current.role === "ADMIN" && current.status === "ACTIVE" && (nextRole !== "ADMIN" || nextStatus !== "ACTIVE")) {
    const activeAdmins = await prisma.user.count({ where: { role: "ADMIN", status: "ACTIVE" } });
    if (activeAdmins <= 1) throw new Error("Nu poți dezactiva ultimul administrator activ.");
  }
}

async function assertSafeUserDelete(id: string, user: AdminUser) {
  if (id === user.id) throw new Error("Nu îți poți șterge propriul cont.");

  const target = await prisma.user.findUnique({ where: { id }, select: { role: true, status: true } });
  if (!target) throw new Error("Utilizatorul lipsește.");

  if (target.role === "ADMIN" && target.status === "ACTIVE") {
    const activeAdmins = await prisma.user.count({ where: { role: "ADMIN", status: "ACTIVE" } });
    if (activeAdmins <= 1) throw new Error("Nu poți șterge ultimul administrator activ.");
  }
}

export async function createAdminContentAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const type = typedModule(formData);
    const user = await requireAccess(type);
    let entityId: string | undefined;

    switch (type) {
      case "programe": {
        const status = str(formData, "status") || "DRAFT";
        const title = str(formData, "title");
        const item = await prisma.program.create({
          data: {
            title,
            slug: contentSlug(formData, title),
            excerpt: str(formData, "excerpt"),
            heroImageId: await mediaIdFromForm(formData, "heroImageId", type, user, title),
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
        entityId = item.id;
        break;
      }
      case "evenimente": {
        const status = str(formData, "status") || "DRAFT";
        const title = str(formData, "title");
        const item = await prisma.event.create({
          data: {
            title,
            slug: contentSlug(formData, title),
            excerpt: str(formData, "excerpt"),
            heroImageId: await mediaIdFromForm(formData, "heroImageId", type, user, title),
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
        entityId = item.id;
        break;
      }
      case "galerie": {
        const status = str(formData, "status") || "DRAFT";
        const title = str(formData, "title");
        const item = await prisma.galleryAlbum.create({
          data: {
            title,
            slug: contentSlug(formData, title),
            description: nullable(formData, "description"),
            coverImageId: await mediaIdFromForm(formData, "coverImageId", type, user, title),
            content: textToTiptap(str(formData, "body")),
            status: status as any,
            featuredOnHome: boolValue(formData, "featuredOnHome"),
            sortOrder: intValue(formData, "sortOrder"),
            publishedAt: publishDate(status),
            metaTitle: nullable(formData, "metaTitle"),
            metaDescription: nullable(formData, "metaDescription")
          }
        });
        entityId = item.id;
        break;
      }
      case "articole": {
        const status = str(formData, "status") || "DRAFT";
        const title = str(formData, "title");
        const item = await prisma.article.create({
          data: {
            title,
            slug: contentSlug(formData, title),
            excerpt: str(formData, "excerpt"),
            heroImageId: await mediaIdFromForm(formData, "heroImageId", type, user, title),
            content: textToTiptap(str(formData, "body")),
            authorName: nullable(formData, "authorName"),
            category: nullable(formData, "category"),
            tags: str(formData, "tags")
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean),
            status: status as any,
            featuredOnHome: boolValue(formData, "featuredOnHome"),
            publishedAt: publishDate(status),
            focusKeyword: nullable(formData, "focusKeyword"),
            metaTitle: nullable(formData, "metaTitle"),
            metaDescription: nullable(formData, "metaDescription")
          }
        });
        entityId = item.id;
        break;
      }
      case "parteneri": {
        const name = str(formData, "name");
        const item = await prisma.partner.create({
          data: {
            name,
            slug: contentSlug(formData, name),
            description: nullable(formData, "description"),
            logoId: await mediaIdFromForm(formData, "logoId", type, user, name),
            website: nullable(formData, "website"),
            type: nullable(formData, "type"),
            status: (str(formData, "status") || "DRAFT") as any,
            featuredOnHome: boolValue(formData, "featuredOnHome"),
            sortOrder: intValue(formData, "sortOrder")
          }
        });
        entityId = item.id;
        break;
      }
      case "testimoniale": {
        const authorName = str(formData, "authorName");
        const item = await prisma.testimonial.create({
          data: {
            quote: str(formData, "quote"),
            authorName,
            imageId: await mediaIdFromForm(formData, "imageId", type, user, authorName),
            authorRole: nullable(formData, "authorRole"),
            organization: nullable(formData, "organization"),
            status: (str(formData, "status") || "DRAFT") as any,
            featuredOnHome: boolValue(formData, "featuredOnHome"),
            sortOrder: intValue(formData, "sortOrder")
          }
        });
        entityId = item.id;
        break;
      }
      case "media": {
        const file = uploadedFileFromForm(formData, "file");
        if (!file) throw new Error("Alege un fișier pentru upload.");
        const asset = await createMediaAssetFromUpload({
          file,
          folder: nullable(formData, "folder") || "media",
          uploadedById: user.id,
          alt: nullable(formData, "alt"),
          caption: nullable(formData, "caption"),
          credit: nullable(formData, "credit")
        });
        entityId = asset.id;
        break;
      }
      case "utilizatori": {
        const password = str(formData, "password");
        if (password.length < 12) throw new Error("Parola trebuie să aibă minim 12 caractere.");
        const item = await prisma.user.create({
          data: {
            name: str(formData, "name"),
            email: str(formData, "email").toLowerCase(),
            passwordHash: await hashPassword(password),
            role: (str(formData, "role") || "EDITOR") as any,
            status: (str(formData, "status") || "ACTIVE") as any
          }
        });
        entityId = item.id;
        break;
      }
    }

    await logAdminAction(user, "CREATE", typedModule(formData), entityId);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Eroare necunoscută.";
    return { error: message };
  }

  redirectTo(typedModule(formData));
  return null;
}

export async function updateAdminContentAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const type = typedModule(formData);
    const user = await requireAccess(type);
    const id = str(formData, "id");
    if (!id) throw new Error("Element lipsă.");

    switch (type) {
      case "programe": {
        const status = str(formData, "status") || "DRAFT";
        const title = str(formData, "title");
        await prisma.program.update({
          where: { id },
          data: {
            title,
            slug: contentSlug(formData, title),
            excerpt: str(formData, "excerpt"),
            heroImageId: await mediaIdFromForm(formData, "heroImageId", type, user, title),
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
        const title = str(formData, "title");
        await prisma.event.update({
          where: { id },
          data: {
            title,
            slug: contentSlug(formData, title),
            excerpt: str(formData, "excerpt"),
            heroImageId: await mediaIdFromForm(formData, "heroImageId", type, user, title),
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
        const title = str(formData, "title");
        await prisma.galleryAlbum.update({
          where: { id },
          data: {
            title,
            slug: contentSlug(formData, title),
            description: nullable(formData, "description"),
            coverImageId: await mediaIdFromForm(formData, "coverImageId", type, user, title),
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
        const title = str(formData, "title");
        await prisma.article.update({
          where: { id },
          data: {
            title,
            slug: contentSlug(formData, title),
            excerpt: str(formData, "excerpt"),
            heroImageId: await mediaIdFromForm(formData, "heroImageId", type, user, title),
            content: textToTiptap(str(formData, "body")),
            authorName: nullable(formData, "authorName"),
            category: nullable(formData, "category"),
            tags: str(formData, "tags")
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean),
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
        const name = str(formData, "name");
        await prisma.partner.update({
          where: { id },
          data: {
            name,
            slug: contentSlug(formData, name),
            description: nullable(formData, "description"),
            logoId: await mediaIdFromForm(formData, "logoId", type, user, name),
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
        const authorName = str(formData, "authorName");
        await prisma.testimonial.update({
          where: { id },
          data: {
            quote: str(formData, "quote"),
            authorName,
            imageId: await mediaIdFromForm(formData, "imageId", type, user, authorName),
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
        const current = await prisma.mediaAsset.findUnique({ where: { id } });
        if (!current) throw new Error("Fișierul media lipsește.");

        const file = uploadedFileFromForm(formData, "file");
        const metadata = {
          alt: nullable(formData, "alt"),
          caption: nullable(formData, "caption"),
          credit: nullable(formData, "credit"),
          folder: nullable(formData, "folder") || current.folder
        };

        if (file) {
          const stored = await saveUploadedFile(file, metadata.folder || "media");
          await prisma.mediaAsset.update({
            where: { id },
            data: {
              ...stored,
              ...metadata,
              uploadedById: user.id
            }
          });
          await deleteStoredUpload(current.storageKey);
        } else {
          await prisma.mediaAsset.update({ where: { id }, data: metadata });
        }
        break;
      }
      case "utilizatori": {
        const password = str(formData, "password");
        const role = str(formData, "role") || "EDITOR";
        const status = str(formData, "status") || "ACTIVE";

        await assertSafeUserUpdate(id, user, role, status);

        await prisma.user.update({
          where: { id },
          data: {
            name: str(formData, "name"),
            email: str(formData, "email").toLowerCase(),
            ...(password ? { passwordHash: await hashPassword(password) } : {}),
            role: role as any,
            status: status as any
          }
        });
        break;
      }
    }

    await logAdminAction(user, "UPDATE", typedModule(formData), id);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Eroare necunoscută.";
    return { error: message };
  }

  redirectTo(typedModule(formData));
  return null;
}

export async function deleteAdminContentAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const type = typedModule(formData);
    const user = await requireAccess(type);
    const id = str(formData, "id");
    if (!id) throw new Error("Element lipsă.");

    switch (type) {
      case "programe":
        await prisma.program.delete({ where: { id } });
        break;
      case "evenimente":
        await prisma.event.delete({ where: { id } });
        break;
      case "galerie":
        await prisma.galleryAlbum.delete({ where: { id } });
        break;
      case "articole":
        await prisma.article.delete({ where: { id } });
        break;
      case "parteneri":
        await prisma.partner.delete({ where: { id } });
        break;
      case "testimoniale":
        await prisma.testimonial.delete({ where: { id } });
        break;
      case "media": {
        const current = await prisma.mediaAsset.findUnique({ where: { id }, select: { storageKey: true } });
        await prisma.mediaAsset.delete({ where: { id } });
        await deleteStoredUpload(current?.storageKey);
        break;
      }
      case "utilizatori":
        await assertSafeUserDelete(id, user);
        await prisma.user.delete({ where: { id } });
        break;
    }

    await logAdminAction(user, "DELETE", type, id);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Eroare necunoscută.";
    return { error: message };
  }

  redirectTo(typedModule(formData));
  return null;
}
