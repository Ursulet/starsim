/**
 * DonorboxMeter — renderează Donation Meter-ul Donorbox ca <iframe>.
 *
 * Primește props pre-parsate server-side (src validat la donorbox.org/embed/*,
 * preview=true eliminat). Nu folosește dangerouslySetInnerHTML.
 */

import type { ParsedDonorboxMeter } from "@/lib/donorbox";

interface DonorboxMeterProps {
  meter: ParsedDonorboxMeter;
}

export function DonorboxMeter({ meter }: DonorboxMeterProps) {
  const { src, iframeProps } = meter;

  // Extragem atributele cunoscute pentru a le pasa la iframe fără spread arbitrar
  const height = iframeProps["height"] || "93px";
  const width = iframeProps["width"] || "100%";
  const style = iframeProps["style"] || "max-width: 500px; min-width: 250px; min-height: 90px; max-height: none !important;";
  const name = iframeProps["name"] || "donorbox";

  return (
    <div className="donorbox-meter-wrapper flex justify-center">
      <iframe
        src={src}
        height={height}
        width={width}
        style={{
          maxWidth: "500px",
          minWidth: "250px",
          minHeight: "90px",
          maxHeight: "none",
          display: "block",
        }}
        name={name}
        frameBorder={0}
        scrolling="no"
        title="Donation Meter – Asociația Star Sim"
        aria-label="Progresul campaniei de donații"
      />
    </div>
  );
}
