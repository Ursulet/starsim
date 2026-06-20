"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";
import { useEffect, useState } from "react";

const consentKey = "starsim-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(window.localStorage.getItem(consentKey) !== "accepted");
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-starsim-border bg-white/96 px-5 py-4 shadow-premium backdrop-blur">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-starsim-ivory text-starsim-gold">
            <Cookie className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-semibold text-starsim-navy">Folosim cookies esentiale</h2>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-starsim-muted">
              Le folosim pentru functionarea site-ului si pentru a retine preferinta ta. Detalii gasesti in{" "}
              <Link href="/cookies" className="font-semibold text-starsim-gold hover:text-starsim-navy">
                politica de cookies
              </Link>
              .
            </p>
          </div>
        </div>
        <button
          className="focus-ring rounded-full bg-starsim-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-starsim-blue"
          onClick={() => {
            window.localStorage.setItem(consentKey, "accepted");
            setVisible(false);
          }}
        >
          Am inteles
        </button>
      </div>
    </div>
  );
}
