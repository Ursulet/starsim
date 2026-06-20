import { PageHero } from "@/components/public/PageHero";
import { Container } from "@/components/ui/Container";

export default function AboutPage() {
  return <><PageHero title="Despre Star Sim" eyebrow="Povestea noastra" intro="Credem ca o privire catre cer poate deschide o lume intreaga pentru copii." /><Container className="section-padding"><div className="mx-auto max-w-3xl text-lg leading-8 text-starsim-muted">Star Sim este o asociatie dedicata educatiei prin astronomie, activitatilor STEM si experientelor care dau copiilor incredere sa intrebe, sa descopere si sa viseze mai departe.</div></Container></>;
}
