export function SeoPreview({ title = "Star Sim", description = "Previzualizare SEO" }: { title?: string; description?: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-sm text-blue-700">{title}</p><p className="mt-1 text-sm text-slate-600">{description}</p></div>;
}
