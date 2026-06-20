import { ContentNewPage } from "@/components/admin/ContentFormPage";
import { requireRole } from "@/server/auth/session";

export default async function Page() {
  await requireRole(["ADMIN"]);
  return <ContentNewPage type="utilizatori" />;
}
