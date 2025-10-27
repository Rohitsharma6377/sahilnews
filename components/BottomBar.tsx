import Link from 'next/link'
import { getLatest } from '@/lib/data'
import { TopMedia } from '@/components/TopMedia'

export function BottomBar() {
  const items = getLatest()
  const list = (items || []).slice(0, 12)
  if (!list.length) return null
  const doubled = [...list, ...list]
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/90 backdrop-blur dark:bg-slate-900/80">
      <div className="container flex items-center justify-center gap-3 py-1.5">
        <span className="text-xs font-semibold text-base-accent">Trending</span>
        <div className="relative flex-1 max-w-3xl overflow-hidden">
          <div className="ticker">
            {doubled.map((a, i) => (
              <Link
                key={`${a.slug}-b-${i}`}
                href={`/articles/${a.slug}`}
                className="mr-6 inline-block text-[13px] hover:text-base-accent"
              >
                {a.title}
              </Link>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white/90 to-transparent dark:from-slate-900/60" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white/90 to-transparent dark:from-slate-900/60" />
        </div>
        <TopMedia thumbs={list as any} showVideo={false} />
      </div>
    </div>
  )
}
