'use client'
import { signOut } from 'next-auth/react'

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/admin' })}
      className="border rounded px-3 py-2"
    >
      Sign out
    </button>
  )
}
