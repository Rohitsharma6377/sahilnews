import Image from 'next/image'
import Link from 'next/link'
type ArticleLite = {
  slug: string
  title: string
  excerpt?: string
  category?: string
  author?: { name?: string }
  readingTime?: string
  featuredImage?: { url?: string }
}

export function ArticleCard({ article }: { article: ArticleLite }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block rounded-lg overflow-hidden bg-white shadow-card hover:-translate-y-0.5 hover:shadow-lg transition"
    >
      <div className="relative aspect-[16/9]">
        {article.featuredImage?.url ? (
          <Image
            src={article.featuredImage.url}
            alt={article.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-200" />
        )}
      </div>
      <div className="p-4">
        <div className="text-xs text-slate-500">
          {article.category || 'General'}
        </div>
        <h3 className="mt-1 font-semibold leading-snug line-clamp-2">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-slate-600 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="mt-3 text-xs text-slate-500">
          {article.author?.name} · {article.readingTime}
        </div>
      </div>
    </Link>
  )
}
