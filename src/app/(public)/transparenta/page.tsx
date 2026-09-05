import type { Metadata } from "next";
import { LegalPage } from "@/components/public/LegalPage";
import { getPublishedPageBySlug } from "@/lib/queries/pages";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPublishedPageBySlug("transparenta");
  return buildMetadata({
    title: page?.metaTitle || page?.title || "Transparență și date legale",
    description: page?.metaDescription || page?.excerpt,
    path: "/transparenta",
    robotsIndex: page?.robotsIndex,
    robotsFollow: page?.robotsFollow
  });
}

export default function TransparencyPage() {
  return <LegalPage slug="transparenta" />;
}
