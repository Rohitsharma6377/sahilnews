'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, Search, X } from 'lucide-react'

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 border-b">
      <div className="container flex h-14 items-center gap-4">
        <Link
          href="/"
          className="font-heading text-xl font-bold whitespace-nowrap"
        >
          SahilNews
        </Link>
        <form
          action="/search"
          className="hidden md:flex flex-1 items-center max-w-xl"
        >
          <div className="relative w-full">
            <input
              name="q"
              placeholder="Search articles..."
              className="w-full rounded-full border bg-white/80 pl-10 pr-4 py-2 shadow-sm outline-none focus:ring-2 focus:ring-emerald-300"
            />
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </form>
        <nav className="hidden md:flex gap-6 text-sm ml-auto">
          <Link href="/category/world" className="hover:text-base-accent">
            World
          </Link>
          <Link href="/category/technology" className="hover:text-base-accent">
            Technology
          </Link>
          <Link href="/category/business" className="hover:text-base-accent">
            Business
          </Link>
          <Link href="/about" className="hover:text-base-accent">
            About
          </Link>
          <Link href="/contact" className="hover:text-base-accent">
            Contact
          </Link>
          <Link href="/admin" className="hover:text-base-accent">
            Admin
          </Link>
        </nav>
        <button
          aria-label="Open menu"
          className="md:hidden inline-flex items-center p-2 rounded-md hover:bg-black/5"
          onClick={() => setOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-white/95 backdrop-blur">
          <div className="container py-3">
            <div className="flex items-center justify-between">
              <div className="font-heading text-lg">Menu</div>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="p-2 rounded-md hover:bg-black/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form action="/search" className="mt-3">
              <input
                name="q"
                placeholder="Search articles..."
                className="w-full rounded-md border px-3 py-2"
              />
            </form>
            <nav className="mt-4 grid gap-2 text-sm">
              <Link
                href="/category/world"
                onClick={() => setOpen(false)}
                className="rounded px-2 py-2 hover:bg-black/5"
              >
                World
              </Link>
              <Link
                href="/category/technology"
                onClick={() => setOpen(false)}
                className="rounded px-2 py-2 hover:bg-black/5"
              >
                Technology
              </Link>
              <Link
                href="/category/business"
                onClick={() => setOpen(false)}
                className="rounded px-2 py-2 hover:bg-black/5"
              >
                Business
              </Link>
              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="rounded px-2 py-2 hover:bg-black/5"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="rounded px-2 py-2 hover:bg-black/5"
              >
                Contact
              </Link>
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="rounded px-2 py-2 hover:bg-black/5"
              >
                Admin
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
