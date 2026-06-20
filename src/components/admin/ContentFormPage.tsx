import { notFound } from "next/navigation";
import { ContentForm } from "@/components/admin/ContentForm";
import { adminContentModules, type AdminContentType } from "@/lib/admin/content";
import { getAdminContentItem } from "@/lib/admin/content-data";

export function ContentNewPage({ type }: { type: AdminContentType }) {
  const config = adminContentModules[type];

  return (
    <section>
      <div>
        <h1 className="text-3xl font-bold text-starsim-navy">{config.newLabel}</h1>
        <p className="mt-2 max-w-3xl text-slate-500">{config.description}</p>
      </div>
      <div className="mt-8">
        <ContentForm type={type} />
      </div>
    </section>
  );
}

export async function ContentEditPage({ type, id }: { type: AdminContentType; id: string }) {
  const config = adminContentModules[type];
  const item = await getAdminContentItem(type, id);
  if (!item) notFound();

  return (
    <section>
      <div>
        <h1 className="text-3xl font-bold text-starsim-navy">Editează {config.title.toLowerCase()}</h1>
        <p className="mt-2 max-w-3xl text-slate-500">{config.description}</p>
      </div>
      <div className="mt-8">
        <ContentForm type={type} item={item} />
      </div>
    </section>
  );
}
