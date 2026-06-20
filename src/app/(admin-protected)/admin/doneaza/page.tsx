import { DonationSettingsForm } from "@/components/admin/DonationSettingsForm";
import { getDonationSettings } from "@/lib/queries/settings";

export default async function Page({
  searchParams
}: {
  searchParams?: Promise<{ updated?: string }>;
}) {
  const [settings, params] = await Promise.all([getDonationSettings(), searchParams]);

  return (
    <section>
      <div>
        <h1 className="text-3xl font-bold text-starsim-navy">Donează</h1>
        <p className="mt-2 max-w-3xl text-slate-500">Editează pagina de donații, datele bancare și sumele recomandate.</p>
      </div>
      {params?.updated ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
          Datele pentru donații au fost salvate.
        </div>
      ) : null}
      <div className="mt-8">
        <DonationSettingsForm settings={settings} />
      </div>
    </section>
  );
}
