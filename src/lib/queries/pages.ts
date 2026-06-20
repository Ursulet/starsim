import { prisma } from "@/lib/prisma";
import { legalBodyToTiptap, legalPageDefaults } from "@/lib/legal-pages";

export type PublicPageContent = {
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: unknown;
  metaTitle?: string | null;
  metaDescription?: string | null;
  robotsIndex?: boolean | null;
  robotsFollow?: boolean | null;
};

export function getLegalFallback(slug: string): PublicPageContent | null {
  const fallback = legalPageDefaults.find((page) => page.slug === slug || page.key === slug);
  if (!fallback) return null;

  return {
    title: fallback.title,
    slug: fallback.slug,
    excerpt: fallback.excerpt,
    content: legalBodyToTiptap(fallback.body),
    metaTitle: fallback.title,
    metaDescription: fallback.excerpt,
    robotsIndex: true,
    robotsFollow: true
  };
}

export async function getPublishedPageBySlug(slug: string): Promise<PublicPageContent | null> {
  try {
    const page = await prisma.page.findFirst({
      where: { slug },
      select: {
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        status: true,
        metaTitle: true,
        metaDescription: true,
        robotsIndex: true,
        robotsFollow: true
      }
    });

    if (!page) return getLegalFallback(slug);
    if (page.status !== "PUBLISHED") return null;

    return page;
  } catch {
    return getLegalFallback(slug);
  }
}
