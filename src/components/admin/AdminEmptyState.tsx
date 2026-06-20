export function AdminEmptyState({ title, description }: { title: string; description?: string }) {
  return <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center"><h2 className="font-semibold text-starsim-navy">{title}</h2>{description ? <p className="mt-2 text-sm text-slate-500">{description}</p> : null}</div>;
}
