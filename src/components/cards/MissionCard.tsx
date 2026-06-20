import { LucideIcon } from "lucide-react";

export function MissionCard({ title, text, icon: Icon }: { title: string; text: string; icon: LucideIcon }) {
  return (
    <article className="premium-card flex gap-5 p-7">
      <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-starsim-navy text-starsim-gold">
        <Icon className="h-8 w-8" />
      </div>
      <div>
        <h3 className="font-serif text-xl font-semibold text-starsim-navy">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-starsim-muted">{text}</p>
      </div>
    </article>
  );
}
