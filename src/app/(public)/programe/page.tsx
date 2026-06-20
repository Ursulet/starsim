import { ProgramCard } from "@/components/cards/ProgramCard";
import { PageHero } from "@/components/public/PageHero";
import { Container } from "@/components/ui/Container";
import { PublicButton } from "@/components/ui/PublicButton";
import { getPublishedPrograms } from "@/lib/queries/programs";

export default async function ProgramsPage() {
  const programs = await getPublishedPrograms();
  return (
    <>
      <PageHero title="Programele si proiectele noastre" eyebrow="Educatie prin astronomie" intro="Ateliere, caravane si seri de observatii care transforma curiozitatea copiilor in incredere si imaginatie." />
      <section className="section-padding">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program, index) => <ProgramCard key={program.id} program={program} index={index} />)}
          </div>
          <div className="premium-card mt-12 flex flex-col items-start justify-between gap-5 p-8 md:flex-row md:items-center">
            <div>
              <h2 className="font-serif text-2xl text-starsim-navy">Vrei sa aducem astronomia in scoala sau comunitatea ta?</h2>
              <p className="mt-2 text-starsim-muted">Spune-ne unde putem aprinde urmatoarea intrebare buna.</p>
            </div>
            <PublicButton href="/contact">Contacteaza-ne</PublicButton>
          </div>
        </Container>
      </section>
    </>
  );
}
