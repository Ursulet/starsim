import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PublicButton } from "@/components/ui/PublicButton";

type ArticleProps = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string | null;
  heroImage: {
    url: string;
    alt: string | null;
  } | null;
};

export function ArticlesSection({ articles }: { articles: ArticleProps[] }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="section-padding pt-4">
      <Container>
        <SectionHeading 
          eyebrow="Blog Star Sim" 
          title="Noutăți și Resurse" 
          subtitle="Povești, ghiduri și articole despre astronomie, educație STEM și activitățile asociației."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <article 
              key={article.id} 
              className="premium-card group overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={article.heroImage?.url || "/images/mockup-site-asociatie.png"} 
                    alt={article.heroImage?.alt || article.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-starsim-gold">
                    {article.category || "Astronomie"}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-starsim-navy group-hover:text-starsim-gold transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-starsim-muted line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-0">
                <Link 
                  href={`/articole/${article.slug}`} 
                  className="inline-flex font-bold text-starsim-gold hover:text-starsim-navy hover:underline transition-colors duration-300"
                >
                  Citește articolul →
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <PublicButton href="/articole">Vezi toate articolele</PublicButton>
        </div>
      </Container>
    </section>
  );
}
