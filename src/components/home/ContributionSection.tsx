import { HandHeart, Handshake, Users } from "lucide-react";
import { ContributionCard } from "@/components/cards/ContributionCard";
import { Container } from "@/components/ui/Container";
import { StarField } from "@/components/ui/StarField";
import type { HomeContributionCard, HomepageSettings } from "@/lib/homepage-settings";

const contributionIcons = {
  donation: HandHeart,
  volunteer: Users,
  partnership: Handshake
} satisfies Record<HomeContributionCard["icon"], typeof HandHeart>;

export function ContributionSection({ settings }: { settings: HomepageSettings }) {
  return (
    <section className="navy-gradient relative overflow-hidden py-12 text-white">
      <StarField />
      <Container className="relative">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">{settings.contributionTitle}</h2>
          <p className="mt-3 text-white/78">{settings.contributionSubtitle}</p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {settings.contributionCards.map((card) => (
            <ContributionCard key={card.icon} title={card.title} text={card.text} href={card.href} action={card.action} icon={contributionIcons[card.icon]} />
          ))}
        </div>
      </Container>
    </section>
  );
}
