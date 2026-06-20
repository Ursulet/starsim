import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const fallbackArticles = [
  {
    id: "a1",
    title: "Cum aprindem curiozitatea pentru astronomie",
    slug: "cum-aprindem-curiozitatea-pentru-astronomie",
    excerpt: "Idei simple pentru părinți și profesori care vor să aducă stelele mai aproape de copii.",
    category: "Educație",
    authorName: "Star Sim",
    publishedAt: new Date(),
    heroImage: null,
    content: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Astronomia începe cu o întrebare bună și cu răbdarea de a privi cerul." }] }] }
  }
];

export async function getPublishedArticles() {
  try {
    const items = await prisma.article.findMany({ where: { status: "PUBLISHED" }, include: { heroImage: true }, orderBy: { publishedAt: "desc" } });
    return items.length ? items : fallbackArticles;
  } catch {
    return fallbackArticles;
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    const item = await prisma.article.findFirst({ where: { slug, status: "PUBLISHED" }, include: { heroImage: true } });
    if (item) return item;
  } catch {}
  const fallback = fallbackArticles.find((item) => item.slug === slug);
  if (!fallback) notFound();
  return fallback;
}
