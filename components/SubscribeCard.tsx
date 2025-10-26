export function SubscribeCard() {
  return (
    <div className="rounded-xl border bg-white/70 p-6 shadow-card backdrop-blur dark:border-slate-700 dark:bg-slate-900/60">
      <div className="font-heading text-lg">Subscribe</div>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Get top stories in your inbox.
      </p>
      <form className="mt-3 flex gap-2">
        <input
          type="email"
          placeholder="you@example.com"
          className="flex-1 rounded-md border px-3 py-2"
        />
        <button className="rounded-md bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600">
          Join
        </button>
      </form>
    </div>
  )
}
