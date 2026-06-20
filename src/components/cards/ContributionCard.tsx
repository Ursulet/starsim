import Link from "next/link";
import { LucideIcon } from "lucide-react";

export function ContributionCard({ title, text, href, action, icon: Icon }: { title: string; text: string; href: string; action: string; icon: LucideIcon }) {
  return (
    <article className="rounded-2xl bg-white p-6 text-starsim-navy shadow-soft">
      <div className="flex gap-5">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-starsim-navy text-starsim-gold">
          <Icon className="h-8 w-8" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-starsim-muted">{text}</p>
          <Link href={href} className="mt-4 inline-flex text-sm font-bold hover:text-starsim-gold">{action} →</Link>
        </div>
      </div>
    </article>
  );
}
