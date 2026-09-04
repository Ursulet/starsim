"use client";

import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

export default function PublicError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-[60vh] place-items-center px-5 py-16">
      <div className="text-center">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-red-50 text-red-500">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="font-serif text-3xl font-semibold text-starsim-navy">
          Ceva nu a funcționat
        </h1>
        <p className="mt-3 max-w-md text-starsim-muted">
          A apărut o eroare neașteptată. Te rugăm să încerci din nou sau să revii pe pagina principală.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-starsim-muted/60">Cod eroare: {error.digest}</p>
        )}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-starsim-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-starsim-blue"
          >
            <RotateCcw className="h-4 w-4" />
            Încearcă din nou
          </button>
          <Link
            href="/"
            className="focus-ring inline-flex items-center gap-2 rounded-xl border border-starsim-border px-5 py-3 text-sm font-bold text-starsim-navy transition hover:bg-starsim-ivory"
          >
            <Home className="h-4 w-4" />
            Pagina principală
          </Link>
        </div>
      </div>
    </main>
  );
}
