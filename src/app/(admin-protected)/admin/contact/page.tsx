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

      <div className="mt-8">
        <ContactSettingsForm settings={settings} />
      </div>
    </section>
  );
}
