import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "primary" | "gold" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export function PublicButton({ variant = "primary", size = "md", href, className, children, ...props }: Props) {
  const classes = cn(
    "focus-ring inline-flex items-center justify-center gap-2 rounded-full font-semibold transition",
    size === "sm" && "px-4 py-2 text-sm",
    size === "md" && "px-5 py-3 text-sm",
    size === "lg" && "px-6 py-3.5 text-base",
    variant === "primary" && "bg-starsim-navy text-white shadow-soft hover:bg-starsim-blue",
    variant === "gold" && "bg-starsim-gold text-starsim-navy hover:bg-starsim-softGold",
    variant === "outline" && "border border-starsim-gold bg-white/85 text-starsim-navy hover:bg-starsim-ivory",
    variant === "ghost" && "px-0 text-starsim-gold hover:text-starsim-navy",
    className
  );
  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
