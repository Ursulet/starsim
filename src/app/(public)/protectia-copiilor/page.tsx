import type { Metadata } from "next";
import { LegalPage } from "@/components/public/LegalPage";
import { getPublishedPageBySlug } from "@/lib/queries/pages";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPublishedPageBySlug("protectia-copiilor");
  return buildMetadata({
    title: page?.metaTitle || page?.title || "Protecția copiilor și adolescenților (Safeguarding)",
    description: page?.metaDescription || page?.excerpt,
    path: "/protectia-copiilor",
    robotsIndex: page?.robotsIndex,
    robotsFollow: page?.robotsFollow
  });
}

export default function SafeguardingPolicyPage() {
  return <LegalPage slug="protectia-copiilor" />;
}
