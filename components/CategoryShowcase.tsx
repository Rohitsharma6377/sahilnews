import Link from 'next/link'
import Image from 'next/image'
import { ArticleCard } from './ArticleCard'

// Reuse ArticleCard article type
type ArticleLite = Parameters<typeof ArticleCard>[0]['article']

function Tile({ a, tall = false }: { a: ArticleLite; tall?: boolean }) {
  return (
    <Link
      href={`/articles/${a.slug}`}
      className={
        'group relative block rounded-2xl border bg-white p-5 shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/60 ' +
        (tall ? 'row-span-2 flex flex-col justify-end' : '')
      }
    >
      {/* gradient hover ring */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-orange/20 to-brand-lightBlue/20 opacity-0 transition group-hover:opacity-100" />

      <div className="relative z-[1] flex items-start gap-3">
        <div className="relative h-9 w-9 overflow-hidden rounded-lg">
          {a.featuredImage?.url ? (
            <Image
              src={a.featuredImage.url}
              alt={a.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-slate-200" />
          )}
        </div>
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-wide text-slate-500">
            {a.category || 'general'}
          </div>
          <h3 className="mt-1 font-semibold leading-snug text-slate-900 dark:text-white">
            {a.title}
          </h3>
          {!tall && (
            <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
              {a.excerpt}
            </p>
          )}
        </div>
      </div>

      {tall && (
        <div className="relative mt-4 overflow-hidden rounded-xl">
          {a.featuredImage?.url ? (
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={a.featuredImage.url}
                alt={a.title}
                fill
                className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-[1.03]"
              />
            </div>
          ) : (
            <div className="aspect-[4/3] w-full bg-slate-200" />
          )}
        </div>
      )}
    </Link>
  )
}

export function CategoryShowcase({ articles }: { articles: ArticleLite[] }) {
  const pool = articles || []
  const byCat: ArticleLite[] = []
  const seen = new Set<string>()
  for (const a of pool) {
    const c = (a.category || 'general').toLowerCase()
    if (!seen.has(c)) {
      byCat.push(a)
      seen.add(c)
    }
    if (byCat.length >= 5) break
  }
  const list = byCat.length ? byCat : pool.slice(0, 5)
  const [a0, a1, a2, a3, a4] = [list[0], list[1], list[2], list[3], list[4]]
  if (!a0) return null
  return (
    <section className="container mt-10">
      <h2 className="font-heading text-2xl">Explore by category</h2>
      <div className="mt-4 grid auto-rows-[200px] sm:auto-rows-[170px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {a0 && <Tile a={a0} />}
        {a1 && <Tile a={a1} tall />}
        {a2 && <Tile a={a2} />}
        {a3 && <Tile a={a3} />}
        {a4 && <Tile a={a4} />}
      </div>
    </section>
  )
}
