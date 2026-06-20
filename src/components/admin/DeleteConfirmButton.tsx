"use client";

import { Trash2 } from "lucide-react";
import { deleteAdminContentAction } from "@/lib/actions/admin-content";
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
  const button = (
    <button
      className={cn("inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-bold text-red-700 hover:bg-red-50 sm:w-auto")}
      {...(inForm ? { formAction: deleteAdminContentAction } : {})}
      onClick={(event) => {
        if (!window.confirm("Confirmi ștergerea acestui element?")) event.preventDefault();
      }}
    >
      <Trash2 className="h-4 w-4" />
      {label}
    </button>
  );

  if (inForm) return <div className={className}>{button}</div>;

  return (
    <form action={deleteAdminContentAction} className={className}>
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="id" value={id} />
      {button}
    </form>
  );
}
