import Image from "next/image";
import { HandHeart, ArrowRight, Sparkles, Building2, ShieldCheck } from "lucide-react";
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
  const fiscalCode = orgDetails.fiscalCode || settings?.fiscalCode || "—";
  const bankAccount = orgDetails.bankAccount || settings?.bankAccount || "RO00 BANK 0000 0000 0000 0000";
  const secondaryIban = orgDetails.secondaryIban || null;
  const bankName = orgDetails.bankName || settings?.bankName || "Banca Transilvania";
  const headquarters = orgDetails.headquarters || "Constanța";
  const regNumber = orgDetails.regNumber || null;
  const paymentReference = orgDetails.paymentReference || "Donație / Sprijin activități Star Sim";

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

          {/* Bank Transfer & Association Details */}
          <div
            id="cont-bancar"
            className="premium-card mt-16 scroll-mt-28 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-amber-50/20 p-6 md:p-10 shadow-sm"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-8 border-b border-slate-200/80">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100/70 text-starsim-gold shadow-xs">
                  <HandHeart className="h-7 w-7 text-amber-600" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-starsim-navy">
                    Donează prin transfer bancar
                  </h2>
                  <p className="mt-1 text-sm text-starsim-muted">
                    Contribuțiile ajung direct în contul oficial al Asociației Star Sim pentru proiectele educaționale.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-100 self-start md:self-auto">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Organizație nonprofit înregistrată oficial</span>
              </div>
            </div>

            {/* 2 Distinct Blocks: Datele Oficiale ale Asociației + Detalii Conturi Bancare */}
            <div className="mt-8 grid gap-8 lg:grid-cols-12 items-stretch">
              {/* CÂMP SEPARAT: Datele Oficiale ale Asociației */}
              <div className="lg:col-span-5 rounded-2xl border-2 border-starsim-gold/40 bg-gradient-to-br from-white to-amber-50/40 p-6 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-amber-100">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-starsim-gold">
                      <Building2 className="h-3.5 w-3.5" />
                      Datele Asociației
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">Identificare legală</span>
                  </div>

                  <div className="mt-4 space-y-3.5 text-sm">
                    <div>
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Beneficiar Oficial</dt>
                      <dd className="mt-0.5 font-bold text-starsim-navy text-base">{beneficiaryName}</dd>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div>
                        <div className="flex items-center justify-between">
                          <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">CUI / CIF</dt>
                          {fiscalCode && fiscalCode !== "—" ? <CopyTextButton text={fiscalCode} label="Copiază" /> : null}
                        </div>
                        <dd className="mt-0.5 font-bold text-starsim-navy">{fiscalCode}</dd>
                      </div>

                      <div>
                        <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Sediu</dt>
                        <dd className="mt-0.5 font-semibold text-slate-800">{headquarters}</dd>
                      </div>
                    </div>

                    {regNumber ? (
                      <div className="pt-1">
                        <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Reg. Asociații & Fundații</dt>
                        <dd className="mt-0.5 text-xs font-semibold text-slate-700">{regNumber}</dd>
                      </div>
                    ) : null}

                    <div className="pt-1">
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Mențiune transfer recomandată</dt>
                      <dd className="mt-0.5 text-xs font-medium text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/80">
                        {paymentReference}
                      </dd>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-amber-100/70 text-[11px] text-slate-500">
                  Fondurile sunt utilizate transparent conform statutului nonprofit al asociației.
                </div>
              </div>

              {/* Detalii Conturi Bancare */}
              <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-slate-50/70 p-6 space-y-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/70">
                    <span className="text-xs font-bold uppercase tracking-wider text-starsim-navy">
                      Conturi Bancare Oficiale
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{bankName}</span>
                  </div>

                  {/* Cont RON */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between gap-2">
                      <dt className="text-xs font-bold uppercase tracking-wider text-starsim-muted">
                        Cont Principal (RON)
                      </dt>
                      {bankAccount ? <IbanCopyButton iban={bankAccount} /> : null}
                    </div>
                    <dd className="mt-1 font-mono text-base sm:text-lg font-bold tracking-wider text-starsim-navy break-all bg-white p-3.5 rounded-xl border border-slate-200 select-all shadow-xs">
                      {bankAccount}
                    </dd>
                  </div>

                  {/* Cont EUR dacă este definit */}
                  {secondaryIban ? (
                    <div className="mt-4">
                      <div className="flex items-center justify-between gap-2">
                        <dt className="text-xs font-bold uppercase tracking-wider text-starsim-muted">
                          Cont Secundar (EUR / Valută)
                        </dt>
                        <IbanCopyButton iban={secondaryIban} />
                      </div>
                      <dd className="mt-1 font-mono text-base sm:text-lg font-bold tracking-wider text-starsim-navy break-all bg-white p-3.5 rounded-xl border border-slate-200 select-all shadow-xs">
                        {secondaryIban}
                      </dd>
                    </div>
                  ) : null}

                  <div className="mt-4 grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wider text-starsim-muted">Banca</dt>
                      <dd className="mt-0.5 text-sm font-semibold text-slate-800">{bankName}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wider text-starsim-muted">Destinație</dt>
                      <dd className="mt-0.5 text-sm font-semibold text-slate-800">Donații educaționale</dd>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-amber-50/80 p-3 border border-amber-200/60 text-xs text-amber-900">
                  💡 Pentru companii: 20% din impozitul pe profit poate fi redirecționat prin contract de sponsorizare.
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
