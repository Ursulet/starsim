import Image from "next/image";
import { HandHeart, ArrowRight, Sparkles, Building2, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/public/PageHero";
import { Container } from "@/components/ui/Container";
import { PublicButton } from "@/components/ui/PublicButton";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { IbanCopyButton } from "@/components/public/IbanCopyButton";
import { getDonationSettings } from "@/lib/queries/settings";

export default async function DonatePage() {
  const settings: any = await getDonationSettings();
  const rawCards = Array.isArray(settings?.recommendedAmounts) ? settings.recommendedAmounts : [];
  const cards = rawCards.filter((item: any) => item && item.isActive !== false);

  return (
    <>
      <PageHero
        title={settings?.title || "Susține educația prin astronomie"}
        eyebrow="Donează"
        intro={settings?.description || "Fiecare contribuție ajută la organizarea atelierelor, aducerea telescoapelor în școli și inspirarea copiilor să descopere universul."}
      />

      <section className="section-padding">
        <Container>
          {/* Donation Cards Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((item: any, index: number) => {
              const amountDisplay = item.amount ? `${item.amount} ${item.currency || "lei"}` : null;
              const title = item.title || item.label || `Cauză #${index + 1}`;
              const buttonText = item.buttonText || (amountDisplay ? `Donează ${amountDisplay}` : "Donează prin transfer");
              const buttonUrl = item.buttonUrl || "#cont-bancar";

              return (
                <article
                  key={item.id || item.amount || index}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-starsim-gold/50 hover:shadow-xl"
                >
                  {/* Card Image Banner */}
                  {item.imageUrl ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                      <Image
                        src={item.imageUrl}
                        alt={item.imageAlt || title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-60" />
                      
                      {item.badge ? (
                        <span className="absolute top-3.5 right-3.5 z-10 inline-flex items-center gap-1 rounded-full border border-starsim-gold/40 bg-starsim-navy/85 px-3 py-1 text-xs font-bold text-starsim-gold shadow-md backdrop-blur-md">
                          <Sparkles className="h-3 w-3" />
                          {item.badge}
                        </span>
                      ) : null}
                    </div>
                  ) : (
                    item.badge ? (
                      <div className="px-6 pt-6">
                        <span className="inline-flex items-center gap-1 rounded-full border border-starsim-gold/40 bg-starsim-navy/5 px-3 py-1 text-xs font-bold text-starsim-navy">
                          <Sparkles className="h-3 w-3 text-starsim-gold" />
                          {item.badge}
                        </span>
                      </div>
                    ) : null
                  )}

                  {/* Card Content */}
                  <div className={`flex flex-1 flex-col p-6 ${!item.imageUrl && !item.badge ? "pt-8" : ""}`}>
                    {/* Amount Header */}
                    {item.amount ? (
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif text-3xl font-black tracking-tight text-starsim-navy sm:text-4xl">
                          {item.amount}
                        </span>
                        <span className="text-sm font-bold uppercase tracking-wider text-starsim-muted">
                          {item.currency || "lei"}
                        </span>
                      </div>
                    ) : (
                      <div className="text-xs font-bold uppercase tracking-wider text-starsim-gold">
                        Donație liberă
                      </div>
                    )}

                    {/* Card Title */}
                    <h2 className="mt-3 font-serif text-xl font-bold text-starsim-navy leading-snug transition-colors group-hover:text-starsim-blue">
                      {title}
                    </h2>

                    {/* WYSIWYG Description */}
                    <div className="mt-3 flex-1 text-sm text-slate-600">
                      <RichTextRenderer content={item.content || item.impact} />
                    </div>

                    {/* Card Action Button */}
                    <a
                      href={buttonUrl}
                      className="focus-ring mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-starsim-navy px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-starsim-blue hover:shadow-md"
                    >
                      <span>{buttonText}</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bank Transfer Box */}
          <div
            id="cont-bancar"
            className="premium-card mt-16 grid scroll-mt-28 gap-8 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-amber-50/20 p-8 shadow-sm lg:grid-cols-[1fr_1.25fr]"
          >
            <div>
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100/70 text-starsim-gold shadow-xs">
                <HandHeart className="h-7 w-7 text-amber-600" />
              </div>
              <h2 className="mt-4 font-serif text-3xl font-bold text-starsim-navy">
                Donează prin transfer bancar
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-starsim-muted">
                Fiecare transfer ajunge direct în contul Asociației Star Sim și este utilizat exclusiv pentru dotarea atelierelor, achiziția de materiale didactice și organizarea nopților astronomice deschise pentru copii.
              </p>
              <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-100 max-w-fit">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Asociație non-profit înregistrată oficial</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 space-y-4">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-starsim-muted">Beneficiar</dt>
                <dd className="mt-0.5 text-base font-bold text-starsim-navy">{settings?.beneficiaryName || "Asociația Star Sim"}</dd>
              </div>

              <div className="border-t border-slate-200/60 pt-3">
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-xs font-bold uppercase tracking-wider text-starsim-muted">Cod IBAN (Cont RON)</dt>
                  {settings?.bankAccount ? <IbanCopyButton iban={settings.bankAccount} /> : null}
                </div>
                <dd className="mt-1 font-mono text-base sm:text-lg font-bold tracking-wider text-starsim-navy break-all bg-white p-3 rounded-xl border border-slate-200 select-all">
                  {settings?.bankAccount || "RO00 BANK 0000 0000 0000 0000"}
                </dd>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-200/60 pt-3">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-starsim-muted">Banca</dt>
                  <dd className="mt-0.5 text-sm font-semibold text-slate-800">{settings?.bankName || "Banca Transilvania"}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-starsim-muted">Cod Fiscal (CIF / CUI)</dt>
                  <dd className="mt-0.5 text-sm font-semibold text-slate-800">{settings?.fiscalCode || "—"}</dd>
                </div>
              </div>
            </div>
          </div>

          {/* Corporate / Partnership CTA */}
          <div className="mt-12 rounded-3xl border border-slate-200 bg-starsim-navy p-8 text-center text-white shadow-md sm:p-10">
            <Building2 className="mx-auto h-10 w-10 text-starsim-gold" />
            <h3 className="mt-3 font-serif text-2xl font-bold sm:text-3xl">
              Reprezinți o companie sau o instituție?
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-300">
              Facilitățile fiscale permit direcționarea a 20% din impozitul pe profit către asociația noastră. Hai să discutăm un parteneriat educațional personalizat.
            </p>
            <div className="mt-6">
              <PublicButton
                href="/contact?type=PARTNERSHIP"
                className="bg-starsim-gold text-starsim-navy hover:bg-amber-400 font-bold px-7 py-3 rounded-xl shadow-md"
              >
                Vreau să discut despre sponsorizare
              </PublicButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
