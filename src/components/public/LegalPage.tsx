import { notFound } from "next/navigation";
import { PageHero } from "@/components/public/PageHero";
import { Container } from "@/components/ui/Container";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { getPublishedPageBySlug } from "@/lib/queries/pages";

export async function LegalPage({ slug }: { slug: string }) {
  const page = await getPublishedPageBySlug(slug);
  if (!page) notFound();

  return (
    <>
      <PageHero title={page.title} eyebrow="Informatii legale" intro={page.excerpt || undefined} />
      <section className="section-padding">
        <Container>
          <article className="mx-auto max-w-[820px] rounded-2xl border border-starsim-border bg-white p-6 shadow-soft md:p-10">
            <RichTextRenderer content={page.content} />
          </article>
        </Container>
      </section>
    </>
  );
}
