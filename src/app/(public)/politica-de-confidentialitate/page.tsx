import type { Metadata } from "next";
import { LegalPage } from "@/components/public/LegalPage";
import { getPublishedPageBySlug } from "@/lib/queries/pages";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPublishedPageBySlug("politica-de-confidentialitate");
  return buildMetadata({
    title: page?.metaTitle || page?.title || "Politica de confidentialitate",
    description: page?.metaDescription || page?.excerpt,
    path: "/politica-de-confidentialitate",
    robotsIndex: page?.robotsIndex,
    robotsFollow: page?.robotsFollow
  });
}

export default function PrivacyPolicyPage() {
  return <LegalPage slug="politica-de-confidentialitate" />;
}
