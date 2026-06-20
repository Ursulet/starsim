export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="premium-card p-8 text-center">
      <h3 className="font-serif text-2xl text-starsim-navy">{title}</h3>
      {description ? <p className="mt-2 text-starsim-muted">{description}</p> : null}
    </div>
  );
}
