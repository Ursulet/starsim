export function StatusSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className="focus-ring rounded-xl border border-slate-200 px-3 py-2"><option value="DRAFT">Ciornă</option><option value="PUBLISHED">Publicat</option><option value="ARCHIVED">Arhivat</option></select>;
}
