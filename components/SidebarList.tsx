import Image from 'next/image'
import Link from 'next/link'

export type MiniArticle = {
  slug: string
  title: string
  featuredImage?: { url?: string }
  publishedAt?: string
}

export function SidebarList({
  title,
  items,
}: {
  title: string
  items: MiniArticle[]
}) {
  if (!items?.length) return null
  return (
    <aside className="space-y-3">
      <h3 className="font-semibold text-slate-800 dark:text-slate-100">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((a) => (
          <li key={a.slug} className="flex gap-3">
            <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded">
              {a.featuredImage?.url ? (
                <Image
                  src={a.featuredImage.url}
                  alt={a.title}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-slate-200" />
              )}
            </div>
            <div className="min-w-0">
              <Link
                href={`/articles/${a.slug}`}
                className="line-clamp-2 font-medium hover:text-base-accent"
              >
                {a.title}
              </Link>
              {a.publishedAt && (
                <div className="text-xs text-slate-500 mt-0.5">
                  {new Date(a.publishedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  )
}
