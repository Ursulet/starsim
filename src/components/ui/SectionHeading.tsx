import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("mb-9", align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl", className)}>
      {eyebrow ? <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-starsim-gold">{eyebrow}</p> : null}
      <h2 className="font-serif text-3xl font-semibold text-starsim-navy md:text-4xl">{title}</h2>
      <div className={cn("mt-3 h-1 w-12 rounded-full bg-starsim-gold", align === "center" && "mx-auto")} />
      {subtitle ? <p className="mt-4 text-base leading-7 text-starsim-muted">{subtitle}</p> : null}
    </div>
  );
}
