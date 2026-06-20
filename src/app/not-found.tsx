import Link from "next/link";
import { ArrowLeft, Home, Search, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative grid min-h-screen overflow-hidden bg-starsim-navy text-white">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(242,196,109,0.22),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.12),transparent_26%),linear-gradient(135deg,#061B3D_0%,#082756_55%,#0B356D_100%)]" />
        <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(#fff_1px,transparent_1px),radial-gradient(#F2C46D_1px,transparent_1px)] [background-position:0_0,42px_68px] [background-size:92px_92px,150px_150px]" />
        <div className="absolute -right-24 top-16 h-80 w-80 rounded-full border border-starsim-gold/40" />
        <div className="absolute -right-10 top-28 h-56 w-56 rounded-full bg-starsim-gold/20 blur-3xl" />
      </div>

      <section className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-[1fr_0.9fr] md:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white/75 backdrop-blur">
            <Sparkles className="h-4 w-4 text-starsim-gold" />
            Semnal pierdut printre stele
          </div>

          <p className="mt-8 font-serif text-[clamp(6rem,18vw,11rem)] font-semibold leading-[0.78] text-white">404</p>
          <h1 className="mt-6 max-w-2xl font-serif text-4xl font-semibold leading-tight md:text-5xl">
            Pagina cautata a iesit de pe orbita.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/72">
            Am verificat harta cerului, calendarul evenimentelor si programele Star Sim, dar adresa aceasta nu mai duce catre o pagina activa.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-starsim-gold px-6 py-3 font-bold text-starsim-navy shadow-soft transition hover:bg-starsim-softGold">
              <Home className="h-5 w-5" />
              Inapoi la pagina principala
            </Link>
            <Link href="/programe" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/8 px-6 py-3 font-bold text-white backdrop-blur transition hover:border-starsim-gold">
              <Search className="h-5 w-5" />
              Descopera programele
            </Link>
          </div>
        </div>

        <div className="relative min-h-[360px] rounded-2xl border border-white/15 bg-white/8 p-6 shadow-premium backdrop-blur">
          <div className="absolute left-1/2 top-20 h-48 w-48 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_28%,#fff8cf,transparent_18%),linear-gradient(135deg,#F2C46D,#D89B32_55%,#0B356D)] shadow-[0_0_70px_rgba(242,196,109,0.35)]" />
          <div className="absolute left-1/2 top-36 h-20 w-72 -translate-x-1/2 -rotate-12 rounded-[50%] border-[10px] border-white/35 border-t-starsim-gold/70" />
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-starsim-navy/70 p-5 text-center text-sm leading-6 text-white/70">
            <strong className="text-white">Raport de bord:</strong>
            <br />
            link ratacit, pagina mutata sau o stea prea curioasa a schimbat traseul.
          </div>
        </div>
      </section>

      <Link href="/" className="absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 text-sm font-semibold text-white/55 hover:text-starsim-gold">
        <ArrowLeft className="h-4 w-4" />
        Revino pe Star Sim
      </Link>
    </main>
  );
}
