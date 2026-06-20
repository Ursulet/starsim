import { ModulePlaceholder } from "@/components/admin/ModulePlaceholder";
import { adminModules } from "@/lib/admin/module-meta";
import { requireRole } from "@/server/auth/session";
export default async function Page() { await requireRole(["ADMIN"]); return <ModulePlaceholder {...adminModules.utilizatori} />; }
