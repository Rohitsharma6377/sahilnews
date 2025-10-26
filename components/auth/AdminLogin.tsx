'use client'
import { useState, FormEvent } from 'react'
import { signIn } from 'next-auth/react'

export function AdminLogin() {
  const [loading, setLoading] = useState(false)
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const email = (new FormData(form).get('email') || '') as string
    const password = (new FormData(form).get('password') || '') as string
    setLoading(true)
    await signIn('credentials', {
      redirect: true,
      callbackUrl: '/admin',
      email,
      password,
    })
    setLoading(false)
  }
  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-3">
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full border rounded px-3 py-2"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full border rounded px-3 py-2"
        required
      />
      <button
        disabled={loading}
        className="rounded bg-base-accent text-white px-4 py-2"
      >
        {loading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
