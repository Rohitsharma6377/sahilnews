import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { dbGetByCategory } from '@/lib/repo/articles'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ArticleCard } from '@/components/ArticleCard'
import { SidebarList } from '@/components/SidebarList'
import { CategoryBanner } from '@/components/CategoryBanner'
import { TopBar } from '@/components/TopBar'
import { SubscribeCard } from '@/components/SubscribeCard'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const articles = await dbGetByCategory(slug)
  const list = articles || []
  const sidebar = list.slice(0, 6)
  const tagCounts = new Map<string, number>()
  for (const a of list as any[]) {
    for (const t of (a?.tags || []) as string[]) {
      tagCounts.set(t, (tagCounts.get(t) || 0) + 1)
    }
  }
  const trendingTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([t]) => t)
  return (
    <>
      <Header />
      <TopBar />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: slug }]} />
      <main className="container py-8 grid gap-8 lg:grid-cols-12">
        <section className="lg:col-span-8">
          <CategoryBanner items={list as any} title={slug} />
          <h1 className="font-heading text-3xl capitalize">{slug}</h1>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {list.map((a: any) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
        <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
          <SidebarList
            title={`Latest in ${slug}`}
            items={(list || []).slice(0, 5) as any}
          />

          <SidebarList
            title={`More from ${slug}`}
            items={(list || []).slice(5, 10) as any}
          />

          {trendingTags.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                Trending Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((t) => (
                  <a
                    key={t}
                    href={`/tags/${t}`}
                    className="rounded-full border px-3 py-1 text-xs hover:border-base-accent hover:text-base-accent"
                  >
                    #{t}
                  </a>
                ))}
              </div>
            </div>
          )}

          <SubscribeCard />
        </aside>
      </main>
      <Footer />
    </>
  )
}
