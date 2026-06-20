import { HandHeart } from "lucide-react";
import { PageHero } from "@/components/public/PageHero";
import { Container } from "@/components/ui/Container";
import { PublicButton } from "@/components/ui/PublicButton";
import { getDonationSettings } from "@/lib/queries/settings";

export default async function DonatePage() {
  const settings: any = await getDonationSettings();
  const amounts = Array.isArray(settings?.recommendedAmounts) ? settings.recommendedAmounts : [];
  return (
    <>
      <PageHero title={settings?.title || "Susține educația prin astronomie"} eyebrow="Donează" intro={settings?.description || "Fiecare contribuție ajută la organizarea programelor educaționale Star Sim."} />
      <section className="section-padding"><Container>
        <div className="grid gap-6 md:grid-cols-3">
          {amounts.map((item: any) => (
            <article key={item.amount} className="premium-card p-6"><p className="text-3xl font-black text-starsim-navy">{item.amount} lei</p><h2 className="mt-3 font-serif text-xl text-starsim-navy">{item.label}</h2><p className="mt-2 text-sm text-starsim-muted">{item.impact}</p></article>
          ))}
        </div>
        <div className="premium-card mt-10 grid gap-8 p-8 md:grid-cols-[1fr_1.2fr]">
          <div><HandHeart className="h-12 w-12 text-starsim-gold" /><h2 className="mt-4 font-serif text-3xl text-starsim-navy">Donează prin transfer bancar</h2><p className="mt-3 text-starsim-muted">Momentan nu simulăm plata online. Folosește datele bancare de mai jos.</p></div>
          <dl className="grid gap-3 text-sm">
            <div><dt className="font-bold text-starsim-muted">Beneficiar</dt><dd className="text-lg font-semibold">{settings?.beneficiaryName}</dd></div>
            <div><dt className="font-bold text-starsim-muted">IBAN</dt><dd className="break-all text-lg font-semibold">{settings?.bankAccount}</dd></div>
            <div><dt className="font-bold text-starsim-muted">Banca</dt><dd>{settings?.bankName}</dd></div>
            <div><dt className="font-bold text-starsim-muted">CUI</dt><dd>{settings?.fiscalCode}</dd></div>
          </dl>
        </div>
        <div className="mt-8 text-center"><PublicButton href="/contact?type=PARTNERSHIP">Vreau să discut despre sponsorizare</PublicButton></div>
      </Container></section>
    </>
  );
}
