import { notFound } from "next/navigation";
import { PageForm } from "@/components/admin/PageForm";
import { prisma } from "@/lib/prisma";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) notFound();

  return (
    <section>
      <h1 className="text-3xl font-bold text-starsim-navy">Editează pagina</h1>
      <p className="mt-2 text-slate-500">Modificările apar public după salvare dacă pagina este publicată.</p>
      <div className="mt-8">
        <PageForm page={page} />
      </div>
    </section>
  );
}
