import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdminUser } from "@/server/auth/session";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdminUser();
  return <AdminShell user={user}>{children}</AdminShell>;
}
