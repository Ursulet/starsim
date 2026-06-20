import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/public/PageHero";
import { getAlbumBySlug } from "@/lib/queries/gallery";
import { GalleryView } from "@/components/public/GalleryView";

export default async function GalleryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const album: any = await getAlbumBySlug(slug);
  const images = album.images?.length 
    ? album.images 
    : [{ id: "fallback", media: { url: "/images/mockup-site-asociatie.png", alt: album.title }, caption: album.description }];
  
  return (
    <>
      <PageHero title={album.title} eyebrow="Galerie" intro={album.description || "Fotografii Star Sim"} />
      <section className="section-padding">
        <Container>
          <GalleryView images={images} albumTitle={album.title} />
        </Container>
      </section>
    </>
  );
}
