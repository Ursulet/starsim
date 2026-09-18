"use client";

import Link from "next/link";
import { useState } from "react";
import { useActionState } from "react";
import { AlertCircle, ExternalLink, Loader2, Save, CheckCircle2, XCircle, Info } from "lucide-react";
import { updateDonationSettingsAction, type DonationActionState } from "@/lib/actions/admin-donation-settings";
import { DonationCardsEditor } from "./DonationCardsEditor";
import type { AdminMediaOption } from "@/lib/admin/content-data";
import { validateDonorboxEmbedCode, validateDonorboxMeterCode } from "@/lib/donorbox";

type DonationSettingsFormProps = {
  settings: any;
  mediaOptions?: AdminMediaOption[];
};

function Input({ label, name, value, placeholder }: { label: string; name: string; value?: string | number | null; placeholder?: string }) {
  return (
    <label className="grid gap-1.5 text-xs font-semibold text-starsim-navy">
      {label}
      <input
        name={name}
        defaultValue={value || ""}
        placeholder={placeholder}
        className="focus-ring rounded-xl border border-slate-200 px-3.5 py-2.5 font-normal text-slate-800 transition-colors"
      />
    </label>
  );
}

function TextArea({ label, name, value, rows = 3, placeholder }: { label: string; name: string; value?: string | null; rows?: number; placeholder?: string }) {
  return (
    <label className="grid gap-1.5 text-xs font-semibold text-starsim-navy">
      {label}
      <textarea
        name={name}
        defaultValue={value || ""}
        rows={rows}
        placeholder={placeholder}
        className="focus-ring rounded-xl border border-slate-200 px-3.5 py-2.5 font-normal leading-relaxed text-slate-800 transition-colors"
      />
    </label>
  );
}

