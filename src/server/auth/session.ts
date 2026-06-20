import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/admin/permissions";

export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

export async function requireAdminUser() {
  const user = await getCurrentUser();
  if (!user || !canAccessAdmin(user.role) || user.status !== "ACTIVE") redirect("/admin/login");
  return user;
}

export async function requireRole(roles: Array<"ADMIN" | "EDITOR" | "VOLUNTEER">) {
  const user = await requireAdminUser();
  if (!roles.includes(user.role)) redirect("/admin");
  return user;
}
