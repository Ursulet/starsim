import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { OrganizationSettingsForm } from "@/components/admin/OrganizationSettingsForm";
import { getOrganizationSettings } from "@/lib/queries/settings";
import { requireRole } from "@/server/auth/session";

export default async function AdminAboutPage({
  searchParams
}: {
  searchParams?: Promise<{ updated?: string }>;
}) {
  const [, settings, params] = await Promise.all([
    requireRole(["ADMIN"]),
    getOrganizationSettings(),
    searchParams
  ]);

  return (
    <section>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <h1 className="text-3xl font-bold text-starsim-navy">Conducere & Despre Noi</h1>
          <p className="mt-2 max-w-3xl text-slate-500">
            Editează reprezentanții legali din conducerea Asociației Star Sim (Președinte, Vicepreședinte), datele oficiale de contact, sediul și codul fiscal CUI afișate pe pagina „Despre noi”.
          </p>
        </div>

        <Link
          href="/despre"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-starsim-navy shadow-xs transition hover:bg-slate-50"
        >
          <ExternalLink className="h-4 w-4 text-slate-400" />
          <span>Vezi pagina Despre noi</span>
        </Link>
      </div>

      {params?.updated ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
          Datele conducerii și datele de contact oficiale au fost salvate cu succes.
        </div>
      ) : null}

      <div className="mt-8">
        <OrganizationSettingsForm settings={settings} />
      </div>
    </section>
  );
}
