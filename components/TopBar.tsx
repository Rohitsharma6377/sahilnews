import Link from 'next/link'
import { dbGetLatest } from '@/lib/repo/articles'

export async function TopBar() {
  const items = await dbGetLatest()
  const list = (items || []).slice(0, 10)
  if (!list.length) return null
  const doubled = [...list, ...list]
  return (
    <div className="border-b bg-emerald-50/70 dark:bg-slate-900/50">
      <div className="container flex items-center gap-4 py-2">
        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          Latest
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="ticker">
            {doubled.map((a, i) => (
              <Link
                key={`${a.slug}-${i}`}
                href={`/articles/${a.slug}`}
                className="mr-6 inline-block text-sm hover:text-emerald-700"
              >
                {a.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden md:block">
          <div className="overflow-hidden rounded-md shadow">
            <iframe
              title="Top video"
              width="240"
              height="135"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=dQw4w9WgXcQ"
              allow="autoplay; encrypted-media; picture-in-picture"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
