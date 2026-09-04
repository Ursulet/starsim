import Link from "next/link";
import { ContactSettingsForm } from "@/components/admin/ContactSettingsForm";
import { getContactSettings } from "@/lib/queries/settings";
import { requireRole } from "@/server/auth/session";

export default async function AdminContactPage({
  searchParams
}: {
  searchParams?: Promise<{ updated?: string }>;
}) {
  const [, settings, params] = await Promise.all([requireRole(["ADMIN"]), getContactSettings(), searchParams]);

  return (
    <section>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <h1 className="text-3xl font-bold text-starsim-navy">Contact și footer</h1>
          <p className="mt-2 max-w-3xl text-slate-500">
            Editează datele publice afișate în footer, pe pagina de contact și în butonul WhatsApp.
          </p>
        </div>
        <Link href="/admin/contact/messages" className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-starsim-navy">
          Vezi mesajele
        </Link>
      </div>

      {params?.updated ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
          Datele au fost salvate.
        </div>
      ) : null}

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-starsim-navy flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <span className="font-bold">Conducerea Asociației & Date Oficiale:</span> Președinte (Gîrdeanu Ștefan), Vicepreședinte (Claudiu Simion), 2 telefoane, Sediu Constanța și CUI se configurează în secțiunea dedicată.
        </div>
        <Link
          href="/admin/despre"
          className="whitespace-nowrap rounded-xl bg-starsim-navy px-4 py-2 text-xs font-bold text-white transition hover:bg-starsim-blue"
        >
          Editează Conducerea →
        </Link>
      </div>

      <div className="mt-8">
        <ContactSettingsForm settings={settings} />
      </div>
    </section>
  );
}
