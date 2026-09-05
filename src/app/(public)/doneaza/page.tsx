import Image from "next/image";
import { HandHeart, ArrowRight, Sparkles, Building2 } from "lucide-react";
import { PageHero } from "@/components/public/PageHero";
import { Container } from "@/components/ui/Container";
import { PublicButton } from "@/components/ui/PublicButton";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { IbanCopyButton, CopyTextButton } from "@/components/public/IbanCopyButton";
import { getDonationSettings } from "@/lib/queries/settings";

export default async function DonatePage() {
  const settings: any = await getDonationSettings();
  const rawCards = Array.isArray(settings?.recommendedAmounts) ? settings.recommendedAmounts : [];
  const cards = rawCards.filter((item: any) => item && item.isActive !== false);

  const orgDetails = settings?.organizationDetails || {};
  const beneficiaryName = orgDetails.beneficiaryName || settings?.beneficiaryName || "Asociația Star Sim";
  const fiscalCode = orgDetails.fiscalCode || settings?.fiscalCode || "55521510";
  const bankAccount = orgDetails.bankAccount || settings?.bankAccount || "RO05 RNCB 0296 1871 7895 0001";
  const secondaryIban = orgDetails.secondaryIban || null;
  const bankName = orgDetails.bankName || settings?.bankName || "Banca Comercială Română (BCR)";
  const headquarters = orgDetails.headquarters || "Constanța";
  const regNumber = orgDetails.regNumber || null;
  const paymentReference =
    !orgDetails.paymentReference || orgDetails.paymentReference === "Donație / Sprijin activități Star Sim"
      ? "Donație – Asociația Star Sim"
      : orgDetails.paymentReference;

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

          {/* Bank Transfer */}
          <div
            id="cont-bancar"
            className="mt-16 scroll-mt-28 overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 md:p-10 shadow-sm"
          >
            {/* Header: Titlu unic și clar */}
            <div className="flex items-center gap-3.5 pb-6 border-b border-slate-100">
              <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-starsim-navy/5 text-starsim-navy">
                <HandHeart className="h-5 w-5 text-starsim-navy" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-starsim-navy">
                Donează prin transfer bancar
              </h2>
            </div>

            {/* 2 Uniform Cards: 1. Date Asociație, 2. Cont Bancar (Punctul principal de atenție) */}
            <div className="mt-8 grid gap-6 lg:grid-cols-12 items-stretch">
              {/* Card 1: Date Asociație */}
              <div className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-slate-50/50 p-6 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-200/70">
                    <Building2 className="h-4 w-4 text-starsim-navy" />
                    <span className="text-xs font-bold uppercase tracking-wider text-starsim-navy">
                      Date Asociație
                    </span>
                  </div>

                  <div className="mt-4 space-y-3.5 text-sm">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        Beneficiar
                      </span>
                      <p className="mt-0.5 font-bold text-starsim-navy text-base">{beneficiaryName}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                            CIF / CUI
                          </span>
                          {fiscalCode && fiscalCode !== "—" ? <CopyTextButton text={fiscalCode} label="Copiază" /> : null}
                        </div>
                        <p className="mt-0.5 font-bold text-starsim-navy">{fiscalCode}</p>
                      </div>

                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                          Sediu
                        </span>
                        <p className="mt-0.5 font-semibold text-slate-800">{headquarters}</p>
                      </div>
                    </div>

                    {regNumber ? (
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                          Reg. Asociații & Fundații
                        </span>
                        <p className="mt-0.5 text-xs font-semibold text-slate-700">{regNumber}</p>
                      </div>
                    ) : null}

                    <div className="pt-3 border-t border-slate-200/70">
                      <p className="text-xs text-slate-600 leading-relaxed">
                        <span className="font-semibold text-slate-700">Detalii plată recomandate:</span>{" "}
                        <span className="font-bold text-starsim-navy">{paymentReference}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Cont Bancar (Punctul principal de atenție) */}
              <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-starsim-navy">
                      Cont bancar (RON)
                    </span>
                  </div>

                  {/* Main IBAN Display */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold text-slate-500">
                        Cod IBAN
                      </span>
                      {bankAccount ? <IbanCopyButton iban={bankAccount} /> : null}
                    </div>
                    <div className="rounded-xl border-2 border-starsim-navy/20 bg-slate-50/80 p-4 font-mono text-lg sm:text-xl font-bold tracking-wider text-starsim-navy break-all select-all shadow-xs">
                      {bankAccount}
                    </div>
                  </div>

                  {/* Cont Secundar EUR (dacă este definit) */}
                  {secondaryIban ? (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-semibold text-slate-500">
                          Cont secundar (EUR / Valută)
                        </span>
                        <IbanCopyButton iban={secondaryIban} />
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 font-mono text-base font-bold tracking-wider text-starsim-navy break-all select-all">
                        {secondaryIban}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-sm text-slate-600">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Bancă</span>
                    <span className="font-bold text-starsim-navy">{bankName}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Monedă</span>
                    <span className="font-bold text-slate-700">RON (Lei)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secțiune separată de sponsorizare pentru companii */}
          <div className="mt-12 rounded-3xl border border-slate-200/90 bg-starsim-navy p-8 text-center text-white shadow-md sm:p-10">
            <Building2 className="mx-auto h-10 w-10 text-starsim-gold" />
            <h3 className="mt-3 font-serif text-2xl font-bold sm:text-3xl">
              Sponsorizări pentru companii
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-300">
              Companiile pot redirecționa până la 20% din impozitul pe profit către Asociația Star Sim, fără costuri suplimentare, printr-un contract simplu de sponsorizare.
            </p>
            <div className="mt-6">
              <PublicButton
                href="/contact?type=PARTNERSHIP"
                className="bg-starsim-gold text-starsim-navy hover:bg-amber-400 font-bold px-7 py-3 rounded-xl shadow-md transition-all"
              >
                Află despre sponsorizări
              </PublicButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
