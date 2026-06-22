import { SmtpSettingsForm } from "@/components/admin/SmtpSettingsForm";
import { getSmtpConfig } from "@/lib/mail";
import { requireRole } from "@/server/auth/session";

export default async function AdminSmtpPage() {
  // Required role validation
  await requireRole(["ADMIN"]);

  // Fetch saved config (or fallback config)
  const config = await getSmtpConfig();

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-starsim-navy">Setări SMTP</h1>
        <p className="mt-2 max-w-3xl text-slate-500">
          Configurează serverul SMTP pentru expedierea automată a emailurilor de contact, newsletter sau înscrieri.
        </p>
      </div>

      <SmtpSettingsForm smtp={config} />
    </section>
  );
}
