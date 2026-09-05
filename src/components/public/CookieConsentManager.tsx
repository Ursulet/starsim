"use client";

import { useEffect, useState } from "react";
import { Check, ShieldCheck, RefreshCw, Info, Lock } from "lucide-react";

const consentKey = "starsim-cookie-consent";

export function CookieConsentManager() {
  const [consentState, setConsentState] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const readConsent = () => {
      try {
        const val = window.localStorage.getItem(consentKey);
        setConsentState(val);
      } catch {
        setConsentState(null);
      }
    };

    readConsent();
    window.addEventListener("starsim-cookie-consent-updated", readConsent);
    window.addEventListener("storage", readConsent);

    return () => {
      window.removeEventListener("starsim-cookie-consent-updated", readConsent);
      window.removeEventListener("storage", readConsent);
    };
  }, []);

  const handleUpdate = (type: "all" | "essential" | "reset") => {
    try {
      if (type === "reset") {
        window.localStorage.removeItem(consentKey);
        setConsentState(null);
        setFeedback("Preferințele au fost resetate. Bannerul de consimțământ a fost reactivat.");
      } else if (type === "all") {
        window.localStorage.setItem(consentKey, "accepted-all");
        setConsentState("accepted-all");
        setFeedback("Ai acceptat toate categoriile de cookie-uri.");
      } else {
        window.localStorage.setItem(consentKey, "accepted-essential");
        setConsentState("accepted-essential");
        setFeedback("Ai ales activarea exclusivă a cookie-urilor strict necesare.");
      }

      window.dispatchEvent(new Event("starsim-cookie-consent-updated"));
      setTimeout(() => setFeedback(null), 4000);
    } catch {
      // ignore
    }
  };

  const statusLabel =
    consentState === "accepted-all"
      ? "Toate cookie-urile permise"
      : consentState === "accepted-essential" || consentState === "accepted"
      ? "Doar cookie-uri strict necesare"
      : "Consimțământ nesalvat / În așteptare";

  const statusBadgeColor =
    consentState === "accepted-all" || consentState === "accepted-essential" || consentState === "accepted"
      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
      : "bg-amber-50 text-amber-800 border-amber-200";

  return (
    <div id="preferinte" className="my-8 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 md:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="h-5 w-5 text-starsim-navy" />
          <h3 className="font-serif text-lg md:text-xl font-bold text-starsim-navy">
            Gestionare preferințe consimțământ
          </h3>
        </div>
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusBadgeColor}`}>
          <span className="h-2 w-2 rounded-full bg-current" />
          <span>{statusLabel}</span>
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-600 leading-relaxed">
        Conform legislației aplicabile (GDPR și Legea 506/2004), ai control deplin asupra fișierelor stocate pe dispozitivul tău. Poți schimba opțiunea în orice moment:
      </p>

      {feedback ? (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-100/80 px-4 py-2.5 text-xs font-semibold text-emerald-900 animate-fadeIn">
          <Check className="h-4 w-4 shrink-0 text-emerald-700" />
          <span>{feedback}</span>
        </div>
      ) : null}

      <div className="mt-5 space-y-3">
        {/* Categoria 1: Strict Necesare */}
        <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-starsim-navy">Cookie-uri strict necesare</span>
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
                Întotdeauna active
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 leading-normal">
              Indispensabile pentru funcționarea site-ului, securitatea formularelor (anti-CSRF) și menținerea sesiunilor de administrare. Nu necesită acord prealabil conform legii.
            </p>
          </div>
          <div className="shrink-0 pt-0.5 text-slate-400">
            <Lock className="h-4 w-4 text-slate-400" />
          </div>
        </div>

        {/* Categoria 2: Analitice */}
        <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-starsim-navy">Analiză și măsurare trafic</span>
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
                Inactiv în prezent
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 leading-normal">
              Ne ajută să înțelegem cum este utilizat site-ul prin statistici agregate. Pe starsim.ro nu rulăm Google Analytics sau alte trackere terțe.
            </p>
          </div>
          <div className="shrink-0 pt-0.5 text-slate-400">
            <Info className="h-4 w-4 text-slate-400" />
          </div>
        </div>

        {/* Categoria 3: Marketing */}
        <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-starsim-navy">Marketing și publicitate</span>
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
                Inactiv în prezent
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 leading-normal">
              Utilizate pentru profilare sau campanii reclame externe. Nu folosim Meta Pixel, TikTok Pixel sau cookie-uri de remarketing.
            </p>
          </div>
          <div className="shrink-0 pt-0.5 text-slate-400">
            <Info className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={() => handleUpdate("essential")}
          className="focus-ring inline-flex items-center justify-center rounded-xl bg-starsim-navy px-4 py-2.5 text-xs font-bold text-white transition hover:bg-starsim-blue shadow-xs"
        >
          Doar cele strict necesare
        </button>
        <button
          type="button"
          onClick={() => handleUpdate("all")}
          className="focus-ring inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-starsim-navy transition hover:bg-slate-50 shadow-xs"
        >
          Acceptă toate
        </button>
        <button
          type="button"
          onClick={() => handleUpdate("reset")}
          className="focus-ring inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-starsim-navy hover:bg-slate-100 transition"
          title="Reafișează bannerul de la subsol"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Resetează alegerea</span>
        </button>
      </div>
    </div>
  );
}
