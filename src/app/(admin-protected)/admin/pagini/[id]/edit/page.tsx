import { notFound } from "next/navigation";
import { PageForm } from "@/components/admin/PageForm";
import { prisma } from "@/lib/prisma";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) notFound();

  return (
    <section>
      <h1 className="text-3xl font-bold text-starsim-navy">Editeaza pagina</h1>
      <p className="mt-2 text-slate-500">Modificarile apar public dupa salvare daca pagina este publicata.</p>
      <div className="mt-8">
        <PageForm page={page} />
      </div>
    </section>
  );
}
