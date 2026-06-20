import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/public/PageHero";
import { Container } from "@/components/ui/Container";
import { getPublishedAlbums } from "@/lib/queries/gallery";

export default async function GalleryPage() {
  const albums = await getPublishedAlbums();
  return (
    <>
      <PageHero title="Momente sub același cer" eyebrow="Galerie" intro="Fragmente din ateliere, caravane și seri în care cerul a devenit sală de clasă." />
      <section className="section-padding"><Container className="grid gap-6 md:grid-cols-3">
        {albums.map((album: any) => (
          <Link key={album.id} href={`/galerie/${album.slug}`} className="premium-card overflow-hidden transition hover:-translate-y-1 hover:shadow-premium">
            <div className="relative h-52"><Image src={album.coverImage?.url || "/images/mockup-site-asociatie.png"} alt={album.coverImage?.alt || album.title} fill className="object-cover" /></div>
            <div className="p-6"><h2 className="font-serif text-2xl text-starsim-navy">{album.title}</h2><p className="mt-2 text-sm text-starsim-muted">{album.description}</p><p className="mt-4 text-sm font-bold text-starsim-gold">{album.images?.length || 0} imagini</p></div>
          </Link>
        ))}
      </Container></section>
    </>
  );
}
