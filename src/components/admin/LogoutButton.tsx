"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold text-white/80 hover:text-white">Logout</button>;
}
