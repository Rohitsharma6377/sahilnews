'use client'
import { useEffect, useState } from 'react'

export function NewsletterModal() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const dismissed =
      typeof window !== 'undefined' &&
      localStorage.getItem('newsletter_dismissed')
    const t = setTimeout(() => {
      if (!dismissed) setOpen(true)
    }, 1200)
    return () => clearTimeout(t)
  }, [])
  const dismiss = () => {
    setOpen(false)
    try {
      localStorage.setItem('newsletter_dismissed', '1')
    } catch {}
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dismiss()
  }
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-card dark:bg-slate-900">
        <h3 className="font-heading text-xl">Subscribe to our newsletter</h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Get the latest stories in your inbox.
        </p>
        <form
          onSubmit={onSubmit}
          className="mt-4 flex flex-col sm:flex-row gap-2"
        >
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="flex-1 rounded-md border px-3 py-2"
          />
          <button className="w-full sm:w-auto rounded-md bg-base-accent px-4 py-2 text-white hover:opacity-90">
            Subscribe
          </button>
        </form>
        <button
          onClick={dismiss}
          className="mt-3 text-sm text-slate-500 hover:text-slate-700"
        >
          No thanks
        </button>
      </div>
    </div>
  )
}
