import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PublicButton } from "@/components/ui/PublicButton";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { getProgramBySlug } from "@/lib/queries/programs";

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) notFound();
  return (
    <>
      <section className="bg-starsim-ivory/60 py-14">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-starsim-gold">Program Star Sim</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold text-starsim-navy md:text-5xl">{program.title}</h1>
            <p className="mt-5 text-lg leading-8 text-starsim-muted">{program.excerpt}</p>
            <div className="mt-7 flex gap-3"><PublicButton href={program.ctaHref || `/contact?program=${program.slug}`}>{program.ctaLabel || "Solicită acest program"}</PublicButton><PublicButton href="/doneaza" variant="outline">Susține asociația</PublicButton></div>
          </div>
          <div className="relative h-80 overflow-hidden rounded-2xl shadow-premium">
            <Image src={program.heroImage?.url || "/images/mockup-site-asociatie.png"} alt={program.heroImage?.alt || program.title} fill className="object-cover" />
          </div>
        </Container>
      </section>
      <Container className="section-padding">
        <div className="mx-auto max-w-3xl">
          <RichTextRenderer content={(program as any).content} />
        </div>
      </Container>
    </>
  );
}
