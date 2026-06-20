import Link from "next/link";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminContentModules, type AdminContentType } from "@/lib/admin/content";
import { getAdminContentList } from "@/lib/admin/content-data";

export async function ContentListPage({ type }: { type: AdminContentType }) {
  const config = adminContentModules[type];
  const items = await getAdminContentList(type);

  return (
    <section>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <h1 className="text-3xl font-bold text-starsim-navy">{config.title}</h1>
          <p className="mt-2 max-w-3xl text-slate-500">{config.description}</p>
        </div>
        <Link href={`${config.basePath}/new`} className="rounded-xl bg-starsim-navy px-4 py-3 text-sm font-bold text-white">
          {config.newLabel}
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {items.length ? (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Titlu</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Homepage</th>
                <th className="px-4 py-3">Actualizat</th>
                <th className="px-4 py-3">Actiuni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-starsim-navy">{item.title}</p>
                    {item.slug ? <p className="text-xs text-slate-500">/{item.slug}</p> : item.subtitle ? <p className="line-clamp-1 text-xs text-slate-500">{item.subtitle}</p> : null}
                  </td>
                  <td className="px-4 py-3">{item.status ? <StatusBadge status={item.status} /> : "-"}</td>
                  <td className="px-4 py-3 text-slate-500">{item.featuredOnHome ? "Da" : "-"}</td>
                  <td className="px-4 py-3 text-slate-500">
                    {item.updatedAt ? new Intl.DateTimeFormat("ro-RO", { dateStyle: "medium" }).format(item.updatedAt) : "-"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link href={`${config.basePath}/${item.id}/edit`} className="font-semibold text-starsim-navy hover:text-starsim-gold">
                        Editeaza
                      </Link>
                      {config.publicBasePath && item.slug ? (
                        <Link href={`${config.publicBasePath}/${item.slug}`} className="font-semibold text-starsim-gold hover:text-starsim-navy">
                          Vezi
                        </Link>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center">
            <h2 className="font-semibold text-starsim-navy">Nu exista elemente inca</h2>
            <p className="mt-2 text-sm text-slate-500">Creeaza primul element pentru acest modul.</p>
            <Link href={`${config.basePath}/new`} className="mt-5 inline-flex rounded-xl bg-starsim-navy px-4 py-3 text-sm font-bold text-white">
              {config.newLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
