import type { Metadata } from "next";
import { env } from "./env";

export const siteSeoDefaults = {
  siteName: "Star Sim",
  titleTemplate: "%s | Star Sim",
  defaultTitle: "Star Sim - De la o stea, la un vis",
  defaultDescription:
    "Star Sim aduce astronomia mai aproape de copii și comunități prin ateliere, observații astronomice și programe educaționale STEM.",
  locale: "ro_RO"
};

type SeoInput = {
  title?: string | null;
  description?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImageUrl?: string | null;
  canonicalUrl?: string | null;
  robotsIndex?: boolean | null;
  robotsFollow?: boolean | null;
  path?: string;
};

export function truncateMetaTitle(title: string) {
  return title.length > 62 ? `${title.slice(0, 59).trim()}...` : title;
}

export function truncateMetaDescription(description: string) {
  return description.length > 160 ? `${description.slice(0, 157).trim()}...` : description;
}

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${env.NEXT_PUBLIC_SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata(input: SeoInput): Metadata {
  const title = truncateMetaTitle(input.metaTitle || input.title || siteSeoDefaults.defaultTitle);
  const description = truncateMetaDescription(
    input.metaDescription || input.description || siteSeoDefaults.defaultDescription
  );
  const canonical = input.canonicalUrl || (input.path ? absoluteUrl(input.path) : undefined);
  const image = input.ogImageUrl || absoluteUrl("/images/mockup-site-asociatie.png");

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    robots: {
      index: input.robotsIndex ?? true,
      follow: input.robotsFollow ?? true
    },
    openGraph: {
      type: "website",
      siteName: siteSeoDefaults.siteName,
      locale: siteSeoDefaults.locale,
      title: input.ogTitle || title,
      description: input.ogDescription || description,
      url: canonical,
      images: [{ url: image }]
    },
    twitter: {
      card: "summary_large_image",
      title: input.ogTitle || title,
      description: input.ogDescription || description,
      images: [image]
    }
  };
}
