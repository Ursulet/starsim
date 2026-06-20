import { prisma } from "@/lib/prisma";
import { requireRole } from "@/server/auth/session";

async function getAuditLogs() {
  try {
    return await prisma.auditLog.findMany({
      include: { actor: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
      take: 200
    });
  } catch {
    return [];
  }
}

export default async function Page() {
  await requireRole(["ADMIN"]);
  const logs = await getAuditLogs();

  return (
    <section>
      <div>
        <h1 className="text-3xl font-bold text-starsim-navy">Audit Log</h1>
        <p className="mt-2 max-w-3xl text-slate-500">Urmareste actiunile importante inregistrate de sistem.</p>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {logs.length ? (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Actiune</th>
                <th className="px-4 py-3">Entitate</th>
                <th className="px-4 py-3">Autor</th>
                <th className="px-4 py-3">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3 font-semibold text-starsim-navy">{item.action}</td>
                  <td className="px-4 py-3 text-slate-600">{item.entity}{item.entityId ? ` / ${item.entityId}` : ""}</td>
                  <td className="px-4 py-3 text-slate-500">{item.actor?.name || item.actor?.email || "System"}</td>
                  <td className="px-4 py-3 text-slate-500">{new Intl.DateTimeFormat("ro-RO", { dateStyle: "medium", timeStyle: "short" }).format(item.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center">
            <h2 className="font-semibold text-starsim-navy">Nu exista loguri inca</h2>
            <p className="mt-2 text-sm text-slate-500">Logurile vor aparea dupa actiuni importante in admin.</p>
          </div>
        )}
      </div>
    </section>
  );
}
