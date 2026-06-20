"use client";

import { useActionState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { deleteAdminContentAction, type ActionState } from "@/lib/actions/admin-content";
import type { AdminContentType } from "@/lib/admin/content";
import { cn } from "@/lib/utils";

export function DeleteConfirmButton({
  type,
  id,
  label = "Șterge",
  className,
  inForm = false
}: {
  type: AdminContentType;
  id: string;
  label?: string;
  className?: string;
  inForm?: boolean;
}) {
  const [, formAction, isPending] = useActionState<ActionState, FormData>(deleteAdminContentAction, null);

  const button = (
    <button
      disabled={isPending}
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-bold text-red-700 hover:bg-red-50 sm:w-auto",
        "disabled:cursor-not-allowed disabled:opacity-60"
      )}
      {...(inForm ? { formAction } : {})}
      onClick={(event) => {
        if (!window.confirm("Confirmi ștergerea acestui element?")) event.preventDefault();
      }}
    >
      {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      {isPending ? "Se șterge..." : label}
    </button>
  );

  if (inForm) return <div className={className}>{button}</div>;

  return (
    <form action={formAction} className={className}>
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="id" value={id} />
      {button}
    </form>
  );
}
