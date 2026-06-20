import Link from "next/link";
import { ArrowLeft, ExternalLink, Save } from "lucide-react";
import { PageDeleteButton } from "@/components/admin/PageDeleteButton";
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
            <option value="DRAFT">Ciornă</option>
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
        Descriere scurtă
        <textarea name="excerpt" defaultValue={page?.excerpt || ""} className="focus-ring min-h-24 rounded-xl border border-slate-200 px-3 py-2 font-normal" />
      </label>

      <label className="mt-5 grid gap-2 text-sm font-semibold text-starsim-navy">
        Conținut
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

      <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:flex-wrap">
        <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-starsim-navy px-5 py-3 text-sm font-bold text-white">
          <Save className="h-4 w-4" />
          {page ? "Salvează pagina" : "Creează pagina"}
        </button>
        <Link href="/admin/pagini" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-bold text-starsim-navy">
          <ArrowLeft className="h-4 w-4" />
          Înapoi
        </Link>
        {page?.status === "PUBLISHED" ? (
          <Link href={`/${page.slug}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-starsim-gold px-5 py-3 text-center text-sm font-bold text-starsim-navy">
            <ExternalLink className="h-4 w-4" />
            Vezi public
          </Link>
        ) : null}
        {page ? <PageDeleteButton id={page.id} inForm /> : null}
      </div>
    </form>
  );
}
