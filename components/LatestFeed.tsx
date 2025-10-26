import { ArticleCard } from './ArticleCard'

type ArticleLite = Parameters<typeof ArticleCard>[0]['article']

export function LatestFeed({ articles }: { articles: ArticleLite[] }) {
  return (
    <section id="latest" className="container mt-10">
      <h2 className="font-heading text-2xl">Latest</h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a: ArticleLite) => (
          <div key={a.slug}>
            <ArticleCard article={a} />
          </div>
        ))}
      </div>
    </section>
  )
}
