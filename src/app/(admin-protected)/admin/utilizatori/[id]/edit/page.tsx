import { ContentEditPage } from "@/components/admin/ContentFormPage";
import { requireRole } from "@/server/auth/session";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  await requireRole(["ADMIN"]);
  const { id } = await params;
  return <ContentEditPage type="utilizatori" id={id} />;
}
