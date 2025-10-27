'use client'
import { useState, FormEvent } from 'react'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'ok'>('idle')
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('ok')
  }
  if (status === 'ok') {
    return (
      <div className="rounded-xl border bg-white/70 p-6 shadow-card backdrop-blur dark:border-slate-700 dark:bg-slate-900/60">
        <h2 className="font-heading text-2xl">Thanks!</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          We'll get back to you shortly.
        </p>
      </div>
    )
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-1">
        <label className="text-sm">Your name</label>
        <input name="name" required className="rounded-md border px-3 py-2" />
      </div>
      <div className="grid gap-1">
        <label className="text-sm">Email</label>
        <input
          name="email"
          type="email"
          required
          className="rounded-md border px-3 py-2"
        />
      </div>
      <div className="grid gap-1">
        <label className="text-sm">Message</label>
        <textarea
          name="message"
          required
          className="min-h-[120px] rounded-md border px-3 py-2"
        />
      </div>
      <button className="w-fit rounded-md bg-base-accent px-4 py-2 text-white hover:opacity-90">
        Send
      </button>
    </form>
  )
}
