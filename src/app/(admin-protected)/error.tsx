"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

export default function AdminError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid min-h-[50vh] place-items-center p-8">
      <div className="text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-red-50 text-red-500">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Eroare în panou</h2>
        <p className="mt-2 max-w-sm text-sm text-gray-500">
          A apărut o eroare neașteptată. Încearcă din nou sau reîncarcă pagina.
        </p>
        {error.digest && (
          <p className="mt-1 text-xs text-gray-400">Cod: {error.digest}</p>
        )}
        <button
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700"
        >
          <RotateCcw className="h-4 w-4" />
          Încearcă din nou
        </button>
      </div>
    </div>
  );
}
