import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { dbGetBySlug, dbGetByCategory } from '@/lib/repo/articles'
import { articleJsonLd, articleMetadata } from '@/lib/seo'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { SidebarList } from '@/components/SidebarList'
import { ArticleCard } from '@/components/ArticleCard'
import { Comments } from '@/components/Comments'
import { AnimatedIn } from '@/components/AnimatedIn'
import { SubscribeCard } from '@/components/SubscribeCard'
import { TopBar } from '@/components/TopBar'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const a = await dbGetBySlug(slug)
  if (!a) return {}
  return articleMetadata({
    title: a.title,
    description: a.excerpt,
    slug: a.slug,
    image: a.featuredImage?.url,
  })
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const a = await dbGetBySlug(slug)
  if (!a) return notFound()
  const relatedAll = await dbGetByCategory(a.category)
  const related = (relatedAll || [])
    .filter((r: any) => r.slug !== a.slug)
    .slice(0, 6)
  return (
    <>
      <Header />
      <TopBar />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: a.category, href: `/category/${a.category}` },
          { label: a.title },
        ]}
      />
      <div className="container py-6 grid gap-8 lg:grid-cols-12">
        <article className="prose prose-slate lg:prose-lg lg:col-span-8 max-w-none break-words">
          <AnimatedIn>
            <h1>{a.title}</h1>
          </AnimatedIn>
          {a.featuredImage?.url && (
            <AnimatedIn delay={0.05}>
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={a.featuredImage.url}
                  alt={a.title}
                  fill
                  sizes="100vw"
                  className="object-cover rounded-lg"
                />
              </div>
            </AnimatedIn>
          )}
          <AnimatedIn delay={0.1}>
            <p className="text-slate-600">
              By {a.author.name} · {a.readingTime}
            </p>
          </AnimatedIn>
          <AnimatedIn delay={0.15}>
            <div className="mt-6">{a.content}</div>
          </AnimatedIn>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                articleJsonLd({
                  title: a.title,
                  description: a.excerpt,
                  slug: a.slug,
                  image: a.featuredImage?.url,
                  author: a.author.name,
                  datePublished: a.publishedAt,
                })
              ),
            }}
          />

          {a.tags?.length > 0 && (
            <AnimatedIn delay={0.18}>
              <div className="mt-8 flex flex-wrap gap-2">
                {a.tags.map((t: string) => (
                  <a
                    key={t}
                    href={`/tags/${t}`}
                    className="rounded-full border px-3 py-1 text-xs hover:border-emerald-500 hover:text-emerald-600"
                  >
                    #{t}
                  </a>
                ))}
              </div>
            </AnimatedIn>
          )}

          <AnimatedIn delay={0.05}>
            <Comments slug={a.slug} />
          </AnimatedIn>
        </article>
        <div className="lg:col-span-4 space-y-8">
          <SubscribeCard />
          <SidebarList title="Related" items={related.slice(0, 5)} />
        </div>
      </div>
      <div className="container">
        {related.length > 0 && (
          <section className="mt-10">
            <AnimatedIn>
              <h2 className="font-heading text-2xl">Related</h2>
            </AnimatedIn>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {related.map((r: any, i: number) => (
                <AnimatedIn key={r.slug} delay={i * 0.05}>
                  <ArticleCard article={r} />
                </AnimatedIn>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </>
  )
}
