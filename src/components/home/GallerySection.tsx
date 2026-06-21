import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PublicButton } from "@/components/ui/PublicButton";

type GalleryAlbumProps = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  coverImage: {
    url: string;
    alt: string | null;
  } | null;
  images: { id: string }[];
};

export function GallerySection({ albums }: { albums: GalleryAlbumProps[] }) {
  if (!albums || albums.length === 0) return null;

  return (
    <section className="section-padding pt-4">
      <Container>
        <SectionHeading 
          eyebrow="Galerie Foto" 
          title="Momente sub același cer" 
          subtitle="Imagini surprinse la caravane, ateliere practice și nopți de observații astronomice."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {albums.map((album) => (
            <Link 
              key={album.id} 
              href={`/galerie/${album.slug}`} 
              className="premium-card group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
            >
              <div className="relative h-52 overflow-hidden">
                <Image 
                  src={album.coverImage?.url || "/images/mockup-site-asociatie.png"} 
                  alt={album.coverImage?.alt || album.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl text-starsim-navy group-hover:text-starsim-gold transition-colors duration-300">
                  {album.title}
                </h3>
                {album.description && (
                  <p className="mt-2 text-sm text-starsim-muted line-clamp-2">
                    {album.description}
                  </p>
                )}
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-starsim-gold">
                  {album.images?.length || 0} imagini
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <PublicButton href="/galerie">Vezi toate albumele</PublicButton>
        </div>
      </Container>
    </section>
  );
}
