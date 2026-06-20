import { GraduationCap, Telescope, UsersRound } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MissionCard } from "@/components/cards/MissionCard";

export function MissionSection() {
  return (
    <section className="section-padding pt-8">
      <Container>
        <SectionHeading title="Misiunea noastra" subtitle="Inspiram curiozitatea. Impartasim cunoasterea. Construim visuri." />
        <div className="grid gap-5 md:grid-cols-3">
          <MissionCard title="Educatie" icon={GraduationCap} text="Ateliere si activitati interactive care aduc stiinta mai aproape de copii si tineri." />
          <MissionCard title="Nopti de observatii" icon={Telescope} text="Privim cerul impreuna si descoperim minunile Universului prin lentile si povesti." />
          <MissionCard title="Comunitate" icon={UsersRound} text="Construim o comunitate unita in jurul pasiunii pentru astronomie si educatie." />
        </div>
      </Container>
    </section>
  );
}
