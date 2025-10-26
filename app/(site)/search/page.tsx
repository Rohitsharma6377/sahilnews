import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { dbSearch } from '@/lib/repo/articles'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q: raw } = await searchParams
  const q = (raw || '').toLowerCase()
  const results = q ? await dbSearch(q) : []
  return (
    <>
      <Header />
      <main className="container py-8">
        <h1 className="font-heading text-3xl">Search</h1>
        <form className="mt-4">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search articles"
            className="w-full md:w-1/2 border rounded-md px-3 py-2"
          />
        </form>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((a: any) => (
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
