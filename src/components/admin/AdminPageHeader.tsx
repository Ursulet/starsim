export function AdminPageHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start"><div><h1 className="text-3xl font-bold text-starsim-navy">{title}</h1>{description ? <p className="mt-2 text-slate-500">{description}</p> : null}</div>{action}</div>;
}
