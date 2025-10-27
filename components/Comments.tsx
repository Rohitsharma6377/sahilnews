'use client'
import { useEffect, useState } from 'react'

type Comment = { name: string; message: string; date: string }

export function Comments({ slug }: { slug: string }) {
  const storageKey = `comments::${slug}`
  const [items, setItems] = useState<Comment[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [storageKey])

  const add = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    const next = [
      {
        name: name.trim(),
        message: message.trim(),
        date: new Date().toISOString(),
      },
      ...items,
    ]
    setItems(next)
    try {
      localStorage.setItem(storageKey, JSON.stringify(next))
    } catch {}
    setMessage('')
  }

  return (
    <section className="mt-10">
      <h2 className="font-heading text-2xl">Comments</h2>
      <form onSubmit={add} className="mt-3 grid gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="rounded-md border px-3 py-2"
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a comment"
          className="min-h-[100px] rounded-md border px-3 py-2"
          required
        />
        <button className="w-fit rounded-md bg-base-accent px-4 py-2 text-white hover:opacity-90">
          Post
        </button>
      </form>

      <ul className="mt-6 space-y-4">
        {items.map((c, idx) => (
          <li key={idx} className="rounded-lg border p-4">
            <div className="text-sm text-slate-500">
              {new Date(c.date).toLocaleString()} by {c.name}
            </div>
            <p className="mt-1">{c.message}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
