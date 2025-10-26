'use client'
import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export type SliderItem = {
  slug: string
  title: string
  excerpt?: string
  featuredImage?: { url?: string }
}

export function NewsSlider({ items }: { items: SliderItem[] }) {
  const slides = useMemo(() => items.slice(0, 6), [items])
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % Math.max(slides.length, 1)),
      4000
    )
    return () => clearInterval(id)
  }, [slides.length])

  if (!slides.length) return null

  const current = slides[index]

  return (
    <section className="container mt-8">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-sky-100 to-emerald-100 dark:from-slate-800 dark:to-slate-700 p-4 md:p-6">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={current.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45 }}
            className="grid gap-4 md:grid-cols-2 items-center"
          >
            <div>
              <h3 className="font-heading text-2xl md:text-3xl leading-tight">
                <Link
                  href={`/articles/${current.slug}`}
                  className="hover:text-emerald-600"
                >
                  {current.title}
                </Link>
              </h3>
              {current.excerpt && (
                <p className="mt-2 text-slate-700/90 dark:text-slate-300 line-clamp-3">
                  {current.excerpt}
                </p>
              )}
              <div className="mt-4">
                <Link
                  href={`/articles/${current.slug}`}
                  className="inline-flex items-center rounded-md bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600"
                >
                  Read now
                </Link>
              </div>
            </div>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
              {current.featuredImage?.url ? (
                <Image
                  alt={current.title}
                  src={current.featuredImage.url}
                  fill
                  className="object-cover transition-transform duration-500 will-change-transform hover:scale-[1.02]"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-sky-200 to-emerald-200" />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center gap-2">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-6 rounded-full ${i === index ? 'bg-emerald-600' : 'bg-emerald-300/70'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
