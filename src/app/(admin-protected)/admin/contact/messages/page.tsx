import { StatusBadge } from "@/components/admin/StatusBadge";
import { prisma } from "@/lib/prisma";

async function getMessages() {
  try {
    return await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 50
    });
  } catch {
    return [];
  }
}

export default async function ContactMessagesPage() {
  const messages = await getMessages();

  return (
    <section>
      <div>
        <h1 className="text-3xl font-bold text-starsim-navy">Mesaje contact</h1>
        <p className="mt-2 text-slate-500">Ultimele mesaje primite prin formularul public.</p>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {messages.length ? (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Nume</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Tip</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {messages.map((message) => (
                <tr key={message.id}>
                  <td className="px-4 py-3 font-semibold text-starsim-navy">{message.name}</td>
                  <td className="px-4 py-3 text-slate-600">{message.email}</td>
                  <td className="px-4 py-3 text-slate-600">{message.type}</td>
                  <td className="px-4 py-3"><StatusBadge status={message.status} /></td>
                  <td className="px-4 py-3 text-slate-500">{new Intl.DateTimeFormat("ro-RO", { dateStyle: "medium", timeStyle: "short" }).format(message.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center">
            <h2 className="font-semibold text-starsim-navy">Nu exista mesaje inca</h2>
            <p className="mt-2 text-sm text-slate-500">Cand formularul public primeste mesaje, ele vor aparea aici.</p>
          </div>
        )}
      </div>
    </section>
  );
}
