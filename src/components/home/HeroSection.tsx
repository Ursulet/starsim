import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PublicButton } from "@/components/ui/PublicButton";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-y-0 right-0 w-full lg:w-[62%]">
        <Image src="/images/mockup-site-asociatie.png" alt="Copii privind cerul instelat prin telescop" fill className="object-cover object-top" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/78 to-transparent" />
      </div>
      <Container className="relative grid min-h-[620px] items-center py-16">
        <div className="max-w-xl">
          <Image src="/images/logo-starsim.png" alt="Star Sim" width={390} height={150} className="mb-6 h-auto w-72 md:w-96" priority />
          <h1 className="sr-only">Star Sim - De la o stea, la un vis</h1>
          <p className="text-lg leading-8 text-starsim-navy md:text-xl">
            Aducem astronomia mai aproape de copii si comunitati, pentru a transforma curiozitatea de azi in visurile de maine.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <PublicButton href="/programe" size="lg"><Sparkles className="h-5 w-5 text-starsim-gold" /> Descopera programele</PublicButton>
            <PublicButton href="/doneaza" size="lg" variant="outline">Sustine asociatia</PublicButton>
          </div>
        </div>
      </Container>
      <div className="absolute bottom-0 left-0 right-0 h-12 rounded-t-[100%] bg-white" />
    </section>
  );
}
