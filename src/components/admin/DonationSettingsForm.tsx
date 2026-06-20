import Link from "next/link";
import { updateDonationSettingsAction } from "@/lib/actions/admin-donation-settings";

type DonationSettingsFormProps = {
  settings: any;
};

function Input({ label, name, value }: { label: string; name: string; value?: string | number | null }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-starsim-navy">
      {label}
      <input name={name} defaultValue={value || ""} className="focus-ring rounded-xl border border-slate-200 px-3 py-2 font-normal text-slate-800" />
    </label>
  );
}

function TextArea({ label, name, value, rows = 3 }: { label: string; name: string; value?: string | null; rows?: number }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-starsim-navy">
      {label}
      <textarea name={name} defaultValue={value || ""} rows={rows} className="focus-ring rounded-xl border border-slate-200 px-3 py-2 font-normal leading-6 text-slate-800" />
    </label>
  );
}

export function DonationSettingsForm({ settings }: DonationSettingsFormProps) {
  const amounts = Array.isArray(settings?.recommendedAmounts) ? settings.recommendedAmounts : [];

  return (
    <form action={updateDonationSettingsAction} className="max-w-[1100px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-5 md:grid-cols-2">
        <Input label="Titlu pagina" name="title" value={settings?.title} />
        <Input label="Beneficiar" name="beneficiaryName" value={settings?.beneficiaryName} />
        <TextArea label="Descriere" name="description" value={settings?.description} rows={4} />
        <div className="grid gap-5">
          <Input label="IBAN" name="bankAccount" value={settings?.bankAccount} />
          <Input label="Banca" name="bankName" value={settings?.bankName} />
          <Input label="CUI" name="fiscalCode" value={settings?.fiscalCode} />
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 p-5">
        <h2 className="font-semibold text-starsim-navy">Sume recomandate</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((index) => {
            const amount = amounts[index] || {};
            return (
              <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4">
                <Input label="Suma" name={`amounts.${index}.amount`} value={amount.amount} />
                <div className="mt-4">
                  <Input label="Eticheta" name={`amounts.${index}.label`} value={amount.label} />
                </div>
                <div className="mt-4">
                  <TextArea label="Impact" name={`amounts.${index}.impact`} value={amount.impact} rows={4} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 p-5">
        <h2 className="font-semibold text-starsim-navy">SEO</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          <Input label="Meta title" name="metaTitle" value={settings?.metaTitle} />
          <TextArea label="Meta description" name="metaDescription" value={settings?.metaDescription} />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button className="focus-ring rounded-xl bg-starsim-navy px-5 py-3 text-sm font-bold text-white">Salveaza donatiile</button>
        <Link href="/doneaza" className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-bold text-starsim-navy">
          Vezi pagina Doneaza
        </Link>
      </div>
    </form>
  );
}
