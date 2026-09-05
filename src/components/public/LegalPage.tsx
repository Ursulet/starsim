import Link from "next/link";
import { notFound } from "next/navigation";
import { Shield, FileText, Calendar, Building2, CheckCircle2, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/public/PageHero";
import { Container } from "@/components/ui/Container";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { getPublishedPageBySlug } from "@/lib/queries/pages";
import { CookieConsentManager } from "@/components/public/CookieConsentManager";
import { CookieInventoryTable } from "@/components/public/CookieInventoryTable";

const legalNav = [
  { slug: "politica-de-confidentialitate", label: "Confidențialitate", href: "/politica-de-confidentialitate" },
  { slug: "cookies", label: "Cookies", href: "/cookies" },
  { slug: "termeni-si-conditii", label: "Termeni și condiții", href: "/termeni-si-conditii" },
  { slug: "politica-donatii-sponsorizari", label: "Donații & Sponsorizări", href: "/politica-donatii-sponsorizari" },
  { slug: "foto-video", label: "Foto-video & Imagine", href: "/foto-video" },
  { slug: "protectia-copiilor", label: "Protecția copiilor", href: "/protectia-copiilor" },
  { slug: "transparenta", label: "Transparență & Date legale", href: "/transparenta" }
];

export async function LegalPage({ slug }: { slug: string }) {
  const page = await getPublishedPageBySlug(slug);
  if (!page) notFound();

  const isCookies = slug === "cookies";
  const isTransparency = slug === "transparenta";

  return (
    <>
      <PageHero
        title={page.title}
        eyebrow="Informații legale"
        intro={page.excerpt || "Politicile oficiale și cadrul de transparență al Asociației Star Sim."}
      />

      <section className="section-padding pt-8 md:pt-10">
        <Container>
          {/* Sub-navigație orizontală între toate politicile legale */}
          <nav aria-label="Navigare politici legale" className="mb-8 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-2 min-w-max">
              {legalNav.map((item) => {
                const isActive = item.slug === slug || (slug === "donatii-si-sponsorizari" && item.slug === "politica-donatii-sponsorizari");
                return (
                  <Link
                    key={item.slug}
                    href={item.href}
                    className={`inline-flex items-center rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                      isActive
                        ? "bg-starsim-navy text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-starsim-navy"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="mx-auto max-w-[860px]">
            <article className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-sm">
              {/* Header Articol Legal */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-2 font-medium">
                  <Calendar className="h-4 w-4 text-starsim-gold" />
                  <span>Ultima actualizare: <strong>Septembrie 2026</strong></span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-starsim-navy bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
                  <Shield className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Versiune oficială starsim.ro</span>
                </div>
              </div>

              {/* Caseta specială de date juridice pentru pagina de Transparență */}
              {isTransparency ? (
                <div className="my-8 rounded-2xl border border-slate-200 bg-slate-50/60 p-6 shadow-xs">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-200 text-starsim-navy">
                    <Building2 className="h-5 w-5 text-starsim-gold" />
                    <h2 className="font-serif text-lg font-bold">Identificare juridică și fiscală</h2>
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 text-xs md:text-sm">
                    <div>
                      <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">Denumire oficială</span>
                      <p className="font-bold text-starsim-navy mt-0.5">Asociația Star Sim</p>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">Cod Fiscal (CIF)</span>
                      <p className="font-bold text-starsim-navy mt-0.5">55521510</p>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">Sediul social</span>
                      <p className="font-semibold text-slate-800 mt-0.5">Str. Viceamiral Ioan Murgescu 56, Constanța, România</p>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">Reprezentant legal</span>
                      <p className="font-bold text-starsim-navy mt-0.5">Gîrdeanu Ștefan - Victor (Președinte)</p>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">Contact protecție date / oficial</span>
                      <p className="font-semibold text-slate-800 mt-0.5">contact@starsim.ro</p>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">Telefon</span>
                      <p className="font-semibold text-slate-800 mt-0.5">+40 730 991 523</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-xs text-slate-500">
                      Pentru siguranță, conturile bancare oficiale sunt afișate exclusiv pe pagina dedicată de donații.
                    </p>
                    <Link
                      href="/doneaza#cont-bancar"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-starsim-navy px-4 py-2 text-xs font-bold text-white hover:bg-starsim-blue transition shrink-0"
                    >
                      <span>Vezi conturile bancare</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ) : null}

              {/* Widget-ul interactiv de preferințe cookies pe pagina de cookies */}
              {isCookies ? (
                <>
                  <CookieConsentManager />
                  <CookieInventoryTable />
                </>
              ) : null}

              {/* Conținutul Documentului Legal */}
              <div className="mt-8">
                <RichTextRenderer content={page.content} />
              </div>

              {/* Footer Caseta Asistență Legală */}
              <div className="mt-12 rounded-2xl bg-slate-50 p-6 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                <div className="flex items-center gap-2 font-bold text-starsim-navy text-sm mb-1.5">
                  <FileText className="h-4 w-4 text-starsim-gold" />
                  <span>Întrebări sau solicitări legate de această politică?</span>
                </div>
                <p>
                  Pentru orice întrebare, rectificare de date, solicitare GDPR sau clarificare a termenilor, ne poți scrie direct la{" "}
                  <a href="mailto:contact@starsim.ro" className="font-bold text-starsim-navy underline">
                    contact@starsim.ro
                  </a>{" "}
                  sau ne poți contacta la numărul de telefon{" "}
                  <a href="tel:+40730991523" className="font-bold text-starsim-navy">
                    +40 730 991 523
                  </a>
                  .
                </p>
              </div>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
