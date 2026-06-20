import { PageHero } from "@/components/public/PageHero";
import { Container } from "@/components/ui/Container";
import { PublicButton } from "@/components/ui/PublicButton";

export default function VolunteerPage() {
  return <><PageHero title="Implică-te" eyebrow="Voluntariat" intro="Alătură-te echipei Star Sim și ajută-ne să ducem astronomia mai aproape de copii." /><Container className="section-padding"><div className="premium-card p-8"><h2 className="font-serif text-3xl text-starsim-navy">Căutăm oameni curioși și implicați</h2><p className="mt-3 text-starsim-muted">Scrie-ne și povestește-ne cum ai vrea să contribui: organizare, comunicare, educație, logistică sau parteneriate.</p><PublicButton href="/contact?type=VOLUNTEERING" className="mt-6">Vreau să fiu voluntar</PublicButton></div></Container></>;
}
