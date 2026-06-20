import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

export function AdminShell({ user, children }: { user: any; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminSidebar user={user} />
      <div className="lg:pl-[280px]">
        <AdminHeader />
        <main className="p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
