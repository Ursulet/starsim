import Image from "next/image";
import { CalendarClock, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PublicButton } from "@/components/ui/PublicButton";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { getEventBySlug, formatRomanianDateTime } from "@/lib/queries/events";
import { JsonLd } from "@/components/seo/JsonLd";
import { eventJsonLd } from "@/lib/schema";

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  return (
    <>
      <JsonLd data={eventJsonLd(event as any)} />
      <section className="bg-starsim-ivory/60 py-14">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-starsim-gold">Eveniment</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold text-starsim-navy md:text-5xl">{event.title}</h1>
            <p className="mt-5 flex gap-2 text-starsim-muted"><CalendarClock className="h-5 w-5 text-starsim-gold" /> {formatRomanianDateTime(new Date(event.startsAt))}</p>
            <p className="mt-3 flex gap-2 text-starsim-muted"><MapPin className="h-5 w-5 text-starsim-gold" /> {event.locationName}</p>
            <p className="mt-5 text-lg leading-8 text-starsim-muted">{event.excerpt}</p>
            <div className="mt-7"><PublicButton href={(event as any).registrationUrl || "/contact"}>{(event as any).registrationEnabled ? "Inscrie-te la eveniment" : "Contacteaza-ne pentru detalii"}</PublicButton></div>
          </div>
          <div className="relative h-80 overflow-hidden rounded-2xl shadow-premium">
            <Image src={(event as any).heroImage?.url || "/images/mockup-site-asociatie.png"} alt={(event as any).heroImage?.alt || event.title} fill className="object-cover" />
          </div>
        </Container>
      </section>
      <Container className="section-padding">
        <div className="mx-auto max-w-3xl"><RichTextRenderer content={(event as any).content} /></div>
      </Container>
    </>
  );
}
