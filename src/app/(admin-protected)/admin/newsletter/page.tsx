import { ModulePlaceholder } from "@/components/admin/ModulePlaceholder";
import { adminModules } from "@/lib/admin/module-meta";
export default function Page() { return <ModulePlaceholder {...adminModules.newsletter} />; }
