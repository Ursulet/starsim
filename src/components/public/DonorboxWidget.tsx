"use client";

/**
 * DonorboxWidget — renderează <dbox-widget> în mod controlat și securizat.
 *
 * Primește atributele pre-parsate server-side (niciodată raw HTML).
 * Încarcă scriptul official Donorbox o singură dată pe pagină.
 * Nu folosește dangerouslySetInnerHTML / innerHTML.
 */

import { useEffect, useRef } from "react";
import type { ParsedDonorboxWidget } from "@/lib/donorbox";

const WIDGET_SCRIPT_SRC = "https://donorbox.org/widgets.js";

interface DonorboxWidgetProps {
  widget: ParsedDonorboxWidget;
}

export function DonorboxWidget({ widget }: DonorboxWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Încarcă scriptul Donorbox o singură dată pe pagină
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.querySelector(`script[src="${WIDGET_SCRIPT_SRC}"]`)) return;

    const script = document.createElement("script");
    script.type = "module";
    script.src = WIDGET_SCRIPT_SRC;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  // Creează elementul <dbox-widget> cu atributele safe și îl inserează în container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Curăță conținut anterior (dacă widget-ul se schimbă)
    container.innerHTML = "";

    const el = document.createElement("dbox-widget");

    // Setăm doar atributele safe extrase de parser server-side
    for (const [key, value] of Object.entries(widget.attributes)) {
      // Double-check: nu setăm event handlers sau valori javascript: (apărare în profunzime)
      if (/^on\w+$/i.test(key)) continue;
      if (/javascript\s*:/i.test(value)) continue;
      el.setAttribute(key, value);
    }

    container.appendChild(el);

    return () => {
      container.innerHTML = "";
    };
  }, [widget]);

  return (
    <div
      ref={containerRef}
      className="donorbox-widget-container w-full"
      aria-label="Formular de donație Donorbox"
    />
  );
}
