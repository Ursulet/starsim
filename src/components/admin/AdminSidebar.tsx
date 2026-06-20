import Link from "next/link";
import * as Icons from "lucide-react";
import { adminNavigation } from "@/lib/admin/navigation";
import { LogoutButton } from "./LogoutButton";

export function AdminSidebar({ user }: { user: any }) {
  const items = adminNavigation.filter((item) => !("adminOnly" in item) || !item.adminOnly || user.role === "ADMIN");
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-[280px] flex-col bg-starsim-navy p-5 text-white lg:flex">
      <div>
        <p className="font-serif text-3xl">Star Sim</p>
        <p className="text-sm text-white/55">Admin CMS</p>
      </div>
      <nav className="mt-8 grid gap-1 overflow-y-auto pr-1">
        {items.map((item) => {
          const Icon = (Icons as any)[item.icon] || Icons.Circle;
          return (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/75 hover:bg-white/10 hover:text-white">
              <Icon className="h-4 w-4 text-starsim-gold" /> {item.label}
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
