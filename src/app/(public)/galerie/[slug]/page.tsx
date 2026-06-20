import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/public/PageHero";
import { getAlbumBySlug } from "@/lib/queries/gallery";

export default async function GalleryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const album: any = await getAlbumBySlug(slug);
  const images = album.images?.length ? album.images : [{ id: "fallback", media: { url: "/images/mockup-site-asociatie.png", alt: album.title }, caption: album.description }];
  return (
    <>
      <PageHero title={album.title} eyebrow="Galerie" intro={album.description || "Fotografii Star Sim"} />
      <section className="section-padding"><Container className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image: any, index: number) => (
          <figure key={image.id} className="premium-card overflow-hidden">
            <div className="relative h-72"><Image src={image.media.url} alt={image.alt || image.media.alt || `${album.title} ${index + 1}`} fill className="object-cover" /></div>
            {image.caption ? <figcaption className="p-4 text-sm text-starsim-muted">{image.caption}</figcaption> : null}
          </figure>
        ))}
      </Container></section>
    </>
  );
}
