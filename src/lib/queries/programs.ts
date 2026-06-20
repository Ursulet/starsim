import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { fallbackPrograms } from "./home";

export async function getPublishedPrograms() {
  try {
    const items = await prisma.program.findMany({ where: { status: "PUBLISHED" }, include: { heroImage: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
    return items.length ? items : fallbackPrograms;
  } catch {
    return fallbackPrograms;
  }
}

export async function getProgramBySlug(slug: string) {
  try {
    const item = await prisma.program.findFirst({ where: { slug, status: "PUBLISHED" }, include: { heroImage: true, events: { where: { status: "PUBLISHED" }, take: 3 } } });
    if (item) return item;
  } catch {}
  const fallback = fallbackPrograms.find((item) => item.slug === slug);
  if (!fallback) notFound();
  return { ...fallback, content: null, ctaLabel: "Contactează-ne", ctaHref: "/contact", events: [] };
}
