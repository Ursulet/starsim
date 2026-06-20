import Image from "next/image";
import Link from "next/link";
import { CalendarClock, MapPin } from "lucide-react";
import { formatRomanianDateBadge, formatRomanianDateTime } from "@/lib/queries/events";

export function EventCard({ event }: { event: any }) {
  const badge = formatRomanianDateBadge(new Date(event.startsAt));
  const image = event.heroImage?.url || "/images/mockup-site-asociatie.png";
  return (
    <article className="group premium-card overflow-hidden transition hover:-translate-y-1 hover:shadow-premium">
      <div className="relative h-36 overflow-hidden">
        <Image src={image} alt={event.heroImage?.alt || event.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
        <div className="absolute left-4 top-4 rounded-lg bg-white px-3 py-2 text-center shadow-soft">
          <div className="text-xl font-black text-starsim-navy">{badge.day}</div>
          <div className="text-xs font-bold text-starsim-blue">{badge.month}</div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl font-semibold text-starsim-navy">{event.title}</h3>
        <p className="mt-3 flex gap-2 text-sm text-starsim-muted"><CalendarClock className="h-4 w-4 text-starsim-navy" /> {formatRomanianDateTime(new Date(event.startsAt))}</p>
        <p className="mt-2 flex gap-2 text-sm text-starsim-muted"><MapPin className="h-4 w-4 text-starsim-navy" /> {event.locationName}</p>
        <Link href={`/evenimente/${event.slug}`} className="mt-4 inline-flex text-sm font-bold text-starsim-navy hover:text-starsim-gold">
          Detalii eveniment →
        </Link>
      </div>
    </article>
  );
}
