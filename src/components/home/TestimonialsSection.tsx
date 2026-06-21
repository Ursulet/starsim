import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type TestimonialProps = {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string | null;
  organization: string | null;
  image: {
    url: string;
    alt: string | null;
  } | null;
};

export function TestimonialsSection({ testimonials }: { testimonials: TestimonialProps[] }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="section-padding bg-starsim-ivory/20 border-y border-starsim-border/30">
      <Container>
        <SectionHeading 
          eyebrow="Gânduri de la voi" 
          title="Ce spun oamenii" 
          subtitle="Opiniile copiilor, părinților și profesorilor care au participat la experiențele noastre."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div 
              key={t.id} 
              className="premium-card flex flex-col justify-between p-8 bg-white border border-slate-100 shadow-sm relative overflow-hidden"
            >
              {/* Gold Quote Mark Icon Decorator */}
              <div className="absolute top-4 right-6 text-6xl font-serif text-starsim-gold/15 select-none font-bold">
                “
              </div>
              
              <div className="relative z-10">
                <p className="font-serif italic text-base leading-7 text-starsim-navy/90">
                  „{t.quote}”
                </p>
              </div>

              <div className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-5 relative z-10">
                {t.image?.url ? (
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-starsim-gold/25">
                    <Image 
                      src={t.image.url} 
                      alt={t.image.alt || t.authorName} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-starsim-gold/10 text-starsim-gold text-lg font-bold">
                    {t.authorName.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-sans font-bold text-sm text-starsim-navy">
                    {t.authorName}
                  </h4>
                  {(t.authorRole || t.organization) && (
                    <p className="text-xs text-starsim-muted mt-0.5">
                      {t.authorRole}
                      {t.authorRole && t.organization ? ", " : ""}
                      {t.organization}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
