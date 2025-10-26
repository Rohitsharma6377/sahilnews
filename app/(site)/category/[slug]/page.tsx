import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { dbGetByCategory } from '@/lib/repo/articles'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ArticleCard } from '@/components/ArticleCard'
import { SidebarList } from '@/components/SidebarList'
import { CategoryBanner } from '@/components/CategoryBanner'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const articles = await dbGetByCategory(slug)
  const list = articles || []
  const sidebar = list.slice(0, 6)
  return (
    <>
      <Header />
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
        <aside className="lg:col-span-4 space-y-8">
          <SidebarList title="Top in this category" items={sidebar as any} />
        </aside>
      </main>
      <Footer />
    </>
  )
}
