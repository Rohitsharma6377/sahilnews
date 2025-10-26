import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { dbSearch } from '@/lib/repo/articles'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ArticleCard } from '@/components/ArticleCard'
import { SidebarList } from '@/components/SidebarList'
import { CategoryBanner } from '@/components/CategoryBanner'

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: tag } = await params
  const articles = await dbSearch(tag)
  return (
    <>
      <Header />
      <Breadcrumbs
        items={[{ label: 'Home', href: '/' }, { label: `#${tag}` }]}
      />
      <main className="container py-8 grid gap-8 lg:grid-cols-12">
        <section className="lg:col-span-8">
          <CategoryBanner items={articles as any} title={`#${tag}`} />
          <h1 className="font-heading text-3xl">#{tag}</h1>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {articles.map((a: any) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
        <aside className="lg:col-span-4 space-y-8">
          <SidebarList title="Related" items={articles.slice(0, 6) as any} />
        </aside>
      </main>
      <Footer />
    </>
  )
}
