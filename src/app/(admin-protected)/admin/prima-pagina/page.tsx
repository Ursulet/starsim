import { HomepageSettingsForm } from "@/components/admin/HomepageSettingsForm";
import { getHomepageSettings } from "@/lib/queries/home";
import { requireRole } from "@/server/auth/session";

export default async function AdminHomepagePage({
  searchParams
}: {
  searchParams?: Promise<{ updated?: string }>;
}) {
  const [, settings, params] = await Promise.all([requireRole(["ADMIN"]), getHomepageSettings(), searchParams]);

  return (
    <section>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <h1 className="text-3xl font-bold text-starsim-navy">Prima pagină</h1>
          <p className="mt-2 max-w-3xl text-slate-500">
            Editează hero-ul, misiunea, titlurile secțiunilor și zona de contribuții de pe homepage.
          </p>
        </div>
      </div>

      {params?.updated ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
          Prima pagină a fost salvata.
        </div>
      ) : null}

      <div className="mt-8">
        <HomepageSettingsForm settings={settings} />
      </div>
    </section>
  );
}
