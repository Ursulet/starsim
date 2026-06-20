"use client";
export function ImagePicker({ value, onChange, label = "Imagine" }: { value?: string | null; onChange: (id: string | null) => void; label?: string }) {
  return <div className="rounded-2xl border border-slate-200 p-4"><p className="font-semibold">{label}</p><p className="mt-1 text-sm text-slate-500">{value || "Nicio imagine selectată"}</p><button type="button" onClick={() => onChange(null)} className="mt-3 rounded-xl border px-3 py-2 text-sm">Curăță</button></div>;
}
