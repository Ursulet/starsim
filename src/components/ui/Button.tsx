import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex items-center justify-center rounded-xl bg-starsim-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-starsim-blue disabled:opacity-60",
        className
      )}
      {...props}
    />
  );
}
