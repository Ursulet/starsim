import { ContentEditPage } from "@/components/admin/ContentFormPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ContentEditPage type="evenimente" id={id} />;
}
