"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { publicNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function PublicHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-starsim-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between px-5 lg:h-[88px] lg:px-8">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo-starsim.png" alt="Star Sim" width={225} height={86} className="h-14 w-auto" priority />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {publicNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-sm font-semibold text-starsim-navy transition hover:text-starsim-gold",
                (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))) &&
                  "after:absolute after:-bottom-2 after:left-1/2 after:h-1 after:w-6 after:-translate-x-1/2 after:rounded-full after:bg-starsim-gold"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/doneaza"
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-starsim-navy px-4 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-starsim-blue"
          >
            <Heart className="h-4 w-4 text-starsim-gold" />
            <span className="hidden sm:inline">Doneaza</span>
          </Link>
          <button className="focus-ring rounded-xl border border-starsim-border p-3 lg:hidden" onClick={() => setOpen(true)} aria-label="Deschide meniul">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      {open ? (
        <div className="fixed inset-0 z-50 bg-starsim-navy/40 lg:hidden" onClick={() => setOpen(false)}>
          <div className="ml-auto min-h-screen w-[84%] max-w-sm bg-white p-6 shadow-premium" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between">
              <Image src="/images/logo-starsim.png" alt="Star Sim" width={170} height={64} className="h-12 w-auto" />
              <button className="focus-ring rounded-xl border border-starsim-border p-2" onClick={() => setOpen(false)} aria-label="Inchide meniul">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-8 grid gap-2">
              {publicNavigation.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-semibold text-starsim-navy hover:bg-starsim-ivory">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
