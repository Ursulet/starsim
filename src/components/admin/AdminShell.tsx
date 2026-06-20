"use client";

import { useEffect, useState } from "react";
import type { Session } from "next-auth";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

type AdminUser = Session["user"];

export function AdminShell({ user, children }: { user: AdminUser; children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!mobileNavOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileNavOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileNavOpen]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminSidebar user={user} className="fixed inset-y-0 left-0 hidden lg:flex" />
      {mobileNavOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Meniu administrare">
          <button
            type="button"
            aria-label="Închide meniul de administrare"
            className="absolute inset-0 bg-starsim-navy/55 backdrop-blur-sm"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="relative h-full w-[min(320px,88vw)]">
            <AdminSidebar
              user={user}
              onClose={() => setMobileNavOpen(false)}
              onNavigate={() => setMobileNavOpen(false)}
              className="h-full w-full shadow-2xl"
            />
          </div>
        </div>
      ) : null}
      <div className="lg:pl-[280px]">
        <AdminHeader onMenuClick={() => setMobileNavOpen(true)} mobileMenuOpen={mobileNavOpen} />
        <main className="p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
