import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/public/PageHero";
import { getAlbumBySlug } from "@/lib/queries/gallery";
import { GalleryView } from "@/components/public/GalleryView";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";

export default async function GalleryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const album: any = await getAlbumBySlug(slug);
  const images = album.images?.length 
    ? album.images 
    : [{ id: "fallback", media: { url: "/images/mockup-site-asociatie.png", alt: album.title }, caption: album.description }];
  
  return (
    <>
      <PageHero title={album.title} eyebrow="Galerie" intro={album.description || "Fotografii Star Sim"} />
      
      {/* Connected program/event link pills */}
      {(album.program || album.event) && (
        <section className="bg-starsim-ivory/20 py-4 border-b border-starsim-border/50">
          <Container className="flex flex-wrap gap-3">
            {album.program && (
              <Link 
                href={`/programe/${album.program.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-starsim-navy/5 px-4 py-1.5 text-xs font-semibold text-starsim-navy hover:bg-starsim-navy/10 transition border border-starsim-navy/15"
              >
                <span>Program:</span>
                <span className="font-bold text-starsim-gold">{album.program.title}</span>
              </Link>
            )}
            {album.event && (
              <Link 
                href={`/evenimente/${album.event.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-starsim-navy/5 px-4 py-1.5 text-xs font-semibold text-starsim-navy hover:bg-starsim-navy/10 transition border border-starsim-navy/15"
              >
                <span>Eveniment:</span>
                <span className="font-bold text-starsim-gold">{album.event.title}</span>
              </Link>
            )}
          </Container>
        </section>
      )}

      <section className="section-padding">
        <Container>
          {album.content && (
            <div className="mx-auto max-w-3xl mb-16">
              <RichTextRenderer content={album.content} />
            </div>
          )}
          
          <div className="mt-8">
            <h3 className="text-xl font-bold text-starsim-navy mb-6 pb-2 border-b border-slate-100">
              Fotografii în album ({images.length})
            </h3>
            <GalleryView images={images} albumTitle={album.title} />
          </div>
        </Container>
      </section>
    </>
  );
}
