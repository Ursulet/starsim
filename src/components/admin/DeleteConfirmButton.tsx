"use client";
export function DeleteConfirmButton({ label = "Șterge" }: { label?: string }) {
  return <button onClick={() => confirm("Confirma stergerea?")} className="rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-700">{label}</button>;
}
