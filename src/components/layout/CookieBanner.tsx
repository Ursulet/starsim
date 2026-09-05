"use client";

import Link from "next/link";
import { Cookie, Shield } from "lucide-react";
import { useEffect, useState } from "react";

const consentKey = "starsim-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      try {
        const stored = window.localStorage.getItem(consentKey);
        // Show banner only if user hasn't made a choice yet
        setVisible(!stored);
      } catch {
        setVisible(false);
      }
    };

    checkConsent();
    window.addEventListener("starsim-cookie-consent-updated", checkConsent);
    window.addEventListener("storage", checkConsent);

    return () => {
      window.removeEventListener("starsim-cookie-consent-updated", checkConsent);
      window.removeEventListener("storage", checkConsent);
    };
  }, []);

  const handleChoice = (choice: "essential" | "all") => {
    try {
      const val = choice === "all" ? "accepted-all" : "accepted-essential";
      window.localStorage.setItem(consentKey, val);
      setVisible(false);
      window.dispatchEvent(new Event("starsim-cookie-consent-updated"));
    } catch {
      setVisible(false);
    }
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Consimțământ cookie-uri"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-slate-200 bg-white/98 px-5 py-4 shadow-premium backdrop-blur-md transition-all duration-300 animate-slideUp"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3.5">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-starsim-ivory text-starsim-gold border border-amber-200/50">
            <Cookie className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-base md:text-lg font-bold text-starsim-navy">
                Respectăm confidențialitatea datelor tale
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <Shield className="h-3 w-3" /> Fără trackere externe
              </span>
            </div>
            <p className="mt-1 max-w-3xl text-xs md:text-sm leading-relaxed text-slate-600">
              Site-ul starsim.ro folosește cookie-uri și stocare locală strict necesare pentru funcționarea tehnică securizată și memorarea alegerilor tale. Detalii complete găsești în{" "}
              <Link href="/cookies" className="font-semibold text-starsim-gold hover:text-starsim-navy underline">
                Politica de cookies
              </Link>{" "}
              și în{" "}
              <Link href="/politica-de-confidentialitate" className="font-semibold text-starsim-gold hover:text-starsim-navy underline">
                Politica de confidențialitate
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-end lg:self-center">
          <Link
            href="/cookies#preferinte"
            className="focus-ring rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
          >
            Preferințe
          </Link>
          <button
            type="button"
            onClick={() => handleChoice("essential")}
            className="focus-ring rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-starsim-navy hover:bg-slate-50 transition shadow-xs"
          >
            Doar cele esențiale
          </button>
          <button
            type="button"
            onClick={() => handleChoice("all")}
            className="focus-ring rounded-xl bg-starsim-navy px-5 py-2.5 text-xs font-bold text-white hover:bg-starsim-blue transition shadow-sm"
          >
            Acceptă
          </button>
        </div>
      </div>
    </div>
  );
}
