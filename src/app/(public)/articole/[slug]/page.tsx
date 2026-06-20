import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PublicButton } from "@/components/ui/PublicButton";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { getArticleBySlug } from "@/lib/queries/articles";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article: any = await getArticleBySlug(slug);
  return (
    <>
      <section className="bg-starsim-ivory/60 py-14">
        <Container className="max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-starsim-gold">{article.category || "Articol"}</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-starsim-navy md:text-5xl">{article.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-starsim-muted">{article.excerpt}</p>
        </Container>
      </section>
      <Container className="section-padding">
        <div className="relative mb-10 h-80 overflow-hidden rounded-2xl shadow-premium">
          <Image src={article.heroImage?.url || "/images/mockup-site-asociatie.png"} alt={article.heroImage?.alt || article.title} fill className="object-cover" />
        </div>
        <article className="mx-auto max-w-[760px]"><RichTextRenderer content={article.content} /></article>
        <div className="mx-auto mt-12 max-w-[760px] rounded-2xl bg-starsim-navy p-8 text-white">
          <h2 className="font-serif text-2xl">Sustine educatia prin astronomie</h2>
          <p className="mt-2 text-white/75">Ajuta-ne sa ducem mai multe experiente Star Sim catre copii si comunitati.</p>
          <PublicButton href="/doneaza" variant="gold" className="mt-5">Doneaza</PublicButton>
        </div>
      </Container>
    </>
  );
}
