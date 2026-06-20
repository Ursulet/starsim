"use client";

import { Trash2 } from "lucide-react";
import { deletePageAction } from "@/lib/actions/admin-pages";

export function PageDeleteButton({ id, label = "Șterge", inForm = false }: { id: string; label?: string; inForm?: boolean }) {
  const button = (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-bold text-red-700 hover:bg-red-50"
      {...(inForm ? { formAction: deletePageAction } : {})}
      onClick={(event) => {
        if (!window.confirm("Confirmi ștergerea acestei pagini?")) event.preventDefault();
      }}
    >
      <Trash2 className="h-4 w-4" />
      {label}
    </button>
  );

  if (inForm) return button;

  return (
    <form action={deletePageAction}>
      <input type="hidden" name="id" value={id} />
      {button}
    </form>
  );
}
