export function AdminTabs({ items }: { items: string[] }) {
  return <div className="flex gap-2 border-b border-slate-200">{items.map((item) => <button key={item} className="px-4 py-3 text-sm font-semibold text-slate-600">{item}</button>)}</div>;
}
