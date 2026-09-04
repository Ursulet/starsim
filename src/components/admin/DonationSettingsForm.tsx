"use client";

import Link from "next/link";
import { useActionState } from "react";
import { AlertCircle, ExternalLink, Loader2, Save } from "lucide-react";
import { updateDonationSettingsAction, type DonationActionState } from "@/lib/actions/admin-donation-settings";
import { DonationCardsEditor } from "./DonationCardsEditor";
import type { AdminMediaOption } from "@/lib/admin/content-data";

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

export function DonationSettingsForm({ settings, mediaOptions = [] }: DonationSettingsFormProps) {
  const [state, formAction, isPending] = useActionState<DonationActionState, FormData>(
    updateDonationSettingsAction,
    null
  );

  const cards = Array.isArray(settings?.recommendedAmounts) ? settings.recommendedAmounts : [];

  return (
    <form action={formAction} encType="multipart/form-data" className="max-w-[1100px] space-y-8">
      {state?.error ? (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <span>{state.error}</span>
        </div>
      ) : null}

      {/* 1. Date Generale & Transfer Bancar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-bold text-starsim-navy">Informații Pagina & Date Bancare</h2>
        <p className="mt-0.5 text-xs text-slate-500">
          Aceste date sunt afișate în antetul paginii și în caseta de transfer bancar oficial.
        </p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Input
            label="Titlu pagină (Hero)"
            name="title"
            value={settings?.title}
            placeholder="Susține educația prin astronomie"
          />
          <Input
            label="Nume Beneficiar Oficial"
            name="beneficiaryName"
            value={settings?.beneficiaryName}
            placeholder="Asociația Star Sim"
          />
          <div className="sm:col-span-2">
            <TextArea
              label="Descriere scurtă / Introducere"
              name="description"
              value={settings?.description}
              rows={3}
              placeholder="Fiecare contribuție ajută la organizarea atelierelor și evenimentelor astronomice..."
            />
          </div>
        </div>

        <div className="mt-5 border-t border-slate-100 pt-5">
          <p className="text-xs font-bold text-starsim-navy mb-3">Cont Bancar & Fiscalitate</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <Input
                label="IBAN (Cont bancar)"
                name="bankAccount"
                value={settings?.bankAccount}
                placeholder="RO00 BANK 0000 0000 0000 0000"
              />
            </div>
            <div>
              <Input
                label="Bancă"
                name="bankName"
                value={settings?.bankName}
                placeholder="ex: Banca Transilvania"
              />
            </div>
            <div>
              <Input
                label="Cod Fiscal (CUI / CIF)"
                name="fiscalCode"
                value={settings?.fiscalCode}
                placeholder="ex: 12345678"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Carduri Dinamice (WYSIWYG + Imagini + Sume) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <DonationCardsEditor initialCards={cards} mediaOptions={mediaOptions} />
      </div>

      {/* 3. Setări SEO */}
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
