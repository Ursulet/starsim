import { PageHero } from "@/components/public/PageHero";
import { Container } from "@/components/ui/Container";
import { PublicButton } from "@/components/ui/PublicButton";

export default function PartnersPage() {
  return <><PageHero title="Parteneriate" eyebrow="Impact împreună" intro="Construim alături de școli, companii și instituții programe care apropie copiii de știință." /><Container className="section-padding"><div className="premium-card p-8"><h2 className="font-serif text-3xl text-starsim-navy">Hai să construim un proiect cu sens</h2><p className="mt-3 text-starsim-muted">Putem colabora pentru ateliere, caravane, evenimente publice sau programe recurente de educație STEM.</p><PublicButton href="/contact?type=PARTNERSHIP" className="mt-6">Propune un parteneriat</PublicButton></div></Container></>;
}
