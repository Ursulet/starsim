import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { fallbackEvents } from "./home";

export function formatRomanianDateBadge(date: Date) {
  const months = ["IAN", "FEB", "MAR", "APR", "MAI", "IUN", "IUL", "AUG", "SEP", "OCT", "NOI", "DEC"];
  return { day: String(date.getDate()).padStart(2, "0"), month: months[date.getMonth()] };
}

export function formatRomanianDateTime(date: Date) {
  return new Intl.DateTimeFormat("ro-RO", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/Bucharest" }).format(date);
}

export async function getPublishedEvents() {
  try {
    const items = await prisma.event.findMany({ where: { status: "PUBLISHED" }, include: { heroImage: true, program: true }, orderBy: { startsAt: "asc" } });
    return items.length ? items : fallbackEvents;
  } catch {
    return fallbackEvents;
  }
}

export async function getEventBySlug(slug: string) {
  try {
    const item = await prisma.event.findFirst({ where: { slug, status: { in: ["PUBLISHED", "CANCELLED"] } }, include: { heroImage: true, program: true, galleryAlbums: true } });
    if (item) return item;
  } catch {}
  const fallback = fallbackEvents.find((item) => item.slug === slug);
  if (!fallback) notFound();
  return { ...fallback, content: null, registrationEnabled: true, registrationUrl: "/contact", program: null, galleryAlbums: [], status: "PUBLISHED" };
}
