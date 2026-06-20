import { ModulePlaceholder } from "@/components/admin/ModulePlaceholder";
export default function Page() { return <ModulePlaceholder title="Mesaje contact" description="Gestioneaza mesajele primite prin formularul public." primaryActionLabel="Vezi contact" primaryActionHref="/admin/contact" items={["status mesaj", "note interne", "filtrare dupa tip", "marcare rezolvat"]} />; }
