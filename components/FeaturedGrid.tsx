import { ArticleCard } from './ArticleCard'

type ArticleLite = Parameters<typeof ArticleCard>[0]['article']

export function FeaturedGrid({ articles }: { articles: ArticleLite[] }) {
  const a0 = articles[0]
  const a1 = articles[1]
  const a2 = articles[2]
  const rest = articles.slice(3)
  return (
    <section className="container mt-10">
      <h2 className="font-heading text-2xl">Featured</h2>
      <div className="mt-4 grid gap-6 lg:grid-cols-12">
        {a0 && (
          <div className="lg:col-span-7">
            <div className="transition-transform duration-300 will-change-transform hover:scale-[1.01]">
              <ArticleCard article={a0} />
            </div>
          </div>
        )}
        <div className="lg:col-span-5 grid gap-6">
          {a1 && (
            <div className="transition-transform duration-300 will-change-transform hover:scale-[1.01]">
              <ArticleCard article={a1} />
            </div>
          )}
          {a2 && (
            <div className="transition-transform duration-300 will-change-transform hover:scale-[1.01]">
              <ArticleCard article={a2} />
            </div>
          )}
        </div>

        {rest.map((a: ArticleLite, i: number) => (
          <div
            key={a.slug}
            className={i % 2 === 0 ? 'lg:col-span-7' : 'lg:col-span-5'}
          >
            <div className="transition-transform duration-300 will-change-transform hover:scale-[1.01]">
              <ArticleCard article={a} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
