export function AdminTable({ children }: { children: React.ReactNode }) {
  return <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><table className="w-full text-left text-sm">{children}</table></div>;
}
