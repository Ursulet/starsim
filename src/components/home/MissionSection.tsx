import { GraduationCap, Telescope, UsersRound } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MissionCard } from "@/components/cards/MissionCard";
import type { HomeMissionCard, HomepageSettings } from "@/lib/homepage-settings";

const missionIcons = {
  education: GraduationCap,
  telescope: Telescope,
  community: UsersRound
} satisfies Record<HomeMissionCard["icon"], typeof GraduationCap>;

export function MissionSection({ settings }: { settings: HomepageSettings }) {
  return (
    <section className="section-padding pt-8">
      <Container>
        <SectionHeading title={settings.missionTitle} subtitle={settings.missionSubtitle} />
        <div className="grid gap-5 md:grid-cols-3">
          {settings.missionCards.map((card) => (
            <MissionCard key={card.icon} title={card.title} icon={missionIcons[card.icon]} text={card.text} />
          ))}
        </div>
      </Container>
    </section>
  );
}
