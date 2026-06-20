import { EventCard } from "@/components/cards/EventCard";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PublicButton } from "@/components/ui/PublicButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HomepageSettings } from "@/lib/homepage-settings";

export function EventsSection({ events, settings }: { events: any[]; settings: HomepageSettings }) {
  return (
    <section className="section-padding pt-4">
      <Container>
        <SectionHeading title={settings.eventsTitle} />
        {events.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {events.map((event) => <EventCard key={event.id} event={event} />)}
          </div>
        ) : (
          <EmptyState title={settings.eventsEmptyTitle} description={settings.eventsEmptyDescription} />
        )}
        <div className="mt-8 text-center">
          <PublicButton href={settings.eventsCtaHref}>{settings.eventsCtaLabel}</PublicButton>
        </div>
      </Container>
    </section>
  );
}
