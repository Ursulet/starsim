import { PageForm } from "@/components/admin/PageForm";
import { requireRole } from "@/server/auth/session";

export default async function NewPage() {
  await requireRole(["ADMIN", "EDITOR"]);

  return (
    <section>
      <h1 className="text-3xl font-bold text-starsim-navy">Pagină nouă</h1>
      <p className="mt-2 text-slate-500">Creează o pagină statică sau legală.</p>
      <div className="mt-8">
        <PageForm />
      </div>
    </section>
  );
}
