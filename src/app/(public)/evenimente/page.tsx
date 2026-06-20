import { EventCard } from "@/components/cards/EventCard";
import { PageHero } from "@/components/public/PageHero";
import { Container } from "@/components/ui/Container";
import { getPublishedEvents } from "@/lib/queries/events";

export default async function EventsPage() {
  const events = await getPublishedEvents();
  return (
    <>
      <PageHero title="Evenimente" eyebrow="Calendar Star Sim" intro="Următoarele ateliere, caravane și nopți de observații astronomice pentru copii, familii și comunități." />
      <section className="section-padding">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {events.map((event) => <EventCard key={event.id} event={event} />)}
          </div>
        </Container>
      </section>
    </>
  );
}
