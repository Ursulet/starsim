import Link from "next/link";
import { createPageAction, updatePageAction } from "@/lib/actions/admin-pages";
import { extractPlainTextFromTiptapJson } from "@/lib/rich-text/extract-text";

type PageFormProps = {
  page?: {
    id: string;
    key: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: unknown;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    metaTitle: string | null;
    metaDescription: string | null;
  };
};

export function PageForm({ page }: PageFormProps) {
  const action = page ? updatePageAction : createPageAction;
  const body = page?.content ? extractPlainTextFromTiptapJson(page.content).replace(/\. /g, ".\n\n") : "";

  return (
    <form action={action} className="max-w-[1000px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {page ? <input type="hidden" name="id" value={page.id} /> : null}

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-starsim-navy">
          Cheie CMS
          <input name="key" defaultValue={page?.key || ""} required className="focus-ring rounded-xl border border-slate-200 px-3 py-2 font-normal" placeholder="privacy_policy" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-starsim-navy">
          Status
          <select name="status" defaultValue={page?.status || "DRAFT"} className="focus-ring rounded-xl border border-slate-200 px-3 py-2 font-normal">
            <option value="DRAFT">Ciorna</option>
            <option value="PUBLISHED">Publicat</option>
            <option value="ARCHIVED">Arhivat</option>
          </select>
        </label>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-starsim-navy">
          Titlu
          <input name="title" defaultValue={page?.title || ""} required className="focus-ring rounded-xl border border-slate-200 px-3 py-2 font-normal" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-starsim-navy">
          Slug
          <input name="slug" defaultValue={page?.slug || ""} className="focus-ring rounded-xl border border-slate-200 px-3 py-2 font-normal" />
        </label>
      </div>

      <label className="mt-5 grid gap-2 text-sm font-semibold text-starsim-navy">
        Descriere scurta
        <textarea name="excerpt" defaultValue={page?.excerpt || ""} className="focus-ring min-h-24 rounded-xl border border-slate-200 px-3 py-2 font-normal" />
      </label>

      <label className="mt-5 grid gap-2 text-sm font-semibold text-starsim-navy">
        Continut
        <textarea name="body" defaultValue={body} className="focus-ring min-h-72 rounded-xl border border-slate-200 px-3 py-2 font-normal leading-7" />
      </label>

      <div className="mt-6 rounded-2xl bg-slate-50 p-5">
        <h2 className="font-semibold text-starsim-navy">SEO</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-starsim-navy">
            Meta title
            <input name="metaTitle" defaultValue={page?.metaTitle || ""} className="focus-ring rounded-xl border border-slate-200 px-3 py-2 font-normal" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-starsim-navy">
            Meta description
            <textarea name="metaDescription" defaultValue={page?.metaDescription || ""} className="focus-ring min-h-24 rounded-xl border border-slate-200 px-3 py-2 font-normal" />
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button className="focus-ring rounded-xl bg-starsim-navy px-5 py-3 text-sm font-bold text-white">{page ? "Salveaza pagina" : "Creeaza pagina"}</button>
        <Link href="/admin/pagini" className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-bold text-starsim-navy">Inapoi</Link>
        {page?.status === "PUBLISHED" ? <Link href={`/${page.slug}`} className="rounded-xl border border-starsim-gold px-5 py-3 text-center text-sm font-bold text-starsim-navy">Vezi public</Link> : null}
      </div>
    </form>
  );
}
