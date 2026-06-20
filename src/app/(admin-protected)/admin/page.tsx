import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { prisma } from "@/lib/prisma";

async function counts() {
  try {
    const [programs, events, articles, messages, subscribers, media] = await Promise.all([
      prisma.program.count(), prisma.event.count(), prisma.article.count(), prisma.contactMessage.count(), prisma.newsletterSubscriber.count(), prisma.mediaAsset.count()
    ]);
    return { programs, events, articles, messages, subscribers, media };
  } catch {
    return { programs: 0, events: 0, articles: 0, messages: 0, subscribers: 0, media: 0 };
  }
}

export default async function AdminDashboard() {
  const data = await counts();
  return (
    <div>
      <h1 className="text-3xl font-bold text-starsim-navy">Dashboard</h1>
      <p className="mt-2 text-slate-500">Privire de ansamblu asupra platformei Star Sim.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AdminStatCard label="Programe" value={data.programs} /><AdminStatCard label="Evenimente" value={data.events} /><AdminStatCard label="Articole" value={data.articles} /><AdminStatCard label="Mesaje contact" value={data.messages} /><AdminStatCard label="Abonați newsletter" value={data.subscribers} /><AdminStatCard label="Imagini media" value={data.media} />
      </div>
      <h2 className="mt-10 text-xl font-bold text-starsim-navy">Prioritati etapa curenta</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">{["Configurează conținutul", "Pregătește SEO", "Publică primele evenimente"].map((item) => <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-600 shadow-sm">{item}</div>)}</div>
    </div>
  );
}
