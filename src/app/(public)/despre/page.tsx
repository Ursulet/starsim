import { PageHero } from "@/components/public/PageHero";
import { Container } from "@/components/ui/Container";

export default function AboutPage() {
  return <><PageHero title="Despre Star Sim" eyebrow="Povestea noastră" intro="Credem că o privire către cer poate deschide o lume întreagă pentru copii." /><Container className="section-padding"><div className="mx-auto max-w-3xl text-lg leading-8 text-starsim-muted">Star Sim este o asociație dedicată educației prin astronomie, activităților STEM și experiențelor care dau copiilor încredere să întrebe, să descopere și să viseze mai departe.</div></Container></>;
}
