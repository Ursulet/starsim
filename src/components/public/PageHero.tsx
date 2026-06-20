import { Container } from "@/components/ui/Container";

export function PageHero({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <section className="bg-starsim-ivory/55 py-16">
      <Container>
        {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.18em] text-starsim-gold">{eyebrow}</p> : null}
        <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold text-starsim-navy md:text-5xl">{title}</h1>
        {intro ? <p className="mt-5 max-w-2xl text-lg leading-8 text-starsim-muted">{intro}</p> : null}
      </Container>
    </section>
  );
}
