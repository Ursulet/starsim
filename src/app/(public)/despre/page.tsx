import { PageHero } from "@/components/public/PageHero";
import { Container } from "@/components/ui/Container";
import {
  Telescope,
  Atom,
  Users,
  ShieldCheck,
  Leaf,
  HeartHandshake,
  FileText,
  CheckCircle2,
  Quote,
  Compass,
  ArrowRight,
  BookOpen,
  Building2,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import Link from "next/link";
import { getOrganizationSettings } from "@/lib/queries/settings";

export default async function AboutPage() {
  const org = await getOrganizationSettings();

  const activities = [
    "observații astronomice vizuale și digitale;",
    "observații solare realizate în siguranță, cu echipamente și filtre adecvate;",
    "ateliere STEM, demonstrații, laboratoare și activități practice;",
    "sesiuni de astrofotografie și explorare a cerului;",
    "programe educaționale în școli, grădinițe, licee, biblioteci, muzee și spații publice;",
    "tabere, excursii, star-party-uri și activități în natură;",
    "campanii de informare privind siguranța online, dezinformarea, protecția mediului și poluarea luminoasă;",
    "producție de materiale educaționale, ghiduri, fișe, resurse digitale, foto, video și multimedia;",
    "dezvoltarea de platforme online, aplicații, hărți interactive și comunități educaționale."
  ];

  return (
    <>
      <PageHero
        title="Despre Asociația Star Sim"
        eyebrow="Cine suntem"
        intro="Descoperă misiunea noastră de a aduce educația practică și astronomia mai aproape de viața reală."
      />

      {/* Intro & Motto Section */}
      <section className="py-16 md:py-20 bg-white">
        <Container className="grid gap-12 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <h2 className="font-serif text-3xl font-bold text-starsim-navy md:text-4xl">
              Educație prin experiment și descoperire directă
            </h2>
            <p className="text-lg leading-relaxed text-starsim-navy font-medium">
              Asociația Star Sim este o organizație nonprofit, independentă și apolitică, dedicată educației practice, științei aplicate și dezvoltării comunitare.
            </p>
            <p className="text-base leading-relaxed text-starsim-muted">
              Credem că învățarea devine cu adevărat valoroasă atunci când copiii, tinerii, părinții și profesorii pot experimenta direct: prin observații, ateliere, tehnologie, natură, cultură și activități concrete.
            </p>
          </div>

          <div className="lg:col-span-5 flex">
            <div className="navy-gradient text-white p-8 md:p-10 rounded-3xl shadow-premium border border-white/10 flex flex-col justify-between relative overflow-hidden w-full">
              {/* Stars decoration */}
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-starsim-gold/15 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative">
                <Quote className="h-10 w-10 text-starsim-gold opacity-85 mb-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-starsim-softGold">
                  Deviza Noastră
                </span>
                <h3 className="mt-2 font-serif text-3xl font-bold text-starsim-softGold leading-tight">
                  „De la o stea, la un vis”
                </h3>
              </div>
              
              <p className="mt-8 text-sm text-slate-300 leading-relaxed font-medium">
                Prin proiectele noastre, ne dorim să aducem educația mai aproape de viața reală și să transformăm curiozitatea copiilor în experiențe memorabile de învățare.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-20 bg-starsim-ivory/20 border-y border-starsim-border/50">
        <Container className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-starsim-gold/10 px-3.5 py-1 text-xs font-bold text-starsim-gold border border-starsim-gold/20">
              <Compass className="h-3.5 w-3.5" />
              Misiunea Noastră
            </div>
            <h2 className="font-serif text-3xl font-bold text-starsim-navy md:text-4xl">
              Acces universal la știință aplicată și cultură
            </h2>
            <p className="text-base leading-relaxed text-starsim-muted">
              Misiunea Star Sim este să faciliteze accesul copiilor, tinerilor, familiilor, cadrelor didactice și publicului larg la educație nonformală, știință aplicată, tehnologie, cultură, natură, patrimoniu, competențe digitale și gândire critică.
            </p>
            <p className="text-base leading-relaxed text-starsim-muted">
              Astronomia, explorarea cerului, educația STEM, astrofotografia, protejarea cerului nocturn și legătura dintre familie, școală și comunitate reprezintă direcții prioritare pentru asociația noastră.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="premium-card p-8 bg-white border border-starsim-border/60 relative overflow-hidden flex flex-col gap-4">
              <div className="absolute top-0 right-0 w-24 h-24 bg-starsim-gold/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="h-12 w-12 rounded-2xl bg-starsim-navy/5 flex items-center justify-center text-starsim-navy">
                <Atom className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-starsim-navy">Știință experimentată direct</h4>
              <p className="text-sm text-starsim-muted leading-relaxed">
                Ne dorim ca elevii să nu învețe știința doar din manuale, ci să o vadă, să o atingă, să o testeze și să o înțeleagă prin experiențe directe.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Directions Grid */}
      <section className="py-16 md:py-20 bg-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-starsim-gold">Direcții Strategice</span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-starsim-navy md:text-4xl">
              Direcțiile noastre principale
            </h2>
            <p className="mt-4 text-base text-starsim-muted leading-relaxed">
              Ne canalizăm energia și resursele în proiecte concrete, structurate pe cinci piloni esențiali.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Direction 1 */}
            <div className="premium-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-starsim-navy/5 text-starsim-navy mb-5">
                  <Telescope className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-starsim-navy">Astronomie și explorarea cerului</h3>
                <p className="mt-3 text-sm text-starsim-muted leading-relaxed">
                  Aducem copiii și comunitățile mai aproape de Univers prin observații astronomice, telescoape, astrofotografie, activități solare, seri de observații și programe educaționale dedicate cerului nocturn.
                </p>
              </div>
            </div>

            {/* Direction 2 */}
            <div className="premium-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-starsim-navy/5 text-starsim-navy mb-5">
                  <Atom className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-starsim-navy">Educație STEM și știință aplicată</h3>
                <p className="mt-3 text-sm text-starsim-muted leading-relaxed">
                  Promovăm învățarea prin experiment, tehnologie, electronică, robotică, programare, matematică, științe ale naturii și activități interdisciplinare.
                </p>
              </div>
            </div>

            {/* Direction 3 */}
            <div className="premium-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-starsim-navy/5 text-starsim-navy mb-5">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-starsim-navy">Familie, școală și comunitate</h3>
                <p className="mt-3 text-sm text-starsim-muted leading-relaxed">
                  Construim proiecte care aduc împreună copiii, părinții, profesorii, voluntarii, specialiștii și comunitățile locale.
                </p>
              </div>
            </div>

            {/* Direction 4 */}
            <div className="premium-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-starsim-navy/5 text-starsim-navy mb-5">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-starsim-navy">Gândire critică și siguranță digitală</h3>
                <p className="mt-3 text-sm text-starsim-muted leading-relaxed">
                  Susținem educația împotriva dezinformării, manipulării, fraudelor online, phishingului și utilizării iresponsabile a tehnologiei.
                </p>
              </div>
            </div>

            {/* Direction 5 */}
            <div className="premium-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium flex flex-col justify-between sm:col-span-2 lg:col-span-1">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-starsim-navy/5 text-starsim-navy mb-5">
                  <Leaf className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-starsim-navy">Natură, patrimoniu și cer nocturn</h3>
                <p className="mt-3 text-sm text-starsim-muted leading-relaxed">
                  Promovăm protecția mediului, biodiversitatea, reducerea poluării luminoase, patrimoniul natural și cultural, turismul educațional și astroturismul.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Ce facem Section */}
      <section className="py-16 md:py-20 bg-starsim-ivory/10 border-y border-starsim-border/30">
        <Container className="grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-starsim-gold/10 px-3.5 py-1 text-xs font-bold text-starsim-gold border border-starsim-gold/20">
              <BookOpen className="h-3.5 w-3.5" />
              Activitățile Noastre
            </div>
            <h2 className="font-serif text-3xl font-bold text-starsim-navy md:text-4xl">
              Ce facem la Star Sim
            </h2>
            <p className="text-base leading-relaxed text-starsim-muted">
              Star Sim dezvoltă și organizează activități educaționale, științifice, culturale, digitale, sociale, de mediu și comunitare.
            </p>
            <div className="hidden lg:block p-6 rounded-2xl border border-starsim-border/50 bg-white shadow-soft">
              <p className="text-xs font-bold text-starsim-navy tracking-wide uppercase">Vrei să participi?</p>
              <p className="mt-2 text-xs text-starsim-muted leading-relaxed">
                Fii la curent cu evenimentele, star-party-urile și activitățile noastre practice pe pagina dedicată!
              </p>
              <Link href="/evenimente" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-starsim-gold hover:text-starsim-softGold transition">
                Vezi evenimente <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-starsim-border/50 shadow-soft">
            <ul className="space-y-5">
              {activities.map((activity, index) => (
                <li key={index} className="flex gap-4 items-start pb-4 border-b border-slate-50 last:border-b-0 last:pb-0">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-starsim-gold/15 text-starsim-gold mt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm md:text-base font-medium text-starsim-navy leading-relaxed">
                    {activity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Target & Principles Section */}
      <section className="py-16 md:py-20 bg-white">
        <Container className="grid gap-8 md:grid-cols-2">
          {/* Target audience */}
          <div className="premium-card p-8 transition-all duration-300 hover:shadow-premium flex flex-col justify-between relative overflow-hidden border border-starsim-border/60">
            <div className="absolute top-0 right-0 w-24 h-24 bg-starsim-gold/5 rounded-full blur-xl pointer-events-none" />
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-starsim-navy/5 text-starsim-navy mb-5">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-starsim-navy">Pentru cine lucrăm</h3>
              <div className="mt-4 space-y-4 text-sm md:text-base text-starsim-muted leading-relaxed">
                <p>
                  Activitățile Star Sim se adresează copiilor, tinerilor, familiilor, părinților, cadrelor didactice, voluntarilor, seniorilor, persoanelor vulnerabile, comunităților locale, unităților de învățământ, instituțiilor și publicului larg.
                </p>
                <p>
                  Ne dorim ca educația practică, știința și cultura să ajungă și în comunități care au acces redus la resurse educaționale, tehnologice sau culturale.
                </p>
              </div>
            </div>
          </div>

          {/* Principles */}
          <div className="premium-card p-8 transition-all duration-300 hover:shadow-premium flex flex-col justify-between relative overflow-hidden border border-starsim-border/60">
            <div className="absolute top-0 right-0 w-24 h-24 bg-starsim-gold/5 rounded-full blur-xl pointer-events-none" />
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-starsim-navy/5 text-starsim-navy mb-5">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-starsim-navy">Principiile Star Sim</h3>
              <div className="mt-4 space-y-4 text-sm md:text-base text-starsim-muted leading-relaxed">
                <p>
                  Activitatea noastră se bazează pe <strong>legalitate, transparență, integritate și responsabilitate</strong>.
                </p>
                <p>
                  Promovăm respectul față de oameni, egalitatea de șanse, protejarea interesului superior al copilului, rigoarea științifică, gândirea critică și colaborarea între copii, părinți, profesori, specialiști, instituții și comunități.
                </p>
                <p>
                  Toate resursele asociației sunt folosite pentru realizarea scopului său nonprofit, pentru dezvoltarea proiectelor și pentru sprijinirea beneficiarilor.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Conducerea Asociației & Contact Oficial */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-slate-50/70 to-starsim-ivory/20 border-t border-starsim-border/50">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-starsim-gold/10 px-3.5 py-1 text-xs font-bold text-starsim-gold border border-starsim-gold/25">
              <ShieldCheck className="h-3.5 w-3.5" />
              Guvernanță & Reprezentanți Legali
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-starsim-navy md:text-4xl">
              Conducerea Asociației Star Sim
            </h2>
            <p className="mt-3 text-base text-starsim-muted leading-relaxed">
              Echipa dedicată misiunii de a transforma curiozitatea în pasiune pentru știință și educație practică.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-stretch">
            {/* Leadership Cards (7 cols) */}
            <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2">
              {/* Președinte */}
              <div className="navy-gradient rounded-3xl p-7 text-white shadow-premium border border-white/10 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-36 h-36 bg-starsim-gold/15 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-full bg-starsim-gold/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-starsim-softGold border border-starsim-gold/30">
                      {org.presidentRole || "Președinte"}
                    </span>
                    <span className="text-xs font-semibold text-white/50">Reprezentant legal</span>
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-starsim-gold to-amber-600 text-starsim-navy font-serif font-black text-xl shadow-md">
                      {org.presidentName ? org.presidentName.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("") : "GȘ"}
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-white">
                        {org.presidentName || "Gîrdeanu Ștefan"}
                      </h3>
                      <p className="text-xs font-semibold text-starsim-softGold mt-0.5">
                        {org.presidentRole || "Președinte"}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-xs text-slate-300 leading-relaxed">
                    Coordonează direcțiile strategice, inițiativele educaționale și parteneriatele instituționale ale Asociației Star Sim.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-starsim-softGold font-semibold">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Conducerea Asociației Star Sim</span>
                </div>
              </div>

              {/* Vicepreședinte */}
              <div className="navy-gradient rounded-3xl p-7 text-white shadow-premium border border-white/10 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-36 h-36 bg-starsim-gold/15 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-full bg-starsim-gold/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-starsim-softGold border border-starsim-gold/30">
                      {org.vicePresidentRole || "Vicepreședinte"}
                    </span>
                    <span className="text-xs font-semibold text-white/50">Reprezentant legal</span>
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-starsim-gold to-amber-600 text-starsim-navy font-serif font-black text-xl shadow-md">
                      {org.vicePresidentName ? org.vicePresidentName.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("") : "CS"}
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-white">
                        {org.vicePresidentName || "Claudiu Simion"}
                      </h3>
                      <p className="text-xs font-semibold text-starsim-softGold mt-0.5">
                        {org.vicePresidentRole || "Vicepreședinte"}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-xs text-slate-300 leading-relaxed">
                    Asigură coordonarea operațională a atelierelor STEM, logistica activităților de observare a cerului și relația cu beneficiarii.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-starsim-softGold font-semibold">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Conducerea Asociației Star Sim</span>
                </div>
              </div>
            </div>

            {/* Contact Oficial & Date Asociație Card (5 cols) */}
            <div className="lg:col-span-5 flex">
              <div className="premium-card p-7 md:p-8 bg-white border border-starsim-border/70 rounded-3xl shadow-soft flex flex-col justify-between w-full">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-xl bg-starsim-gold/15 flex items-center justify-center text-starsim-gold">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-starsim-navy">
                      Contact oficial
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-starsim-muted">
                    Date oficiale de identificare și comunicare Asociația Star Sim.
                  </p>

                  <div className="mt-6 space-y-3.5 text-sm text-slate-700">
                    {/* Email */}
                    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100">
                      <Mail className="h-5 w-5 text-starsim-gold shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                          Email oficial
                        </span>
                        <a
                          href={`mailto:${org.officialEmail || "contact@starsim.ro"}`}
                          className="font-semibold text-starsim-navy hover:text-starsim-blue transition break-all"
                        >
                          {org.officialEmail || "contact@starsim.ro"}
                        </a>
                      </div>
                    </div>

                    {/* Telefoane (2 numere) */}
                    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100">
                      <Phone className="h-5 w-5 text-starsim-gold shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                          Telefon oficial
                        </span>
                        {org.phone1 ? (
                          <div>
                            <a
                              href={`tel:${org.phone1.replace(/\s+/g, "")}`}
                              className="font-semibold text-starsim-navy hover:text-starsim-blue transition"
                            >
                              {org.phone1}
                            </a>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">[număr oficial, dacă dorești]</span>
                        )}
                        {org.phone2 ? (
                          <div>
                            <a
                              href={`tel:${org.phone2.replace(/\s+/g, "")}`}
                              className="font-semibold text-starsim-navy hover:text-starsim-blue transition text-xs text-slate-600"
                            >
                              {org.phone2} <span className="text-slate-400">(secundar)</span>
                            </a>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {/* Sediu & CUI */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          <MapPin className="h-3.5 w-3.5 text-starsim-gold shrink-0" />
                          Sediu
                        </div>
                        <p className="mt-1 font-bold text-starsim-navy text-sm">
                          {org.headquarters || "Constanța"}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          <Building2 className="h-3.5 w-3.5 text-starsim-gold shrink-0" />
                          CUI
                        </div>
                        <p className="mt-1 font-bold text-starsim-navy text-sm">
                          {org.cui || "[CUI]"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href="/contact"
                    className="focus-ring inline-flex items-center gap-1.5 text-xs font-bold text-starsim-navy hover:text-starsim-blue transition"
                  >
                    Formular contact <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/doneaza"
                    className="focus-ring inline-flex items-center gap-1.5 rounded-xl bg-starsim-gold px-3.5 py-1.5 text-xs font-bold text-white hover:bg-starsim-softGold transition shadow-xs"
                  >
                    Susține asociația <HeartHandshake className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Support & Transparency Section */}
      <section className="py-16 md:py-20 bg-starsim-ivory/20 border-t border-starsim-border/50">
        <Container className="grid gap-8 md:grid-cols-2">
          {/* Support */}
          <div className="premium-card p-8 bg-white border border-starsim-border/60 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-starsim-navy">Cum ne susținem activitatea</h3>
              <p className="text-sm md:text-base text-starsim-muted leading-relaxed">
                Star Sim poate fi susținută prin donații, sponsorizări, granturi, finanțări nerambursabile, redirecționări de impozit, contribuții, evenimente, cursuri, ateliere, materiale educaționale și alte surse permise de lege.
              </p>
              <p className="text-sm md:text-base text-starsim-muted leading-relaxed">
                Toate veniturile și bunurile asociației sunt folosite pentru realizarea proiectelor, dezvoltarea activităților educaționale și sprijinirea beneficiarilor. Asociația nu distribuie profit membrilor săi.
              </p>
            </div>
            <div className="mt-6 pt-5 border-t border-slate-50 flex gap-4">
              <Link href="/doneaza" className="focus-ring inline-flex items-center justify-center gap-1.5 rounded-xl bg-starsim-gold px-4 py-2 text-xs font-bold text-white hover:bg-starsim-softGold transition">
                Susține-ne <HeartHandshake className="h-3.5 w-3.5" />
              </Link>
              <Link href="/contact" className="focus-ring inline-flex items-center justify-center gap-1.5 rounded-xl border border-starsim-navy px-4 py-2 text-xs font-bold text-starsim-navy hover:bg-starsim-navy/5 transition">
                Parteneriate <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Transparency */}
          <div className="premium-card p-8 bg-white border border-starsim-border/60 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-starsim-navy/5 text-starsim-navy mb-5">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-starsim-navy">Transparență</h3>
              <p className="text-sm md:text-base text-starsim-muted leading-relaxed">
                Credem că încrederea se construiește prin claritate și responsabilitate.
              </p>
              <p className="text-sm md:text-base text-starsim-muted leading-relaxed">
                Pe măsură ce proiectele noastre se dezvoltă, vom publica informații despre activitățile desfășurate, parteneriate, rapoarte de activitate, rezultate, documente publice și moduri prin care comunitatea poate susține inițiativele Star Sim.
              </p>
              <p className="text-xs text-starsim-muted/80 italic leading-relaxed">
                Documentele publice vor fi puse la dispoziție în forme care respectă legislația privind protecția datelor personale.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
