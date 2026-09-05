import type { Metadata } from "next";
import { LegalPage } from "@/components/public/LegalPage";
import { getPublishedPageBySlug } from "@/lib/queries/pages";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPublishedPageBySlug("politica-donatii-sponsorizari");
  return buildMetadata({
    title: page?.metaTitle || page?.title || "Politica privind donațiile și sponsorizările",
    description: page?.metaDescription || page?.excerpt,
    path: "/politica-donatii-sponsorizari",
    robotsIndex: page?.robotsIndex,
    robotsFollow: page?.robotsFollow
  });
}

export default function DonationsPolicyPage() {
  return <LegalPage slug="politica-donatii-sponsorizari" />;
}
