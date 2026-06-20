import Link from "next/link";

export function AdminHeader({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-5 lg:px-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Star Sim CMS</p>
        <h1 className="text-xl font-bold text-starsim-navy">{title || "Dashboard"}</h1>
      </div>
      <Link href="/" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-starsim-navy">Vezi site</Link>
    </header>
  );
}
