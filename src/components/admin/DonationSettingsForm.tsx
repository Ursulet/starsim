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

      {/* 2. CÂMP SEPARAT: Datele Oficiale ale Asociației & Date Bancare */}
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
              placeholder="RO00 BANK 0000 0000 0000 0000"
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
