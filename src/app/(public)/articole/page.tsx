import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/public/PageHero";
import { Container } from "@/components/ui/Container";
import { getPublishedArticles } from "@/lib/queries/articles";

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();
  return (
    <>
      <PageHero title="Articole și resurse" eyebrow="Blog Star Sim" intro="Povești, ghiduri și resurse despre astronomie, educație STEM și curiozitatea care aprinde visuri." />
      <section className="section-padding">
        <Container className="grid gap-6 md:grid-cols-3">
          {articles.map((article: any) => (
            <article key={article.id} className="premium-card overflow-hidden">
              <div className="relative h-48"><Image src={article.heroImage?.url || "/images/mockup-site-asociatie.png"} alt={article.heroImage?.alt || article.title} fill className="object-cover" /></div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-starsim-gold">{article.category || "Astronomie"}</p>
                <h2 className="mt-2 font-serif text-2xl text-starsim-navy">{article.title}</h2>
                <p className="mt-3 text-sm leading-6 text-starsim-muted">{article.excerpt}</p>
                <Link href={`/articole/${article.slug}`} className="mt-5 inline-flex font-bold text-starsim-gold">Citeste articolul →</Link>
              </div>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
