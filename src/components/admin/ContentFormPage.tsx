import { notFound } from "next/navigation";
import { ContentForm } from "@/components/admin/ContentForm";
import { adminContentModules, type AdminContentType } from "@/lib/admin/content";
import { getAdminContentItem, getAdminMediaOptions } from "@/lib/admin/content-data";

export async function ContentNewPage({ type }: { type: AdminContentType }) {
  const config = adminContentModules[type];
  const needsMedia = config.fields.some((field) => field.type === "media");
  const mediaOptions = needsMedia ? await getAdminMediaOptions() : [];

  return (
    <section>
      <div>
        <h1 className="text-3xl font-bold text-starsim-navy">{config.newLabel}</h1>
        <p className="mt-2 max-w-3xl text-slate-500">{config.description}</p>
      </div>
      <div className="mt-8">
        <ContentForm type={type} mediaOptions={mediaOptions} />
      </div>
    </section>
  );
}

export async function ContentEditPage({ type, id }: { type: AdminContentType; id: string }) {
  const config = adminContentModules[type];
  const item = await getAdminContentItem(type, id);
  if (!item) notFound();

  const needsMedia = config.fields.some((field) => field.type === "media");
  const mediaOptions = needsMedia ? await getAdminMediaOptions() : [];

  return (
    <section>
      <div>
        <h1 className="text-3xl font-bold text-starsim-navy">Editează {config.title.toLowerCase()}</h1>
        <p className="mt-2 max-w-3xl text-slate-500">{config.description}</p>
      </div>
      <div className="mt-8">
        <ContentForm type={type} item={item} mediaOptions={mediaOptions} />
      </div>
    </section>
  );
}
