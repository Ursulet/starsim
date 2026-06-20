import { ProgramCard } from "@/components/cards/ProgramCard";
import { PageHero } from "@/components/public/PageHero";
import { Container } from "@/components/ui/Container";
import { PublicButton } from "@/components/ui/PublicButton";
import { getPublishedPrograms } from "@/lib/queries/programs";

export default async function ProgramsPage() {
  const programs = await getPublishedPrograms();
  return (
    <>
      <PageHero title="Programele și proiectele noastre" eyebrow="Educație prin astronomie" intro="Ateliere, caravane și seri de observații care transformă curiozitatea copiilor în încredere și imaginație." />
      <section className="section-padding">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program, index) => <ProgramCard key={program.id} program={program} index={index} />)}
          </div>
          <div className="premium-card mt-12 flex flex-col items-start justify-between gap-5 p-8 md:flex-row md:items-center">
            <div>
              <h2 className="font-serif text-2xl text-starsim-navy">Vrei să aducem astronomia în școala sau comunitatea ta?</h2>
              <p className="mt-2 text-starsim-muted">Spune-ne unde putem aprinde următoarea întrebare bună.</p>
            </div>
            <PublicButton href="/contact">Contactează-ne</PublicButton>
          </div>
        </Container>
      </section>
    </>
  );
}
