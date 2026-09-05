import { REAL_COOKIES_INVENTORY } from "@/lib/legal-pages";

export function CookieInventoryTable() {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
      <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200">
        <h3 className="font-serif text-base md:text-lg font-bold text-starsim-navy">
          Inventarul tehnic al cookie-urilor utilizate pe starsim.ro
        </h3>
        <p className="mt-0.5 text-xs text-slate-500">
          Scanare și inventar conform stării reale de producție (septembrie 2026).
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-xs text-slate-700">
          <thead className="bg-slate-100/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-3.5">Nume fișier / Tehnologie</th>
              <th className="px-5 py-3.5">Furnizor</th>
              <th className="px-5 py-3.5">Scop</th>
              <th className="px-5 py-3.5">Categorie</th>
              <th className="px-5 py-3.5">Durată</th>
              <th className="px-5 py-3.5">Domeniu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {REAL_COOKIES_INVENTORY.map((item, index) => (
              <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-5 py-4 font-mono font-bold text-starsim-navy">
                  {item.name}
                  <span className="block font-sans text-[10px] font-normal text-slate-400 mt-0.5">
                    {item.type}
                  </span>
                </td>
                <td className="px-5 py-4 font-medium text-slate-800">
                  {item.provider}
                </td>
                <td className="px-5 py-4 leading-relaxed text-slate-600 max-w-xs">
                  {item.purpose}
                </td>
                <td className="px-5 py-4">
                  <span className="inline-block rounded-md bg-starsim-navy/5 px-2 py-0.5 font-semibold text-starsim-navy text-[11px]">
                    {item.category}
                  </span>
                </td>
                <td className="px-5 py-4 font-medium text-slate-600">
                  {item.duration}
                </td>
                <td className="px-5 py-4 text-slate-500">
                  {item.domain}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-amber-50/50 p-4 border-t border-amber-200/50 text-xs text-amber-900 flex items-start gap-2.5">
        <span className="font-bold shrink-0">Notă importantă:</span>
        <span>
          Pe starsim.ro <strong>NU</strong> sunt instalate scripturi sau cookie-uri de analiză a traficului de la terți (cum ar fi Google Analytics) și <strong>NU</strong> sunt utilizați pixeli sau identificatori de publicitate comportamentală (Meta, Google Ads, TikTok).
        </span>
      </div>
    </div>
  );
}
