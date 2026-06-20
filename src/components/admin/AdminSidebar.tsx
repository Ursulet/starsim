"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Session } from "next-auth";
import * as Icons from "lucide-react";
import { adminNavigation } from "@/lib/admin/navigation";
import { cn } from "@/lib/utils";
import { LogoutButton } from "./LogoutButton";

type AdminUser = Session["user"];

export function AdminSidebar({
  user,
  className,
  onClose,
  onNavigate
}: {
  user: AdminUser;
  className?: string;
  onClose?: () => void;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const items = adminNavigation.filter((item) => !("adminOnly" in item) || !item.adminOnly || user.role === "ADMIN");
  const activeHref = items
    .filter((item) => pathname === item.href || (item.href !== "/admin" && pathname.startsWith(`${item.href}/`)))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;

  return (
    <aside className={cn("flex h-full min-h-0 w-[280px] flex-col bg-starsim-navy p-5 text-white", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-serif text-3xl">Star Sim</p>
          <p className="text-sm text-white/55">Admin CMS</p>
        </div>
        {onClose ? (
          <button
            type="button"
            aria-label="Închide meniul de administrare"
            onClick={onClose}
            className="focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/15 text-white/75 hover:bg-white/10 hover:text-white"
          >
            <Icons.X className="h-5 w-5" />
          </button>
        ) : null}
      </div>
      <nav className="mt-8 grid min-h-0 gap-1 overflow-y-auto pr-1">
        {items.map((item) => {
          const Icon = (Icons as any)[item.icon] || Icons.Circle;
          const active = activeHref === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                active ? "bg-white/10 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className={cn("h-4 w-4", active ? "text-starsim-softGold" : "text-starsim-gold")} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-2xl bg-white/8 p-4">
        <p className="font-semibold">{user.name}</p>
        <p className="text-xs text-white/55">{user.role}</p>
        <div className="mt-3"><LogoutButton /></div>
      </div>
    </aside>
  );
}
