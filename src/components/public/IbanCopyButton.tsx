"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function IbanCopyButton({ iban }: { iban: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!iban) return;
    try {
      await navigator.clipboard.writeText(iban.replace(/\s+/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is blocked
      const input = document.createElement("textarea");
      input.value = iban.replace(/\s+/g, "");
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all duration-200 ${
        copied
          ? "bg-emerald-100 text-emerald-800"
          : "bg-slate-100 text-slate-700 hover:bg-starsim-gold/20 hover:text-starsim-navy"
      }`}
      title="Copiază codul IBAN"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-600" />
          <span>Copiat!</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          <span>Copiază IBAN</span>
        </>
      )}
    </button>
  );
}
