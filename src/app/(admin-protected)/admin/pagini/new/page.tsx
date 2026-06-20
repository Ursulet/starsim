import { PageForm } from "@/components/admin/PageForm";

export default function NewPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold text-starsim-navy">Pagina noua</h1>
      <p className="mt-2 text-slate-500">Creeaza o pagina statica sau legala.</p>
      <div className="mt-8">
        <PageForm />
      </div>
    </section>
  );
}
