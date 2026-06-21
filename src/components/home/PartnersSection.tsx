import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

type PartnerProps = {
  id: string;
  name: string;
  website: string | null;
  logo: {
    url: string;
    alt: string | null;
  } | null;
};

export function PartnersSection({ partners }: { partners: PartnerProps[] }) {
  if (!partners || partners.length === 0) return null;

  return (
    <section className="py-12 bg-white border-t border-slate-100">
      <Container>
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-starsim-gold mb-8">
          Partenerii noștri
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {partners.map((partner) => {
            const content = partner.logo?.url ? (
              <div className="relative h-12 w-32 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image 
                  src={partner.logo.url} 
                  alt={partner.logo.alt || partner.name} 
                  fill 
                  className="object-contain" 
                />
              </div>
            ) : (
              <span className="font-sans font-bold text-base text-starsim-navy/50 hover:text-starsim-navy transition-colors duration-300">
                {partner.name}
              </span>
            );

            return partner.website ? (
              <Link 
                key={partner.id} 
                href={partner.website} 
                target="_blank" 
                rel="noopener noreferrer"
                title={partner.name}
              >
                {content}
              </Link>
            ) : (
              <div key={partner.id} title={partner.name}>
                {content}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
