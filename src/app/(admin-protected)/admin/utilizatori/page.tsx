import { ContentListPage } from "@/components/admin/ContentListPage";
import { requireRole } from "@/server/auth/session";

export default async function Page() {
  await requireRole(["ADMIN"]);
  return <ContentListPage type="utilizatori" />;
}
