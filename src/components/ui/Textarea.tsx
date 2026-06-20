import { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn("focus-ring min-h-32 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm", className)}
      {...props}
    />
  );
}
