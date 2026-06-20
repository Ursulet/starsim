import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { DeleteConfirmButton } from "@/components/admin/DeleteConfirmButton";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminContentModules, type AdminContentType } from "@/lib/admin/content";
import { getAdminContentList } from "@/lib/admin/content-data";

function formatBytes(size?: number | null) {
  if (!size) return null;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function Thumb({ src, title }: { src?: string | null; title: string }) {
  if (!src) return <div className="h-14 w-20 rounded-xl border border-dashed border-slate-200 bg-slate-50" />;

  return <Image src={src} alt={title} width={80} height={56} unoptimized className="h-14 w-20 rounded-xl border border-slate-200 object-cover" />;
}

export async function ContentListPage({ type }: { type: AdminContentType }) {
  const config = adminContentModules[type];
  const items = await getAdminContentList(type);
  const showHomepage = type !== "media" && type !== "utilizatori";

  return (
    <section>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <h1 className="text-3xl font-bold text-starsim-navy">{config.title}</h1>
          <p className="mt-2 max-w-3xl text-slate-500">{config.description}</p>
        </div>
        <Link href={`${config.basePath}/new`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-starsim-navy px-4 py-3 text-sm font-bold text-white">
          <Plus className="h-4 w-4" />
          {config.newLabel}
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        {items.length ? (
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Element</th>
                <th className="px-4 py-3">Status</th>
                {showHomepage ? <th className="px-4 py-3">Homepage</th> : null}
                <th className="px-4 py-3">Actualizat</th>
                <th className="px-4 py-3">Acțiuni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Thumb src={item.thumbnailUrl} title={item.title} />
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-starsim-navy">{item.title}</p>
                        {item.slug ? (
                          <p className="text-xs text-slate-500">/{item.slug}</p>
                        ) : item.subtitle ? (
                          <p className="line-clamp-1 text-xs text-slate-500">{item.subtitle}</p>
                        ) : null}
                        {type === "media" ? (
                          <p className="mt-1 text-xs text-slate-400">
                            {[item.mimeType, formatBytes(item.size)].filter(Boolean).join(" / ")}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{item.status ? <StatusBadge status={item.status} /> : "-"}</td>
                  {showHomepage ? <td className="px-4 py-3 text-slate-500">{item.featuredOnHome ? "Da" : "-"}</td> : null}
                  <td className="px-4 py-3 text-slate-500">
                    {item.updatedAt ? new Intl.DateTimeFormat("ro-RO", { dateStyle: "medium" }).format(item.updatedAt) : "-"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <Link href={`${config.basePath}/${item.id}/edit`} className="font-semibold text-starsim-navy hover:text-starsim-gold">
                        Editează
                      </Link>
                      {config.publicBasePath && item.slug ? (
                        <Link href={`${config.publicBasePath}/${item.slug}`} className="font-semibold text-starsim-gold hover:text-starsim-navy">
                          Vezi
                        </Link>
                      ) : null}
                      <DeleteConfirmButton type={type} id={item.id} label="Șterge" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center">
            <h2 className="font-semibold text-starsim-navy">Nu există elemente încă</h2>
            <p className="mt-2 text-sm text-slate-500">Creează primul element pentru acest modul.</p>
            <Link href={`${config.basePath}/new`} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-starsim-navy px-4 py-3 text-sm font-bold text-white">
              <Plus className="h-4 w-4" />
              {config.newLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
