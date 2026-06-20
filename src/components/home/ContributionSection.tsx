import { HandHeart, Handshake, Users } from "lucide-react";
import { ContributionCard } from "@/components/cards/ContributionCard";
import { Container } from "@/components/ui/Container";
import { StarField } from "@/components/ui/StarField";

export function ContributionSection() {
  return (
    <section className="navy-gradient relative overflow-hidden py-12 text-white">
      <StarField />
      <Container className="relative">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">Fiecare gest conteaza</h2>
          <p className="mt-3 text-white/78">Impreuna putem duce astronomia mai departe.</p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <ContributionCard title="Sustine-ne" text="Donatia ta ajuta la finantarea programelor noastre educationale." href="/doneaza" action="Doneaza acum" icon={HandHeart} />
          <ContributionCard title="Fii voluntar" text="Alatura-te echipei noastre si inspira generatiile viitoare." href="/implica-te" action="Afla cum te poti implica" icon={Users} />
          <ContributionCard title="Parteneriate" text="Impreuna cu partenerii nostri, construim proiecte de impact." href="/parteneriate" action="Colaboreaza cu noi" icon={Handshake} />
        </div>
      </Container>
    </section>
  );
}
