import { EventCard } from "@/components/cards/EventCard";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PublicButton } from "@/components/ui/PublicButton";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function EventsSection({ events }: { events: any[] }) {
  return (
    <section className="section-padding pt-4">
      <Container>
        <SectionHeading title="Urmatoarele evenimente" />
        {events.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {events.map((event) => <EventCard key={event.id} event={event} />)}
          </div>
        ) : (
          <EmptyState title="Pregatim urmatoarele evenimente sub cerul instelat." description="Urmareste-ne pentru noutati si inscrieri." />
        )}
        <div className="mt-8 text-center">
          <PublicButton href="/evenimente">Vezi toate evenimentele →</PublicButton>
        </div>
      </Container>
    </section>
  );
}
