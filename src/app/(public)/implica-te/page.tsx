import { PageHero } from "@/components/public/PageHero";
import { Container } from "@/components/ui/Container";
import { PublicButton } from "@/components/ui/PublicButton";

export default function VolunteerPage() {
  return <><PageHero title="Implica-te" eyebrow="Voluntariat" intro="Alatura-te echipei Star Sim si ajuta-ne sa ducem astronomia mai aproape de copii." /><Container className="section-padding"><div className="premium-card p-8"><h2 className="font-serif text-3xl text-starsim-navy">Cautam oameni curiosi si implicati</h2><p className="mt-3 text-starsim-muted">Scrie-ne si povesteste-ne cum ai vrea sa contribui: organizare, comunicare, educatie, logistica sau parteneriate.</p><PublicButton href="/contact?type=VOLUNTEERING" className="mt-6">Vreau sa fiu voluntar</PublicButton></div></Container></>;
}
