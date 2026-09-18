/**
 * Donorbox embed code parser — server-side, fără DOM / innerHTML.
 *
 * Acceptă numai:
 *   - <script type="module" src="https://donorbox.org/widgets.js" async></script>
 *   - <dbox-widget campaign="..." ...></dbox-widget>
 *   - <iframe src="https://donorbox.org/embed/..." ...></iframe>  (Donation Meter)
 *
 * Blochează:
 *   - alt domeniu în <script src>
 *   - atribute on* (event handlers)
 *   - valori care conțin javascript:
 *   - orice alt tag HTML
 */

// ---------------------------------------------------------------------------
// Tipuri
// ---------------------------------------------------------------------------

export type DonorboxWidgetType = "donation_form" | "popup" | "unknown";

export interface ParsedDonorboxWidget {
  type: DonorboxWidgetType;
  campaign: string;
  /** Atribute safe extrase din <dbox-widget>, fără event handlers */
  attributes: Record<string, string>;
}

export interface ParsedDonorboxMeter {
  /** src validat, fără preview=true */
  src: string;
  /** Toate atributele safe ale iframe-ului */
  iframeProps: Record<string, string>;
}

// ---------------------------------------------------------------------------
// Constante
// ---------------------------------------------------------------------------

const DONORBOX_ORIGIN = "https://donorbox.org";
const WIDGET_SCRIPT_SRC = `${DONORBOX_ORIGIN}/widgets.js`;

/** Atribute blocate (event handlers) */
const BLOCKED_ATTR_RE = /^on\w+$/i;
/** Valori blocate */
const BLOCKED_VALUE_RE = /javascript\s*:/i;

// ---------------------------------------------------------------------------
// Utilitar: parsare atribute HTML din string
// ---------------------------------------------------------------------------

/**
 * Extrage atributele dintr-un tag HTML reprezentat ca string.
 * Suportă: attr="val", attr='val', attr (boolean).
 * Blochează atribute on* și valori javascript:.
 */
function parseAttributes(attrString: string): Record<string, string> | null {
  const result: Record<string, string> = {};
  // Regex pentru atribute: name="value", name='value', name sau name=""
  const attrRe = /(\w[\w-]*)(?:\s*=\s*(?:"([^"]*?)"|'([^']*?)'|(\S+)))?/g;
  let match: RegExpExecArray | null;

  while ((match = attrRe.exec(attrString)) !== null) {
    const name = match[1].toLowerCase();
    const value = match[2] ?? match[3] ?? match[4] ?? "";

    // Blocare event handlers
    if (BLOCKED_ATTR_RE.test(name)) return null;
    // Blocare javascript: în valori
    if (BLOCKED_VALUE_RE.test(value)) return null;

    result[name] = value;
  }

  return result;
}

// ---------------------------------------------------------------------------
// Parser widget <dbox-widget>
// ---------------------------------------------------------------------------

/**
 * Parsează un embed code Donorbox widget și returnează configurația safe.
 * Returnează null dacă codul nu este valid sau conține conținut blocat.
 */
export function parseDonorboxEmbedCode(raw: string): ParsedDonorboxWidget | null {
  if (!raw || typeof raw !== "string") return null;

  const input = raw.trim();

  // ── Validare <script> (opțional, poate lipsi) ──────────────────────────
  // Elimină scriptul Donorbox valid dacă există
  let remainder = input;

  const scriptTagRe = /<script([^>]*)><\/script>/gi;
  const scriptMatches = [...input.matchAll(scriptTagRe)];

  for (const sm of scriptMatches) {
    const scriptAttrs = parseAttributes(sm[1]);
    if (!scriptAttrs) return null; // atribute blocate în script

    const src = scriptAttrs["src"] || "";
    // Permite NUMAI scriptul oficial Donorbox
    if (src && src !== WIDGET_SCRIPT_SRC) return null;

    remainder = remainder.replace(sm[0], "").trim();
  }

  // ── Validare <dbox-widget> ──────────────────────────────────────────────
  const dboxRe = /^<dbox-widget((?:\s[^>]*)?)>(?:<\/dbox-widget>)?$/i;
  const dboxMatch = dboxRe.exec(remainder.trim());
  if (!dboxMatch) return null;

  const attrs = parseAttributes(dboxMatch[1] || "");
  if (!attrs) return null;

  const campaign = attrs["campaign"] || "";
  if (!campaign) return null;

  // Determină tipul
  const rawType = attrs["type"] || "";
  let type: DonorboxWidgetType = "unknown";
  if (rawType === "donation_form") type = "donation_form";
  else if (rawType === "popup") type = "popup";

  return { type, campaign, attributes: attrs };
}

