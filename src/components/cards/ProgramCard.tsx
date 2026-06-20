import Image from "next/image";
import Link from "next/link";
import { Atom, Bus, GraduationCap, Telescope } from "lucide-react";

const icons = { atom: Atom, bus: Bus, graduation: GraduationCap, telescope: Telescope };
const fallbackImages = ["/images/mockup-site-asociatie.png"];

export function ProgramCard({ program, index = 0 }: { program: any; index?: number }) {
  const Icon = icons[(program.icon as keyof typeof icons) || "telescope"] || Telescope;
  const image = program.heroImage?.url || fallbackImages[index % fallbackImages.length];
  return (
    <article className="group premium-card overflow-hidden transition hover:-translate-y-1 hover:shadow-premium">
      <div className="relative h-36 overflow-hidden">
        <Image src={image} alt={program.heroImage?.alt || program.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
      </div>
      <div className="relative p-6 pt-7">
        <div className="absolute -top-8 left-6 grid h-14 w-14 place-items-center rounded-full border-4 border-white bg-starsim-navy text-white shadow-soft">
          <Icon className="h-6 w-6 text-starsim-gold" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-starsim-navy">{program.title}</h3>
        <p className="mt-2 min-h-16 text-sm leading-6 text-starsim-muted">{program.excerpt}</p>
        <Link href={`/programe/${program.slug}`} className="mt-4 inline-flex text-sm font-bold text-starsim-gold hover:text-starsim-navy">
          Afla mai multe →
        </Link>
      </div>
    </article>
  );
}
