import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn("focus-ring w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm", className)}
      {...props}
    />
  );
}
