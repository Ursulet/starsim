import type { Metadata } from "next";
import { LegalPage } from "@/components/public/LegalPage";
import { getPublishedPageBySlug } from "@/lib/queries/pages";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPublishedPageBySlug("termeni-si-conditii");
  return buildMetadata({
    title: page?.metaTitle || page?.title || "Termeni si conditii",
    description: page?.metaDescription || page?.excerpt,
    path: "/termeni-si-conditii",
    robotsIndex: page?.robotsIndex,
    robotsFollow: page?.robotsFollow
  });
}

export default function TermsPage() {
  return <LegalPage slug="termeni-si-conditii" />;
}
