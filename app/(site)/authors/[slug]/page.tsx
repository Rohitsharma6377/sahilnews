import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { dbGetByAuthor } from '@/lib/repo/articles'

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const name = decodeURIComponent(slug.replace(/-/g, ' '))
  const articles = await dbGetByAuthor(name)
  return (
    <>
      <Header />
      <main className="container py-8">
        <h1 className="font-heading text-3xl">{name}</h1>
        <p className="text-slate-600">Articles by {name}</p>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a: any) => (
            <li key={a.slug} className="border rounded-lg p-4">
              <a
                href={`/articles/${a.slug}`}
                className="font-semibold hover:text-base-accent"
              >
                {a.title}
              </a>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  )
}
