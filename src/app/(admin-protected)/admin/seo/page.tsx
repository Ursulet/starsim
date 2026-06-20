import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getSeoIssues() {
  try {
    const [programs, events, articles, pages] = await Promise.all([
      prisma.program.findMany({ where: { OR: [{ metaTitle: null }, { metaDescription: null }] }, select: { id: true, title: true, slug: true, metaTitle: true, metaDescription: true } }),
      prisma.event.findMany({ where: { OR: [{ metaTitle: null }, { metaDescription: null }] }, select: { id: true, title: true, slug: true, metaTitle: true, metaDescription: true } }),
      prisma.article.findMany({ where: { OR: [{ metaTitle: null }, { metaDescription: null }] }, select: { id: true, title: true, slug: true, metaTitle: true, metaDescription: true } }),
      prisma.page.findMany({ where: { OR: [{ metaTitle: null }, { metaDescription: null }] }, select: { id: true, title: true, slug: true, metaTitle: true, metaDescription: true } })
    ]);

    return [
      ...programs.map((item) => ({ ...item, type: "Program", editHref: `/admin/programe/${item.id}/edit` })),
      ...events.map((item) => ({ ...item, type: "Eveniment", editHref: `/admin/evenimente/${item.id}/edit` })),
      ...articles.map((item) => ({ ...item, type: "Articol", editHref: `/admin/articole/${item.id}/edit` })),
      ...pages.map((item) => ({ ...item, type: "Pagina", editHref: `/admin/pagini/${item.id}/edit` }))
    ];
  } catch {
    return [];
  }
}

export default async function Page() {
  const issues = await getSeoIssues();

  return (
    <section>
      <div>
        <h1 className="text-3xl font-bold text-starsim-navy">SEO Center</h1>
        <p className="mt-2 max-w-3xl text-slate-500">Raport rapid pentru pagini și conținut cu meta title sau meta description lipsă.</p>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {issues.length ? (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Element</th>
                <th className="px-4 py-3">Tip</th>
                <th className="px-4 py-3">Lipseste</th>
                <th className="px-4 py-3">Acțiuni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {issues.map((item) => (
                <tr key={`${item.type}-${item.id}`}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-starsim-navy">{item.title}</p>
                    <p className="text-xs text-slate-500">/{item.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{item.type}</td>
                  <td className="px-4 py-3 text-slate-500">
                    {[!item.metaTitle ? "meta title" : null, !item.metaDescription ? "meta description" : null].filter(Boolean).join(", ")}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={item.editHref} className="font-semibold text-starsim-navy hover:text-starsim-gold">Editează</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center">
            <h2 className="font-semibold text-starsim-navy">Nu există probleme SEO evidente</h2>
            <p className="mt-2 text-sm text-slate-500">Elementele verificate au meta title și meta description completate.</p>
          </div>
        )}
      </div>
    </section>
  );
}
