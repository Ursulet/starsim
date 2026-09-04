import { DonationSettingsForm } from "@/components/admin/DonationSettingsForm";
import { getDonationSettings } from "@/lib/queries/settings";
import { getAdminMediaOptions } from "@/lib/admin/content-data";
import { requireRole } from "@/server/auth/session";

export default async function Page({
  searchParams
}: {
  searchParams?: Promise<{ updated?: string }>;
}) {
  const [, settings, mediaOptions, params] = await Promise.all([
    requireRole(["ADMIN"]),
    getDonationSettings(),
    getAdminMediaOptions(),
    searchParams
  ]);

  return (
    <section>
      <div>
        <h1 className="text-3xl font-bold text-starsim-navy">Donează</h1>
        <p className="mt-2 max-w-3xl text-slate-500">
          Editează conținutul paginii de donații, cauzele recomandate, pozele și datele bancare.
        </p>
      </div>
      {params?.updated ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
          Datele pentru donații și cardurile au fost salvate cu succes.
        </div>
      ) : null}
      <div className="mt-8">
        <DonationSettingsForm settings={settings} mediaOptions={mediaOptions} />
      </div>
    </section>
  );
}
