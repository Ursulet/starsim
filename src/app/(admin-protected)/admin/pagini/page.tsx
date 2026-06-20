import Link from "next/link";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { prisma } from "@/lib/prisma";

async function getPages() {
  try {
    return await prisma.page.findMany({
      orderBy: [{ updatedAt: "desc" }],
      select: {
        id: true,
        title: true,
        slug: true,
        key: true,
        status: true,
        updatedAt: true
      }
    });
  } catch {
    return [];
  }
}

export default async function AdminPagesPage() {
  const pages = await getPages();

  return (
    <section>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <h1 className="text-3xl font-bold text-starsim-navy">Pagini</h1>
          <p className="mt-2 max-w-3xl text-slate-500">
            Editează paginile statice și legale: politica de confidențialitate, cookies, termeni și condiții.
          </p>
        </div>
        <Link href="/admin/pagini/new" className="rounded-xl bg-starsim-navy px-4 py-3 text-sm font-bold text-white">
          Adaugă pagina
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {pages.length ? (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Titlu</th>
                <th className="px-4 py-3">Cheie</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actualizat</th>
                <th className="px-4 py-3">Acțiuni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pages.map((page) => (
                <tr key={page.id}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-starsim-navy">{page.title}</p>
                    <p className="text-xs text-slate-500">/{page.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{page.key}</td>
                  <td className="px-4 py-3"><StatusBadge status={page.status} /></td>
                  <td className="px-4 py-3 text-slate-500">{new Intl.DateTimeFormat("ro-RO", { dateStyle: "medium" }).format(page.updatedAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link href={`/admin/pagini/${page.id}/edit`} className="font-semibold text-starsim-navy hover:text-starsim-gold">Editează</Link>
                      {page.status === "PUBLISHED" ? <Link href={`/${page.slug}`} className="font-semibold text-starsim-gold hover:text-starsim-navy">Vezi</Link> : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center">
            <h2 className="font-semibold text-starsim-navy">Nu există pagini încă</h2>
            <p className="mt-2 text-sm text-slate-500">Rulează seed-ul sau creează prima pagină.</p>
          </div>
        )}
      </div>
    </section>
  );
}
