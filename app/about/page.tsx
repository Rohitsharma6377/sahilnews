import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'About • FlashNews',
  description:
    'About FlashNews — a modern news & blogs site built with Next.js.',
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-b from-brand-lightBlue/10 to-orange-50 dark:from-slate-900 dark:to-slate-800">
        <section className="container py-14">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl">About FlashNews</h1>
            <p className="mt-4 text-slate-700 dark:text-slate-300">
              FlashNews is a modern, fast, and elegant news experience. We
              curate technology, business, and world stories with a focus on
              clarity and speed. Built with Next.js, Tailwind, and accessible
              design.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border bg-white/70 p-6 shadow-card backdrop-blur dark:border-slate-700 dark:bg-slate-900/60">
                <h3 className="font-semibold text-base-accent">Our Mission</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Deliver trustworthy stories with thoughtful presentation and
                  low friction.
                </p>
              </div>
              <div className="rounded-xl border bg-white/70 p-6 shadow-card backdrop-blur dark:border-slate-700 dark:bg-slate-900/60">
                <h3 className="font-semibold text-base-accent">
                  What We Cover
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Tech, startups, business, and global highlights—with weekend
                  long reads.
                </p>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="font-heading text-2xl">Contact</h2>
              <p className="mt-2 text-slate-700 dark:text-slate-300">
                For feedback or partnerships, email us at{' '}
                <span className="font-medium">hello@FlashNews.dev</span>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
