import { StatusBadge } from "@/components/admin/StatusBadge";
import { prisma } from "@/lib/prisma";

async function getSubscribers() {
  try {
    return await prisma.newsletterSubscriber.findMany({
      orderBy: { subscribedAt: "desc" },
      take: 200
    });
  } catch {
    return [];
  }
}

export default async function Page() {
  const subscribers = await getSubscribers();

  return (
    <section>
      <div>
        <h1 className="text-3xl font-bold text-starsim-navy">Newsletter</h1>
        <p className="mt-2 max-w-3xl text-slate-500">Vezi abonatii veniti din formularul public de newsletter.</p>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {subscribers.length ? (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Nume</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Sursa</th>
                <th className="px-4 py-3">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subscribers.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3 font-semibold text-starsim-navy">{item.email}</td>
                  <td className="px-4 py-3 text-slate-600">{item.name || "-"}</td>
                  <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                  <td className="px-4 py-3 text-slate-500">{item.source || "-"}</td>
                  <td className="px-4 py-3 text-slate-500">{new Intl.DateTimeFormat("ro-RO", { dateStyle: "medium" }).format(item.subscribedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center">
            <h2 className="font-semibold text-starsim-navy">Nu exista abonati inca</h2>
            <p className="mt-2 text-sm text-slate-500">Abonatii apar aici dupa completarea formularului din footer.</p>
          </div>
        )}
      </div>
    </section>
  );
}
