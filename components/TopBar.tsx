import Link from 'next/link'
import { dbGetLatest } from '@/lib/repo/articles'
import { TopMedia } from '@/components/TopMedia'

export async function TopBar() {
  const items = await dbGetLatest()
  const list = (items || []).slice(0, 10)
  if (!list.length) return null
  const doubled = [...list, ...list]
  return (
    <div className="border-b bg-emerald-50/70 dark:bg-slate-900/50 overflow-hidden">
      <div className="container flex items-center justify-center gap-4 py-1.5">
        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          Latest
        </span>
        <div className="relative flex-1 max-w-3xl overflow-hidden">
          <div className="ticker">
            {doubled.map((a, i) => (
              <Link
                key={`${a.slug}-${i}`}
                href={`/articles/${a.slug}`}
                className="mr-6 inline-block text-[13px] hover:text-emerald-700"
              >
                {a.title}
              </Link>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-emerald-50/70 to-transparent dark:from-slate-900/50" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-emerald-50/70 to-transparent dark:from-slate-900/50" />
        </div>
        <TopMedia thumbs={list as any} showVideo={false} />
      </div>
    </div>
  )
}
