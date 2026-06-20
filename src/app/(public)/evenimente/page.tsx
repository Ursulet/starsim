import { EventCard } from "@/components/cards/EventCard";
import { PageHero } from "@/components/public/PageHero";
import { Container } from "@/components/ui/Container";
import { getPublishedEvents } from "@/lib/queries/events";

export default async function EventsPage() {
  const events = await getPublishedEvents();
  return (
    <>
      <PageHero title="Evenimente" eyebrow="Calendar Star Sim" intro="Urmatoarele ateliere, caravane si nopti de observatii astronomice pentru copii, familii si comunitati." />
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