// ---------------------------------------------------------------------------
// Parser Donation Meter <iframe> + <script>
// ---------------------------------------------------------------------------

/**
 * Parsează embed code-ul Donation Meter generat de Donorbox.
 * Validează că iframe src aparține exclusiv donorbox.org.
 * Elimină preview=true din src pentru producție.
 */
export function parseDonorboxMeterCode(raw: string): ParsedDonorboxMeter | null {
  if (!raw || typeof raw !== "string") return null;

  const input = raw.trim();

  // Verifică că nu există alte scripturi în afara celui Donorbox
  const scriptTagRe = /<script([^>]*)>(?:.*?)<\/script>/gi;
  for (const sm of [...input.matchAll(scriptTagRe)]) {
    const scriptAttrs = parseAttributes(sm[1]);
    if (!scriptAttrs) return null;

    const src = scriptAttrs["src"] || "";
    // Permite widget.js sau widgets.js de la donorbox.org
    if (src && !src.startsWith(DONORBOX_ORIGIN + "/")) return null;
  }

  // Extrage <iframe>
  const iframeRe = /<iframe((?:\s[^>]*)?)(?:\/>|><\/iframe>)/i;
  const iframeMatch = iframeRe.exec(input);
  if (!iframeMatch) return null;

  const attrs = parseAttributes(iframeMatch[1] || "");
  if (!attrs) return null;

  const src = attrs["src"] || "";
  if (!src) return null;

  // Validare: src trebuie să fie de la donorbox.org
  let srcUrl: URL;
  try {
    srcUrl = new URL(src);
  } catch {
    return null;
  }

  if (srcUrl.origin !== DONORBOX_ORIGIN) return null;
  if (!srcUrl.pathname.startsWith("/embed/")) return null;

  // Elimină preview=true din URL (parametru de preview Donorbox)
  srcUrl.searchParams.delete("preview");

  // Construiește props safe pentru iframe (fără event handlers)
  const safeProps: Record<string, string> = {};
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "src") {
      safeProps["src"] = srcUrl.toString();
    } else if (!BLOCKED_ATTR_RE.test(k) && !BLOCKED_VALUE_RE.test(v)) {
      safeProps[k] = v;
    }
  }

  if (!safeProps["src"]) return null;

  return {
    src: safeProps["src"],
    iframeProps: safeProps
  };
}

// ---------------------------------------------------------------------------
// Validare simplă pentru admin (returnează tip detectat sau eroare)
// ---------------------------------------------------------------------------

export type DonorboxValidationResult =
  | { valid: true; type: DonorboxWidgetType; campaign: string }
  | { valid: false; error: string };

export function validateDonorboxEmbedCode(raw: string): DonorboxValidationResult {
  if (!raw.trim()) return { valid: false, error: "Câmpul este gol." };

  const parsed = parseDonorboxEmbedCode(raw);
  if (!parsed) {
    return {
      valid: false,
      error:
        "Cod invalid. Acceptăm numai embed code oficial Donorbox cu <dbox-widget> și scriptul de la https://donorbox.org/widgets.js."
    };
  }

  return { valid: true, type: parsed.type, campaign: parsed.campaign };
}

export type DonorboxMeterValidationResult =
  | { valid: true; src: string }
  | { valid: false; error: string };

export function validateDonorboxMeterCode(raw: string): DonorboxMeterValidationResult {
  if (!raw.trim()) return { valid: false, error: "Câmpul este gol." };

  const parsed = parseDonorboxMeterCode(raw);
  if (!parsed) {
    return {
      valid: false,
      error:
        "Cod Donation Meter invalid. Acceptăm numai iframe-ul oficial Donorbox de la https://donorbox.org/embed/..."
    };
  }

  return { valid: true, src: parsed.src };
}
