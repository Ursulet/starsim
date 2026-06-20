"use client";

import { useActionState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { deletePageAction, type PageActionState } from "@/lib/actions/admin-pages";

export function PageDeleteButton({
  id,
  label = "Șterge",
  inForm = false
}: {
  id: string;
  label?: string;
  inForm?: boolean;
}) {
  const [, formAction, isPending] = useActionState<PageActionState, FormData>(deletePageAction, null);

  const button = (
    <button
      disabled={isPending}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-bold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
      {...(inForm ? { formAction } : {})}
      onClick={(event) => {
        if (!window.confirm("Confirmi ștergerea acestei pagini?")) event.preventDefault();
      }}
    >
      {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      {isPending ? "Se șterge..." : label}
    </button>
  );

  if (inForm) return button;

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      {button}
    </form>
  );
}
