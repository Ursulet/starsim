import Link from "next/link";

export function ModulePlaceholder({ title, description, primaryActionLabel, primaryActionHref, items = [] }: { title: string; description: string; primaryActionLabel: string; primaryActionHref: string; items?: readonly string[] }) {
  return (
    <section>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div><h1 className="text-3xl font-bold text-starsim-navy">{title}</h1><p className="mt-2 max-w-3xl text-slate-500">{description}</p></div>
        <Link href={primaryActionHref} className="rounded-xl bg-starsim-navy px-4 py-3 text-sm font-bold text-white">{primaryActionLabel}</Link>
      </div>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-starsim-navy">Acest modul gestionează</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {items.map((item) => <li key={item} className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">{item}</li>)}
        </ul>
      </div>
    </section>
  );
}
