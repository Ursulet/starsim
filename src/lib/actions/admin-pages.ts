"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import { requireRole } from "@/server/auth/session";

export type PageActionState = { error: string } | null;

const pageSchema = z.object({
  id: z.string().optional(),
  key: z.string().min(2).max(80),
  title: z.string().min(3).max(160),
  slug: z.string().min(2).max(160).optional(),
  excerpt: z.string().max(300).optional(),
  body: z.string().max(12000).optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  metaTitle: z.string().max(70).optional(),
  metaDescription: z.string().max(170).optional()
});

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

function normalizeKey(input: string) {
  return slugify(input).replace(/-/g, "_");
}

async function parsePageForm(formData: FormData) {
  const raw = {
    id: String(formData.get("id") || "") || undefined,
    key: String(formData.get("key") || ""),
    title: String(formData.get("title") || ""),
    slug: String(formData.get("slug") || ""),
    excerpt: String(formData.get("excerpt") || ""),
    body: String(formData.get("body") || ""),
    status: String(formData.get("status") || "DRAFT"),
    metaTitle: String(formData.get("metaTitle") || ""),
    metaDescription: String(formData.get("metaDescription") || "")
  };

  const parsed = pageSchema.parse(raw);
  const slug = slugify(parsed.slug || parsed.title);

  return {
    ...parsed,
    key: normalizeKey(parsed.key),
    slug,
    content: textToTiptap(parsed.body),
    excerpt: parsed.excerpt || null,
    metaTitle: parsed.metaTitle || null,
    metaDescription: parsed.metaDescription || null,
    publishedAt: parsed.status === "PUBLISHED" ? new Date() : null
  };
}

async function logPageAction(action: string, entityId?: string) {
  try {
    const user = await requireRole(["ADMIN", "EDITOR"]);
    await prisma.auditLog.create({ data: { actorId: user.id, action, entity: "pagini", entityId } });
  } catch {}
}

export async function createPageAction(
  _prevState: PageActionState,
  formData: FormData
): Promise<PageActionState> {
  await requireRole(["ADMIN", "EDITOR"]);
  let page: { id: string; slug: string } | undefined;

  try {
    const data = await parsePageForm(formData);

    page = await prisma.page.create({
      data: {
        key: data.key,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        template: "legal",
        status: data.status,
        publishedAt: data.publishedAt,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Eroare necunoscută.";
    return { error: message };
  }

  revalidatePath("/");
  revalidatePath(`/${page.slug}`);
  revalidatePath("/admin/pagini");
  await logPageAction("CREATE", page.id);
  redirect(`/admin/pagini/${page.id}/edit`);
}

export async function updatePageAction(
  _prevState: PageActionState,
  formData: FormData
): Promise<PageActionState> {
  await requireRole(["ADMIN", "EDITOR"]);
  let page: { id: string; slug: string } | undefined;

  try {
    const data = await parsePageForm(formData);
    if (!data.id) throw new Error("Pagina lipsește.");

    page = await prisma.page.update({
      where: { id: data.id },
      data: {
        key: data.key,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        status: data.status,
        publishedAt: data.status === "PUBLISHED" ? new Date() : null,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Eroare necunoscută.";
    return { error: message };
  }

  revalidatePath("/");
  revalidatePath(`/${page.slug}`);
  revalidatePath("/admin/pagini");
  await logPageAction("UPDATE", page.id);
  redirect("/admin/pagini");
}

export async function deletePageAction(
  _prevState: PageActionState,
  formData: FormData
): Promise<PageActionState> {
  await requireRole(["ADMIN", "EDITOR"]);
  let page: { id: string; slug: string } | undefined;

  try {
    const id = String(formData.get("id") || "").trim();
    if (!id) throw new Error("Pagina lipsește.");

    page = await prisma.page.delete({ where: { id } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Eroare necunoscută.";
    return { error: message };
  }

  revalidatePath("/");
  revalidatePath(`/${page.slug}`);
  revalidatePath("/admin/pagini");
  await logPageAction("DELETE", page.id);
  redirect("/admin/pagini");
}
