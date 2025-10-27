'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type ArticleLite = {
  slug: string
  title: string
  excerpt?: string
  category?: string
  featuredImage?: { url?: string }
  videoId?: string
  videoUrl?: string
}

export function Hero({
  article,
  items,
}: {
  article?: ArticleLite
  items?: ArticleLite[]
}) {
  const slides = (
    items && items.length > 0 ? items : article ? [article] : []
  ) as ArticleLite[]
  const [i, setI] = useState(0)
  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(() => setI((x) => (x + 1) % slides.length), 4500)
    return () => clearInterval(id)
  }, [slides.length])

  const cur = slides[0] ? slides[i % slides.length] : undefined
  const hasImage = !!cur?.featuredImage?.url
  const isVideo = !!(cur?.videoId || cur?.videoUrl)

  return (
    <section
      className={cur ? 'relative' : 'bg-gradient-to-b from-white to-base-bg'}
    >
      {cur && !isVideo && hasImage && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={cur.featuredImage!.url!}
            alt={cur.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-white/10" />
        </div>
      )}

      {cur && isVideo && (
        <div className="absolute inset-0 -z-10">
          {cur.videoId ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${cur.videoId}?autoplay=1&mute=1&controls=0&rel=0&playsinline=1&modestbranding=1&loop=1&playlist=${cur.videoId}`}
              title={cur.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : cur.videoUrl ? (
            <video
              className="h-full w-full object-cover"
              src={cur.videoUrl}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-white/10" />
        </div>
      )}

      <div className="container py-16 md:py-24 relative">
        {cur?.category && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`inline-block rounded-full px-3 py-1 text-xs font-medium shadow-sm backdrop-blur ${cur ? 'bg-white/80 text-slate-800' : ''}`}
          >
            {cur.category}
          </motion.span>
        )}

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={cur?.slug || 'empty'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <h1
              className={`font-heading text-4xl md:text-5xl tracking-tight ${cur ? 'text-white drop-shadow-sm' : ''}`}
            >
              {cur?.title || 'Stay ahead with curated news and analysis'}
            </h1>
            <p
              className={`mt-4 text-lg max-w-2xl ${cur ? 'text-white/90' : 'text-slate-600'}`}
            >
              {cur?.excerpt ||
                'FlashNews delivers featured stories, expert opinions, and the latest updates across technology, business, and the world.'}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#newsletter"
            className={`inline-flex items-center w-full sm:w-auto justify-center rounded-md px-4 py-2 text-white shadow-card ${cur ? 'bg-base-accent hover:opacity-90' : 'bg-base-accent'}`}
          >
            Subscribe
          </a>
          {cur?.slug ? (
            <Link
              href={`/articles/${cur.slug}`}
              className={`inline-flex items-center w-full sm:w-auto justify-center rounded-md border px-4 py-2 ${cur ? 'border-white/70 text-white hover:bg-white/10' : 'hover:bg-black/5'}`}
            >
              Read More
            </Link>
          ) : (
            <a
              href="#latest"
              className="inline-flex items-center w-full sm:w-auto justify-center rounded-md border px-4 py-2 hover:bg-black/5"
            >
              Latest
            </a>
          )}
        </div>

        {slides.length > 1 && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              aria-label="Previous slide"
              onClick={() =>
                setI((x) => (x - 1 + slides.length) % slides.length)
              }
              className="rounded-full border px-3 py-1.5 text-sm text-white/90 hover:bg-white/10"
            >
              Prev
            </button>
            <button
              aria-label="Next slide"
              onClick={() => setI((x) => (x + 1) % slides.length)}
              className="rounded-full border px-3 py-1.5 text-sm text-white/90 hover:bg-white/10"
            >
              Next
            </button>
            <div className="ml-0 sm:ml-2 flex gap-2 w-full sm:w-auto justify-center sm:justify-start overflow-hidden">
              {slides.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 w-4 md:w-6 rounded-full ${idx === i ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
