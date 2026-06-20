"use client";

import Link from "next/link";
import { ExternalLink, Menu } from "lucide-react";

export function AdminHeader({
  title,
  onMenuClick,
  mobileMenuOpen = false
}: {
  title?: string;
  onMenuClick?: () => void;
  mobileMenuOpen?: boolean;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Deschide meniul de administrare"
          aria-expanded={mobileMenuOpen}
          onClick={onMenuClick}
          className="focus-ring grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-starsim-navy shadow-sm lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <p className="truncate text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Star Sim CMS</p>
          <h1 className="truncate text-lg font-bold text-starsim-navy sm:text-xl">{title || "Dashboard"}</h1>
        </div>
      </div>
      <Link
        href="/"
        aria-label="Vezi site"
        className="focus-ring inline-flex h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-starsim-navy shadow-sm sm:w-auto sm:px-4"
      >
        <ExternalLink className="h-4 w-4" />
        <span className="hidden sm:inline">Vezi site</span>
      </Link>
    </header>
  );
}
