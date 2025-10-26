import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sampleArticles } from '@/lib/data'
import { createArticle, deleteArticle, store } from '@/lib/store'
import { AdminLogin } from '@/components/auth/AdminLogin'
import { SignOutButton } from '@/components/auth/SignOutButton'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return (
      <main className="container py-12 max-w-md">
        <h1 className="font-heading text-2xl">Admin Login</h1>
        <AdminLogin />
      </main>
    )
  }

  async function createAction(formData: FormData) {
    'use server'
    const title = String(formData.get('title') || '')
    const slug = String(formData.get('slug') || '')
    const excerpt = String(formData.get('excerpt') || '')
    if (title && slug) createArticle({ title, slug, excerpt })
  }

  async function deleteAction(slug: string) {
    'use server'
    deleteArticle(slug)
  }

  return (
    <main className="container py-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl">Admin Dashboard</h1>
        <SignOutButton />
      </div>

      <section className="mt-8">
        <h2 className="font-semibold">Articles (demo)</h2>
        <form action={createAction} className="mt-4 grid gap-3 max-w-xl">
          <input
            name="title"
            placeholder="Title"
            className="border rounded px-3 py-2"
          />
          <input
            name="slug"
            placeholder="slug"
            className="border rounded px-3 py-2"
          />
          <input
            name="excerpt"
            placeholder="Excerpt"
            className="border rounded px-3 py-2"
          />
          <button className="rounded bg-base-accent text-white px-4 py-2 w-fit">
            Create
          </button>
        </form>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...store.articles, ...sampleArticles].map((a: any) => (
            <li key={a.slug} className="border rounded p-4">
              <div className="font-medium">{a.title}</div>
              <div className="text-xs text-slate-500">/{a.slug}</div>
              <form action={() => deleteAction(a.slug)} className="mt-3">
                <button className="text-xs border rounded px-2 py-1">
                  Delete
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
