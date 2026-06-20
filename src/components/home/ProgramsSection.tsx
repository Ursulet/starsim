import { ProgramCard } from "@/components/cards/ProgramCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProgramsSection({ programs }: { programs: any[] }) {
  return (
    <section className="section-padding pt-4">
      <Container>
        <SectionHeading title="Programele si proiectele noastre" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, index) => <ProgramCard key={program.id} program={program} index={index} />)}
        </div>
      </Container>
    </section>
  );
}
