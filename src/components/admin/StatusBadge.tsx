import { statusMeta } from "@/lib/admin/status";

export function StatusBadge({ status }: { status: string }) {
  const meta = statusMeta[status] || { label: status, tone: "neutral" };
  return <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-starsim-navy">{meta.label}</span>;
}