function Toggle({ label, name, checked, onChange, hint }: {
  label: string;
  name: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  hint?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-starsim-gold focus-visible:ring-offset-2 ${
          checked ? "bg-starsim-navy" : "bg-slate-300"
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </button>
      <input type="hidden" name={name} value={checked ? "true" : "false"} />
      <div>
        <span className="text-xs font-semibold text-starsim-navy">{label}</span>
        {hint ? <p className="mt-0.5 text-[11px] text-slate-400">{hint}</p> : null}
      </div>
    </div>
  );
}

/**
 * Preview inline al embed code-ului Donorbox — detectează tipul fără a executa cod.
 */
function EmbedCodePreview({ code }: { code: string }) {
  if (!code.trim()) return null;
  const result = validateDonorboxEmbedCode(code);

  if (!result.valid) {
    return (
      <div className="mt-2 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
        <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
        <span>{result.error}</span>
      </div>
    );
  }

  const typeLabel =
    result.type === "donation_form"
      ? "Formular embedded (donation_form)"
      : result.type === "popup"
      ? "Buton popup"
      : "Tip necunoscut";

  return (
    <div className="mt-2 flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
      <span>
        <strong>Valid</strong> · {typeLabel} · Campanie:{" "}
        <code className="font-mono">{result.campaign}</code>
      </span>
    </div>
  );
}

function MeterCodePreview({ code }: { code: string }) {
  if (!code.trim()) return null;
  const result = validateDonorboxMeterCode(code);

  if (!result.valid) {
    return (
      <div className="mt-2 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
        <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
        <span>{result.error}</span>
      </div>
    );
  }

  return (
    <div className="mt-2 flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
      <span>
        <strong>Valid</strong> · Donation Meter detectat
      </span>
    </div>
  );
}

export function DonationSettingsForm({ settings, mediaOptions = [] }: DonationSettingsFormProps) {
  const [state, formAction, isPending] = useActionState<DonationActionState, FormData>(
    updateDonationSettingsAction,
    null
  );

  const cards = Array.isArray(settings?.recommendedAmounts) ? settings.recommendedAmounts : [];

  // Donorbox state
  const [donorboxEnabled, setDonorboxEnabled] = useState<boolean>(settings?.donorboxEnabled ?? false);
  const [donorboxMeterEnabled, setDonorboxMeterEnabled] = useState<boolean>(settings?.donorboxMeterEnabled ?? false);
  const [embedCode, setEmbedCode] = useState<string>(settings?.donorboxEmbedCode ?? "");
  const [meterCode, setMeterCode] = useState<string>(settings?.donorboxMeterCode ?? "");

  return (
    <form action={formAction} encType="multipart/form-data" className="max-w-[1100px] space-y-8">
      {state?.error ? (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <span>{state.error}</span>
        </div>
      ) : null}

      {/* 1. Informații Generale Pagină */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-bold text-starsim-navy">Informații Pagina de Donații (Hero)</h2>
        <p className="mt-0.5 text-xs text-slate-500">
          Titlul și textul introductiv din antetul paginii de donații.
        </p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              label="Titlu pagină (Hero)"
              name="title"
              value={settings?.title}
              placeholder="Susține educația prin astronomie"
            />
          </div>
          <div className="sm:col-span-2">
            <TextArea
              label="Descriere introductivă"
              name="description"
              value={settings?.description}
              rows={3}
              placeholder="Fiecare contribuție ajută la organizarea atelierelor și evenimentelor astronomice..."
            />
          </div>
        </div>
      </div>

      {/* 2. Donorbox Donation Widget */}
      <div className="rounded-2xl border-2 border-starsim-blue/30 bg-gradient-to-br from-white via-white to-blue-50/20 p-6 shadow-sm">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-starsim-blue/10 px-3 py-1 text-xs font-bold text-starsim-blue">
              Integrare online
            </div>
            <h2 className="mt-2 text-lg font-bold text-starsim-navy">Donorbox Donation Widget</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Copiază embed code-ul generat de Donorbox și lipește-l aici. Sistemul validează că este cod oficial Donorbox.
            </p>
          </div>
          <a
            href="https://donorbox.org/nonprofit/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-xs transition-colors hover:bg-slate-50 sm:mt-0"
          >
            <ExternalLink className="h-3 w-3" />
            Deschide Donorbox
          </a>
        </div>

        <div className="mt-6 space-y-5">
          {/* Toggle activare */}
          <Toggle
            label="Widget activ"
            name="donorboxEnabled"
            checked={donorboxEnabled}
            onChange={setDonorboxEnabled}
            hint="Dacă dezactivat, secțiunea Donorbox nu apare pe /doneaza. Pachetele bancare rămân vizibile."
          />

          {/* Câmpuri widget */}
          <div className={`space-y-5 transition-opacity ${donorboxEnabled ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
            <Input
              label="Titlu intern / Identificare widget"
              name="donorboxTitle"
              value={settings?.donorboxTitle}
              placeholder="ex: Telescop pentru o școală rurală – 2026"
            />

            {/* Embed Code */}
            <div>
              <label className="grid gap-1.5 text-xs font-semibold text-starsim-navy">
                Donorbox Embed Code
                <span className="font-normal text-slate-400">
                  Copiază codul generat de Donorbox (Embedded form sau Popup) și lipește-l integral.
                </span>
                <textarea
                  name="donorboxEmbedCode"
                  value={embedCode}
                  onChange={(e) => setEmbedCode(e.target.value)}
                  rows={4}
                  spellCheck={false}
                  placeholder={`<script type="module" src="https://donorbox.org/widgets.js" async></script><dbox-widget campaign="..." type="donation_form" enable-auto-scroll="true"></dbox-widget>`}
                  className="focus-ring mt-1 rounded-xl border border-slate-200 px-3.5 py-2.5 font-mono text-xs font-normal leading-relaxed text-slate-800 transition-colors"
                />
              </label>
              <EmbedCodePreview code={embedCode} />
            </div>

            {/* Secțiunea Donation Meter */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="mb-4">
                <Toggle
                  label="Donation Meter activ"
                  name="donorboxMeterEnabled"
                  checked={donorboxMeterEnabled}
                  onChange={setDonorboxMeterEnabled}
                  hint="Afișează bara de progres a campaniei deasupra widgetului."
                />
              </div>

              <div className={`space-y-3 transition-opacity ${donorboxMeterEnabled ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
                <label className="grid gap-1.5 text-xs font-semibold text-starsim-navy">
                  Donation Meter Embed Code
                  <span className="font-normal text-slate-400">
                    Codul iframe generat de Donorbox pentru bara de progres. Parametrul preview=true va fi eliminat automat.
                  </span>
                  <textarea
                    name="donorboxMeterCode"
                    value={meterCode}
                    onChange={(e) => setMeterCode(e.target.value)}
                    rows={4}
                    spellCheck={false}
                    placeholder={`<iframe height="93px" width="100%" src="https://donorbox.org/embed/campanie?only_donation_meter=true" style="max-width:332px;min-width:250px;" seamless="seamless" name="donorbox" frameborder="0" scrolling="no"></iframe>`}
                    className="focus-ring mt-1 rounded-xl border border-slate-200 px-3.5 py-2.5 font-mono text-xs font-normal leading-relaxed text-slate-800 transition-colors"
                  />
                </label>
                <MeterCodePreview code={meterCode} />
              </div>
            </div>

            {/* Info box */}
            <div className="flex items-start gap-2.5 rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3 text-xs text-blue-700">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" />
              <span>
                Tipul widgetului (formular embedded sau popup) este determinat de embed code-ul copiat din Donorbox.
                Nu trebuie schimbat nimic în cod pentru a schimba campania sau tipul.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Conținut editorial campanie */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-bold text-starsim-navy">Conținut Editorial Campanie</h2>
        <p className="mt-0.5 text-xs text-slate-500">
          Textul afișat pe pagina /doneaza deasupra widgetului Donorbox. Lăsați gol dacă nu doriți secțiunea de campanie.
        </p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              label="Titlu campanie"
              name="campaignTitle"
              value={settings?.campaignTitle}
              placeholder="ex: Adu Universul într-o școală rurală din România"
            />
          </div>

          <div className="sm:col-span-2">
            <TextArea
              label="Descriere campanie"
              name="campaignBody"
              value={settings?.campaignBody}
              rows={6}
              placeholder="Descrierea campaniei, obiective, echipamente etc. Fiecare linie nouă devine un paragraf."
            />
          </div>

          <div>
            <Input
              label="Obiectiv campanie (opțional)"
              name="campaignGoal"
              value={settings?.campaignGoal}
              placeholder="ex: 10.000 lei"
            />
          </div>
        </div>
      </div>

      {/* 4. CÂMP SEPARAT: Datele Oficiale ale Asociației & Date Bancare */}
      <div className="rounded-2xl border-2 border-starsim-gold/40 bg-gradient-to-br from-white via-white to-amber-50/20 p-6 shadow-sm">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-starsim-gold/15 px-3 py-1 text-xs font-bold text-starsim-gold">
              Secțiune Separată
            </div>
            <h2 className="mt-2 text-lg font-bold text-starsim-navy">Datele Asociației (Transfer Bancar & Fiscale)</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Aceste informații legale și bancare sunt afișate în caseta de transfer bancar.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Input
            label="Nume Beneficiar"
            name="beneficiaryName"
            value={settings?.organizationDetails?.beneficiaryName || settings?.beneficiaryName}
            placeholder="Asociația Star Sim"
          />

          <Input
            label="Cod Fiscal (CUI / CIF)"
            name="fiscalCode"
            value={settings?.organizationDetails?.fiscalCode || settings?.fiscalCode}
            placeholder="ex: 12345678"
          />

          <Input
            label="Sediu Asociație"
            name="headquarters"
            value={settings?.organizationDetails?.headquarters || "Constanța"}
            placeholder="Constanța"
          />

          <Input
            label="Adresă oficială / Județ"
            name="address"
            value={settings?.organizationDetails?.address || "Constanța, România"}
            placeholder="Constanța, România"
          />

          <Input
            label="Nr. Înregistrare Reg. Asociații (opțional)"
            name="regNumber"
            value={settings?.organizationDetails?.regNumber || ""}
            placeholder="ex: Dosar nr. ... / Reg. Asociații"
          />

          <Input
            label="Bancă"
            name="bankName"
            value={settings?.organizationDetails?.bankName || settings?.bankName}
            placeholder="ex: Banca Transilvania"
          />

          <div className="sm:col-span-2">
            <Input
              label="Cont IBAN Principal (RON)"
              name="bankAccount"
              value={settings?.organizationDetails?.bankAccount || settings?.bankAccount}
              placeholder="RO05 RNCB 0296 1871 7895 0001"
            />
          </div>

          <div>
            <Input
              label="Cont IBAN Secundar (EUR / Valută - opțional)"
              name="secondaryIban"
              value={settings?.organizationDetails?.secondaryIban || ""}
              placeholder="RO00 BANK 0000 0000 0000 0000 (EUR)"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <Input
              label="Detalii plată recomandate"
              name="paymentReference"
              value={settings?.organizationDetails?.paymentReference || "Donație – Asociația Star Sim"}
              placeholder="Donație – Asociația Star Sim"
            />
          </div>

          <Input
            label="Email contact donații"
            name="contactEmail"
            value={settings?.organizationDetails?.email || "contact@starsim.ro"}
            placeholder="contact@starsim.ro"
          />

          <Input
            label="Telefon contact donații"
            name="contactPhone"
            value={settings?.organizationDetails?.phone || ""}
            placeholder="ex: +40 723 123 456"
          />
        </div>
      </div>

      {/* 5. Carduri Dinamice (WYSIWYG + Imagini + Sume) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <DonationCardsEditor initialCards={cards} mediaOptions={mediaOptions} />
      </div>

      {/* 6. Setări SEO */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-bold text-starsim-navy">Optimizare SEO</h2>
        <p className="mt-0.5 text-xs text-slate-500">
          Metadatele pentru motoarele de căutare (Google) și previzualizările pe rețele sociale.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input
            label="Meta Title"
            name="metaTitle"
            value={settings?.metaTitle}
            placeholder="Donează | Asociația Star Sim"
          />
          <TextArea
            label="Meta Description"
            name="metaDescription"
            value={settings?.metaDescription}
            rows={2}
            placeholder="Donează pentru educația prin astronomie a copiilor..."
          />
        </div>
      </div>

      {/* Sticky Action Footer */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-starsim-navy px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-starsim-blue disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Se salvează modificările...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Salvează modificările</span>
            </>
          )}
        </button>

        <Link
          href="/doneaza"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-starsim-navy shadow-xs transition-colors hover:bg-slate-50"
        >
          <ExternalLink className="h-4 w-4 text-slate-400" />
          <span>Vezi pagina Donează în tab nou</span>
        </Link>
      </div>
    </form>
  );
}
