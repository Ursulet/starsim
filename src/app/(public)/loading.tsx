export default function PublicLoading() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero skeleton */}
      <div className="navy-gradient relative flex min-h-[420px] items-center justify-center px-5">
        <div className="mx-auto w-full max-w-3xl text-center">
          <div className="mx-auto mb-6 h-5 w-40 animate-pulse rounded-full bg-white/15" />
          <div className="mx-auto mb-4 h-10 w-96 max-w-full animate-pulse rounded-2xl bg-white/12" />
          <div className="mx-auto mb-4 h-10 w-72 max-w-full animate-pulse rounded-2xl bg-white/10" />
          <div className="mx-auto mt-6 h-5 w-80 max-w-full animate-pulse rounded-full bg-white/8" />
          <div className="mt-8 flex justify-center gap-4">
            <div className="h-12 w-36 animate-pulse rounded-full bg-white/10" />
            <div className="h-12 w-36 animate-pulse rounded-full bg-white/8" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 h-8 w-64 animate-pulse rounded-xl bg-gray-100" />
          <div className="mx-auto h-4 w-96 max-w-full animate-pulse rounded-lg bg-gray-50" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl border border-starsim-border bg-white p-6">
              <div className="mb-4 h-12 w-12 animate-pulse rounded-xl bg-gray-100" />
              <div className="mb-3 h-5 w-32 animate-pulse rounded-lg bg-gray-100" />
              <div className="h-3 w-full animate-pulse rounded bg-gray-50" />
              <div className="mt-2 h-3 w-3/4 animate-pulse rounded bg-gray-50" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
