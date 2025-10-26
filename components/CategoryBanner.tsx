'use client'
import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export type BannerItem = {
  slug: string
  title: string
  featuredImage?: { url?: string }
}

export function CategoryBanner({
  items,
  title,
}: {
  items: BannerItem[]
  title: string
}) {
  const slides = useMemo(() => items.slice(0, 5), [items])
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!slides.length) return
    const id = setInterval(() => setI((x) => (x + 1) % slides.length), 3500)
    return () => clearInterval(id)
  }, [slides.length])

  if (!slides.length) return null
  const cur = slides[i]

  return (
    <section className="mt-6">
      <div className="relative overflow-hidden rounded-2xl">
        {/* smoky blurred background */}
        {cur.featuredImage?.url && (
          <div className="absolute inset-0 -z-10">
            <Image
              src={cur.featuredImage.url}
              alt=""
              fill
              className="object-cover blur-3xl opacity-50"
            />
          </div>
        )}
        <div className="relative">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={cur.slug}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45 }}
              className="relative aspect-[16/6] w-full overflow-hidden"
            >
              {cur.featuredImage?.url ? (
                <Image
                  src={cur.featuredImage.url}
                  alt={cur.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-sky-200 to-emerald-200" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="mb-2 text-xs uppercase tracking-wide text-white/80">
                  {title}
                </div>
                <h3 className="max-w-3xl font-heading text-2xl md:text-3xl text-white drop-shadow">
                  <Link
                    href={`/articles/${cur.slug}`}
                    className="hover:text-emerald-200"
                  >
                    {cur.title}
                  </Link>
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>
          {/* dots */}
          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 w-6 rounded-full ${idx === i ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
