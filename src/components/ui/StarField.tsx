export function StarField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-70">
      {Array.from({ length: 28 }).map((_, index) => (
        <span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-starsim-softGold"
          style={{ left: `${(index * 37) % 100}%`, top: `${(index * 19) % 100}%`, opacity: index % 3 === 0 ? 1 : 0.45 }}
        />
      ))}
    </div>
  );
}
