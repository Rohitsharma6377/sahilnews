'use client'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-base-bg">
      <div className="container py-16">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl md:text-5xl tracking-tight"
        >
          Stay ahead with curated news and analysis
        </motion.h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl">
          SahilNews delivers featured stories, expert opinions, and the latest
          updates across technology, business, and the world.
        </p>
        <div className="mt-6 flex gap-3">
          <a
            href="#newsletter"
            className="inline-flex items-center rounded-md bg-base-accent px-4 py-2 text-white shadow-card"
          >
            Subscribe
          </a>
          <a
            href="#latest"
            className="inline-flex items-center rounded-md border px-4 py-2 hover:bg-black/5"
          >
            Latest
          </a>
        </div>
      </div>
    </section>
  )
}
