import Link from "next/link";
import { requireRole } from "@/server/auth/session";

const settingsLinks = [
  { title: "Prima pagină", description: "Hero, misiune, secțiuni și zona de contribuții.", href: "/admin/prima-pagina" },
  { title: "Contact și footer", description: "Email, telefon, adresă, social links, WhatsApp și textele din footer.", href: "/admin/contact" },
  { title: "Donează", description: "Date bancare, sume recomandate și textul paginii de donații.", href: "/admin/doneaza" },
  { title: "Pagini statice", description: "Politica de confidențialitate, cookies, termeni și alte pagini editoriale.", href: "/admin/pagini" },
  { title: "Utilizatori", description: "Conturi admin/editor și roluri.", href: "/admin/utilizatori" },
  { title: "SEO Center", description: "Raport rapid pentru metadate lipsa.", href: "/admin/seo" }
];

export default async function Page() {
  await requireRole(["ADMIN"]);

  return (
    <section>
      <div>
        <h1 className="text-3xl font-bold text-starsim-navy">Setări site</h1>
        <p className="mt-2 max-w-3xl text-slate-500">Acceseaza rapid zonele configurabile ale site-ului Star Sim.</p>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {settingsLinks.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <h2 className="font-semibold text-starsim-navy">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
